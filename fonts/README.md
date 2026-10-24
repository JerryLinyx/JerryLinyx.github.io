# Locally hosted fonts

- **Latin — Noto Sans** (variable, 100–900), bundled from the `@fontsource-variable/noto-sans` package under the SIL Open Font License.
- **CJK — Site Song** (`site-song.woff2`), a derived program of LXGW Neo ZhiSong v1.070 by LXGW, itself based on IPAmj Mincho by the Information-technology Promotion Agency, Japan. The file keeps only the characters this website uses and was renamed as the license requires. `scripts/subset-fonts.mjs` regenerates it from the original font at every build.

Site Song is distributed under the IPA Font License Agreement v1.0 ([IPA-Font-License.md](IPA-Font-License.md)). To replace it with the original program, download `LXGWNeoZhiSong.ttf` from https://github.com/lxgw/LxgwNeoZhiSong/releases/tag/v1.070 and use it in place of `site-song.woff2`.

No runtime font request is sent to a third party.
