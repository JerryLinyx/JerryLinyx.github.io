# Publishing and content consolidation

Updated decision after the user explicitly requested root-domain consolidation: **https://jerrylinyx.github.io/** is the canonical personal website.

- One remote repository: `JerryLinyx/JerryLinyx.github.io`.
- Source and content: `codex/root-site`.
- Published static output: `master`, retaining the repository’s existing Pages arrangement.
- Former Doc/CV content and Git histories are merged into the root repository before repository retirement.
- `/archive/` is the unified archive. Known old URLs are generated as compatibility redirects.
- `npm run deploy` builds, verifies and publishes through a normal fast-forward Git push. It never reads or exports GitHub credentials.

The earlier `/Doc/` deployment recommendation is superseded by this decision. Full inventory, release gates and content preservation details are recorded in [root migration](2026-10-23-root-migration.md).

The separate local `myBlog` Hugo project also has `baseURL: https://JerryLinyx.github.io/`; it has no Git remote or committed history. Its full DPI note is consolidated with the corrected current note, and its original Markdown/config is preserved in the source archive.

Root publication must be verified before the old Doc/CV repositories are deleted. GitHub administration through the UI requires account sign-in; permanent deletion requires action-time confirmation under the browser tool policy.
