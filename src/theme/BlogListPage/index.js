import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { HtmlClassNameProvider } from "@docusaurus/theme-common";
import BlogListPaginator from "@theme/BlogListPaginator";
import BlogListPageStructuredData from "@theme/BlogListPage/StructuredData";

export default function BlogListPage({ metadata, items }) {
  const photos = metadata.blogTitle === "Photo log";
  return (
    <HtmlClassNameProvider className="theme-blog-list-page">
      <Layout title={metadata.blogTitle} description={metadata.blogDescription}>
        <BlogListPageStructuredData metadata={metadata} items={items} />
        <main id="main-content" className="journal-index">
          <header className="journal-heading">
            <span className="eyebrow">
              {photos
                ? "AWAY FROM THE KEYBOARD / PHOTO LOG"
                : "FROM THE ARCHIVE / JOURNAL"}
            </span>
            <h1>
              {photos ? "Life, outside" : "Things worth"}
              <br />
              <em>{photos ? "the terminal." : "keeping."}</em>
            </h1>
            <p>
              {photos
                ? "在代码之外，用镜头记录途中的光与日常。"
                : "一些学习记录，一些技术探索。保留当时的问题，也保留理解逐渐发生的过程。"}
            </p>
            <Link to={photos ? "/blog/" : "/notes/"} className="text-link">
              {photos ? "Read the journal" : "Explore the current notebook"} ↗
            </Link>
          </header>
          <div>
            {items.map(({ content: Content }) => {
              const post = Content.metadata;
              const image = Content.assets?.image;
              return (
                <article key={post.permalink} className="journal-entry">
                  <Link to={post.permalink}>
                    {image && (
                      <img
                        src={image}
                        alt={post.title}
                        loading="lazy"
                        className="journal-cover"
                      />
                    )}
                    <div className="journal-entry-meta">
                      <time dateTime={post.date}>{post.date.slice(0, 10)}</time>
                      <span>{post.tags.map((t) => t.label).join(" / ")}</span>
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <span className="text-link">
                      {photos ? "View the story" : "Read entry"} ↗
                    </span>
                  </Link>
                </article>
              );
            })}
          </div>
          <BlogListPaginator metadata={metadata} />
        </main>
      </Layout>
    </HtmlClassNameProvider>
  );
}
