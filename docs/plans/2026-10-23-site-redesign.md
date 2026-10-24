# Site redesign — single system, original text

Supersedes every earlier plan in this folder (garden, zine, scientific archive, motion research, quality reviews). Those documents remain in Git history.

## Content rules

1. **Original text wins.** When a fact or sentence exists in an original source, the site uses that wording:
   - Profile, education, experience, research and project list: `src/pages/resume.md` at `c6b57ce` (the last pre-rebuild site).
   - Project case studies: `src/data/portfolio.js` at `c6b57ce`; the three later case studies take their summaries from the same resume.
   - Writing landing copy and reading routes: `docs/intro.md` ("从一个问题开始").
   - Photography: `plog/2025-07-10-Singapore/index.mdx` (titles, alt text, captions, "Water & Light", "Behind the Frame").
   - Site description: original homepage meta description.
   Copy invented during later art directions (manifestos, "observatory", "specimen", form-study labels) is removed.
2. **One subject, one place.** Each topic has one canonical page; other pages link to it rather than repeating it.
   - `/research/` folded into `/about/#research` (the publication) and `/writing/` (reading routes). Old URL redirects.
   - `/life/singapore/` folded into `/life/` (only one album). Old URLs redirect.
   - Project facts live only in `src/data/portfolio.js`; home, work and about read from it.
3. Article/note bodies, curation merges and legacy archive behaviour are unchanged.

## Information architecture

| Route | Job |
| --- | --- |
| `/` | Who I am in one screen; selected work; latest writing; photography; contact |
| `/work/` + `/work/:slug/` | Six projects; case study = context, decisions, outcome |
| `/writing/` + reader | Reading routes, full-text search, type/topic filters |
| `/life/` | Singapore · Water & Light |
| `/about/` | Original resume content, publication, tools, printable |
| `/archive/` | Historical editions (footer) |

## Design system

Direction: learns from the Kimi brand films (retro computer, science as metaphor, fractal self-similarity, archive objects, a black end card) without copying their footage, branding or flashing.

- **Hero, a retro computer:** a CSS-built cream/lavender desktop. Its terminal "runs" `sample.py`, then particles sampled from Gaussian noise are transported along a velocity field until they write 林煜轩 on the screen, in reference to the PET reconstruction / flow-matching research. The `t` fader and the 重新采样 key on the case control the flow; the pointer perturbs it. Without JavaScript the screen shows the name; under reduced motion the finished state.
- **Interlude, 同一种生长:** a black band with nine self-similar structures generated live by code (lightning, river, vessels, leaf veins, snowflake, binary tree, galaxy, DNA, point-cloud terrain). Calm cadence (grow 1.5 s, hold 1.7 s, fade 0.45 s), never a strobe; pause and next controls; stops offscreen; a still under reduced motion.
- **End card:** the footer is a black card with a large white 林煜轩.
- **Desk puzzle:** the 404 page arranges a ruler, pencils, paper strips and a magnifier into "404" (找找这个数字。).
- **Archive plates:** project figures sit on white plates with crop marks.
- **Colour:** paper 米白 `#EEECE6`, ink `#18171C`, muted `#5E5C66`, rule `#D2CFC5`, lavender `#C7C0EE`, signal violet `#5B4BD6` (links, focus), night `#000` for the interlude and end card. Dark mode keeps the computer as a physical cream object.
- **Type:** Noto Sans for Latin text and Site Song (a renamed subset of LXGW Neo ZhiSong, regenerated at build) for Chinese; system mono only inside the terminal and the montage readout.
- **Layout:** 12-column grid, left aligned; lists over cards.

## Verification

`npm run build`, `npm run verify:site`, `npm run qa:browser` (1440 / 390 widths, overflow, single h1, images, axe, search, lightbox, menu), then a screenshot critique pass across typography, whitespace, hierarchy, colour, motion, micro-interaction, responsiveness and originality — repeated until no obvious improvement remains.
