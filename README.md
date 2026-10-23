# 林煜轩 · 个人数字花园

Published website: **https://jerrylinyx.github.io/**

A custom Astro static website with equal space for work, research, writing and life. Docusaurus, React, the former theme and the old document navigation have been removed. Pages are rendered to HTML at build time; small native JavaScript modules handle search, the mobile menu, reading controls and the gallery. Mermaid is loaded only on pages with diagrams.

## Start and verify

Requires Node **22.23.4 or newer**. CI uses the latest Node 22 release.

```sh
npm ci
npm start
```

```sh
npm run build
npm run verify:site
npm run serve -- --port 3091 --host 127.0.0.1
```

Build output: `build/`. The build prepares content assets and optimizes the original photographs; it never needs iCloud access. Astro telemetry is disabled in the project commands.

Browser QA requires Chrome on macOS, or a Playwright Chromium installation and `CHROME_EXECUTABLE` set to its executable:

```sh
npm run qa:browser
npm run qa:a11y
```

`PREVIEW_URL` overrides `http://127.0.0.1:3091/`. Results and screenshots are saved in ignored `output/playwright/garden/`.

## Page distribution

| Section | Route | Content |
| --- | --- | --- |
| Garden | `/` | Four equal interest areas and a custom linked garden map |
| Work | `/work/` | Six projects with complete case studies |
| Research | `/research/` | ISBI publication, research project and connected learning trails |
| Writing | `/writing/` | 18 articles and 25 notes, full-text search, topic/type filters, shareable queries |
| Life | `/life/` | Personal photo journal and Singapore gallery |
| About | `/about/` | Biography, education, experience, tools and printable profile |
| Archive | `/archive/` | 17 original Hexo editions, historical CV and old links |

RSS: `/feed.xml`. Sitemap: `/sitemap.xml`. No external analytics or runtime font requests.

## Source organization

- `astro.config.mjs`: static build and root-domain settings.
- `src/layouts/Base.astro`: global document, navigation and footer.
- `src/styles/garden.css`: design tokens, complete responsive layouts, print and reduced-motion styles.
- `src/scripts/garden.js`: native browser interactions.
- `src/components/GardenMap.astro`: original SVG navigation artwork.
- `src/data/portfolio.js`: verified project, experience and profile information.
- `src/lib/content.mjs`: Markdown, KaTeX, highlighting, old-content mapping and historical HTML rendering.
- `docs/notes/`: 25 imported Obsidian public notes. The eight excluded outlines remain unpublished.
- `blog/`: authored article sources. Explicit drafts are excluded. Previously published articles whose current Markdown is mostly commented out use the preserved original HTML so their reading pages remain complete.
- `plog/`: original photography and captions, preserved as source material.
- `src/data/legacy.json`: preserved original HTML editions and historical CV.
- `scripts/prepare-garden.mjs`: deterministic content asset copying and WebP photography preparation.
- `scripts/verify-site.mjs`: rendered link/assets, homepage and retired-prefix checks.
- `scripts/qa-garden.cjs`: viewport, content, interactions, redirects and axe verification.

`static/content/` and `static/media/` are generated and ignored; the source material is tracked. Other original public assets remain available for historical links. Article source is not rewritten by the build.

To resync the authorized Obsidian Public folder:

```sh
npm run sync:notes -- '/absolute/path/to/MyBook/Public' '/absolute/path/to/MyBook/GitBook'
```

The optional second directory is an asset-only fallback. The importer never modifies the vault or imports private Markdown. Commit the generated notes and metadata before publication.

## Publication and retired sites

One repository: `JerryLinyx/JerryLinyx.github.io`. Maintained source: **`codex/root-site`**. Generated GitHub Pages output: **`master`**.

```sh
git push origin codex/root-site
npm run deploy
```

The publisher requires a clean, pushed source commit, builds and verifies the site, then makes a normal fast-forward push to `master`. Publication records `/site-version.json` and preserves both the preceding deployment and exact source commit as parents. Credentials are handled by normal Git authentication; no tokens are extracted.

**Doc and CV repositories must remain intact, and their websites must remain unpublished.** Both Pages sources were set to `None`; `/Doc/` and `/CV/` have no redirects and must return HTTP 404. Build verification rejects either prefix. Former root content routes (`/notes/`, `/blog/…`, `/docs/notes/…`, `/projects/…`, `/resume/`) map to the new corresponding routes. Date-based Hexo links and `/archive/…` originals are preserved.

Full previous root, Doc and CV Git histories remain reachable through consolidation commit `cc2311cb262602eb23faabbb6bc71d747154ac0f`. Local full mirrors are retained under ignored `.migration/backups/`. Earlier design/deployment reports document previous versions; the current design and acceptance review are in `docs/plans/2026-10-23-digital-garden.md` and `docs/plans/2026-10-23-garden-quality-review.md`.
