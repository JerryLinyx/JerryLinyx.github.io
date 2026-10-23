import React, { useEffect, useRef } from "react";
import renderMathInElement from "katex/contrib/auto-render";

export default function LegacyContent({ html, isCV = false }) {
  const root = useRef(null);
  useEffect(() => {
    if (!root.current) return;
    renderMathInElement(root.current, {
      throwOnError: false,
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\[", right: "\\]", display: true },
        { left: "\\(", right: "\\)", display: false },
        { left: "$", right: "$", display: false },
      ],
    });
    const markScrollers = () => {
      root.current
        ?.querySelectorAll("table,pre,.katex-display,.katex")
        .forEach((el) => {
          if (
            el.tagName === "TABLE" ||
            el.classList.contains("katex-display") ||
            el.scrollWidth > el.clientWidth
          )
            el.tabIndex = 0;
          else el.removeAttribute("tabindex");
        });
    };
    const onResize = () => requestAnimationFrame(markScrollers);
    markScrollers();
    document.fonts.ready.then(markScrollers);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [html]);
  return (
    <div
      ref={root}
      className={`markdown legacy-content ${isCV ? "legacy-cv" : ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
