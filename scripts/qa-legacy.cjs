const fs = require("node:fs/promises");
const assert = require("node:assert/strict");
const { chromium } = require("playwright");
const legacy = require("../src/data/legacy.json");
const base = process.env.PREVIEW_URL || "http://127.0.0.1:3087/";
let browser;
(async () => {
  browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROME_EXECUTABLE
      ? { executablePath: process.env.CHROME_EXECUTABLE }
      : {}),
  });
  const context = await browser.newContext({ reducedMotion: "reduce" }),
    page = await context.newPage();
  const errors = [],
    httpErrors = [],
    checks = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400 && r.url().startsWith(base))
      httpErrors.push(r.status() + " " + r.url());
  });
  const routes = [
    "/archive/",
    "/archive/cv/",
    ...legacy.extras.map((a) => a.canonical),
    ...legacy.articles.flatMap((a) => [a.archive, a.canonical]),
  ];
  for (const route of routes) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    const response = await page.goto(new URL(route, base).href, {
      waitUntil: "networkidle",
    });
    assert.equal(response.status(), 200, route);
    await page.evaluate(async () => {
      for (const image of document.images) image.loading = "eager";
      await Promise.all(
        [...document.images].map((i) => i.decode().catch(() => {})),
      );
    });
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(
        () =>
          new Promise((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(resolve)),
          ),
      );
      const result = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        h1: document.querySelectorAll("h1").length,
        brokenImages: [...document.images]
          .filter((i) => i.complete && !i.naturalWidth)
          .map((i) => i.src),
        crash: document.body.innerText.includes("页面已崩溃。"),
      }));
      checks.push({ route, width, ...result });
    }
    if (route === "/archive/") {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.screenshot({
        path: "output/playwright/archive-desktop.png",
        fullPage: true,
      });
    }
    if (route === "/archive/cv/")
      await page.screenshot({
        path: "output/playwright/archive-cv-mobile.png",
      });
  }
  const redirects = [
    ...legacy.articles.map((a) => ({ from: a.oldPath, to: a.canonical })),
    { from: "/Doc/", to: "/" },
    { from: "/Doc/docs/notes/hpc/cuda/", to: "/docs/notes/hpc/cuda/" },
    {
      from: "/Doc/blog/road-to-flow-matching/",
      to: "/blog/road-to-flow-matching/",
    },
    { from: "/CV/", to: "/resume/" },
    { from: "/posts/dpi/", to: "/docs/notes/algo/dpi/" },
    { from: "/archives/", to: "/archive/" },
  ];
  for (const redirect of redirects) {
    await page.goto(new URL(redirect.from, base).href);
    await page.waitForURL(new URL(redirect.to, base).href, {
      waitUntil: "networkidle",
    });
    checks.push({ redirect: redirect.from, to: redirect.to, pass: true });
  }
  const failures = checks.filter(
    (check) =>
      check.overflow ||
      (check.h1 !== undefined && check.h1 !== 1) ||
      check.brokenImages?.length ||
      check.crash,
  );
  await fs.writeFile(
    "output/playwright/legacy-results.json",
    JSON.stringify({ checks, failures, errors, httpErrors }, null, 2),
  );
  assert.deepEqual(failures, [], "Layout/content failures");
  assert.deepEqual(errors, [], "JavaScript errors");
  assert.deepEqual(httpErrors, [], "Local HTTP errors");
  await fs.writeFile(
    "output/playwright/legacy-results.json",
    JSON.stringify({ checks, errors, httpErrors }, null, 2),
  );
  console.log(
    `PASS: ${checks.length} legacy page/viewport/redirect checks, no missing media or runtime errors.`,
  );
  await browser.close();
})().catch(async (e) => {
  console.error(e);
  await browser?.close();
  process.exit(1);
});
