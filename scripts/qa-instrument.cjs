const { chromium } = require("playwright");
const fs = require("node:fs/promises");
const assert = require("node:assert/strict");
(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath:
      process.env.CHROME_EXECUTABLE ||
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  const base = process.env.PREVIEW_URL || "http://127.0.0.1:3091/";
  const checks = [];
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForSelector(".instrument-ready");
  const root = page.locator("[data-instrument]");
  assert.equal(await root.getAttribute("data-motion"), "playing");
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() =>
    Promise.all(
      document.getAnimations().map((a) => a.finished.catch(() => {})),
    ),
  );
  await page.screenshot({
    path: "output/playwright/archive/home-fold-1440.png",
  });
  for (const [shape, label] of [
    ["branch", "02 生长"],
    ["terrain", "03 地形"],
    ["field", "01 场"],
  ]) {
    await page.getByRole("button", { name: label, exact: true }).click();
    assert.equal(await root.getAttribute("data-shape"), shape);
    assert.equal(
      await page
        .getByRole("button", { name: label, exact: true })
        .getAttribute("aria-pressed"),
      "true",
    );
    checks.push({ shape, pass: true });
  }
  await page.getByRole("button", { name: "暂停动效 Ⅱ" }).click();
  assert.equal(await root.getAttribute("data-motion"), "paused");
  const before = await page.locator("canvas").evaluate((e) => e.toDataURL());
  await page.waitForTimeout(120);
  assert.equal(
    await page.locator("canvas").evaluate((e) => e.toDataURL()),
    before,
  );
  checks.push({ pausedFrameStable: true });
  await page.getByRole("button", { name: "播放动效 ▷" }).click();
  assert.equal(await root.getAttribute("data-motion"), "playing");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(
    () =>
      document.querySelector("[data-instrument]").dataset.motion === "paused",
  );
  assert.equal(await root.getAttribute("data-motion"), "paused");
  await page.getByRole("button", { name: "02 生长", exact: true }).click();
  assert.equal(await root.getAttribute("data-shape"), "branch");
  checks.push({ reducedMotionStaticSwitch: true });
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ["", "work/", "research/", "writing/", "about/"]) {
      await page.goto(new URL(route, base).href, { waitUntil: "networkidle" });
      const scroll = await page.evaluate(
        () => document.documentElement.scrollWidth,
      );
      assert.ok(
        scroll <= width + 1,
        "Overflow " + width + " " + route + ":" + scroll,
      );
      checks.push({ width, route, pass: true });
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.screenshot({
    path: "output/playwright/archive/home-fold-390.png",
  });
  const shapeButton = page.getByRole("button", {
    name: "03 地形",
    exact: true,
  });
  await shapeButton.focus();
  await page.keyboard.press("Enter");
  assert.equal(await root.getAttribute("data-shape"), "terrain");
  checks.push({ keyboardShapeSwitch: true });
  const staticContext = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const staticPage = await staticContext.newPage();
  await staticPage.goto(base, { waitUntil: "networkidle" });
  assert.ok(await staticPage.locator(".instrument-fallback").isVisible());
  assert.equal(
    await staticPage
      .getByRole("navigation", { name: "无脚本主导航" })
      .getByRole("link")
      .count(),
    4,
  );
  assert.equal(await staticPage.locator(".shape-select").isVisible(), false);
  assert.equal(await staticPage.locator("main h1").count(), 1);
  assert.equal(
    (await staticPage.locator('main a[href^="/work/"]').count()) > 0,
    true,
  );
  checks.push({ noScriptFallback: true });
  assert.deepEqual(errors, []);
  await fs.writeFile(
    "output/playwright/archive/instrument-results.json",
    JSON.stringify({ checks, errors }, null, 2),
  );
  console.log(
    "PASS " +
      checks.length +
      " instrument, fallback and supplemental responsive checks",
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
