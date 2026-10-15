/**
 * Serves build/client the way Cloudflare static assets does with
 * html_handling "drop-trailing-slash": /path resolves to /path/index.html,
 * /path/ redirects to /path, unknown paths get 404.html with a 404 status,
 * text is brotli/gzip compressed. Used by the
 * Playwright responsive spec and Lighthouse runs so they test the pre-rendered
 * HTML rather than the dev server.
 *
 *   node scripts/serve-build.mjs [port]
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { brotliCompressSync, gzipSync } from "node:zlib";

const root = fileURLToPath(new URL("../build/client", import.meta.url));
const port = Number(process.argv[2] ?? 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function resolve(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  for (const candidate of [clean, join(clean, "index.html")]) {
    const file = join(root, candidate);
    if (!file.startsWith(root)) return null;
    try {
      if ((await stat(file)).isFile()) return file;
    } catch {
      // try the next candidate
    }
  }
  return null;
}

createServer(async (req, res) => {
  const [pathname, query] = (req.url ?? "/").split("?");
  if (pathname.length > 1 && pathname.endsWith("/")) {
    res.writeHead(307, { location: pathname.slice(0, -1) + (query ? `?${query}` : "") });
    return res.end();
  }
  const file = await resolve(req.url ?? "/");
  const status = file ? 200 : 404;
  const path = file ?? join(root, "404.html");
  const body = await readFile(path);
  const immutable = path.includes(`${join(root, "assets")}`);
  const type = types[extname(path)] ?? "application/octet-stream";
  const accept = String(req.headers["accept-encoding"] ?? "");
  const compressible = /^(text|application)\/|svg/.test(type);
  const encoding = !compressible ? null : accept.includes("br") ? "br" : accept.includes("gzip") ? "gzip" : null;
  res.writeHead(status, {
    "content-type": type,
    "cache-control": immutable ? "public, max-age=31536000, immutable" : "no-cache",
    vary: "accept-encoding",
    ...(encoding && { "content-encoding": encoding }),
  });
  res.end(encoding === "br" ? brotliCompressSync(body) : encoding === "gzip" ? gzipSync(body) : body);
}).listen(port, () => console.log(`Serving build/client on http://localhost:${port}`));
