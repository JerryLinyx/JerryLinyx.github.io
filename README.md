# Yuxuan Lin · Personal website

Portfolio, research, public technical notebook and photo journal. Built with Docusaurus 3.8.1 and React 19; all content is rendered as a static website.

## Run locally

Use Node.js 22 LTS (the same version as CI):

```sh
npm ci
npm start -- --host 127.0.0.1
```

Open `http://localhost:3000/`.

```sh
npm run build
npm run verify:site
npm run serve -- --host 127.0.0.1
```

`build/` is deployable output. The verifier checks rendered internal links and assets. Production builds fail for broken page / Markdown links.

## Content

- `src/data/portfolio.js`: shared project and experience content.
- `src/pages/index.js`: custom portfolio homepage.
- `src/pages/projects/`: complete project detail routes.
- `src/pages/resume.md`: public profile; browser printing is supported.
- `src/pages/notes.js`: full-text notebook search and topic filtering; query and topic persist in the URL.
- `docs/notes/`: generated public Obsidian content and resolved image assets.
- `blog/`: existing authored articles with original slugs preserved.
- `plog/`: original Singapore photo journal.

The homepage and reading pages share a warm-paper / ink / chartreuse palette, locally hosted Instrument Serif and Manrope fonts, and a custom navigation/footer. The SVG hero is original generative artwork, not a model output or scientific result. Motion respects `prefers-reduced-motion`.

## Sync the public notebook

```sh
npm run sync:notes -- '/absolute/path/to/MyBook/Public' '/absolute/path/to/MyBook/GitBook'
```

The second directory is an optional **asset-only** fallback for old image filenames still referenced in Public. The script never modifies the source vault or imports private Markdown from the fallback. It resolves and validates all images before writing, normalizes Obsidian links and heading levels, repairs Mermaid edge-label syntax, preserves other fenced code and converts PNG diagrams to lossless WebP when smaller and records excluded drafts in `scripts/notes-manifest.json`. Only previously generated files can be removed by sync. Commit generated content so CI never requires iCloud access.

Current import: 25 notes, 40 images. Eight empty, very short or explicitly unfinished outlines are excluded from publication. The original Public landing page is replaced by a curated reading map at `/docs/intro/`.

## Deployment and consolidation

Canonical target: **https://jerrylinyx.github.io/**

Source repository: **https://github.com/JerryLinyx/JerryLinyx.github.io**. Maintained source: `codex/root-site`; published static output: `master`.

See [root consolidation](docs/plans/2026-10-23-root-migration.md). The source branch workflow builds and verifies changes with Node 22 and uploads an artifact. To publish using normal Git credentials:

```sh
git push origin codex/root-site
npm run deploy
```

The publisher requires a clean, pushed source commit, builds and verifies the site, then fast-forwards the static `master` branch. It does not force-push, modify Pages settings or extract tokens. `master` retains both the previous deployment and source commit as parents. The existing root Pages publishing setup is preserved.

`/archive/` unifies 17 original Hexo articles, their exact historical editions, the old CV and the populated legacy links page. `archive/source/hugo/` retains the local Hugo project content and configuration. Original Git histories are reachable in this same repository. The Doc and CV repositories are preserved per the latest user decision. Their former websites publish lightweight redirects to the new site; `/Doc/`, `/CV/`, article and taxonomy compatibility redirects also exist in the root deployment. Do not delete the old repositories.

For another hostname at its root, set `SITE_BASE_URL=/` for the build and change `url` in `docusaurus.config.js`. Update the Person structured-data URL in `src/pages/index.js` if moving the canonical site. No hosting service credentials are stored in the project.

Browser checks: `npm run qa:browser` and `npm run qa:a11y` against a running preview. On macOS, set `CHROME_EXECUTABLE` to the Chrome executable; otherwise run `npx playwright install chromium` once. `PREVIEW_URL` overrides the default `http://127.0.0.1:3087/`.

## Quality checks

```sh
npm run build
npm run verify:site
```

Browser QA and actual results are recorded in `docs/plans/2026-10-23-quality-review.md`. Screenshots are local verification artifacts in `output/playwright/`.
