import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";

const root = resolve("dist");
const host = "0.0.0.0";
const port = Number(process.env.PORT) || 3000;

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

function insideRoot(file) {
  const resolved = resolve(file);
  const base = root.endsWith(sep) ? root : root + sep;
  return resolved === root || resolved.startsWith(base);
}

function requestedPath(url = "/") {
  const path = decodeURIComponent(url.split("?")[0] || "/");
  return normalize(path).replace(/^(\.\.(\/|\\|$))+/, "");
}

async function existingFile(file) {
  if (!insideRoot(file)) return null;
  try {
    const info = await stat(file);
    if (info.isFile()) return file;
    if (info.isDirectory()) return existingFile(join(file, "index.html"));
  } catch {
    return null;
  }
  return null;
}

async function resolveFile(url) {
  const path = requestedPath(url);
  const direct = await existingFile(join(root, path));
  if (direct) return { file: direct, status: 200 };
  if (!extname(path)) {
    const nested = await existingFile(join(root, path, "index.html"));
    if (nested) return { file: nested, status: 200 };
  }
  const first = path.split("/").filter(Boolean)[0];
  if (first && ["sv", "nb", "da", "de"].includes(first)) {
    const localized = await existingFile(join(root, first, "404.html"));
    if (localized) return { file: localized, status: 404 };
  }
  return null;
}

const server = createServer(async (req, res) => {
  try {
    const resolved = await resolveFile(req.url);
    if (resolved) {
      const body = await readFile(resolved.file);
      const headers = { "Content-Type": types[extname(resolved.file)] || "application/octet-stream" };
      if (resolved.file.endsWith("404.html")) headers["X-Robots-Tag"] = "noindex, nofollow";
      res.writeHead(resolved.status, headers);
      res.end(body);
      return;
    }
    const fallback = await existingFile(join(root, "404.html"));
    if (fallback) {
      res.writeHead(404, {
        "Content-Type": "text/html; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
      });
      res.end(await readFile(fallback));
      return;
    }
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  } catch {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Server error");
  }
});

server.listen(port, host, () => {
  console.log(`Edison Law serving ${root} on ${host}:${port}`);
});
