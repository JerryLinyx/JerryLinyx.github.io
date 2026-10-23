import fs from "node:fs/promises";
import sharp from "sharp";
import path from "node:path";
import { createHash } from "node:crypto";

const source = process.argv[2] || process.env.OBSIDIAN_PUBLIC_DIR;
if (!source)
  throw new Error(
    "Usage: npm run sync:notes -- /absolute/path/to/MyBook/Public",
  );
const root = path.resolve(source);
const destination = path.resolve("docs/notes");
const topics = {
  hpc: "HPC",
  training: "Training",
  inference: "Inference",
  application: "Applications",
  data: "Data",
  algo: "Generative models",
  leetcode: "Programming",
};
const descriptions = {
  "hpc/cuda": "从线程、内存与调度出发，理解 GPU 编程与性能优化。",
  "training/distributed-training":
    "并行策略、FSDP 与通信：理解多 GPU 训练的系统成本。",
  "algo/flow-matching": "从连续分布转换到 Flow Matching 的学习记录。",
  "application/rag": "检索增强生成的架构、实现与工程细节。",
  "application/evaluation": "LLM 应用评估的方法、指标与实践。",
  "algo/dpi":
    "Deep Probabilistic Imaging：不确定性量化与多模态解的论文阅读笔记。",
  "algo/flow-based-model":
    "从 NICE、RealNVP 到连续归一化流，整理可逆生成模型的基本原理。",
  "algo/ideas":
    "TARFlow、STARFlow、BiFlow 与 MeanFlow 等流模型的阅读和推导记录。",
  "algo/text2image": "条件生成、引导方法与文本到图像模型的学习记录。",
  "algo/transformer": "从概率建模到注意力机制，整理 Transformer 的核心概念。",
  "algo/vae": "判别式与生成式模型、变分自编码器的概念提纲与阅读资源。",
  "algo/video-generation": "从时空卷积到视频生成，梳理视频建模的演变思路。",
  "data/big-data": "Hadoop、分布式存储与大规模数据处理的入门梳理。",
  "hpc/compiler": "动态图、静态图与编译优化：理解模型执行的不同路径。",
  "hpc/nvidia-architecture": "NVIDIA GPU 架构、产品系列与计算平台的学习记录。",
  "inference/inference":
    "Dynamo、FlashInfer 与 SGLang 等推理系统的阅读资源索引。",
  "leetcode/ACM模式":
    "面向编程题的输入输出模板，以及链表、二叉树等数据的处理方式。",
  "leetcode/C++语法": "容器、内存与语言细节：C++ 编程中的常见问题和使用记录。",
  "leetcode/C语言": "数据类型、指针和底层表示：C 语言基础知识与实践。",
  "leetcode/python-syntax":
    "字符串、容器、标准库与常用操作的 Python 语法参考。",
  "leetcode/回溯": "组合、排列与子集问题：回溯搜索的思路和剪枝方法。",
  "leetcode/图论": "邻接矩阵、邻接表与图算法中的数据表示选择。",
  "leetcode/技巧": "异或、位运算与编程题中的实用技巧。",
  "leetcode/递归": "通过递推关系理解递归算法的时间复杂度。",
  "training/deep-learning": "偏差与方差、正则化、评价指标及深度学习训练流程。",
};
async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries
      .filter((e) => !e.name.startsWith("."))
      .map((e) =>
        e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name),
      ),
  );
  return files.flat();
}
const allFiles = await walk(root);
const fallbackRoot = process.argv[3] ? path.resolve(process.argv[3]) : null;
const fallbackFiles = fallbackRoot ? await walk(fallbackRoot) : [];
const assets = allFiles.filter((f) => !f.endsWith(".md"));
let originalBytes = 0;
let publishedBytes = 0;
const encodedAssets = new Map();
const notes = [],
  excluded = [],
  prepared = [],
  copiedAssets = new Map();
const mdFiles = allFiles
  .filter((f) => f.endsWith(".md") && path.relative(root, f) !== "index.md")
  .sort();
for (const file of mdFiles) {
  const relative = path.relative(root, file).split(path.sep).join("/");
  const text = await fs.readFile(file, "utf8");
  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  let body = fm ? text.slice(fm[0].length).trim() : text.trim();
  if (body.length < 180 || relative.includes("待完成")) {
    excluded.push({
      file: relative,
      reason: "Empty, short outline, or explicit unfinished draft",
    });
    continue;
  }
  const titleMatch = fm?.[1].match(/^title:\s*(.+)$/m);
  const title = titleMatch
    ? titleMatch[1].replace(/^["']|["']$/g, "")
    : path.basename(file, ".md");
  const slug = relative.slice(0, -3);
  const target = path.join(destination, relative);
  // Change prose only; leave examples and code untouched.
  const parts = body.split(/(^```[^\n]*\n[\s\S]*?^```\s*$)/m);
  const shiftHeadings = parts.some(
    (part, index) => index % 2 === 0 && /^# /m.test(part),
  );
  for (let index = 0; index < parts.length; index += 2) {
    let prose = parts[index];
    if (shiftHeadings) prose = prose.replace(/^(#{1,5}) /gm, "#$1 ");
    const images = [...prose.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)];
    for (const match of images) {
      const imagePath = match[2];
      if (/^(https?:|data:)/.test(imagePath)) continue;
      const decoded = decodeURIComponent(imagePath.replace(/^<|>$/g, ""));
      const candidates = [
        path.resolve(path.dirname(file), decoded),
        path.join(root, decoded.replace(/^\//, "")),
      ];
      let resolved;
      for (const candidate of candidates) {
        if (!candidate.startsWith(root + path.sep)) continue;
        try {
          if ((await fs.stat(candidate)).isFile()) {
            resolved = candidate;
            break;
          }
        } catch {}
      }
      if (!resolved) {
        const matches = assets.filter(
          (a) => path.basename(a) === path.basename(decoded),
        );
        if (matches.length === 1) resolved = matches[0];
      }
      if (!resolved && fallbackRoot) {
        const matches = fallbackFiles.filter(
          (a) =>
            path.basename(a).replace(/ (\d+)\./, "-$1.") ===
            path.basename(decoded),
        );
        if (matches.length === 1) resolved = matches[0];
      }
      if (!resolved)
        throw new Error(`Missing image in ${relative}: ${imagePath}`);
      if (!encodedAssets.has(resolved)) {
        const original = await fs.readFile(resolved);
        let buffer = original;
        let extension = path.extname(resolved);
        if (/\.png$/i.test(extension)) {
          const optimized = await sharp(original)
            .webp({ lossless: true, effort: 6 })
            .toBuffer();
          if (optimized.length < original.length) {
            buffer = optimized;
            extension = ".webp";
          }
        }
        const hash = createHash("sha1")
          .update(buffer)
          .digest("hex")
          .slice(0, 12);
        encodedAssets.set(resolved, {
          buffer,
          originalSize: original.length,
          name: hash + extension,
        });
      }
      const encoded = encodedAssets.get(resolved);
      const assetTarget = path.join(destination, "_assets", encoded.name);
      if (!copiedAssets.has(assetTarget)) {
        originalBytes += encoded.originalSize;
        publishedBytes += encoded.buffer.length;
      }
      copiedAssets.set(assetTarget, encoded.buffer);
      const local = path
        .relative(path.dirname(target), assetTarget)
        .split(path.sep)
        .join("/");
      prose = prose.replace(
        match[0],
        `![${match[1] || title + " 配图"}](${local})`,
      );
    }
    prose = prose.replace(/\[\[([^\]]+)\]\]/g, (_, ref) =>
      ref.split("|").pop().split("/").pop(),
    );
    parts[index] = prose;
  }
  // Mermaid requires quoted edge labels when they contain parentheses.
  for (let index = 1; index < parts.length; index += 2) {
    if (parts[index].startsWith("```mermaid")) {
      parts[index] = parts[index].replace(
        /-- ([^\n]+?) -->/g,
        (_, label) =>
          `-- ${label.startsWith('"') ? label : JSON.stringify(label)} -->`,
      );
    }
  }
  body = parts.join("");
  prepared.push({
    target,
    content: `---\ntitle: ${JSON.stringify(title)}\nslug: /notes/${slug}\n---\n\n${body}\n`,
  });
  const plain = body
    .replace(/^```[^\n]*$/gm, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#*`$|>]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  notes.push({
    title,
    slug,
    topic: topics[relative.split("/")[0]] || "Notes",
    description: descriptions[slug] || plain.slice(0, 105),
    search: plain,
    minutes: Math.max(1, Math.ceil(plain.length / 650)),
  });
}
// Resolve every source and asset before mutating generated output.
await fs.mkdir(destination, { recursive: true });
for (const { target, content } of prepared) {
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, content);
}
await fs.mkdir(path.join(destination, "_assets"), { recursive: true });
for (const [target, buffer] of copiedAssets) await fs.writeFile(target, buffer);
for (const [folder, label] of Object.entries(topics)) {
  await fs.mkdir(path.join(destination, folder), { recursive: true });
  await fs.writeFile(
    path.join(destination, folder, "_category_.json"),
    JSON.stringify({ label, collapsed: true }, null, 2) + "\n",
  );
}
// Remove only previously generated notes/assets, never hand-authored documents.
const manifestPath = path.resolve("scripts/notes-manifest.json");
let previous = { files: [] };
try {
  previous = JSON.parse(await fs.readFile(manifestPath, "utf8"));
} catch {}
const files = [
  ...prepared.map((p) => path.relative(destination, p.target)),
  ...copiedAssets.keys(),
].map((p) => (path.isAbsolute(p) ? path.relative(destination, p) : p));
for (const oldFile of previous.files)
  if (!files.includes(oldFile)) {
    const oldTarget = path.resolve(destination, oldFile);
    if (oldTarget.startsWith(destination + path.sep))
      await fs.rm(oldTarget, { force: true });
  }
await fs.mkdir("src/data", { recursive: true });
await fs.writeFile(
  "src/data/notes.json",
  JSON.stringify(notes, null, 2) + "\n",
);
await fs.writeFile(
  manifestPath,
  JSON.stringify(
    {
      files,
      excluded,
      notes: notes.length,
      assets: copiedAssets.size,
      imageOptimization: { originalBytes, publishedBytes },
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `Imported ${notes.length} notes and ${copiedAssets.size} images; ${excluded.length} drafts excluded. Images: ${(originalBytes / 1048576).toFixed(1)} → ${(publishedBytes / 1048576).toFixed(1)} MiB. Source vault unchanged.`,
);
