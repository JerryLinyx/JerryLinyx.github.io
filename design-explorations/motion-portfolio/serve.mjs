import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
const root = path.dirname(new URL(import.meta.url).pathname);
const files = new Map([
  ["/", [path.join(root, "index.html"), "text/html; charset=utf-8"]],
  [
    "/portrait.webp",
    [path.resolve(root, "../../static/media/portrait.webp"), "image/webp"],
  ],
  [
    "/fonts/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk4aE-_F.ttf",
    [
      path.resolve(
        root,
        "../../static/fonts/xn7_YHE41ni1AdIRqAuZuw1Bx9mbZk4aE-_F.ttf",
      ),
      "font/ttf",
    ],
  ],
]);
http
  .createServer(async (req, res) => {
    try {
      const file = files.get(new URL(req.url, "http://localhost").pathname);
      if (!file || !["GET", "HEAD"].includes(req.method)) {
        res.writeHead(404);
        res.end();
        return;
      }
      const body = await fs.readFile(file[0]);
      res.writeHead(200, {
        "Content-Type": file[1],
        "Cache-Control": "no-store",
      });
      res.end(req.method === "HEAD" ? undefined : body);
    } catch {
      res.writeHead(404);
      res.end();
    }
  })
  .listen(3093, "127.0.0.1", () =>
    console.log("Portfolio directions: http://127.0.0.1:3093/"),
  );
