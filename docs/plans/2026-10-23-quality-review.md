# Website quality review

> Historical pre-migration report. Deployment decisions are superseded by [root migration](2026-10-23-root-migration.md); current migration checks are in [root quality review](2026-10-23-root-quality-review.md).

Completed 2026-10-23. Scope: the completed local refactor and static production build, before any remote release.

## Final verification

| Check | Result |
| --- | --- |
| Production build | PASS — 73 rendered HTML pages; broken page, Markdown and registered anchor checks enabled |
| Internal references | PASS — 2,950 internal link / asset references resolve |
| Browser acceptance | PASS — 50 viewport / page combinations |
| Runtime and HTTP | No browser JavaScript errors or failed local asset responses |
| Interactive behavior | Flow / structure toggle; mobile menu and Escape; project links; notebook search, topic filters, empty-state reset and shared query URLs |
| Notes | All 25 published notes checked at mobile width; formulas, tables and images fit the page |
| Mermaid | Both CUDA diagrams render after imported edge-label syntax repair |
| Accessibility | Nine desktop / mobile cases, zero axe violations for WCAG 2 A / AA and WCAG 2.1 AA tags |
| Import reproducibility | Repeated import produces byte-identical generated notes, index and images |
| Patch whitespace | `git diff --check` passes |

Browser checks used headless Google Chrome, with desktop width 1440 and responsive widths 320, 390, 768 and 1024. Main routes and all imported notes were checked at 390px. This is responsive browser verification; physical iOS devices, Safari and assistive-technology sessions were not tested. Automated accessibility checks cover their named rules, not every possible accessibility concern.

## Design review against the requested dimensions

| Dimension | Implementation and review |
| --- | --- |
| Typography | Locally hosted Instrument Serif / Manrope; Chinese reading fallbacks; clear display, body and code hierarchy; corrected code-token contrast |
| Whitespace | Generous page gutters; asymmetric portfolio sequence; compact note rows; mobile spacing adjusted separately |
| Hierarchy | Identity → selected projects → publication → notebook → experience → contact; independent reading map and complete project routes |
| Color | Warm paper, dark ink and chartreuse; project visuals vary within the same system; dark research panel and bright closing contact section |
| Motion | Staggered entrance and restrained SVG movement; reduced-motion preference disables animation; no scroll hijacking |
| Microinteractions | Working visual toggle, project-arrow feedback, row hover, search/filter states, keyboard-visible focus and mobile menu |
| Responsive behavior | Single-column mobile portfolio; independent collapsible notebook navigation; scrollable keyboard-focusable long equations and tables |
| Originality | Original procedural SVG hero and project-specific graph / execution-trace artwork, grounded in the person's AI and systems work |

These are internal design and usability acceptance checks. The website has not been submitted to or evaluated by Awwwards, Webby Awards or FWA.

## Issues found and resolved during verification

- Framework demos, sample authors and unfinished placeholder pages were removed or replaced with real navigation content.
- Missing notebook image filenames were resolved against the exact matching legacy assets; private Markdown from the fallback directory was not imported.
- Imported headings are normalized without modifying fenced examples. Mermaid edge labels are quoted when needed.
- Custom navigation now retains the framework marker needed by reading-page TOC logic, preventing the observed hydration error.
- Mobile notebook navigation no longer depends on the removed stock navbar drawer.
- Long formulas and tables scroll within the reading column, and are keyboard-focusable.
- Default syntax comment, function and number colors were corrected to meet the tested contrast rules.
- Docusaurus 3.8's preview server incorrectly appends slashes to `.woff2` under a subpath. `npm run serve` now uses a small static server that serves exported files directly, with proper MIME types, path validation and HEAD support.
- Blog and photo indexes use deliberate archive layouts instead of rendering arbitrarily long article excerpts on list pages.

## Performance and content integrity

The notebook contains 25 notes and 40 unique published images. PNG illustrations use lossless WebP only when it is smaller; animation is preserved in its original GIF. Image payload decreased from 16,368,103 to 8,238,461 bytes (about 49.7%). The source vault remains unchanged. Eight empty, short or explicitly unfinished drafts are excluded; their filenames are recorded in `scripts/notes-manifest.json`.

Homepage visuals are local SVG / CSS; fonts are locally hosted with their OFL licenses. Original portrait and research images are retained. Project outcomes are attributed to the supplied resume / project records and include their scope where relevant.

## Evidence and reproduction

- `output/playwright/results.json`: 50 layout / page checks and runtime results.
- `output/playwright/accessibility.json`: nine axe cases.
- `output/playwright/home-desktop.png`, `home-mobile.png`: final full-page screenshots.
- `output/playwright/project-desktop.png`, `notes-search.png`, `notes-mobile.png`, `note-desktop.png`, `note-mobile.png`: representative content and interaction screenshots.

Browser artifacts are intentionally ignored by Git; the scripts and this report are tracked source files.

```sh
npm run build
npm run verify:site
npm run serve -- --port 3087
# In another terminal, with Chrome installed on macOS:
CHROME_EXECUTABLE='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run qa:browser
CHROME_EXECUTABLE='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run qa:a11y
```

## Release state

Source changes and deployable `build/` exist locally. No source branch was pushed, no PR was created, and no live website or repository settings were changed. The canonical recommendation is the verified existing `https://jerrylinyx.github.io/Doc/` URL. The repository's authenticated Pages source setting and the resulting external deployment still need to be confirmed at release time. See `2026-10-23-deployment.md` for the concrete release / domain consolidation sequence.
