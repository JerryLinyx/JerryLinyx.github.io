import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import useBrokenLinks from "@docusaurus/useBrokenLinks";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import FlowField from "../components/FlowField";
import { projects, experience, profile } from "../data/portfolio";
import styles from "./index.module.css";

const Arrow = () => <span aria-hidden="true">↗</span>;
export default function Home() {
  const brokenLinks = useBrokenLinks();
  ["work", "about"].forEach((id) => brokenLinks.collectAnchor(id));
  const petImage = useBaseUrl("index/PET.png");
  const portraitImage = useBaseUrl("index/yuxuanlin.jpeg");
  return (
    <Layout
      title="Yuxuan Lin — AI & Systems"
      description="林煜轩 Yuxuan Lin，Columbia 计算机工程硕士。探索 AI 应用、分布式系统与生成式模型。项目、研究和技术手记。"
    >
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Yuxuan Lin",
            alternateName: ["林煜轩", "JerryLinyx"],
            url: "https://jerrylinyx.github.io/",
            sameAs: [profile.github, profile.linkedin],
            knowsAbout: [
              "AI applications",
              "Distributed systems",
              "Generative models",
            ],
            alumniOf: [
              { "@type": "CollegeOrUniversity", name: "Zhejiang University" },
              {
                "@type": "CollegeOrUniversity",
                name: "University of Illinois Urbana-Champaign",
              },
            ],
          })}
        </script>
      </Head>
      <main id="main-content" className={styles.home}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroIntro}>
            <span className="eyebrow">
              <i className="status-dot" /> AI APPLICATIONS · SYSTEMS · RESEARCH
            </span>
            <h1 id="hero-title">
              Thinking in
              <br />
              <em>systems.</em>
              <br />
              Building with AI<span className={styles.period}>.</span>
            </h1>
            <p className={styles.heroBio}>
              Hi, I’m Yuxuan. <span>林煜轩</span>
              <br />
              在模型与系统之间，
              <br className={styles.mobileBreak} />
              把好奇心变成能运行的作品。
            </p>
            <div className={styles.heroActions}>
              <a className="pill-button" href="#work">
                Explore my work <span>↘</span>
              </a>
              <Link className="text-link" to="/notes/">
                Read my notes <Arrow />
              </Link>
            </div>
          </div>
          <div className={styles.heroArt}>
            <FlowField />
          </div>
          <div className={styles.heroBottom}>
            <span>COMPUTER ENGINEERING @ COLUMBIA</span>
            <span>
              NEW YORK, US <span aria-hidden="true">↙</span> ALWAYS EXPLORING
            </span>
            <a href="#work">SCROLL TO DISCOVER ↓</a>
          </div>
        </section>
        <section id="work" className={styles.work} aria-labelledby="work-title">
          <div className="section-heading">
            <span className="eyebrow">01 / SELECTED WORK</span>
            <h2 id="work-title">
              Ideas, made <em>real.</em>
            </h2>
            <p>
              从 AI 应用到计算底层。
              <br />
              一些认真探索，也认真实现的事情。
            </p>
          </div>
          <div className={styles.projectGrid}>
            {projects.map((p) => (
              <Link
                key={p.slug}
                to={`/projects/${p.slug}/`}
                className={`${styles.project} ${styles[p.slug] || ""}`}
              >
                <div className={styles.projectVisual}>
                  <span className={styles.projectNumber}>/{p.number}</span>
                  {p.slug === "fingoat" ? (
                    <div className={styles.agentGraphic} aria-hidden="true">
                      <div className={styles.agentLabel}>
                        FINANCIAL INTELLIGENCE / IN PARALLEL
                      </div>
                      <div className={styles.graphNodes}>
                        <span>
                          MARKET
                          <br />
                          <small>signals</small>
                        </span>
                        <span>
                          RESEARCH
                          <br />
                          <small>context</small>
                        </span>
                        <span>
                          RISK
                          <br />
                          <small>analysis</small>
                        </span>
                      </div>
                      <div className={styles.graphLine} />
                      <div className={styles.graphDecision}>
                        ONE TRACEABLE DECISION <span>↗</span>
                      </div>
                      <div className={styles.graphCaption}>
                        01 INPUT → 02 REASON → 03 SYNTHESIZE
                      </div>
                    </div>
                  ) : p.slug === "pacc" ? (
                    <div className={styles.traceGraphic} aria-hidden="true">
                      <span className={styles.traceTitle}>
                        A SYSTEM, IN TRACES.
                      </span>
                      {Array.from({ length: 6 }, (_, i) => (
                        <div key={i} className={styles.traceRow}>
                          <small>GPU 0{i}</small>
                          {Array.from({ length: 9 }, (_, j) => (
                            <i
                              key={j}
                              style={{
                                width: `${12 + ((i * 7 + j * 13) % 42)}px`,
                                opacity: 0.35 + ((i + j) % 4) * 0.2,
                              }}
                            />
                          ))}
                        </div>
                      ))}
                      <span className={styles.graphCaption}>
                        COMPUTE / COMMUNICATE / UNDERSTAND
                      </span>
                    </div>
                  ) : (
                    <img
                      src={petImage}
                      alt="PET 研究重建结果示意"
                      loading="lazy"
                      width="902"
                      height="847"
                    />
                  )}
                  <span className={styles.projectOpen} aria-label="查看项目">
                    ↗
                  </span>
                </div>
                <div className={styles.projectMeta}>
                  <span>{p.category}</span>
                  <span>{p.year}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.subtitle}</p>
                <div className={styles.tags}>
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.moreWork}>
            <span>ALSO IN THE WORKSHOP</span>
            <a href="https://github.com/JerryLinyx/LeNet-CUDA-ECE408">
              CUDA kernel optimization <Arrow />
            </a>
            <a href="https://github.com/JerryLinyx/Linux-OS-Kernel-ECE391/tree/main/mp3">
              A small operating system <Arrow />
            </a>
            <a href="https://github.com/JerryLinyx/AID3-Blender-Plugin">
              Generative 3D tools <Arrow />
            </a>
          </div>
        </section>
        <section className={styles.research} aria-labelledby="research-title">
          <div>
            <span className="eyebrow">RESEARCH / IEEE ISBI 2026</span>
            <h2 id="research-title">
              Beyond the image.
              <br />
              <em>Into uncertainty.</em>
            </h2>
            <p>
              重建图像，也理解图像背后的不确定性。
              <br />
              探索生成式模型在医学成像中的可能。
            </p>
            <a
              className="text-link"
              href="https://ieeexplore.ieee.org/abstract/document/11515791"
            >
              Read the publication <Arrow />
            </a>
          </div>
          <div className={styles.paper}>
            <span className={styles.paperBadge}>PUBLISHED RESEARCH</span>
            <p className={styles.paperTitle}>
              Bayesian PET Reconstruction with Learned Normalizing Flow Priors
            </p>
            <p>
              Hengjia Ran · <strong>Yuxuan Lin</strong> · Huafeng Liu · Bo Zhao
            </p>
            <div>
              IEEE International Symposium on Biomedical Imaging
              <span>08–11 APR 2026 / SECOND AUTHOR</span>
            </div>
          </div>
        </section>
        <section className={styles.notes} aria-labelledby="notes-title">
          <div className="section-heading">
            <span className="eyebrow">02 / FIELD NOTES</span>
            <h2 id="notes-title">
              Learning, <em>in public.</em>
            </h2>
            <p>
              把理解写下来，把问题留给下一次探索。
              <br />
              AI 算法、系统工程与那些值得追问的细节。
            </p>
          </div>
          <div className={styles.noteRows}>
            {[
              [
                "01",
                "SYSTEMS",
                "CUDA：从线程到吞吐",
                "GPU programming / performance",
                "/docs/notes/hpc/cuda",
              ],
              [
                "02",
                "TRAINING",
                "分布式训练的并行与通信",
                "FSDP / tensor parallelism / collective communication",
                "/docs/notes/training/distributed-training",
              ],
              [
                "03",
                "GENERATIVE MODELS",
                "从归一化流走向 Flow Matching",
                "Probability / continuous transformations",
                "/docs/notes/algo/flow-matching",
              ],
            ].map(([n, tag, title, sub, url]) => (
              <Link key={n} to={url} className={styles.noteRow}>
                <span className={styles.noteNumber}>{n}</span>
                <span className={styles.noteCategory}>{tag}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{sub}</p>
                </div>
                <Arrow />
              </Link>
            ))}
          </div>
          <Link to="/notes/" className="text-link">
            Browse the notebook <Arrow />
          </Link>
        </section>
        <section
          id="about"
          className={styles.about}
          aria-labelledby="about-title"
        >
          <div className={styles.aboutIntro}>
            <span className="eyebrow">03 / THE PERSON BEHIND THE CODE</span>
            <h2 id="about-title">
              Curiosity is
              <br />
              the <em>constant.</em>
            </h2>
            <div className={styles.portrait}>
              <img
                src={portraitImage}
                width="1141"
                height="1141"
                loading="lazy"
                alt="林煜轩 Yuxuan Lin"
              />
              <span>
                YUXUAN LIN / 林煜轩
                <br />
                ENGINEER. RESEARCHER. LIFELONG LEARNER.
              </span>
            </div>
            <p>
              我喜欢理解一件事如何工作，也喜欢把它做出来。从嵌入式机器人、GPU
              计算到多智能体应用，关注的始终是模型如何进入真实世界。
            </p>
            <Link to="/resume/" className="text-link">
              View full profile <Arrow />
            </Link>
          </div>
          <div className={styles.aboutDetails}>
            <div className={styles.education}>
              <span className="eyebrow">EDUCATION</span>
              <h3>Columbia University</h3>
              <p>
                M.S. in Computer Engineering
                <br />
                预计 2027 年 2 月毕业 · MS Honors 2026
              </p>
              <h3>Zhejiang University × UIUC</h3>
              <p>
                B.Eng. in Electronic & Computer Engineering
                <br />
                B.S. in Computer Engineering · 双学位项目
              </p>
            </div>
            <span className="eyebrow">EXPERIENCE</span>
            {experience.map((e) => (
              <article key={e.company} className={styles.experience}>
                <span>{e.date}</span>
                <h3>{e.company}</h3>
                <p className={styles.role}>{e.role}</p>
                <p>{e.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section className={styles.contact} aria-labelledby="contact-title">
          <span className="eyebrow">GOOD THINGS START WITH A CONVERSATION</span>
          <h2 id="contact-title">
            Let’s build
            <br />
            <em>what’s next.</em>
            <a
              href={`mailto:${profile.email}`}
              aria-label="发送邮件给 Yuxuan Lin"
            >
              ↗
            </a>
          </h2>
          <div>
            <p>聊聊 AI、系统，或一个尚未成形的想法。</p>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
        </section>
      </main>
    </Layout>
  );
}
