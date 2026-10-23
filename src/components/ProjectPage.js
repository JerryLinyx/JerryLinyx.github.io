import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { projects } from "../data/portfolio";
import styles from "./ProjectPage.module.css";
export default function ProjectPage({ slug }) {
  const project = projects.find((p) => p.slug === slug);
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const image = useBaseUrl(project.image);
  return (
    <Layout
      title={`${project.title} — Selected work`}
      description={project.description}
    >
      <main className={styles.page} id="main-content">
        <Link to="/#work" className={styles.back}>
          ← ALL SELECTED WORK
        </Link>
        <div className={styles.heading}>
          <span className="eyebrow">
            PROJECT / {project.number} — {project.category}
          </span>
          <h1>
            {project.title}
            <span>↗</span>
          </h1>
          <p>{project.subtitle}</p>
          <div className={styles.meta}>
            <div>
              <span>FOCUS</span>
              {project.tags.join(" / ")}
            </div>
            <div>
              <span>PERIOD</span>
              {project.year}
            </div>
            <a href={project.repo} className="text-link">
              View source on GitHub <span>↗</span>
            </a>
          </div>
        </div>
        <figure className={styles.image}>
          <img src={image} width="1200" height="700" alt={project.imageAlt} />
          <figcaption>PROJECT ARTIFACT / {project.imageAlt}</figcaption>
        </figure>
        <div className={styles.content}>
          <aside>
            <span className="eyebrow">THE RESULT</span>
            <strong>{project.metric}</strong>
            <p>{project.metricLabel}</p>
            {project.paper && (
              <a className="text-link" href={project.paper}>
                Read paper ↗
              </a>
            )}
          </aside>
          <div>
            <section>
              <span className="eyebrow">01 / CONTEXT</span>
              <h2>从一个真实问题开始。</h2>
              <p>{project.context}</p>
            </section>
            <section>
              <span className="eyebrow">02 / ENGINEERING</span>
              <h2>关键的工程选择。</h2>
              {project.decisions.map(([title, text]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </section>
            <section>
              <span className="eyebrow">03 / REFLECTION</span>
              <h2>结果与边界。</h2>
              <p>{project.outcome}</p>
              <p className={styles.sourceNote}>
                项目介绍根据个人简历与原站项目记录整理，源码以 GitHub 仓库为准。
              </p>
              <Link to={project.related} className="text-link">
                Related notebook ↗
              </Link>
            </section>
          </div>
        </div>
        <Link to={`/projects/${next.slug}/`} className={styles.next}>
          <span className="eyebrow">NEXT EXPLORATION</span>
          <strong>{next.title}</strong>
          <span aria-hidden="true">↗</span>
        </Link>
      </main>
    </Layout>
  );
}
