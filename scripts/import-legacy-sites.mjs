import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import * as cheerio from "cheerio";
import prettier from "prettier";
const root = path.resolve(process.argv[2] || ".migration/sources/root");
const cv = path.resolve(process.argv[3] || ".migration/sources/cv");
const sourceRepos = {
  root: "02bf148fbd796f750e9f9ee55649f34f4d708354",
  cv: "7a363a505c22d2b1488c913355d3285043c9f462",
  doc: "111c83de34dc0c1ee3bacb2d610d444aa2806aeb",
};
const matches = {
  Toefl: "2024-04-18-toefl",
  Duolingo: "2024-04-18-duolingo",
  "hello-world": "2024-05-15-hello-world",
  "macos-hexo-github": "2024-04-18-macos-hexo-github",
  "CS-skillsets": "2024-04-21-cs-skillsets",
  llm: "2024-04-21-llm",
  leetcode: "2024-04-21-leetcode",
  markdown: "2024-04-21-markdown",
  "391os": "2024-04-23-391os",
  mdp: "2024-04-23-mdp",
  cs415: "2024-04-29-cs415",
  RL: "2024-04-30-rl",
  cs440: "2024-05-02-cs440",
  cuda: "2024-05-09-cuda",
  cpp: "2024-05-25-cpp",
};
async function walk(dir) {
  return (
    await Promise.all(
      (await fs.readdir(dir, { withFileTypes: true })).map((e) =>
        e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name),
      ),
    )
  ).flat();
}
const articles = [],
  redirects = [],
  assetMap = new Map(),
  warnings = [];
function localURL(value, source) {
  if (!value || /^(data:|mailto:|tel:|#)/.test(value)) return null;
  try {
    const url = new URL(
      value,
      source === "cv"
        ? "https://jerrylinyx.github.io/CV/"
        : "https://jerrylinyx.github.io/",
    );
    if (
      !["jerrylinyx.github.io", "l10yx.github.io"].includes(
        url.hostname.toLowerCase(),
      )
    )
      return null;
    let relative = decodeURIComponent(url.pathname).replace(/^\//, "");
    if (source === "cv") relative = relative.replace(/^CV\//, "");
    return { relative, hash: url.hash, search: url.search };
  } catch {
    return null;
  }
}
async function asset(value, source, relativePage) {
  const local = localURL(value, source);
  if (!local) return value;
  const sourceRoot = source === "cv" ? cv : root;
  const target = path.resolve(sourceRoot, local.relative);
  if (!target.startsWith(sourceRoot + path.sep)) return value;
  try {
    if (!(await fs.stat(target)).isFile()) return value;
  } catch {
    warnings.push({ page: relativePage, missing: value });
    return value;
  }
  if (/\.html$/i.test(target)) return value;
  const bytes = await fs.readFile(target),
    hash = createHash("sha256").update(bytes).digest("hex").slice(0, 14);
  const destination = hash + path.extname(target).toLowerCase();
  assetMap.set(destination, bytes);
  return "/legacy-assets/" + destination;
}
async function clean(html, source, relativePage) {
  const $ = cheerio.load(html, null, false);
  $("script,style,noscript,iframe,link,meta,form,button").remove();
  $("*").each((_, el) => {
    for (const name of Object.keys(el.attribs || {}))
      if (/^on/i.test(name) || ["style", "srcset"].includes(name))
        $(el).removeAttr(name);
  });
  // Keep code; remove visual line-number tables from the old highlighter.
  $("figure.highlight").each((_, el) => {
    const lines = $(el).find("td.code .line");
    const code = lines.length
      ? lines
          .toArray()
          .map((line) => $(line).text())
          .join("\n")
      : $(el).find("td.code").text() || $(el).text();
    $(el).replaceWith($("<pre>").append($("<code>").text(code)));
  });
  for (const el of $("img").toArray()) {
    const image = $(el),
      src = image.attr("data-src") || image.attr("src");
    if (!src) {
      image.remove();
      continue;
    }
    const resolved = await asset(src, source, relativePage);
    image
      .attr("src", resolved)
      .removeAttr("data-src")
      .attr("loading", "lazy")
      .attr("alt", image.attr("alt") || "历史文章配图");
  }
  for (const el of $("a").toArray()) {
    const anchor = $(el),
      href = anchor.attr("href");
    if (!href) continue;
    if (/^javascript:/i.test(href)) {
      anchor.removeAttr("href");
      continue;
    }
    const local = localURL(href, source);
    if (local) {
      const mapped = redirects.find(
        (r) =>
          r.from.replace(/\/$/, "") ===
          ("/" + local.relative)
            .replace(/\/index.html$/, "")
            .replace(/\/$/, ""),
      );
      if (mapped) anchor.attr("href", mapped.to + local.hash);
      else if (
        !/\.(html?)?$/.test(local.relative) &&
        path.extname(local.relative)
      )
        anchor.attr("href", await asset(href, source, relativePage));
      else if (
        source === "cv" &&
        (!local.relative || local.relative === "index.html")
      )
        anchor.attr("href", "/");
    }
    anchor.removeAttr("target");
  }
  if ($("h1").length)
    $("h1,h2,h3,h4,h5").each((_, el) => {
      el.tagName = "h" + Math.min(6, Number(el.tagName.slice(1)) + 1);
    });
  return $.html();
}
const paths = (await walk(path.join(root, "2024")))
  .filter((p) => p.endsWith("/index.html"))
  .sort();
// Establish every canonical route before rewriting cross-article links.
for (const file of paths) {
  const relative = path.relative(root, file).replaceAll(path.sep, "/");
  const oldPath = "/" + relative.replace(/index.html$/, "");
  const key = oldPath.split("/").filter(Boolean).pop();
  const current = matches[key];
  let canonical;
  if (current) {
    const markdownPath = path.resolve("blog", current, "index.md");
    let markdown = await fs.readFile(markdownPath, "utf8");
    markdown = markdown.replace(/^draft:\s*true\s*$/m, "draft: false");
    const frontmatter = markdown.match(/^---\n[\s\S]*?\n---/)[0];
    const proseParts = markdown
      .slice(frontmatter.length)
      .split(/(^```[^\n]*\n[\s\S]*?^```\s*$)/m);
    if (
      proseParts.some((part, index) => index % 2 === 0 && /^# /m.test(part))
    ) {
      for (let i = 0; i < proseParts.length; i += 2)
        proseParts[i] = proseParts[i].replace(/^(#{1,5}) /gm, "#$1 ");
      markdown = frontmatter + proseParts.join("");
    }
    markdown = markdown.replace(/^(#{1,6}[^\n]*?)[ \t]+$/gm, "$1");
    await fs.writeFile(markdownPath, markdown);
    const date = current.slice(0, 10).replaceAll("-", "/");
    canonical = "/blog/" + date + "/" + current.slice(11) + "/";
  } else canonical = "/blog/legacy-" + key.toLowerCase() + "/";
  redirects.push({ from: oldPath, to: canonical });
  const $ = cheerio.load(await fs.readFile(file, "utf8"));
  const title =
    $('meta[property="og:title"]').attr("content") || $("h1").first().text();
  articles.push({
    key,
    title,
    oldPath,
    canonical,
    archive: "/archive/hexo/" + oldPath.slice(1),
    date:
      $('meta[property="article:published_time"]')
        .attr("content")
        ?.slice(0, 10) || "2024-01-01",
    sourceFile: relative,
    currentSource: current ? `blog/${current}/index.md` : null,
    html: $("#article-container").html() || "",
    description:
      $('meta[name="description"]').attr("content")?.slice(0, 150) || "",
  });
}
for (const article of articles) {
  article.html = await clean(article.html, "root", article.sourceFile);
  if (!article.currentSource) {
    const dir = path.resolve(
      "blog",
      article.date + "-legacy-" + article.key.toLowerCase(),
    );
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(
      path.join(dir, "content.json"),
      JSON.stringify({ html: article.html }),
    );
    await fs.writeFile(
      path.join(dir, "index.mdx"),
      `---\ntitle: ${JSON.stringify(article.title)}\nslug: legacy-${article.key.toLowerCase()}\ndate: ${article.date}\nauthors: [jerry]\ntags: [Archive]\ndescription: ${JSON.stringify(article.description)}\n---\n\nimport LegacyContent from '@site/src/components/LegacyContent';\nimport content from './content.json';\n\n${article.description}\n\n<!-- truncate -->\n\n<LegacyContent html={content.html} />\n`,
    );
    article.currentSource = path.relative(
      process.cwd(),
      path.join(dir, "index.mdx"),
    );
  }
  const file = path.resolve("src/pages", article.archive.slice(1), "index.js");
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(
    file,
    `import React from 'react';\nimport LegacyPage from '@site/src/components/LegacyPage';\nexport default function Page(){return <LegacyPage articleKey=${JSON.stringify(article.key)}/>;}\n`,
  );
}
const cvDocument = cheerio.load(
  await fs.readFile(path.join(cv, "index.html"), "utf8"),
);
const cvHtml = await clean(cvDocument("body").html(), "cv", "CV/index.html");
const extras = [];
for (const name of ["link", "movie", "movies", "music"]) {
  const file = path.join(root, name, "index.html");
  try {
    const $ = cheerio.load(await fs.readFile(file, "utf8"));
    const html = await clean(
      $("#article-container").html() ||
        $("#page").html() ||
        $("main").html() ||
        "",
      "root",
      name + "/index.html",
    );
    if (cheerio.load(html).text().trim().length < 20) {
      redirects.push({ from: "/" + name + "/", to: "/archive/" });
      await fs.rm(path.resolve("src/pages/archive/pages", name), {
        recursive: true,
        force: true,
      });
      continue;
    }
    extras.push({
      key: name,
      title: $("title").text().split(" | ")[0],
      html,
      oldPath: "/" + name + "/",
      canonical: "/archive/pages/" + name + "/",
    });
    redirects.push({
      from: "/" + name + "/",
      to: "/archive/pages/" + name + "/",
    });
    const out = path.resolve("src/pages/archive/pages", name, "index.js");
    await fs.mkdir(path.dirname(out), { recursive: true });
    await fs.writeFile(
      out,
      `import React from 'react';\nimport LegacyPage from '@site/src/components/LegacyPage';\nexport default function Page(){return <LegacyPage articleKey=${JSON.stringify("page:" + name)}/>;}\n`,
    );
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}
// Retired taxonomy/search pages contain no unique article text.
for (const file of (await walk(root)).filter((p) =>
  p.endsWith("/index.html"),
)) {
  const oldPath =
    "/" +
    path
      .relative(root, file)
      .replaceAll(path.sep, "/")
      .replace(/index.html$/, "");
  if (
    /^\/(archives|categories|tags|page)\//.test(oldPath) &&
    !redirects.some((r) => r.from === oldPath)
  )
    redirects.push({ from: oldPath, to: "/archive/" });
}
redirects.push(
  { from: "/posts/dpi/", to: "/docs/notes/algo/dpi/" },
  { from: "/search/", to: "/notes/" },
);
await fs.mkdir("static/legacy-assets", { recursive: true });
for (const [name, bytes] of assetMap)
  await fs.writeFile(path.join("static/legacy-assets", name), bytes);
await fs.mkdir("src/data", { recursive: true });
await fs.writeFile(
  "src/data/legacy.json",
  JSON.stringify(
    { articles, extras, cv: { html: cvHtml }, sourceRepos },
    null,
    2,
  ) + "\n",
);
await fs.writeFile(
  "scripts/legacy-redirects.json",
  JSON.stringify(redirects, null, 2) + "\n",
);
await fs.writeFile(
  "scripts/legacy-migration-manifest.json",
  JSON.stringify(
    {
      sourceRepos,
      articles: articles.map(({ html, ...a }) => a),
      extras: extras.map(({ html, ...a }) => a),
      assets: [...assetMap.keys()],
      warnings,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `Imported ${articles.length} old articles, CV and ${extras.length} auxiliary pages; ${assetMap.size} assets; ${warnings.length} source asset warnings.`,
);

// Keep generated route modules readable and deterministic.
for (const file of (await walk(path.resolve("src/pages/archive"))).filter(
  (file) => file.endsWith(".js"),
)) {
  await fs.writeFile(
    file,
    await prettier.format(await fs.readFile(file, "utf8"), { parser: "babel" }),
  );
}
