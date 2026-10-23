const fs = require("node:fs/promises");
const { chromium } = require("playwright");
const { default: AxeBuilder } = require("@axe-core/playwright");
const base = process.env.PREVIEW_URL || "http://127.0.0.1:3087/";
let browser;
(async () => {
  browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROME_EXECUTABLE
      ? { executablePath: process.env.CHROME_EXECUTABLE }
      : {}),
  });
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  const results = [];
  for (const [route, width] of [
    ["", 1440],
    ["", 390],
    ["notes/", 1440],
    ["notes/", 390],
    ["projects/fingoat/", 1440],
    ["docs/notes/hpc/cuda/", 1440],
    ["docs/notes/hpc/cuda/", 390],
    ["resume/", 390],
    ["docs/notes/algo/flow-based-model/", 390],
    ["archive/", 390],
    ["archive/cv/", 390],
    ["archive/hexo/2024/04/22/markdown/", 390],
    ["archive/hexo/2024/04/19/macos-hexo-github/", 390],
  ]) {
    await page.setViewportSize({ width, height: 950 });
    await page.goto(base + route, { waitUntil: "networkidle" });
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    results.push({
      route,
      width,
      violations: result.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    });
  }
  await fs.mkdir("output/playwright", { recursive: true });
  await fs.writeFile(
    "output/playwright/accessibility.json",
    JSON.stringify(results, null, 2),
  );
  console.log(JSON.stringify(results));
  await browser.close();
  if (results.some((r) => r.violations.length)) process.exitCode = 1;
})().catch(async (e) => {
  console.error(e);
  await browser?.close();
  process.exit(1);
});
