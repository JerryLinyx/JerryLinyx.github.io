import { posts, legacy } from "../lib/content.mjs";
import { projects, moreProjects } from "../data/portfolio.js";
export function GET() {
  const urls = [
    "/",
    "/work/",
    "/research/",
    "/writing/",
    "/life/",
    "/life/singapore/",
    "/about/",
    "/archive/",
    "/archive/cv/",
    ...posts.map((p) => p.url),
    ...[...projects, ...moreProjects].map((p) => `/work/${p.slug}/`),
    ...legacy.articles.map((p) => p.archive),
    ...legacy.extras.map((p) => p.archive),
  ];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((u) => `<url><loc>https://jerrylinyx.github.io${encodeURI(u)}</loc></url>`).join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml" } },
  );
}
