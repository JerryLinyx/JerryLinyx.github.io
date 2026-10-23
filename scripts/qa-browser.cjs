/* Browser acceptance checks. Uses an installed Playwright or PLAYWRIGHT_MODULE. */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
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
  const errors = [],
    failedResponses = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400 && r.url().startsWith(base))
      failedResponses.push(`${r.status()} ${r.url()}`);
  });
  const results = [];
  async function navigate(route = "") {
    const response = await page.goto(base + route, {
      waitUntil: "networkidle",
    });
    assert.equal(response.status(), 200, route);
    await page.evaluate(() => document.fonts.ready);
  }
  async function inspect(label) {
    assert.equal(
      await page.getByText("页面已崩溃。", { exact: true }).count(),
      0,
      `${label}: no error boundary`,
    );
    const data = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      brokenImages: [...document.images]
        .filter((i) => i.complete && !i.naturalWidth)
        .map((i) => i.src),
      h1: document.querySelectorAll("h1").length,
      main: document.querySelectorAll("main").length,
    }));
    assert.equal(data.overflow, false, `${label}: horizontal overflow`);
    assert.deepEqual(data.brokenImages, [], `${label}: missing images`);
    assert.equal(data.h1, 1, `${label}: one primary heading`);
    assert.equal(data.main, 1, `${label}: one main landmark`);
    results.push({ page: label, ...data });
  }
  async function loadImages() {
    await page.evaluate(async () => {
      for (const img of document.querySelectorAll("img[loading=lazy]")) {
        img.loading = "eager";
      }
      await Promise.all(
        [...document.images].map((i) => i.decode().catch(() => {})),
      );
    });
  }
  await fs.mkdir("output/playwright", { recursive: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await navigate();
  await loadImages();
  await inspect("home / 1440");
  await page.screenshot({
    path: "output/playwright/home-desktop.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Find structure" }).click();
  assert.equal(
    await page
      .getByRole("button", { name: "Explore flow" })
      .getAttribute("aria-pressed"),
    "true",
  );
  await page.getByRole("link", { name: "Explore my work" }).click();
  assert.ok(page.url().endsWith("#work"));
  for (const width of [320, 390, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await navigate();
    await loadImages();
    await inspect(`home / ${width}`);
    if (width === 390) {
      await page.screenshot({
        path: "output/playwright/home-mobile.png",
        fullPage: true,
      });
      const menu = page.getByRole("button", { name: "打开导航" });
      await menu.click();
      assert.equal(
        await page
          .getByRole("button", { name: "关闭导航" })
          .getAttribute("aria-expanded"),
        "true",
      );
      await page.keyboard.press("Escape");
      assert.equal(await menu.getAttribute("aria-expanded"), "false");
      await menu.click();
      await page
        .getByRole("navigation", { name: "主导航" })
        .getByRole("link", { name: "Notes" })
        .click();
      assert.ok(page.url().includes("/notes/"));
      assert.equal(await menu.getAttribute("aria-expanded"), "false");
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await navigate("notes/");
  await inspect("notebook / desktop");
  const search = page.getByRole("searchbox");
  await search.fill("CUDA");
  assert.ok((await page.locator("main h2").count()) > 0);
  assert.ok(page.url().includes("q=CUDA"));
  await page.getByRole("button", { name: "HPC", exact: true }).click();
  assert.ok(page.url().includes("topic=HPC"));
  await page.screenshot({
    path: "output/playwright/notes-search.png",
    fullPage: true,
  });
  await search.fill("this-word-will-not-match-271828");
  await page.getByRole("heading", { name: "No notes found." }).waitFor();
  await page.getByRole("button", { name: "Clear filters" }).click();
  assert.equal(await page.locator("main h2").count(), 25);
  await navigate("notes/?q=CUDA&topic=HPC");
  assert.equal(await search.inputValue(), "CUDA");
  assert.equal(
    await page
      .getByRole("button", { name: "HPC", exact: true })
      .getAttribute("aria-pressed"),
    "true",
  );
  for (const route of [
    "projects/fingoat/",
    "projects/pacc/",
    "projects/probabilistic-imaging/",
    "resume/",
    "docs/notes/hpc/cuda/",
    "docs/notes/algo/flow-based-model/",
    "docs/notes/training/distributed-training/",
    "blog/",
    "plog/",
  ]) {
    await navigate(route);
    await loadImages();
    await inspect(`${route} / desktop`);
    if (route === "docs/notes/hpc/cuda/") {
      await page.locator(".docusaurus-mermaid-container svg").first().waitFor();
      assert.ok(
        (await page.locator(".docusaurus-mermaid-container svg").count()) > 0,
        "Mermaid renders",
      );
      await page.screenshot({
        path: "output/playwright/note-desktop.png",
        fullPage: true,
      });
    }
    if (route === "projects/fingoat/")
      await page.screenshot({
        path: "output/playwright/project-desktop.png",
        fullPage: true,
      });
    await page.setViewportSize({ width: 390, height: 844 });
    await inspect(`${route} / mobile`);
    if (route === "docs/notes/hpc/cuda/") {
      await page.getByText("Contents / 笔记目录").click();
      assert.equal(
        await page.locator(".notebook-sidebar-mobile").getAttribute("open"),
        "",
      );
      await page.getByText("Contents / 笔记目录").click();
    }
    if (route === "docs/notes/hpc/cuda/")
      await page.screenshot({
        path: "output/playwright/note-mobile.png",
        fullPage: true,
      });
    await page.setViewportSize({ width: 1440, height: 1000 });
  }
  // Imported notes share a template but contain different formulas, tables and images.
  // Check every published note on mobile to catch content-dependent overflow.
  await page.setViewportSize({ width: 390, height: 844 });
  for (const note of require("../src/data/notes.json")) {
    await navigate(`docs/notes/${note.slug}/`);
    await loadImages();
    await inspect(`imported ${note.slug} / mobile`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await navigate("notes/");
  await inspect("notebook / mobile");
  await page.screenshot({
    path: "output/playwright/notes-mobile.png",
    fullPage: true,
  });
  assert.deepEqual(errors, [], "browser JavaScript errors");
  assert.deepEqual(failedResponses, [], "HTTP errors");
  await fs.writeFile(
    "output/playwright/results.json",
    JSON.stringify({ results, errors, failedResponses }, null, 2),
  );
  console.log(
    `PASS: ${results.length} viewport/page checks, flow toggle, menu/Escape, notebook search/filter/reset/deep-link, Mermaid. No browser or asset errors.`,
  );
  await browser.close();
})().catch(async (e) => {
  console.error(e);
  await browser?.close();
  process.exit(1);
});
