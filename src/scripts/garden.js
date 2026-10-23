const menu = document.querySelector(".menu-toggle");
const mobile = document.querySelector(".mobile-nav");
function closeMenu() {
  menu?.setAttribute("aria-expanded", "false");
  menu?.setAttribute("aria-label", "展开导航");
  if (mobile) mobile.hidden = true;
}
menu?.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "收起导航" : "展开导航");
  mobile.hidden = !open;
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu?.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menu.focus();
  }
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".header")) closeMenu();
});
matchMedia("(min-width:761px)").addEventListener("change", (e) => {
  if (e.matches) closeMenu();
});
document.querySelector("[data-backtop]")?.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: matchMedia("(prefers-reduced-motion:reduce)").matches
      ? "instant"
      : "smooth",
  });
});
document
  .querySelector("[data-print]")
  ?.addEventListener("click", () => window.print());
document
  .querySelector("[data-copy-link]")
  ?.addEventListener("click", async (e) => {
    try {
      await navigator.clipboard.writeText(location.href);
      e.target.textContent = "链接已复制 ✓";
    } catch {
      e.target.textContent = "请从地址栏复制链接";
    }
    setTimeout(() => (e.target.textContent = "复制链接 ↗"), 2400);
  });
for (const pre of document.querySelectorAll(".prose pre")) {
  pre.tabIndex = 0;
  const code = pre.querySelector("code");
  if (code && !code.classList.contains("language-mermaid")) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-code";
    button.textContent = "复制代码";
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        button.textContent = "已复制 ✓";
      } catch {
        button.textContent = "请手动选择复制";
      }
      setTimeout(() => (button.textContent = "复制代码"), 2000);
    });
    pre.append(button);
  }
}
for (const el of document.querySelectorAll(
  ".prose table,.prose .katex-display,.prose p>.katex",
)) {
  if (el.scrollWidth > el.clientWidth + 1) el.tabIndex = 0;
}
const progress = document.querySelector(".reading-progress span");
if (progress) {
  const update = () => {
    const end =
      document.querySelector(".reader-end")?.offsetTop ||
      document.body.scrollHeight;
    progress.style.width =
      Math.max(
        0,
        Math.min(
          100,
          (window.scrollY / Math.max(1, end - innerHeight * 0.5)) * 100,
        ),
      ) + "%";
  };
  document.addEventListener("scroll", update, { passive: true });
  update();
  if (innerWidth < 761) {
    const toc = document.querySelector(".toc details");
    if (toc) toc.open = false;
  }
}
const library = document.querySelector("[data-library]");
if (library) {
  const search = library.querySelector("input[type=search]");
  const topic = library.querySelector("select");
  const radios = [...library.querySelectorAll("input[name=type]")];
  const cards = [...library.querySelectorAll("[data-entry]")];
  const count = library.querySelector("[data-result-count]");
  const empty = library.querySelector(".empty-state");
  let index = null;
  let indexPromise;
  const loadIndex = () =>
    (indexPromise ??= fetch("/search-index.json")
      .then((r) => {
        if (!r.ok) throw Error("Search unavailable");
        return r.json();
      })
      .then(
        (data) =>
          (index = new Map(
            data.map((p) => [
              p.slug,
              `${p.title} ${p.plain} ${p.topic}`.toLocaleLowerCase(),
            ]),
          )),
      ));
  function restore() {
    const params = new URLSearchParams(location.search);
    search.value = params.get("q") || "";
    topic.value = params.get("topic") || "";
    const type = params.get("type") || "all";
    radios.forEach((r) => (r.checked = r.value === type));
    if (!radios.some((r) => r.checked)) radios[0].checked = true;
  }
  let revision = 0;
  async function update(write = true) {
    const current = ++revision;
    const q = search.value.trim().toLocaleLowerCase();
    const type = radios.find((r) => r.checked).value;
    const selected = topic.value;
    let failed = false;
    if (q && !index)
      try {
        await loadIndex();
      } catch {
        failed = true;
      }
    if (current !== revision) return;
    let total = 0;
    const words = q.split(/\s+/).filter(Boolean);
    for (const card of cards) {
      const hay =
        index?.get(card.dataset.entry) || card.textContent.toLocaleLowerCase();
      const visible =
        (type === "all" || card.dataset.type === type) &&
        (!selected || card.dataset.topic === selected) &&
        words.every((w) => hay.includes(w));
      card.hidden = !visible;
      if (visible) total++;
    }
    count.textContent = `找到 ${total} 篇文字${failed ? "（全文暂不可用，当前按标题与摘要搜索）" : ""}`;
    empty.hidden = total > 0;
    if (write) {
      const params = new URLSearchParams();
      if (q) params.set("q", search.value.trim());
      if (type !== "all") params.set("type", type);
      if (selected) params.set("topic", selected);
      history.replaceState(
        null,
        "",
        location.pathname + (params.size ? "?" + params : ""),
      );
    }
  }
  restore();
  update(false);
  let timer;
  search.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(update, 90);
  });
  topic.addEventListener("change", () => update());
  radios.forEach((r) => r.addEventListener("change", () => update()));
  library.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    update();
  });
  library.querySelector("[data-clear-search]").addEventListener("click", () => {
    search.value = "";
    topic.value = "";
    radios[0].checked = true;
    update();
    search.focus();
  });
  window.addEventListener("popstate", () => {
    restore();
    update(false);
  });
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "/" &&
      !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)
    ) {
      e.preventDefault();
      search.focus();
    }
  });
}
const dialog = document.querySelector(".lightbox");
if (dialog) {
  const photos = [...document.querySelectorAll("[data-photo]")];
  let current = 0;
  let opener = null;
  function show(i) {
    current = (i + photos.length) % photos.length;
    const p = photos[current];
    const image = dialog.querySelector("img");
    image.src = p.dataset.src;
    image.alt = p.dataset.caption;
    dialog.querySelector("figcaption").textContent = p.dataset.caption;
    dialog.querySelector(".lightbox-count").textContent =
      String(current + 1).padStart(2, "0") +
      " / " +
      String(photos.length).padStart(2, "0");
  }
  photos.forEach((p, i) =>
    p.addEventListener("click", () => {
      opener = p;
      show(i);
      dialog.showModal();
      document.body.style.overflow = "hidden";
    }),
  );
  dialog
    .querySelector(".lightbox-close")
    .addEventListener("click", () => dialog.close());
  dialog
    .querySelector(".lightbox-prev")
    .addEventListener("click", () => show(current - 1));
  dialog
    .querySelector(".lightbox-next")
    .addEventListener("click", () => show(current + 1));
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      show(current - 1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      show(current + 1);
    }
  });
  dialog.addEventListener("close", () => {
    document.body.style.overflow = "";
    opener?.focus();
  });
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
}
const diagrams = [...document.querySelectorAll("pre>code.language-mermaid")];
if (diagrams.length) {
  import("mermaid")
    .then(async ({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        themeVariables: {
          primaryColor: "#e9ece2",
          primaryTextColor: "#263e33",
          primaryBorderColor: "#72856b",
          lineColor: "#72856b",
          fontFamily: "sans-serif",
        },
        suppressErrorRendering: true,
      });
      for (const [i, code] of diagrams.entries()) {
        const pre = code.parentElement;
        try {
          const { svg } = await mermaid.render(
            "garden-diagram-" + i,
            code.textContent,
          );
          const wrap = document.createElement("div");
          wrap.className = "mermaid-wrap";
          wrap.innerHTML = svg;
          const details = document.createElement("details");
          const summary = document.createElement("summary");
          summary.textContent = "查看图表源代码";
          details.append(summary, pre.cloneNode(true));
          wrap.append(details);
          pre.replaceWith(wrap);
        } catch {
          const note = document.createElement("p");
          note.className = "notice";
          note.textContent = "图表以可阅读的源代码显示。";
          pre.before(note);
        }
      }
    })
    .catch(() => {
      for (const code of diagrams)
        code.parentElement.setAttribute("aria-label", "图表源代码");
    });
}
