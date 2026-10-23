---
title: Website redesign implementation plan
sidebar_class_name: hidden
---
# Personal website implementation plan

> The later root-domain decision supersedes the original `/Doc/` hosting choice. See [root migration](2026-10-23-root-migration.md).

**Goal:** Complete a coherent portfolio, research archive and searchable technical notebook without losing existing real content.

**Architecture:** Retain Docusaurus 3.8.1 and its static routing, Markdown, math and blog support. Store portfolio content in shared data and import the explicitly public Obsidian directory through a repeatable, validated sync script. Keep GitHub Pages `/Doc/` as canonical; the root domain contains a separate legacy blog.

**Tech stack:** React 19, CSS modules, Docusaurus, remark-math, KaTeX, Mermaid, GitHub Actions.

## Decisions
- Editorial engineering notebook: warm paper, ink, chartreuse, serif display and legible sans body; original SVG flow-field artwork instead of stock imagery.
- Home leads from identity to selected work, published research, field notes, experience and contact.
- Project detail pages explain scope, engineering decisions and source links; only supplied resume claims.
- Notes directory provides client-side text search and topic filtering. Content remains statically rendered and accessible without search.
- Preserve legacy article paths and real plog entries. Remove framework demos and empty personal drafts from public navigation.
- Use reduced-motion support, semantic landmarks, visible keyboard focus and responsive layouts.

## Execution
1. Update shared profile/project data and build complete home and project pages.
2. Implement public notebook importer with image validation and route conversion; add topic/search index.
3. Unify document/blog styles and navigation; remove template pages and sample author metadata.
4. Add reproducible dependencies, CI build and Pages deployment. Document repo/domain consolidation and maintenance.
5. Run production build with broken-link enforcement; verify desktop/mobile layout, navigation, filters, project pages and notes in a browser.
6. Record observed QA results and remaining external publishing constraints.
