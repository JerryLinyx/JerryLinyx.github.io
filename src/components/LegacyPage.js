import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import LegacyContent from "./LegacyContent";
import legacy from "../data/legacy.json";
export default function LegacyPage({ articleKey }) {
  const isCV = articleKey === "cv";
  const article = isCV
    ? {
        title: "CV / 2025",
        html: legacy.cv.html,
        canonical: "/resume/",
        date: "2025",
      }
    : articleKey.startsWith("page:")
      ? legacy.extras.find((a) => a.key === articleKey.slice(5))
      : legacy.articles.find((a) => a.key === articleKey);
  return (
    <Layout
      title={`${article.title} — Archive`}
      description="完整保留的历史内容，整合于 Yuxuan Lin 的个人网站。"
    >
      <main className="legacy-page" id="main-content">
        <Link to="/archive/" className="eyebrow">
          ← ALL ARCHIVES
        </Link>
        <header>
          <span className="eyebrow">
            HISTORICAL EDITION / {article.date || "2024"}
          </span>
          <h1>{article.title}</h1>
          <p>
            这是原站的历史版本，正文与配图已整理保留。
            {isCV
              ? "教育与研究进展请以当前个人资料为准。"
              : "更新后的内容请见正式文章。"}
          </p>
          {article.canonical && !article.canonical.startsWith("/archive/") && (
            <Link to={article.canonical} className="text-link">
              {isCV ? "View current profile" : "Read current edition"} ↗
            </Link>
          )}
        </header>
        <LegacyContent html={article.html} isCV={isCV} />
        <div className="legacy-bottom">
          <Link to="/archive/" className="text-link">
            Back to the archive ↗
          </Link>
        </div>
      </main>
    </Layout>
  );
}
