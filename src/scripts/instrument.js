const root = document.querySelector("[data-instrument]");
if (root) {
  const canvas = root.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const pauseButton = root.querySelector("[data-motion-pause]");
    const shapeButtons = [...root.querySelectorAll("[data-shape]")];
    const equation = root.querySelector("[data-field-equation]");
    const name = root.querySelector("[data-field-name]");
    const screen = root.querySelector(".instrument-screen");
    const labels = {
      field: ["r(u,v) → R³", "01 / CONTINUOUS FIELD"],
      branch: ["p → p + Δp", "02 / GROWING STRUCTURE"],
      terrain: ["z = f(x,y)", "03 / SAMPLED TERRAIN"],
    };
    let width = 1,
      height = 1,
      time = 0,
      shape = "field",
      paused = reduce.matches,
      visible = false,
      frame = 0,
      last = 0;
    let aimX = 0,
      aimY = 0,
      viewX = 0,
      viewY = 0;
    let points = [];
    function createPoints() {
      const result = [];
      if (shape === "branch") {
        const grow = (x, y, z, angle, length, depth) => {
          if (depth === 0) return;
          const ex = x + Math.cos(angle) * length,
            ey = y - Math.sin(angle) * length,
            ez = z + Math.sin(depth * 1.8) * length * 0.25;
          for (let i = 0; i < 10; i++) {
            const t = i / 10;
            result.push([
              x + (ex - x) * t,
              y + (ey - y) * t,
              z + (ez - z) * t,
              depth / 8,
            ]);
          }
          grow(ex, ey, ez, angle + 0.43, length * 0.71, depth - 1);
          grow(ex, ey, ez, angle - 0.48, length * 0.72, depth - 1);
        };
        grow(0, 1.05, 0, Math.PI / 2, 0.62, 8);
      } else if (shape === "terrain") {
        for (let y = 0; y < 42; y++)
          for (let x = 0; x < 56; x++) {
            const a = (x / 55 - 0.5) * 2.6,
              b = (y / 41 - 0.5) * 2.6;
            const z =
              Math.sin(a * 3 + b * 1.5) * 0.25 +
              Math.cos(b * 3.5) * 0.18 +
              0.7 * Math.exp(-((a - 0.3) ** 2 + (b + 0.1) ** 2) * 2);
            result.push([a * 0.8, -z + 0.3, b * 0.65, (z + 0.5) / 1.5]);
          }
      } else {
        for (let j = 0; j < 44; j++)
          for (let i = 0; i < 64; i++) {
            const u = (i / 64) * Math.PI * 2,
              v = (j / 44) * Math.PI * 2;
            const r = 0.65 + 0.28 * Math.cos(v);
            result.push([
              r * Math.cos(u),
              r * Math.sin(u),
              0.43 * Math.sin(v) + 0.16 * Math.sin(u * 3),
              j / 44,
            ]);
          }
      }
      points = result;
    }
    function project(p) {
      const ry = 0.35 + time * 0.08 + viewX,
        rx = -0.38 + viewY;
      const x = p[0] * Math.cos(ry) + p[2] * Math.sin(ry),
        z = -p[0] * Math.sin(ry) + p[2] * Math.cos(ry),
        y = p[1] * Math.cos(rx) - z * Math.sin(rx),
        depth = p[1] * Math.sin(rx) + z * Math.cos(rx);
      const scale = 2.8 / (3.3 + depth);
      return [
        width / 2 + x * width * 0.38 * scale,
        height * 0.52 + y * height * 0.4 * scale,
        depth,
      ];
    }
    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "#c6badb12";
      ctx.lineWidth = 0.5;
      for (let y = 38; y < height; y += 28) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      const projected = points
        .map((p) => [...project(p), p[3]])
        .sort((a, b) => b[2] - a[2]);
      for (const p of projected) {
        ctx.globalAlpha = Math.max(0.22, Math.min(1, 0.65 - p[2] * 0.28));
        ctx.fillStyle = p[3] > 0.65 ? "#d3c4ff" : "#aab8b5";
        const radius = p[3] > 0.7 ? 1.1 : 0.7;
        ctx.fillRect(p[0], p[1], radius * 1.5, radius * 1.5);
      }
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "#b5a8cd60";
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(width * 0.5 - 7, height * 0.52);
      ctx.lineTo(width * 0.5 + 7, height * 0.52);
      ctx.moveTo(width * 0.5, height * 0.52 - 7);
      ctx.lineTo(width * 0.5, height * 0.52 + 7);
      ctx.stroke();
      root.dataset.shape = shape;
    }
    function resize() {
      const rect = screen.getBoundingClientRect(),
        d = Math.min(devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * d);
      canvas.height = Math.round(height * d);
      ctx.setTransform(d, 0, 0, d, 0, 0);
      draw();
    }
    function loop(stamp) {
      frame = 0;
      if (paused || !visible || document.hidden) return;
      if (stamp - last > 32) {
        time += Math.min((stamp - last) / 1000, 0.05);
        last = stamp;
        viewX += (aimX - viewX) * 0.065;
        viewY += (aimY - viewY) * 0.065;
        draw();
      }
      frame = requestAnimationFrame(loop);
    }
    function sync() {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      pauseButton.setAttribute("aria-pressed", String(paused));
      pauseButton.textContent = paused ? "播放动效 ▷" : "暂停动效 Ⅱ";
      root.dataset.motion = paused ? "paused" : "playing";
      if (!paused && visible && !document.hidden) {
        last = performance.now();
        frame = requestAnimationFrame(loop);
      }
    }
    createPoints();
    resize();
    root.classList.add("instrument-ready");
    pauseButton.hidden = false;
    root.querySelector(".shape-select").hidden = false;
    pauseButton.addEventListener("click", () => {
      paused = !paused;
      sync();
    });
    shapeButtons.forEach((button) =>
      button.addEventListener("click", () => {
        shape = button.dataset.shape;
        shapeButtons.forEach((b) =>
          b.setAttribute("aria-pressed", String(b === button)),
        );
        equation.textContent = labels[shape][0];
        name.textContent = labels[shape][1];
        createPoints();
        draw();
      }),
    );
    screen.addEventListener("pointermove", (e) => {
      if (paused || reduce.matches) return;
      const r = screen.getBoundingClientRect();
      aimX = (e.clientX - r.left) / r.width - 0.5;
      aimY = ((e.clientY - r.top) / r.height - 0.5) * 0.5;
    });
    screen.addEventListener("pointerleave", () => {
      aimX = 0;
      aimY = 0;
    });
    new ResizeObserver(resize).observe(screen);
    new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    ).observe(root);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", (e) => {
      paused = e.matches;
      sync();
      draw();
    });
  }
}
const revealTargets = document.querySelectorAll("[data-reveal]");
if (
  !matchMedia("(prefers-reduced-motion: reduce)").matches &&
  "IntersectionObserver" in window
) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
    },
    { threshold: 0.08 },
  );
  revealTargets.forEach((el) => {
    el.classList.add("will-reveal");
    observer.observe(el);
  });
}
