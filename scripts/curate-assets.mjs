import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import matter from "gray-matter";
const curation = JSON.parse(await fs.readFile("content/curation.json", "utf8"));
const previous = await fs
  .readFile("content/asset-merges.json", "utf8")
  .then(JSON.parse)
  .catch(() => ({}));
const exists = async (p) => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};
// Preserve every unique reference when retiring a duplicate source.
for (const [old, target, heading] of [
  ["docs/cpp.md", "docs/notes/leetcode/C++语法.md", "补充参考"],
  ["blog/2024-05-09-cuda/index.md", "docs/notes/hpc/cuda.md", "编程入门参考"],
])
  if (await exists(old)) {
    const original = await fs.readFile(old, "utf8");
    let text = await fs.readFile(target, "utf8");
    const links = [
      ...original.matchAll(/\[([^\]]+)\]\((https?:[^)]+)\)/g),
    ].filter(([, label, url]) => !text.includes(url));
    if (links.length)
      text +=
        "\n\n## " +
        heading +
        "\n\n" +
        links.map(([, label, url]) => `- [${label}](${url})`).join("\n") +
        "\n";
    await fs.writeFile(target, text);
  }
// Small web-development resource stubs become one explicitly labelled resource note.
const stubs = ["Go", "Gin", "Auth", "DB", "Redis"];
const resource = "content/notes/go-web-resources.md";
await fs.mkdir("content/notes", { recursive: true });
if (!(await exists(resource))) {
  let text =
    '---\ntitle: "Go Web 工程资料"\nslug: /notes/engineering/go-web-resources\ntopic: "Engineering"\ndescription: "Go、Gin、JWT、PostgreSQL 与 Redis 的工程参考资料，整理自原站的分散记录。"\n---\n\n这是工程实践中的参考索引，保留原有链接和命令记录，按使用场景集中整理。\n';
  for (const name of stubs) {
    const file = `docs/WebDev/${name}.md`;
    const { content } = matter(await fs.readFile(file, "utf8"));
    text +=
      "\n\n## " +
      {
        Go: "Go 学习与项目",
        Gin: "Gin Web 框架",
        Auth: "身份认证与 JWT",
        DB: "PostgreSQL 与容器",
        Redis: "Redis",
      }[name] +
      "\n\n" +
      content.replace(/^# .+\n/gm, "").replace(/^## /gm, "### ");
  }
  await fs.writeFile(resource, text + "\n");
}
// These files are tracked in Git before removal; unique content is already retained above.
const removed = [];
for (const file of [
  ...curation.merges.map((x) => x.file),
  ...curation.sourceMerges.map((x) => x.file),
  ...stubs.map((n) => `docs/WebDev/${n}.md`),
  "docs/WebDev/FinGoat.md",
])
  if (await exists(file)) {
    await fs.rm(file);
    removed.push(file);
  }
// Exact-byte media deduplication. Source assets are retained; generated historic copies point to them.
async function walk(d) {
  return (
    await Promise.all(
      (await fs.readdir(d, { withFileTypes: true })).map((e) =>
        e.isDirectory() ? walk(path.join(d, e.name)) : path.join(d, e.name),
      ),
    )
  ).flat();
}
const files = (
  await Promise.all(
    ["blog", "docs", "static/index", "static/legacy-assets"].map(walk),
  )
)
  .flat()
  .filter((f) => /\.(png|jpe?g|webp|gif|svg)$/i.test(f));
const groups = new Map();
for (const file of files) {
  const b = await fs.readFile(file);
  const h = crypto.createHash("sha256").update(b).digest("hex");
  const g = groups.get(h) || [];
  g.push({ file, bytes: b.length });
  groups.set(h, g);
}
const mappings = [];
for (const group of groups.values())
  if (group.length > 1) {
    group.sort(
      (a, b) =>
        Number(a.file.startsWith("static/")) -
          Number(b.file.startsWith("static/")) || a.file.localeCompare(b.file),
    );
    const keeper = group[0];
    for (const duplicate of group.slice(1)) {
      if (!duplicate.file.startsWith("static/legacy-assets/")) continue;
      const from = "/" + duplicate.file.slice(7);
      const to = keeper.file.startsWith("static/")
        ? "/" + keeper.file.slice(7)
        : "/content/" +
          keeper.file.split("/").map(encodeURIComponent).join("/");
      mappings.push({
        from,
        to,
        keeper: keeper.file,
        removed: duplicate.file,
        bytes: duplicate.bytes,
      });
    }
  }
const jsonFiles = [
  "src/data/legacy.json",
  "blog/2024-04-19-legacy-words/content.json",
  "blog/2024-04-22-legacy-acidvsbase/content.json",
];
for (const file of jsonFiles) {
  let text = await fs.readFile(file, "utf8");
  for (const m of mappings) text = text.replaceAll(m.from, m.to);
  await fs.writeFile(file, text);
}
for (const m of mappings) await fs.rm(m.removed);
// Obsidian editor state is workspace metadata, not website content.
const metadata = [];
for (const file of (await walk("docs")).filter((f) =>
  f.includes("/.obsidian/"),
)) {
  await fs.rm(file);
  metadata.push(file);
}
const allMedia = [
  ...(previous.media || []),
  ...mappings.filter(
    (m) => !(previous.media || []).some((p) => p.removed === m.removed),
  ),
];
await fs.writeFile(
  "content/asset-merges.json",
  JSON.stringify(
    {
      ...previous,
      removedSources: [
        ...new Set([...(previous.removedSources || []), ...removed]),
      ],
      removedEditorMetadata: [
        ...new Set([...(previous.removedEditorMetadata || []), ...metadata]),
      ],
      media: allMedia,
      reclaimedBytes: allMedia.reduce((n, m) => n + m.bytes, 0),
    },
    null,
    2,
  ) + "\n",
);
console.log(
  JSON.stringify({
    removedSources: removed.length,
    metadata: metadata.length,
    media: mappings.length,
    reclaimedBytes: mappings.reduce((n, m) => n + m.bytes, 0),
  }),
);
