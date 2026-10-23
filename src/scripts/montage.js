// Interlude: self-similar structures, each grown from a few lines of math.
// Calm cadence (grow → hold → fade), never a strobe; pauses offscreen.
const montage = document.querySelector("[data-montage]");
if (montage) {
  const canvas = montage.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const indexOut = montage.querySelector("[data-scene-index]");
  const nameOut = montage.querySelector("[data-scene-name]");
  const pauseButton = montage.querySelector("[data-montage-pause]");
  const nextButton = montage.querySelector("[data-montage-next]");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  const GROW = 1500;
  const HOLD = 1700;
  const FADE = 450;
  let w = 0;
  let h = 0;
  let dpr = 1;
  let scene = 0;
  let ops = [];
  let maxOrder = 1;
  let start = 0;
  let paused = reduce.matches;
  let visible = false;
  let frame = 0;
  let ink = "#ece9e0";
  let accent = "#c7c0ee";

  function rng(seed) {
    return () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
  }

  // Generic branching growth: lightning, trees, rivers and vessels differ only in parameters.
  function branch(out, r, x, y, a, len, width, depth, o, order = 0) {
    if (depth <= 0 || len < o.minLen) return;
    let px = x;
    let py = y;
    let ang = a;
    const steps = o.steps;
    for (let s = 0; s < steps; s++) {
      ang += (r() - 0.5) * o.jitter + o.curl;
      // Optional pull toward a heading keeps bolts and rivers on the canvas.
      if (o.pull) ang += (o.toward - ang) * o.pull;
      const nx = px + Math.cos(ang) * (len / steps);
      const ny = py + Math.sin(ang) * (len / steps);
      out.push({ l: [px, py, nx, ny], w: width, o: order + s / steps });
      px = nx;
      py = ny;
    }
    const forks = r() < o.fork ? 2 : 1;
    for (let k = 0; k < forks; k++) {
      const side = forks === 1 ? (r() - 0.5) * 0.3 : k ? 1 : -1;
      branch(
        out,
        r,
        px,
        py,
        ang + side * o.spread * (0.6 + r() * 0.8),
        len * (forks === 1 ? o.carry : o.decay) * (0.85 + r() * 0.3),
        Math.max(0.4, width * o.thin),
        depth - 1,
        o,
        order + 1,
      );
    }
  }

  const scenes = [
    [
      "闪电",
      "Lightning",
      (r) => {
        const out = [];
        branch(
          out,
          r,
          w * (0.45 + r() * 0.1),
          0,
          Math.PI / 2,
          h * 0.11,
          2.6,
          18,
          {
            steps: 5,
            jitter: 0.9,
            curl: 0,
            fork: 0.3,
            spread: 0.7,
            decay: 0.6,
            carry: 1,
            thin: 0.78,
            minLen: 5,
            pull: 0.18,
            toward: Math.PI / 2,
          },
        );
        return out;
      },
    ],
    [
      "河流",
      "River network",
      (r) => {
        const out = [];
        branch(out, r, w * 0.5, h, -Math.PI / 2, h * 0.2, 4, 11, {
          steps: 9,
          jitter: 0.55,
          curl: 0,
          fork: 0.75,
          spread: 0.55,
          decay: 0.72,
          carry: 0.92,
          thin: 0.72,
          minLen: 5,
          pull: 0.04,
          toward: -Math.PI / 2,
        });
        return out;
      },
    ],
    [
      "血管",
      "Blood vessels",
      (r) => {
        const out = [];
        branch(out, r, 0, h * 0.5, 0, w * 0.13, 3.2, 11, {
          steps: 7,
          jitter: 0.22,
          curl: 0,
          fork: 0.8,
          spread: 0.62,
          decay: 0.76,
          carry: 0.9,
          thin: 0.72,
          minLen: 5,
          pull: 0.03,
          toward: 0,
        });
        return out;
      },
    ],
    [
      "叶脉",
      "Leaf venation",
      (r) => {
        const out = [];
        const cx = w * 0.5;
        const top = h * 0.08;
        const bottom = h * 0.94;
        const span = bottom - top;
        const half = (v) =>
          Math.sin(Math.PI * v) * Math.min(w * 0.3, span * 0.38);
        for (let i = 0; i < 60; i++) {
          const v0 = i / 60;
          const v1 = (i + 1) / 60;
          const y0 = bottom - v0 * span;
          const y1 = bottom - v1 * span;
          out.push({ l: [cx, y0, cx, y1], w: 1.8, o: v0 * 3 });
          for (const s of [-1, 1])
            out.push({
              l: [cx + s * half(v0), y0, cx + s * half(v1), y1],
              w: 0.8,
              o: 8 + v0,
            });
        }
        for (let i = 2; i < 17; i++) {
          const v = i / 18;
          for (const s of [-1, 1]) {
            const y = bottom - v * span;
            branch(
              out,
              r,
              cx,
              y,
              -Math.PI / 2 + s * 1.05,
              half(v) * 0.62,
              1.1,
              3,
              {
                // Children shrink fast so each vein stays inside the blade.
                steps: 5,
                jitter: 0.06,
                curl: -s * 0.02,
                fork: 0.6,
                spread: 0.55,
                decay: 0.32,
                carry: 0.3,
                thin: 0.7,
                minLen: 3,
              },
              3 + v * 2,
            );
          }
        }
        return out;
      },
    ],
    [
      "雪花",
      "Snowflake",
      () => {
        const out = [];
        const cx = w / 2;
        const cy = h / 2;
        const R = Math.min(w, h) * 0.42;
        function arm(x, y, a, len, depth, order) {
          const nx = x + Math.cos(a) * len;
          const ny = y + Math.sin(a) * len;
          out.push({ l: [x, y, nx, ny], w: depth + 0.4, o: order });
          if (depth === 0) return;
          for (const f of [0.35, 0.62, 0.85])
            for (const s of [-1, 1])
              arm(
                x + Math.cos(a) * len * f,
                y + Math.sin(a) * len * f,
                a + (s * Math.PI) / 3,
                len * 0.32 * (1 - f * 0.4),
                depth - 1,
                order + 1 + f,
              );
        }
        for (let k = 0; k < 6; k++)
          arm(cx, cy, (k * Math.PI) / 3 - Math.PI / 2, R, 2, 0);
        return out;
      },
    ],
    [
      "二叉树",
      "Binary tree",
      (r) => {
        const out = [];
        function grow(x, y, a, len, depth) {
          const nx = x + Math.cos(a) * len;
          const ny = y + Math.sin(a) * len;
          out.push({
            l: [x, y, nx, ny],
            w: Math.max(0.5, depth * 0.35),
            o: 11 - depth,
          });
          if (depth === 0) return;
          const spread = 0.38 + r() * 0.12;
          grow(nx, ny, a - spread, len * 0.74, depth - 1);
          grow(nx, ny, a + spread, len * 0.74, depth - 1);
        }
        grow(w / 2, h * 0.98, -Math.PI / 2, h * 0.25, 11);
        return out;
      },
    ],
    [
      "星系",
      "Spiral galaxy",
      (r) => {
        const out = [];
        const cx = w / 2;
        const cy = h / 2;
        const R = Math.min(w, h) * 0.6;
        for (let i = 0; i < 9000; i++) {
          const arm = i % 2;
          const d = Math.pow(r(), 0.7);
          const theta = d * 4.2 + arm * Math.PI + (r() - 0.5) * (0.9 - d * 0.5);
          const spread = (r() - 0.5) * 0.18 * R * (1 - d * 0.4);
          const rr = d * R;
          const x = cx + Math.cos(theta) * rr + spread;
          const y = cy + (Math.sin(theta) * rr + spread) * 0.62;
          out.push({
            p: [x, y],
            r: r() < 0.03 ? 1.6 : 0.7,
            o: d * 10,
            a: r() < 0.1,
          });
        }
        // Dense core: a Gaussian bulge drawn first.
        for (let i = 0; i < 1800; i++) {
          const a = r() * Math.PI * 2;
          const d = Math.sqrt(-2 * Math.log(r() || 1e-6)) * R * 0.07;
          out.push({
            p: [cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.62],
            r: 0.9,
            o: 0,
            a: r() < 0.3,
          });
        }
        return out;
      },
    ],
    [
      "DNA 双螺旋",
      "Double helix",
      () => {
        const out = [];
        const cy = h / 2;
        const A = h * 0.24;
        const turns = 3.2;
        for (let i = 0; i <= 900; i++) {
          const u = i / 900;
          const x = w * 0.06 + u * w * 0.88;
          const ph = u * turns * Math.PI * 2;
          for (const s of [0, Math.PI]) {
            const z = Math.cos(ph + s);
            out.push({
              p: [x, cy + Math.sin(ph + s) * A],
              r: 0.9 + z * 0.7,
              o: u * 10,
              a: s > 0,
            });
          }
          if (i % 18 === 0) {
            const y1 = cy + Math.sin(ph) * A;
            const y2 = cy + Math.sin(ph + Math.PI) * A;
            out.push({ l: [x, y1, x, y2], w: 0.6, o: u * 10 });
          }
        }
        return out;
      },
    ],
    [
      "点云地形",
      "Point-cloud terrain",
      (r) => {
        const out = [];
        const waves = Array.from({ length: 6 }, () => [
          r() * 6 + 1,
          r() * 6 + 1,
          r() * 6.28,
          r() * 0.5 + 0.3,
        ]);
        const height = (u, v) =>
          waves.reduce(
            (s, [a, b, c, k]) => s + Math.sin(u * a + v * b + c) * k,
            0,
          ) * Math.exp(-((u - 0.5) ** 2) * 2);
        const rows = 70;
        const cols = 140;
        for (let j = 0; j < rows; j++) {
          const v = j / (rows - 1);
          const depth = 0.35 + v * 0.65;
          for (let i = 0; i < cols; i++) {
            const u = i / (cols - 1);
            const x = w / 2 + (u - 0.5) * w * 1.1 * depth;
            const y = h * 0.25 + v * h * 0.62 - height(u, v) * h * 0.16 * depth;
            out.push({
              p: [x, y],
              r: 0.4 + depth * 0.7,
              o: v * 10,
              a: height(u, v) > 1.1,
            });
          }
        }
        return out;
      },
    ],
  ];

  function readColors() {
    const style = getComputedStyle(montage);
    ink = style.getPropertyValue("--montage-ink").trim() || ink;
    accent = style.getPropertyValue("--montage-accent").trim() || accent;
  }

  function prepare() {
    const box = canvas.getBoundingClientRect();
    w = box.width;
    h = box.height;
    dpr = Math.min(2, devicePixelRatio || 1);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const [name, english, make] = scenes[scene];
    ops = make(rng(17 + scene * 101));
    maxOrder = Math.max(...ops.map((o) => o.o)) || 1;
    indexOut.textContent = `${String(scene + 1).padStart(2, "0")} / ${String(scenes.length).padStart(2, "0")}`;
    nameOut.textContent = `${name} ${english}`;
  }

  function render(progress, alpha) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = alpha;
    ctx.lineCap = "round";
    const limit = progress * (maxOrder + 0.001);
    ctx.strokeStyle = ink;
    for (const op of ops) {
      if (op.o > limit) continue;
      if (op.l) {
        ctx.lineWidth = op.w;
        ctx.beginPath();
        ctx.moveTo(op.l[0], op.l[1]);
        ctx.lineTo(op.l[2], op.l[3]);
        ctx.stroke();
      } else {
        ctx.fillStyle = op.a ? accent : ink;
        ctx.fillRect(op.p[0], op.p[1], op.r * 1.4, op.r * 1.4);
      }
    }
    ctx.globalAlpha = 1;
  }

  function tick(now) {
    frame = 0;
    if (!start) start = now;
    const e = now - start;
    if (e < GROW) render(1 - Math.pow(1 - e / GROW, 2), 1);
    else if (e < GROW + HOLD) render(1, 1);
    else if (e < GROW + HOLD + FADE) render(1, 1 - (e - GROW - HOLD) / FADE);
    else return advance(true);
    if (!paused && visible) frame = requestAnimationFrame(tick);
  }

  function advance(play) {
    scene = (scene + 1) % scenes.length;
    prepare();
    start = 0;
    if (play && !paused && visible) frame = requestAnimationFrame(tick);
    else render(1, 1);
  }

  function setPaused(value) {
    paused = value;
    pauseButton.setAttribute("aria-pressed", String(paused));
    pauseButton.textContent = paused ? "播放" : "暂停";
    if (paused) {
      cancelAnimationFrame(frame);
      frame = 0;
      render(1, 1);
    } else if (visible && !frame) {
      start = 0;
      frame = requestAnimationFrame(tick);
    }
  }

  pauseButton.addEventListener("click", () => setPaused(!paused));
  nextButton.addEventListener("click", () => {
    cancelAnimationFrame(frame);
    frame = 0;
    advance(!paused);
  });
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !paused && !frame) {
      start = 0;
      frame = requestAnimationFrame(tick);
    }
  }).observe(canvas);
  let resizeTimer;
  new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      prepare();
      if (paused) render(1, 1);
    }, 120);
  }).observe(canvas);
  readColors();
  prepare();
  montage.classList.add("is-live");
  pauseButton.hidden = false;
  nextButton.hidden = false;
  setPaused(paused);
  render(paused ? 1 : 0, 1);
}
