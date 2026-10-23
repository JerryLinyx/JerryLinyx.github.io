// Hero: the terminal "runs" a sampler, then particles are transported from
// Gaussian noise (t = 0) to the glyphs of the name (t = 1) on the screen.
const hero = document.querySelector("[data-flow]");
if (hero) {
  const screen = hero.querySelector(".machine-screen");
  const canvas = screen.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const terminal = hero.querySelector("[data-terminal]");
  const lines = [...terminal.children];
  const staticName = hero.querySelector("[data-screen-static]");
  const control = hero.querySelector("[data-flow-control]");
  const slider = control.querySelector("input");
  const readout = hero.querySelector("[data-flow-value]");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  let w = 0;
  let h = 0;
  let dpr = 1;
  let n = 0;
  let zx, zy, tx, ty, bend, ox, oy, vx, vy, tone;
  let t = 0;
  let intro = null;
  let frame = 0;
  let visible = true;
  let pointer = null;
  let palette = [];

  const gauss = () => {
    let u = 0;
    let v = 0;
    while (!u) u = Math.random();
    while (!v) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };

  function readPalette() {
    const style = getComputedStyle(screen);
    palette = [1, 2, 3, 4].map((i) =>
      style.getPropertyValue(`--flow-${i}`).trim(),
    );
  }

  function sampleGlyphs() {
    const off = document.createElement("canvas");
    off.width = Math.ceil(w);
    off.height = Math.ceil(h);
    const g = off.getContext("2d", { willReadFrequently: true });
    const family = getComputedStyle(document.body).fontFamily;
    g.font = `700 ${Math.round(w * 0.235)}px ${family}`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText("林煜轩", w / 2, h * 0.54);
    const data = g.getImageData(0, 0, off.width, off.height).data;
    const cells = [];
    const step = w < 420 ? 1 : 1.5;
    for (let y = 0; y < off.height; y += step)
      for (let x = 0; x < off.width; x += step)
        if (data[(Math.floor(y) * off.width + Math.floor(x)) * 4 + 3] > 140)
          cells.push(x, y);
    return cells;
  }

  function seedNoise(i) {
    const sigma = Math.min(w, h) * 0.2;
    zx[i] = w * 0.5 + gauss() * sigma * 1.3;
    zy[i] = h * 0.54 + gauss() * sigma;
    bend[i] = (Math.random() - 0.5) * 0.9;
  }

  function build(keepNoise = false) {
    const box = screen.getBoundingClientRect();
    w = box.width;
    h = box.height;
    dpr = Math.min(2, devicePixelRatio || 1);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const cells = sampleGlyphs();
    const count = Math.min(cells.length / 2, w < 420 ? 1800 : 3600);
    if (count < 50) return false;
    lines[1].textContent = `x0 ~ N(0, I)    n = ${count}`;
    const fresh = !keepNoise || count !== n;
    n = count;
    if (fresh) {
      zx = new Float32Array(n);
      zy = new Float32Array(n);
      bend = new Float32Array(n);
      ox = new Float32Array(n);
      oy = new Float32Array(n);
      vx = new Float32Array(n);
      vy = new Float32Array(n);
      tone = new Uint8Array(n);
    }
    tx = new Float32Array(n);
    ty = new Float32Array(n);
    const per = cells.length / 2 / n;
    for (let i = 0; i < n; i++) {
      const c = Math.floor(i * per + Math.random() * per) * 2;
      tx[i] = cells[c] + Math.random();
      ty[i] = cells[c + 1] + Math.random();
      if (fresh) {
        seedNoise(i);
        const shade = tx[i] / w + (Math.random() - 0.5) * 0.4;
        tone[i] = Math.max(0, Math.min(3, Math.floor(shade * 4)));
      }
    }
    return true;
  }

  function setT(value, fromUser = false) {
    t = Math.max(0, Math.min(1, value));
    if (!fromUser) slider.value = String(t);
    readout.textContent = `t = ${t.toFixed(2)}`;
    request();
  }

  const ease = (x) => 1 - Math.pow(1 - x, 3);
  function play(from) {
    if (reduce.matches) return setT(1);
    intro = { start: performance.now(), from, duration: 2800 };
    request();
  }

  function draw(now) {
    frame = 0;
    if (intro) {
      const p = Math.min(1, (now - intro.start) / intro.duration);
      setT(intro.from + (1 - intro.from) * ease(p));
      if (p >= 1) intro = null;
    }
    if (pointer && now - pointer.at > 160) pointer = null;
    let moving = !!intro;
    const arc = Math.sin(Math.PI * t);
    const radius = Math.max(36, w * 0.07);
    for (let i = 0; i < n; i++) {
      if (pointer) {
        const px = zx[i] + (tx[i] - zx[i]) * t + ox[i] - pointer.x;
        const py = zy[i] + (ty[i] - zy[i]) * t + oy[i] - pointer.y;
        const d2 = px * px + py * py;
        if (d2 < radius * radius) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / radius) * 1.4;
          vx[i] += (px / d) * f;
          vy[i] += (py / d) * f;
        }
      }
      if (ox[i] || oy[i] || vx[i] || vy[i]) {
        vx[i] = (vx[i] - ox[i] * 0.06) * 0.86;
        vy[i] = (vy[i] - oy[i] * 0.06) * 0.86;
        ox[i] += vx[i];
        oy[i] += vy[i];
        if (Math.abs(ox[i]) + Math.abs(oy[i]) + Math.abs(vx[i]) < 0.05)
          ox[i] = oy[i] = vx[i] = vy[i] = 0;
        else moving = true;
      }
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const size = 0.9 + t * 0.5;
    for (let c = 0; c < 4; c++) {
      ctx.fillStyle = palette[c];
      for (let i = 0; i < n; i++) {
        if (tone[i] !== c) continue;
        const dx = tx[i] - zx[i];
        const dy = ty[i] - zy[i];
        // Straight transport plus a bend that vanishes at both ends.
        const x = zx[i] + dx * t - dy * bend[i] * arc + ox[i];
        const y = zy[i] + dy * t + dx * bend[i] * arc + oy[i];
        ctx.fillRect(x, y, size, size);
      }
    }
    if ((moving || pointer) && visible) request();
  }

  function request() {
    if (!frame && visible) frame = requestAnimationFrame(draw);
  }

  // Terminal lines appear one by one, as if typed, then the sampler runs.
  function boot() {
    if (reduce.matches) {
      lines.forEach((l) => l.classList.add("is-on"));
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      lines.forEach((line, i) =>
        setTimeout(
          () => {
            line.classList.add("is-on");
            if (i === lines.length - 1) setTimeout(resolve, 260);
          },
          180 + i * 360,
        ),
      );
    });
  }

  async function start() {
    await document.fonts.ready;
    readPalette();
    if (!build()) return;
    hero.classList.add("is-flowing");
    staticName.hidden = true;
    control.hidden = false;
    setT(0);
    await boot();
    play(0);
  }

  slider.addEventListener("input", () => {
    intro = null;
    setT(Number(slider.value), true);
  });
  control
    .querySelector("[data-flow-resample]")
    .addEventListener("click", () => {
      for (let i = 0; i < n; i++) seedNoise(i);
      play(0);
    });
  screen.addEventListener("pointermove", (e) => {
    if (!finePointer.matches || reduce.matches) return;
    const box = screen.getBoundingClientRect();
    pointer = {
      x: e.clientX - box.left,
      y: e.clientY - box.top,
      at: performance.now(),
    };
    request();
  });
  screen.addEventListener("pointerleave", () => (pointer = null));
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) request();
  }).observe(screen);
  let resizeTimer;
  new ResizeObserver(() => {
    if (!n) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      build(true);
      request();
    }, 120);
  }).observe(screen);
  start();
}
