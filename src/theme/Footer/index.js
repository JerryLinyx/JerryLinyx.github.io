import React from "react";
import Link from "@docusaurus/Link";
export default function Footer() {
  return (
    <footer className="site-footer">
      <Link to="/" className="footer-name">
        Yuxuan Lin <span>林煜轩</span>
      </Link>
      <p>Always learning. Always building.</p>
      <div>
        <a href="https://github.com/JerryLinyx">GitHub ↗</a>
        <a href="https://www.linkedin.com/in/yuxuan0/">LinkedIn ↗</a>
        <Link to="/blog/">Journal ↗</Link>
        <Link to="/plog/">Photo log ↗</Link>
        <Link to="/archive/">Archive ↗</Link>
        <a href="#top" aria-label="回到顶部">
          ↑ Top
        </a>
      </div>
      <small>© {new Date().getFullYear()} Yuxuan Lin</small>
    </footer>
  );
}
