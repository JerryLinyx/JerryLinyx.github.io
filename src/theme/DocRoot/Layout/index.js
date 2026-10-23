import React, { useEffect, useRef } from "react";
import { useDocsSidebar } from "@docusaurus/plugin-content-docs/client";
import { useLocation } from "@docusaurus/router";
import Link from "@docusaurus/Link";
import DocSidebarItems from "@theme/DocSidebarItems";
import DocRootLayoutMain from "@theme/DocRoot/Layout/Main";
import BackToTopButton from "@theme/BackToTopButton";

export default function DocRootLayout({ children }) {
  const sidebar = useDocsSidebar();
  const { pathname } = useLocation();
  const mobile = useRef(null);
  useEffect(() => {
    if (mobile.current) mobile.current.open = false;
  }, [pathname]);
  const items = () => (
    <ul className="menu__list">
      <DocSidebarItems
        items={sidebar.items}
        activePath={pathname}
        level={1}
        onItemClick={() => {
          if (mobile.current) mobile.current.open = false;
        }}
      />
    </ul>
  );
  return (
    <div className="site-doc-wrapper">
      <BackToTopButton />
      <div className="site-doc-layout">
        {sidebar && (
          <aside className="notebook-sidebar-container">
            <nav
              aria-label="笔记章节导航"
              className="notebook-sidebar-desktop menu"
            >
              <Link to="/notes/" className="notebook-search-link">
                ⌕ Search the notebook ↗
              </Link>
              {items()}
            </nav>
            <details ref={mobile} className="notebook-sidebar-mobile">
              <summary>
                Contents / 笔记目录 <span aria-hidden="true">+</span>
              </summary>
              <nav aria-label="手机端笔记章节导航" className="menu">
                <Link to="/notes/" className="notebook-search-link">
                  ⌕ 搜索笔记 ↗
                </Link>
                {items()}
              </nav>
            </details>
          </aside>
        )}
        <DocRootLayoutMain hiddenSidebarContainer={false}>
          {children}
        </DocRootLayoutMain>
      </div>
    </div>
  );
}
