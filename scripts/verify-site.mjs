import fs from "node:fs/promises";
import path from "node:path";
const root = path.resolve("build");
const base = process.env.SITE_BASE_URL || "/";
async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name),
      ),
    )
  ).flat();
}
const files = await walk(root);
await fs.access(path.join(root, ".nojekyll"));
for (const retired of ["Doc", "CV"]) {
  if (
    files.some((file) => {
      const relative = path.relative(root, file);
      return (
        relative.startsWith(retired + path.sep) ||
        relative === retired + ".html"
      );
    })
  )
    throw new Error(`Retired URL must not be published: /${retired}/`);
}
const htmlFiles = files.filter((f) => f.endsWith(".html"));
const missing = new Set();
let checked = 0;
for (const file of htmlFiles) {
  const html = await fs.readFile(file, "utf8");
  if (
    file.includes(path.sep + "writing" + path.sep) &&
    html.includes('class="katex-error"')
  )
    missing.add("Invalid rendered formula: " + path.relative(root, file));
  for (const match of html.matchAll(/(?:href|src)="([^"#?]+)[^\"]*"/g)) {
    const url = match[1].replaceAll("&amp;", "&");
    if (!url.startsWith(base) || url.startsWith("//")) continue;
    const relative = decodeURIComponent(url.slice(base.length));
    const target = path.resolve(root, relative);
    if (!target.startsWith(root + path.sep) && target !== root)
      throw new Error("Path escaped build: " + url);
    let exists = false;
    for (const candidate of [
      target,
      path.join(target, "index.html"),
      target + ".html",
    ])
      try {
        if ((await fs.stat(candidate)).isFile()) {
          exists = true;
          break;
        }
      } catch {}
    if (!exists) missing.add(`${path.relative(root, file)} → ${url}`);
    checked++;
  }
}
const home = await fs.readFile(path.join(root, "index.html"), "utf8");
for (const expected of [
  "takes form",
  "/work/",
  "/research/",
  "/writing/",
  "/life/",
]) {
  if (!home.includes(expected)) missing.add("Home missing " + expected);
}
if (missing.size) {
  console.error([...missing].join("\n"));
  process.exit(1);
}
console.log(
  `Verified ${checked} internal links/assets across ${htmlFiles.length} rendered pages.`,
);
