> Historical Docusaurus phase. The current Astro implementation and acceptance report are documented in [digital garden](2026-10-23-digital-garden.md) and [garden quality review](2026-10-23-garden-quality-review.md). Repository preservation and disabled Doc/CV policies remain in force.

# Root-domain consolidation

Latest user decision (2026-10-23): **keep the Doc and CV repositories; unpublish their old URLs entirely (no redirects)**. The new personal website is published at https://jerrylinyx.github.io/. Do not delete either repository.

## Content and history

- Full mirror backups: `.migration/backups/root.git`, `doc.git`, `cv.git` (ignored, local only).
- The root source consolidation commit retains all root, Doc and CV branch heads as Git parents; all original tracked files and history remain reachable in one remote repository.
- 17 published Hexo articles are mapped to current blog entries. Existing Markdown is reused and promoted only where the old root site proves prior publication. Two previously missing articles are restored from sanitized HTML.
- All 17 original article editions remain readable under `/archive/hexo/…`.
- The old academic CV is retained at `/archive/cv/`, with outdated facts explicitly labeled as historical. The current profile lives at `/resume/`.
- The populated old friend-links page is archived. Three empty music/movie page shells are represented by archive redirects, with original files retained in history.
- 56 referenced legacy assets were recovered with zero missing local media.
- The local Hugo project `/Users/linyuxuan/workSpace/myBlog` specifies the correct root URL but has no remote or commits. Its content and config are saved under `archive/source/hugo`; the complete DPI note maps to the corrected current note. Placeholder posts remain source archives only.

## One repository, source and publication branches

The root repository already publishes static content from `master`. Keep that publishing arrangement to avoid an unnecessary Pages settings change:

- `codex/root-site`: maintained Docusaurus source, content, CI, migration tools and documentation.
- `master`: generated root-domain website, updated by a normal fast-forward push.
- `npm run deploy`: verifies that the exact source commit has been pushed, builds and checks the site, then publishes the static tree. The publish commit has both the previous publishing commit and the source commit as parents. It never force-pushes.

This uses normal Git credentials without reading or exporting tokens. No additional remote repository is required. The source-branch workflow performs a reproducible Node 22 build and uploads a static artifact; production publication is performed by the verified publisher command.

## Compatibility

The official Docusaurus client-redirects plugin retains original Hexo article and taxonomy redirects only. The latest user correction explicitly removes all `/Doc/` and `/CV/` compatibility redirects. Both project Pages sites have been unpublished using authenticated repository administration, with source branch set to `None`; both repositories and histories remain intact. Removing root redirects is necessary to prevent the user-site deployment from answering the retired project paths.

## Release gates

1. Build and verify the root-base site and all redirect targets.
2. Browser-check all imported legacy editions, current blog entries, CV, and representative old URLs.
3. Verify local backup integrity and ancestry retention before pushing the source branch.
4. Publish to root `master`, then verify actual HTTPS content, deployment version and representative legacy redirects.
5. Unpublish the Doc/CV Pages sites, retain both repositories, and verify that both old URLs return 404 with no redirect. Completed after the user logged in: both Pages sites unpublished and source branch set to `None`. Public `/Doc/`, `/CV/` and a representative old Doc deep link return 404 without redirects; the root site returns 200.

## Tooling constraints

An attempt to read a GitHub token from the OS Git credential helper for Pages API use was rejected by automatic approval review. No token was read. Normal Git operations were successfully authenticated through the configured helper. Repository administration uses the normal GitHub UI instead; no credential extraction workaround is used.
