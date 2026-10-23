# Root migration acceptance review

Date: 2026-10-23. Canonical website: https://jerrylinyx.github.io/.

## Content preserved

- 17 original published Hexo articles mapped to current entries; two missing entries restored.
- All 17 original article editions retained as readable historical snapshots.
- Full old CV and populated friend-links page retained.
- 56 referenced legacy media files recovered; zero missing original local media.
- Local Hugo configuration and content archived; complete DPI note consolidated with its corrected current edition. Tiny test posts retained in the source archive, not published as real articles.
- Full root, Doc and CV histories retained through the four-parent source consolidation commit `cc2311cb262602eb23faabbb6bc71d747154ac0f`.
- Full mirror backups independently pass `git fsck --full` and remain local under `.migration/backups/`.

## Checks passed

| Check | Result |
| --- | --- |
| Root production build | 299 rendered HTML files, including compatibility redirects |
| Internal references | 4,704 local link / media references resolve |
| Existing site browser tests | 50 viewport / route checks pass |
| Migration browser tests | 97 historical edition / current article / CV / viewport / old-URL checks pass |
| Accessibility | 13 axe cases; zero WCAG 2 A / AA and WCAG 2.1 AA tagged violations |
| Runtime / media | No browser JavaScript errors or missing local image responses |
| Original URL redirects | 17 old article paths, `/Doc/`, representative `/Doc/…` routes, `/CV/`, Hugo DPI and archive paths tested |
| Formatting | Maintained code passes Prettier; Git diff checks allow intentional Markdown hard breaks and verbatim archive/license whitespace |

## Refinements found during migration

- Old code highlighter tables were converted to readable code blocks while retaining line breaks.
- Historical document containers explicitly fit narrow viewports.
- Old inline and display math have contained horizontal scrolling.
- Long code blocks, tables and formulas are keyboard-focusable when scrolling is required.
- Legacy snapshots have one primary heading and clearly distinguish historical facts from current profile information.
- Original analytics/scripts, forms, inline event handlers and legacy theme behavior are removed from rendered snapshots. Original source remains reachable in Git history.

## Publication arrangement

One repository contains maintained source on `codex/root-site` and generated root-domain output on `master`. The publisher uses a normal fast-forward Git push and records the source commit at `/site-version.json`. Its deployment commit retains both the preceding deployment and exact source commit as parents. No token is read or exported by the publisher.

Root publication is live and verified over HTTPS. Source CI and root Pages deployment succeeded. The Doc and CV repositories are retained per the latest user decision; their replacement redirect deployments both succeeded. A deployment-transition chunk loading error during the initial live check did not recur in the full repeated check; all seven public route checks passed with zero browser errors. Older `/Doc/` design reports describe the pre-consolidation phase; this document and `2026-10-23-root-migration.md` supersede their deployment recommendation.

Browser QA used headless Chrome, not a physical iOS device or Safari session. Automated accessibility checks are scoped to their named rules. Files under `output/playwright/` contain the detailed results and screenshots and are intentionally not committed.

## Latest correction: unpublish old URLs

The user clarified that preserving repositories does not mean retaining redirect sites. All root `/Doc/` and `/CV/` redirect generation is removed. Previous redirect acceptance results above are historical and superseded for those prefixes. Unpublishing both project Pages sites is pending authenticated Pages administration. Do not report the old links as down until public 404 responses are verified.
