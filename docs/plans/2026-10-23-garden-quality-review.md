> Historical garden-map phase. The current minimal-zine style and curation review are documented in [zine review](2026-10-23-zine-quality-review.md). Content counts and art direction below describe the earlier version.

# Digital garden acceptance review

Date: 2026-10-23. Target: https://jerrylinyx.github.io/.

## Delivered architecture and content

A complete replacement of Docusaurus/React with Astro 7 static output and native CSS/JavaScript. No UI framework or theme remains in the dependency graph. Work, research, writing and life are equal top-level sections. About and historical archive are secondary. Original SVG navigation, restrained motion, locally hosted typography and original personal photography define the visual system.

- Six complete project pages, including the three previously featured projects plus CUDA–LeNet5, LOS and AID3.
- Research publication and three connected learning trails.
- 25 learning notes and 18 articles searchable by full text (including code), type and topic. Search/filter state is shareable in the URL. An accessible empty/reset state is implemented.
- Original nine-photo Singapore gallery with native dialog, next/previous, keyboard Escape and restored opener focus.
- Current biography, education, experience, tools, print layout and working contact links.
- All 17 original historical editions, old CV and populated links page preserved.
- Existing root content aliases point to the corresponding new pages. Doc/CV URL prefixes remain absent from the build and both project Pages sources remain `None`.
- Feed, sitemap, canonical metadata, Person structured data, raster social card, custom 404 and `.nojekyll` publication marker included.

## Verification results

| Check | Result |
| --- | --- |
| Production build | 186 static HTML pages including compatibility redirects |
| Internal references | 2,395 rendered internal links/assets resolve |
| Retired prefixes | No `/Doc/` or `/CV/` output; verifier rejects them |
| Browser acceptance | 105 layout/content/interaction checks passed |
| Responsive supplement | 15 checks at 320, 768 and 1024 CSS pixels passed |
| Accessibility | 34 desktop/mobile axe cases; zero WCAG 2 A/AA or 2.1 AA tagged violations |
| Content | All 43 published entries and 17 historical editions checked |
| Formulas | Zero rendered KaTeX parse errors; build verifier enforces this |
| Runtime/assets | Zero page errors or failed local asset responses in acceptance runs |
| Interaction | Mobile menu, query restoration, Chinese/full-text search, empty/reset, gallery navigation, Escape/focus and compatibility routes pass |
| Typography/code | Source formats with Prettier and Astro plugin; Git whitespace check passes |

## Self-review and fixes

- **Information architecture:** Four equal primary interests replace the portfolio-first/document-site structure. Publication and research trails have a dedicated page. No redundant empty section or placeholder is exposed.
- **Typography and spacing:** Chinese editorial titles, clear index metadata, controlled line lengths and a consistent vertical rhythm. Reading pages use a quiet layout, a desktop contents column and a collapsed mobile contents control.
- **Hierarchy and color:** Forest green anchors navigation and body text; terracotta accents and distinct garden areas establish hierarchy. Muted and accent colors were darkened after measured contrast findings; code highlighting was adjusted for the actual paper background.
- **Motion and interactions:** Only deliberate hero entrance, hover and image-scale motion. Reduced-motion disables these. Visible focus, native controls and dialogs, keyboard scroll access and a skip link are included.
- **Responsive behavior:** Main grid collapses into natural reading order. Long inline equations inside lists were corrected to scroll within their container; code scrolling belongs to the focusable `pre`. No whole-page overflow masking is used.
- **Content integrity:** Some previously published Markdown consisted mostly of comments; these entries now render the preserved original body instead of an empty page. Obsidian display-math delimiter formatting is normalized outside code without changing expressions. Historical inline equation tags render in display mode where required by KaTeX.
- **Originality:** A custom garden-plan SVG is a real navigation surface. Personal photography, project-specific visuals and editorial layouts are authored for this site. No stock template or generated raster artwork is used.
- **Performance:** Main native interaction module is approximately 8.5 KB before compression. Mermaid is dynamically imported only when diagram code is present. Photos are converted to appropriately sized WebP; font and content requests remain local. Static HTML is readable without JavaScript; search and gallery enhancement require it.

## Evidence and limits

Local evidence: `output/playwright/garden/browser-results.json`, `a11y-results.json`, `responsive-extra.json`, and desktop/mobile screenshots. These outputs are intentionally ignored. Tests use real headless Chrome on macOS, not physical iOS/Safari. Automated accessibility results apply only to the named rules; no award certification or universal browser compliance is claimed.

Deployment uses the existing normal Git publisher with a source/publish parent chain and no force push. Actual live checks are recorded separately in ignored release evidence after publication; this document reports the completed local acceptance.

## CI portability correction

The first source CI run exposed a case-sensitive Linux filename mismatch (`Lenet.png` versus `lenet.png`) that macOS had accepted. The source name now matches Git exactly, and the asset preparer explicitly checks filename case on every platform. CI uses Node 26, matching the tested local major version, rather than the runner’s cached Node 22 patch below Astro’s minimum. The Pages deployment and live site were unaffected; the corrected CI must pass before final handoff.
