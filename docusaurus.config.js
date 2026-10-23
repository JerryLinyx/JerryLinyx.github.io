import { themes as prismThemes } from "prism-react-renderer";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import legacyRedirects from "./scripts/legacy-redirects.json";
import rehypeAccessibleScroll from "./scripts/rehype-accessible-scroll.mjs";

const config = {
  title: "Yuxuan Lin",
  tagline: "Thinking in systems. Building with AI.",
  favicon: "img/monogram.svg",
  url: "https://jerrylinyx.github.io",
  baseUrl: process.env.SITE_BASE_URL || "/",
  trailingSlash: true,
  organizationName: "JerryLinyx",
  projectName: "JerryLinyx.github.io",
  deploymentBranch: "master",
  onBrokenLinks: "throw",
  onBrokenAnchors: "throw",
  onBrokenMarkdownLinks: "throw",
  i18n: { defaultLocale: "zh-Hans", locales: ["zh-Hans"] },
  markdown: { format: "detect", mermaid: true },
  themes: ["@docusaurus/theme-mermaid"],
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.js",
          exclude: ["plans/**"],
          editUrl:
            "https://github.com/JerryLinyx/JerryLinyx.github.io/edit/codex/root-site/",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex, rehypeAccessibleScroll],
        },
        blog: {
          blogTitle: "Journal",
          blogDescription: "技术探索与学习记录 · Yuxuan Lin",
          showReadingTime: true,
          postsPerPage: 8,
          feedOptions: { type: ["rss", "atom"], xslt: true },
          editUrl:
            "https://github.com/JerryLinyx/JerryLinyx.github.io/edit/codex/root-site/",
          onInlineTags: "ignore",
          onInlineAuthors: "throw",
          onUntruncatedBlogPosts: "ignore",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex, rehypeAccessibleScroll],
        },
        theme: {
          customCss: [
            "./src/css/custom.css",
            "./node_modules/katex/dist/katex.min.css",
          ],
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/404.html"],
        },
      },
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: legacyRedirects,
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "plog",
        routeBasePath: "plog",
        path: "./plog",
        blogTitle: "Photo log",
        blogDescription: "在代码之外，记录生活。",
        showReadingTime: true,
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex, rehypeAccessibleScroll],
      },
    ],
  ],
  themeConfig: {
    image: "img/social-card.png",
    metadata: [
      { name: "author", content: "Yuxuan Lin" },
      { name: "theme-color", content: "#f6f5ef" },
    ],
    colorMode: {
      defaultMode: "light",
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: { title: "Yuxuan Lin", items: [] },
    footer: { style: "light", copyright: "Yuxuan Lin" },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "python", "cpp", "go"],
    },
    mermaid: { theme: { light: "neutral", dark: "dark" } },
  },
};
export default config;
