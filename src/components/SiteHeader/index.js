import React, { useEffect, useState } from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);
  useEffect(() => {
    const escape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);
  return (
    <header id="top" className="navbar site-header">
      <Link to="/" className="wordmark" aria-label="Yuxuan Lin 首页">
        <span className="monogram">
          yl<span>.</span>
        </span>
        <span>
          YUXUAN LIN<span className="wordmark-sub">ENGINEER & EXPLORER</span>
        </span>
      </Link>
      <button
        className="menu-toggle"
        aria-label={open ? "关闭导航" : "打开导航"}
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close −" : "Menu +"}
      </button>
      <nav
        id="site-nav"
        aria-label="主导航"
        className={open ? "site-nav is-open" : "site-nav"}
      >
        <Link to="/#work" onClick={() => setOpen(false)}>
          Work<span>01</span>
        </Link>
        <Link
          to="/notes/"
          aria-current={
            location.pathname.includes("/notes") ? "page" : undefined
          }
        >
          Notes<span>02</span>
        </Link>
        <Link to="/#about" onClick={() => setOpen(false)}>
          About<span>03</span>
        </Link>
        <a href="mailto:yl6061@columbia.edu" className="nav-contact">
          Let’s talk <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
