import { posts } from "../lib/content.mjs";
export function GET() {
  return new Response(
    JSON.stringify(
      posts.map(({ slug, title, plain, searchText, topic, kind }) => ({
        slug,
        title,
        plain: searchText || plain,
        topic,
        kind,
      })),
    ),
    { headers: { "Content-Type": "application/json; charset=utf-8" } },
  );
}
