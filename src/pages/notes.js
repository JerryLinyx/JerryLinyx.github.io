import React, { useEffect, useMemo, useRef, useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import notes from "../data/notes.json";
import styles from "./notes.module.css";
const topics = ["All notes", ...new Set(notes.map((n) => n.topic))];
export default function Notes() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All notes");
  const search = useRef(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") || "");
    if (topics.includes(params.get("topic"))) setTopic(params.get("topic"));
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        search.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const update = (q, t) => {
    setQuery(q);
    setTopic(t);
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (t !== "All notes") params.set("topic", t);
    window.history.replaceState(
      null,
      "",
      window.location.pathname + (params.size ? "?" + params : ""),
    );
  };
  const filtered = useMemo(
    () =>
      notes.filter(
        (n) =>
          (topic === "All notes" || topic === n.topic) &&
          query
            .toLowerCase()
            .trim()
            .split(/\s+/)
            .every((term) =>
              (n.title + " " + n.topic + " " + n.search)
                .toLowerCase()
                .includes(term),
            ),
      ),
    [query, topic],
  );
  return (
    <Layout
      title="Notebook — Learning in public"
      description="林煜轩的公开技术笔记：GPU 编程、分布式训练、生成式模型与 AI 应用。支持全文检索与主题筛选。"
    >
      <main className={styles.page} id="main-content">
        <div className={styles.intro}>
          <span className="eyebrow">
            THE OPEN NOTEBOOK / {notes.length} ENTRIES
          </span>
          <h1>
            Understanding,
            <br />
            <em>one note at a time.</em>
          </h1>
          <p>
            在代码和论文之间，留下思考的轨迹。
            <br />
            中文技术手记，关于算法、系统和构建它们的过程。
          </p>
        </div>
        <div className={styles.tools}>
          <label className={styles.search}>
            <span aria-hidden="true">⌕</span>
            <span className="sr-only">搜索笔记全文</span>
            <input
              ref={search}
              type="search"
              placeholder="Search ideas, concepts, questions…"
              value={query}
              onChange={(e) => update(e.target.value, topic)}
            />
            <kbd>⌘ / Ctrl K</kbd>
          </label>
          <div className={styles.filters} role="group" aria-label="按主题筛选">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => update(query, t)}
                aria-pressed={topic === t}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.resultsMeta}>
          <span role="status" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "NOTE" : "NOTES"}
            {query ? ` MATCHING “${query}”` : ""}
          </span>
          <Link to="/docs/intro">阅读地图 ↗</Link>
        </div>
        <div className={styles.list}>
          {filtered.map((n, i) => (
            <Link
              to={`/docs/notes/${n.slug}/`}
              className={styles.note}
              key={n.slug}
            >
              <span className={styles.number}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <span className="eyebrow">{n.topic}</span>
                <h2>{n.title}</h2>
                <p>{n.description}</p>
              </div>
              <span className={styles.time}>{n.minutes} MIN READ</span>
              <span className={styles.arrow} aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
        {!filtered.length && (
          <div className={styles.empty}>
            <h2>No notes found.</h2>
            <p>试试 CUDA、Flow、并行，或切换到全部主题。</p>
            <button
              className="pill-button"
              onClick={() => update("", "All notes")}
            >
              Clear filters ↗
            </button>
          </div>
        )}
        <div className={styles.archive}>
          <span>LOOKING FOR SOMETHING ELSE?</span>
          <Link to="/blog/">Journal / 历史文章 ↗</Link>
          <Link to="/docs/intro">Engineering archive / 工程记录 ↗</Link>
        </div>
      </main>
    </Layout>
  );
}
