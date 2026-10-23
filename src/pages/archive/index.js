import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import legacy from "../../data/legacy.json";
export default function Archive() {
  return (
    <Layout
      title="Archive — Everything connected"
      description="旧博客、CV 与技术手记的统一归档。所有内容回到同一个个人网站。"
    >
      <main className="archive-page" id="main-content">
        <header className="archive-heading">
          <span className="eyebrow">ONE HOME / MANY EXPLORATIONS</span>
          <h1>
            Nothing lost.
            <br />
            <em>Everything connected.</em>
          </h1>
          <p>
            旧博客、研究记录与曾经的自己，都在这里。
            <br />
            从不同的起点，回到同一个地方。
          </p>
          <div className="archive-counts">
            <span>
              <strong>17</strong> ORIGINAL ARTICLES
            </span>
            <span>
              <strong>3</strong> SITES, ONE HOME
            </span>
            <span>
              <strong>2024 —</strong> STILL LEARNING
            </span>
          </div>
        </header>
        <section className="archive-intro">
          <span className="eyebrow">01 / PEOPLE & PROGRESS</span>
          <div>
            <h2>不同版本，同一个我。</h2>
            <p>
              当前经历整合在个人资料中；旧版学术主页完整留存，记录当时的项目、课程与研究起点。
            </p>
            <div className="archive-actions">
              <Link to="/resume/" className="pill-button">
                Current profile ↗
              </Link>
              <Link to="/archive/cv/" className="text-link">
                CV / 2025 edition ↗
              </Link>
              <Link to="/docs/notes/algo/dpi" className="text-link">
                Hugo / DPI note ↗
              </Link>
            </div>
          </div>
        </section>
        <section>
          <div className="section-heading">
            <span className="eyebrow">02 / THE ORIGINAL JOURNAL</span>
            <h2>
              From the <em>beginning.</em>
            </h2>
            <p>阅读整理后的版本，或回看原文。</p>
          </div>
          <div className="archive-rows">
            {legacy.articles.map((a) => (
              <article key={a.key}>
                <time dateTime={a.date}>{a.date}</time>
                <Link to={a.canonical}>
                  <h3>{a.title}</h3>
                  <span>Read entry ↗</span>
                </Link>
                <Link to={a.archive} className="archive-original">
                  Original ↗
                </Link>
              </article>
            ))}
          </div>
        </section>
        <section className="archive-extras">
          <span className="eyebrow">03 / AROUND THE EDGES</span>
          <h2>Beyond the posts.</h2>
          <p>旧站的友链页面也保留为历史记录。</p>
          <div>
            {legacy.extras.map((a) => (
              <Link key={a.key} to={a.canonical}>
                {a.title} ↗
              </Link>
            ))}
          </div>
        </section>
        <aside className="archive-provenance">
          <span className="eyebrow">A CONTINUOUS HISTORY</span>
          <p>
            新网站统一承载原博客、Doc 与 CV
            的内容。旧地址会跳转到对应新页面，原始版本与完整 Git
            历史保存在同一个网站仓库中。
          </p>
          <a href="https://github.com/JerryLinyx/JerryLinyx.github.io">
            View the source ↗
          </a>
        </aside>
      </main>
    </Layout>
  );
}
