import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
async function copyAssets(dir) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await copyAssets(p);
    else if (/\.(png|jpe?g|gif|svg|webp|pdf)$/i.test(p)) {
      const target = path.join("static/content", p);
      await fs.mkdir(path.dirname(target), { recursive: true });
      await fs.copyFile(p, target);
    }
  }
}
await fs.rm("static/content", { recursive: true, force: true });
await copyAssets("docs/notes");
await copyAssets("blog");
await fs.mkdir("static/media", { recursive: true });
const { photos } = await import("../src/lib/content.mjs");
for (const p of photos)
  await sharp("plog/2025-07-10-Singapore/" + p.file)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile("static" + p.url);
for (const [source, name, width] of [
  ["YuxuanLin.jpg", "portrait", 1000],
  ["infra.png", "fingoat", 1600],
  ["pacc.png", "pacc", 1600],
  ["PET.png", "imaging", 1600],
  ["lenet.png", "cuda", 1000],
  ["os.png", "os", 1000],
])
  await sharp("static/index/" + source)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile("static/media/" + name + ".webp");
console.log(
  "Prepared preserved content assets and optimized original photography.",
);
