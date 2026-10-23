import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import {
  posts,
  legacy,
  photos,
  curation,
  archiveCanonical,
} from "../src/lib/content.mjs";
import { projects, moreProjects } from "../src/data/portfolio.js";
async function walk(dir) {
  return (
    await Promise.all(
      (await fs.readdir(dir, { withFileTypes: true })).map((e) =>
        e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name),
      ),
    )
  ).flat();
}
const sources = (
  await Promise.all(
    ["docs", "blog", "plog", "content", "archive/source"].map(walk),
  )
)
  .flat()
  .filter(
    (p) => !p.startsWith("docs/plans/") && !p.startsWith("docs/inventory/"),
  );
const assets = (await walk("static")).filter(
  (p) => !/^static\/(content|media)\//.test(p),
);
const hashes = new Map();
for (const file of [...sources, ...assets]) {
  const buffer = await fs.readFile(file);
  const hash = crypto.createHash("sha256").update(buffer).digest("hex");
  const arr = hashes.get(hash) || [];
  arr.push({ file, bytes: buffer.length });
  hashes.set(hash, arr);
}
const cleanup = JSON.parse(
  await fs.readFile("content/asset-merges.json", "utf8"),
);
const github = JSON.parse(
  await fs.readFile("docs/inventory/github-public.json", "utf8"),
);
const unpublished = sources
  .filter(
    (p) =>
      /\.mdx?$/.test(p) &&
      !posts.some((n) => n.file === p) &&
      !p.startsWith("plog/"),
  )
  .map((file) => ({
    file,
    status: file.startsWith("archive/")
      ? "source archive"
      : file === "blog/2024-06-21-spaghetti/index.md"
        ? "explicit draft"
        : "retained reference / source only",
  }));
const inventory = {
  date: "2026-10-23",
  scope: [
    "website repository",
    "previously authorized public notes and resume",
    "public GitHub repository metadata",
  ],
  counts: {
    projects: projects.length + moreProjects.length,
    publicRepositories: github.repositories.length,
    publishedEntries: posts.length,
    articles: posts.filter((p) => p.kind === "articles").length,
    notes: posts.filter((p) => p.kind === "notes").length,
    photos: photos.length,
    historicalRecords: legacy.articles.length,
    sharedHistoricalBodies: archiveCanonical.size,
    distinctHistoricalEditions: legacy.articles.length - archiveCanonical.size,
    removedSourceDocuments: cleanup.removedSources.length,
    removedEditorMetadata: cleanup.removedEditorMetadata.length,
    removedLegacyAuthorMetadata: (cleanup.removedLegacyAuthorMetadata || [])
      .length,
    removedDuplicateMedia: cleanup.media.length,
    reclaimedBytes: cleanup.reclaimedBytes,
  },
  entries: posts.map(({ title, slug, url, kind, topic, file }) => ({
    title,
    slug,
    url,
    kind,
    topic,
    file,
  })),
  projects: [...projects, ...moreProjects].map(({ title, slug, repo }) => ({
    title,
    url: `/work/${slug}/`,
    repo,
  })),
  merges: curation,
  media: cleanup.media,
  unpublished,
  remainingExactDuplicateGroups: [...hashes.values()].filter(
    (g) => g.length > 1,
  ),
};
await fs.writeFile(
  "docs/inventory/assets.json",
  JSON.stringify(inventory, null, 2) + "\n",
);
const c = inventory.counts;
const text = `# 个人资产清点与网站呈现\n\n日期：2026-10-23。范围为本网站仓库、此前授权的简历与公开笔记、公开 GitHub 元数据；不涉及其他私人文件夹或远程仓库修改。\n\n## 清点结果\n\n| 资产 | 数量 / 处理 | 网站位置 |\n| --- | --- | --- |\n| 精选项目 | ${c.projects} 个，有完整案例 | /work/ |\n| 公开代码仓库 | ${c.publicRepositories} 个；含课程、分支及参考代码，不均等视为原创作品 | 本地资产表，首页只展示有材料支持的精选项目 |\n| 统一文字 | ${c.publishedEntries} 篇：${c.articles} 篇文章、${c.notes} 篇笔记/资料 | /writing/ |\n| 研究 | 1 篇 ISBI 论文、3 条主题阅读路径 | /research/ |\n| 个人摄影 | ${c.photos} 张、新加坡影集 | /life/ |\n| 历史条目 | ${c.historicalRecords} 条：${c.sharedHistoricalBodies} 条共用现行正文、${c.distinctHistoricalEditions} 条保留独立原版 | /archive/ |\n| 合并的源文档 | ${c.removedSourceDocuments} 份 | 见下表与 curation.json |\n| 移除的编辑器元数据 | ${c.removedEditorMetadata} 个 | 非内容文件，不进入网站 |
| 合并的旧作者配置 | ${c.removedLegacyAuthorMetadata} 个 | 身份信息统一到 portfolio.js |\n| 移除的逐字节重复图片 | ${c.removedDuplicateMedia} 份，${(c.reclaimedBytes / 1024 / 1024).toFixed(2)} MiB | 已重写所有保留引用 |\n\n## 合并依据\n\n| 来源 | 唯一内容归宿 | 处理依据 |\n| --- | --- | --- |\n| Flow Matching 笔记 | Road to Flow Matching 文章 | 正文完全相同，保留文章日期与唯一检索入口；旧链接跳转 |\n| CUDA 旧资料页 | CUDA 完整笔记 | 补齐独有参考链接；原版配图保留在历史条目 |\n| 旧 cpp.md | C++ 语法 | 容器正文重合，仅补齐独有参考资料 |\n| 旧 nn.md | Deep Learning、Transformer、Text2Image | 实质文本已经分布在三篇专题里；图片源仍保留 |\n| Go、Gin、Auth、DB、Redis 五个资料片段 | Go Web 工程资料 | 合成有场景分类的一份资源索引，不伪装成五篇完整文章 |\n| FinGOAT 导航片段 | FinGOAT 作品案例 | 只保留一个完整项目叙述 |\n| 10 份相同历史正文 | 现行文字页面 | 保留历史条目、来源与旧 URL；不重复发布同一正文 |\n| 55 个历史媒体副本 | 对应的原始图片源 | SHA-256 逐字节相同，先更新引用再清除副本 |\n\n## 保留与暂不展示\n\n互补的 Flow 英文材料、三份 LLM 文献索引等保留为源资料，不按同名或相似标题粗暴删除。显式草稿、Hugo 测试页与旧框架配置不加入网站主导航。旧 Hugo DPI 记录属于早期源快照，当前 DPI 笔记是现行入口。未核实的文献归属和仓库来源不被补写为个人成果。所有移除内容可通过本仓库既有 Git 历史恢复，未修改外部 Obsidian 笔记库。\n\n## 呈现规则\n\n首页是精选编辑索引，四类内容平等入口，不将所有文件铺满首屏。作品讲问题、设计与结果；研究连接论文与学习；写作一题一入口，保留全文搜索与主题筛选；生活使用真实摄影，放大后保持原始色彩。关于我承载简介与可打印履历；历史存档位于次导航。Doc、CV 仓库保留，站点继续下架，URL 不恢复。\n\n当前视觉采用冷米白、石墨黑与淡紫，围绕科学影像档案展开；原创数学形态与交互观察仪属于视觉习作，真实作品证据位于完整案例。此前纸刊/钴蓝方向已被替代。完整条目、媒体归并映射、源资料去向与 40 个公开仓库元数据见同目录 JSON 文件。\n`;
await fs.writeFile("docs/inventory/2026-10-23-assets.md", text);
console.log(JSON.stringify(inventory.counts));
