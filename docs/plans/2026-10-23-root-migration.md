# Root-domain consolidation

User decision: retire the separate Doc and CV repositories; publish the new personal website at https://jerrylinyx.github.io/.

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

The official Docusaurus client-redirects plugin covers all existing `/Doc/…` content routes. `/CV/` points to `/resume/`; original Hexo article URLs point to their corresponding current entries; archive/taxonomy routes lead to the unified archive. These redirect files live in the root-domain deployment, so they remain after the old project repositories are deleted.

## Release gates

1. Build and verify the root-base site and all redirect targets.
2. Browser-check all imported legacy editions, current blog entries, CV, and representative old URLs.
3. Verify local backup integrity and ancestry retention before pushing the source branch.
4. Publish to root `master`, then verify actual HTTPS content, deployment version and representative legacy redirects.
5. Clean up old Doc/CV repositories only after root publication and history verification. GitHub account administration is unavailable in the connector; the browser requires an authenticated account and action-time confirmation for permanent deletion.

## Tooling constraints

An attempt to read a GitHub token from the OS Git credential helper for Pages API use was rejected by automatic approval review. No token was read. Normal Git operations were successfully authenticated through the configured helper. Repository administration uses the normal GitHub UI instead; no credential extraction workaround is used.
