# Digital Garden Implementation Plan

**Goal:** Rebuild Yuxuan Lin's website as a personal digital garden, equally weighted between work, research, writing and life.

**Architecture:** Astro produces static HTML for GitHub Pages. Original CSS and small native JavaScript modules provide filtering, mobile navigation, reading interactions and gallery dialogs; there is no React runtime or theme dependency. Markdown and legacy HTML are rendered at build time; source content and Git history remain intact.

**Tech Stack:** Astro, CSS, native browser JavaScript, unified/remark, KaTeX, Mermaid loaded only on diagram pages, Playwright and axe.

## Selection and information architecture

Compared approaches: pure HTML/Vite (minimal runtime but too much manual content maintenance), Astro static output (selected: content and multi-page routing built in), and Next/SvelteKit applications (unnecessary server/application architecture for this deployment).

Primary routes: `/` garden overview, `/work/` complete project index and `/work/[slug]/` case studies, `/research/` publication and research trails, `/writing/` searchable unified articles and notes and `/writing/[...slug]/` reading pages, `/life/` photographic journal and `/life/singapore/`, `/about/` biography and printable profile, `/archive/` historical index and original editions.

The four interests receive equal homepage entry areas. A living collection is presented honestly without fabricated freshness or unfinished promises. Research connects the publication, relevant project and actual learning notes. Writing includes filtering by type and topic, full-text search, shareable query URLs and an accessible empty state. Life uses the original Singapore photography and captions.

Art direction: field journal, warm white / deep forest / terracotta, strong Chinese editorial headings, precise index labels, custom garden-plan SVG navigation, genuine personal photographs. Responsive grid becomes a natural linear reading order; no pointer-only access, custom cursor or forced scrolling. Motion respects reduced motion.

## Execution

1. Inventory all published Markdown, old URLs, assets, original editions and gallery material. Create build-time content adapter with explicit draft handling, math, highlighting, links and stable headings.
2. Replace framework dependencies and routes. Preserve source content, existing publication branch model and disabled Doc/CV URLs. Configure Astro static output into `build/` and adapt publication tooling as necessary.
3. Build shared layout, navigation, footer, tokens and original pages; use real project data and photography. Keep reading layouts quiet and consistent with the main site.
4. Implement search/filter URL state, gallery dialog, copy-link and code-copy interactions, mobile menu, reading progress, visible focus and optional Mermaid rendering.
5. Build all routes and verify internal links/assets, retired-prefix absence, drafts and content counts. Browser-check desktop/mobile, search/deep links, menu, gallery, math/diagrams and archive. Run axe on representative pages and inspect screenshots. Fix observed issues before release.
6. Update maintained documentation and scripts, commit source, push and publish to the existing root URL. Verify live version and representative new/old routes; confirm `/Doc/` and `/CV/` remain HTTP404. Keep the old repositories intact.

## Compatibility policy

Current root content links can redirect to their new counterparts; date-based Hexo and original-edition URLs stay readable. Doc/CV URL prefixes remain unpublished with no redirects. Draft content remains unpublished. No private Obsidian files beyond previously authorized personal/public materials are imported.
