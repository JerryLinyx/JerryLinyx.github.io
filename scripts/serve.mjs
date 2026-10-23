import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";

// Serve static output with explicit MIME types and real 404 status codes.
const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : fallback;
};
const port = Number(option("--port", "3000"));
const host = option("--host", "127.0.0.1");
const base = process.env.SITE_BASE_URL || "/";
const root = path.resolve("build");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".pdf": "application/pdf",
};
await fs.access(path.join(root, "index.html"));
const server = http.createServer(async (req, res) => {
  try {
    if (!["GET", "HEAD"].includes(req.method)) {
      res.writeHead(405);
      res.end();
      return;
    }
    const url = new URL(req.url, "http://localhost");
    if (url.pathname === "/" && base !== "/") {
      res.writeHead(302, { Location: base });
      res.end();
      return;
    }
    if (!url.pathname.startsWith(base)) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    let target = path.resolve(
      root,
      decodeURIComponent(url.pathname.slice(base.length)),
    );
    if (target !== root && !target.startsWith(root + path.sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    let stat = await fs.stat(target);
    if (stat.isDirectory()) {
      if (!url.pathname.endsWith("/")) {
        res.writeHead(308, { Location: url.pathname + "/" + url.search });
        res.end();
        return;
      }
      target = path.join(target, "index.html");
      stat = await fs.stat(target);
    }
    if (!stat.isFile()) {
      res.writeHead(404);
      res.end();
      return;
    }
    res.writeHead(200, {
      "Content-Type": types[path.extname(target)] || "application/octet-stream",
      "Content-Length": stat.size,
      "Cache-Control": "no-store",
    });
    res.end(req.method === "HEAD" ? undefined : await fs.readFile(target));
  } catch (error) {
    const status = error instanceof URIError ? 400 : 404;
    if (status === 404) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(await fs.readFile(path.join(root, "404.html")));
    } else {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Invalid URL");
    }
  }
});
server.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
server.listen(port, host, () =>
  console.log(`Preview: http://${host}:${port}${base}`),
);
