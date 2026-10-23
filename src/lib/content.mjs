import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import * as cheerio from "cheerio";
import katex from "katex";
const root = process.cwd();
const readJson = async (p) => JSON.parse(await fs.readFile(p, "utf8"));
export const legacy = await readJson("src/data/legacy.json");
legacy.extras = legacy.extras.map((e) => ({
  ...e,
  archive: e.archive || `/archive/pages/${e.key}/`,
}));
const noteMeta = await readJson("src/data/notes.json");
export const curation = await readJson("content/curation.json");
const supplements = await readJson("content/supplements.json");
async function walk(dir) {
  return (
    await Promise.all(
      (await fs.readdir(dir, { withFileTypes: true })).map((e) =>
        e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name),
      ),
    )
  ).flat();
}
const entries = [];
for (const kind of ["notes", "articles"]) {
  const dirs = kind === "notes" ? ["docs/notes", "content/notes"] : ["blog"];
  const files = (await Promise.all(dirs.map(walk))).flat();
  for (const file of files.filter((p) => /\.mdx?$/.test(p))) {
    const dir = dirs.find((d) => file.startsWith(d + "/"));
    if (curation.merges.some((m) => m.file === file)) continue;
    const parsed = matter(await fs.readFile(file, "utf8"));
    const data = parsed.data;
    let content = parsed.content;
    if (data.draft === true) continue;
    const rel = path.relative(dir, file).replace(/\\/g, "/");
    const stem =
      kind === "notes"
        ? data.slug?.replace(/^\/notes\//, "") || rel.replace(/\.md$/, "")
        : rel.split("/")[0].replace(/^\d{4}-\d{2}-\d{2}-/, "");
    const meta = noteMeta.find((n) => n.slug === stem);
    const slug = `${kind}/${data.slug && !data.slug.startsWith("/") ? data.slug : stem}`;
    const supplement = supplements[slug];
    const extra =
      supplement?.links.filter((l) => !content.includes(l.url)) || [];
    if (extra.length)
      content +=
        `\n\n## ${supplement.heading}\n\n` +
        extra.map((l) => `- [${l.label}](${l.url})`).join("\n");
    const date =
      kind === "articles"
        ? String(
            data.date instanceof Date
              ? data.date.toISOString().slice(0, 10)
              : data.date || rel.slice(0, 10),
          ).slice(0, 10)
        : null;
    let plain = content
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/<[^>]*>/g, " ")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[#*_`$>{}|]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const original = legacy.articles.find((a) => a.currentSource === file);
    const commented = (content.match(/<!--[\s\S]*?-->/g) || []).join("").length;
    const legacyHtml =
      original && (plain.length < 10 || commented > content.length * 0.5)
        ? original.html
        : null;
    if (legacyHtml)
      plain = cheerio.load(legacyHtml).text().replace(/\s+/g, " ").trim();
    const summaries = {
      "road-to-flow-matching":
        "从离散的可逆变换，到连续时间流与 Flow Matching，梳理生成模型的演变。",
      cpp: "C++ 类型、语法与常用编程概念的学习记录。",
      "hello-world": "最早的博客起点：Hexo 的写作、生成与发布流程。",
      cuda: "GPU 与 CUDA 编程学习资料，连接并行计算与工程实践。",
      cs440: "UIUC CS 440 人工智能课程的学习记录。",
      rl: "强化学习的概念与学习资料。",
      cs415: "UIUC CS 415 游戏开发课程与项目记录。",
      "391os": "从硬件、中断到进程与文件系统，整理操作系统课程中的关键概念。",
      mdp: "马尔可夫决策过程：状态、动作、奖励与策略。",
      "legacy-acidvsbase": "数据库事务与分布式系统中的两种一致性思路。",
      "cs-skillsets": "计算机科学学习过程中的技能与知识线索。",
      leetcode: "算法与数据结构学习中的题解和方法整理。",
      llm: "大语言模型学习路线与相关资料。",
      markdown: "Markdown 语法、公式与排版示例。",
      "legacy-words": "早期的一篇随笔，保留当时的文字与想法。",
      duolingo: "多邻国英语测试的备考模板与学习资料。",
      toefl: "托福写作、口语任务的备考模板与练习资料。",
      "macos-hexo-github":
        "在 macOS 上搭建 Hexo，并通过 GitHub Pages 发布个人博客的早期记录。",
    };
    entries.push({
      file,
      content,
      legacyHtml,
      searchText: legacyHtml ? plain : content.replace(/<!--[\s\S]*?-->/g, ""),
      slug,
      url: `/writing/${slug}/`,
      kind,
      title: String(data.title || stem),
      topic:
        data.topic ||
        meta?.topic ||
        (Array.isArray(data.tags) ? data.tags[0] : data.category) ||
        "随笔",
      description: meta?.description || summaries[stem] || plain.slice(0, 110),
      plain,
      date,
      minutes: Math.max(
        1,
        Math.ceil(
          (plain.match(/[\u3400-\u9fff]/g) || []).length / 450 +
            plain.replace(/[\u3400-\u9fff]/g, "").split(/\s+/).length / 220,
        ),
      ),
    });
  }
}
export const posts = entries.sort(
  (a, b) =>
    (b.date || "").localeCompare(a.date || "") ||
    a.title.localeCompare(b.title),
);
export const byFile = new Map(posts.map((p) => [path.resolve(p.file), p]));
export const oldRoutes = new Map();
for (const p of posts) {
  if (p.kind === "notes")
    oldRoutes.set(`/docs/notes/${p.slug.slice(6)}/`, p.url);
  else {
    const a = legacy.articles.find((a) => a.currentSource === p.file);
    const old = a?.canonical || `/blog/${p.slug.slice(9)}/`;
    oldRoutes.set(old, p.url);
    if (a) oldRoutes.set(a.oldPath, p.url);
  }
}
for (const [from, to] of [
  ["/notes/", "/writing/?type=notes"],
  ["/blog/", "/writing/?type=articles"],
  ["/plog/", "/life/"],
  ["/plog/singapore-through-my-lens/", "/life/singapore/"],
  ["/resume/", "/about/"],
  ["/docs/intro/", "/writing/?type=notes"],
  ["/projects/fingoat/", "/work/fingoat/"],
  ["/projects/pacc/", "/work/pacc/"],
  ["/projects/probabilistic-imaging/", "/work/probabilistic-imaging/"],
  ["/posts/dpi/", "/writing/notes/algo/dpi/"],
])
  oldRoutes.set(from, to);
for (const merge of curation.merges) {
  const target = posts.find((p) => p.slug === merge.target);
  if (!target) throw new Error(`Missing consolidated entry: ${merge.target}`);
  oldRoutes.set(`/writing/${merge.source}/`, target.url);
  if (merge.source.startsWith("notes/"))
    oldRoutes.set(`/docs/${merge.source}/`, target.url);
  for (const a of legacy.articles.filter(
    (a) => a.currentSource === merge.file,
  )) {
    oldRoutes.set(a.canonical, target.url);
    oldRoutes.set(a.oldPath, target.url);
  }
}
for (const name of ["Go", "Gin", "Auth", "DB", "Redis"])
  oldRoutes.set(
    `/docs/WebDev/${name}/`,
    "/writing/notes/engineering/go-web-resources/",
  );
oldRoutes.set("/docs/WebDev/FinGoat/", "/work/fingoat/");
oldRoutes.set("/docs/cpp/", "/writing/notes/leetcode/C++语法/");
const slash = (s) => (s.endsWith("/") ? s : s + "/");
export function localLink(url, file) {
  if (!url || /^(https?:|mailto:|tel:|data:|#|\/\/)/.test(url)) return url;
  const [pathname, tail = ""] = url.split(/(?=[?#])/);
  if (pathname.startsWith("/"))
    return (oldRoutes.get(slash(pathname)) || pathname) + tail;
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    decoded = pathname;
  }
  const target = path.resolve(path.dirname(file), decoded);
  const post =
    byFile.get(target) ||
    byFile.get(target + ".md") ||
    byFile.get(path.join(target, "index.md"));
  if (post) return post.url + tail;
  if (/\.(mdx?)$/.test(pathname))
    throw new Error(`Unresolved Markdown link ${file}: ${url}`);
  return (
    "/content/" +
    path
      .relative(root, target)
      .split(path.sep)
      .map(encodeURIComponent)
      .join("/") +
    tail
  );
}
const plainText = (node) =>
  node.type === "text"
    ? node.value
    : (node.children || []).map(plainText).join("");
export async function renderPost(post) {
  if (post.legacyHtml) return prepareHtml(post.legacyHtml, post.file);
  let input = post.content;
  const special = /\.mdx$/.test(post.file);
  if (special) {
    const json = await readJson(
      path.join(path.dirname(post.file), "content.json"),
    );
    return prepareHtml(json.html, post.file);
  }
  // Normalize paired display delimiters outside code, without altering expressions.
  input = input
    .split(/(```[\s\S]*?```|`[^`\n]+`)/g)
    .map((part) =>
      part.startsWith("`")
        ? part
        : part.replace(
            /\$\$([\s\S]+?)\$\$/g,
            (_, expression) => `\n\n$$\n${expression.trim()}\n$$\n\n`,
          ),
    )
    .join("");
  input = input
    .replace(/^import .+;?\s*$/gm, "")
    .replace(/<!-- truncate -->/g, "")
    .replace(/^:::[^\n]*\n/gm, "")
    .replace(/^:::$/gm, "");
  const headings = [];
  const ids = new Set();
  function transform() {
    return (tree) => {
      function visit(n) {
        if (n.type === "element") {
          if (/^h[1-6]$/.test(n.tagName)) {
            if (n.tagName === "h1") n.tagName = "h2";
            const text = plainText(n);
            let id =
              text
                .toLowerCase()
                .replace(/[^\p{L}\p{N}\s-]/gu, "")
                .trim()
                .replace(/\s+/g, "-") || "section";
            const base = id;
            let i = 1;
            while (ids.has(id)) id = base + "-" + i++;
            ids.add(id);
            n.properties.id = id;
            if (n.tagName === "h2" || n.tagName === "h3")
              headings.push({ id, text, level: Number(n.tagName.slice(1)) });
          }
          for (const prop of ["href", "src"])
            if (n.properties?.[prop])
              n.properties[prop] = localLink(n.properties[prop], post.file);
        }
        for (const child of n.children || []) visit(child);
      }
      visit(tree);
    };
  }
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(transform)
    .use(rehypeKatex, { throwOnError: false, strict: false })
    .use(rehypeHighlight, { detect: false, ignoreMissing: true })
    .use(rehypeStringify)
    .process(input);
  const prepared = prepareHtml(String(result), post.file);
  return { ...prepared, headings };
}
export function prepareHtml(html, file = "") {
  const $ = cheerio.load(html, null, false);
  $("script,style,iframe,form,input,button,object,embed").remove();
  $("*").each((_, el) => {
    for (const k of Object.keys(el.attribs || {}))
      if (k.startsWith("on")) $(el).removeAttr(k);
  });
  $("h1").each((_, el) => {
    $(el).replaceWith("<h2>" + $(el).html() + "</h2>");
  });
  $("img").attr("loading", "lazy").attr("decoding", "async");
  $("img").each((_, el) => {
    if (!$(el).attr("alt")) $(el).attr("alt", "文章配图");
  });
  $("a[href]").each((_, el) => {
    const href = $(el).attr("href");
    if (/^javascript:/i.test(href)) $(el).removeAttr("href");
    else if (href.startsWith("/"))
      $(el).attr("href", oldRoutes.get(slash(href)) || href);
  });
  $("*")
    .contents()
    .filter(
      (_, node) =>
        node.type === "text" &&
        !$(node).parents("pre,code,style,script,.katex").length,
    )
    .each((_, node) => {
      const text = node.data;
      if (!text || !/\$|\\[([]/.test(text)) return;
      const pattern =
        /\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([^\n]+?)\\\)|\$([^$\n]+?)\$/g;
      let match,
        last = 0;
      const parts = [];
      while ((match = pattern.exec(text))) {
        parts.push($("<span/>").text(text.slice(last, match.index)).html());
        try {
          parts.push(
            katex.renderToString(match[1] || match[2] || match[3] || match[4], {
              displayMode:
                !!(match[1] || match[2]) ||
                /\\tag\b/.test(match[3] || match[4] || ""),
              throwOnError: false,
              strict: false,
            }),
          );
        } catch {
          parts.push($("<span/>").text(match[0]).html());
        }
        last = pattern.lastIndex;
      }
      if (last) {
        parts.push($("<span/>").text(text.slice(last)).html());
        $(node).replaceWith(parts.join(""));
      }
    });
  const headings = [];
  $("h2,h3").each((i, el) => {
    const id = $(el).attr("id") || "section-" + i;
    $(el).attr("id", id);
    headings.push({
      id,
      text: $(el).text(),
      level: Number(el.tagName.slice(1)),
    });
  });
  return { html: $.html(), headings };
}
export function researchPost(slug) {
  const merged = curation.merges.find((m) => m.source === `notes/${slug}`);
  return posts.find((p) => p.slug === (merged?.target || `notes/${slug}`));
}
export const photos = [
  [
    "jewelImage.jpeg",
    "樟宜机场",
    "Jewel Changi Airport",
    "雨漩涡宛若悬自天穹的水晶沙漏，时差与旅途都在此延缓。",
  ],
  ["clarkeQuayImage.jpeg", "克拉码头", "Clarke Quay", ""],
  ["cityHallImage.jpeg", "国会大厦", "Parliament House", ""],
  ["nationalGalleryImage.jpeg", "维多利亚音乐厅", "Victoria Concert Hall", ""],
  ["cliffordPierImage.jpeg", "克利福德码头", "Clifford Pier", ""],
  ["merlionImage.jpeg", "鱼尾狮", "Merlion", ""],
  ["chinatownImage.jpeg", "牛车水", "Chinatown", ""],
  ["floralFantasyImage.jpeg", "滨海湾金沙", "Marina Bay Sands", ""],
  [
    "gardensByBayImage.jpg",
    "滨海湾花园",
    "Gardens by the Bay",
    "超级树在夜里拔地而起，紫蓝色的光谱为旅程落下帷幕。",
  ],
].map(([file, title, english, caption], index) => ({
  file,
  title,
  english,
  caption,
  url: `/media/singapore-${index}.webp`,
}));

// Identical historical editions share the canonical body rather than duplicating it.
export const archiveCanonical = new Map();
for (const a of legacy.articles) {
  const p = posts.find((p) => p.file === a.currentSource);
  if (!p) continue;
  let source = p.legacyHtml;
  if (p.file.endsWith(".mdx"))
    source = (await readJson(path.join(path.dirname(p.file), "content.json")))
      .html;
  if (source && source.trim() === a.html.trim())
    archiveCanonical.set(a.archive, p.url);
}
