/**
 * Writes sitemap.xml and robots.txt into the built client output.
 *
 * Runs after `react-router build` so it can enumerate exactly what was
 * pre-rendered: it walks the build output for index.html files rather than
 * trusting a hand-maintained list. That way the sitemap can never advertise a
 * URL that has no corresponding HTML file.
 */
import { readdir, readFile, writeFile, stat, copyFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const clientDir = join(projectRoot, "build", "client");

/** Pull SITE + siteRoutes out of the TS module without needing a TS loader. */
async function loadSiteConfig() {
  const source = await readFile(join(projectRoot, "src", "data", "site.ts"), "utf8");

  const url = source.match(/url:\s*"([^"]+)"/)?.[1];
  if (!url) throw new Error("Could not read SITE.url from src/data/site.ts");

  const routes = new Map();
  const routeBlock = /\{\s*path:\s*"([^"]+)"[\s\S]*?priority:\s*"([^"]+)",\s*changefreq:\s*"([^"]+)",\s*\}/g;
  for (const [, path, priority, changefreq] of source.matchAll(routeBlock)) {
    routes.set(path, { priority, changefreq });
  }

  return { url, routes };
}

/** Every pre-rendered route, discovered from the emitted index.html files. */
async function findPrerenderedRoutes(dir, base = "") {
  const found = [];

  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      found.push(...(await findPrerenderedRoutes(join(dir, entry.name), `${base}/${entry.name}`)));
    } else if (entry.name === "index.html") {
      found.push(base === "" ? "/" : base);
    }
  }

  return found;
}

/**
 * Priority/changefreq for pages not in the static route table — the
 * data-driven detail pages. Service pages rank above project pages and posts
 * because they carry the commercial search intent.
 */
function defaultsFor(path) {
  if (path.startsWith("/services/")) return { priority: "0.8", changefreq: "monthly" };
  if (path.startsWith("/projects/")) return { priority: "0.7", changefreq: "monthly" };
  if (path.startsWith("/blog/")) return { priority: "0.5", changefreq: "yearly" };
  return { priority: "0.5", changefreq: "monthly" };
}

/**
 * Real modification dates only. Google ignores lastmod once it proves
 * unreliable, so a build date stamped on every URL is worse than none.
 * Posts use the dateModified from their own BlogPosting JSON-LD; the blog
 * index uses its newest post. Other pages omit lastmod.
 */
async function findLastmods(routes) {
  const lastmods = new Map();
  for (const path of routes) {
    const html = await readFile(join(clientDir, ...path.split("/").filter(Boolean), "index.html"), "utf8");
    const date = html.match(/"dateModified":"(\d{4}-\d{2}-\d{2})/)?.[1];
    if (date) lastmods.set(path, date);
  }
  const posts = [...lastmods].filter(([path]) => path.startsWith("/blog/")).map(([, date]) => date);
  if (posts.length) lastmods.set("/blog", posts.sort().at(-1));
  return lastmods;
}

function buildSitemap(siteUrl, routes, meta, lastmods) {
  const entries = routes
    .sort((a, b) => a.localeCompare(b))
    .map((path) => {
      const { priority, changefreq } = meta.get(path) ?? defaultsFor(path);
      const loc = path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`;

      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        ...(lastmods.has(path) ? [`    <lastmod>${lastmods.get(path)}</lastmod>`] : []),
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>",
      ].join("\n");
    });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    "</urlset>",
    "",
  ].join("\n");
}

function buildRobots(siteUrl) {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
    "",
  ].join("\n");
}

async function main() {
  try {
    await stat(clientDir);
  } catch {
    throw new Error(`Build output not found at ${relative(projectRoot, clientDir)} — run the build first.`);
  }

  const { url: siteUrl, routes: meta } = await loadSiteConfig();

  const discovered = (await findPrerenderedRoutes(clientDir))
    // 404 pages must never appear in a sitemap.
    .filter((path) => path !== "/404" && !path.endsWith("/404"));

  await writeFile(join(clientDir, "sitemap.xml"), buildSitemap(siteUrl, discovered, meta, await findLastmods(discovered)), "utf8");
  await writeFile(join(clientDir, "robots.txt"), buildRobots(siteUrl), "utf8");

  // Cloudflare Pages serves a root 404.html with a real 404 status for any
  // path that has no matching file. Reusing the SPA fallback means unknown
  // URLs render the app's NotFound page without returning a soft 200.
  await copyFile(join(clientDir, "__spa-fallback.html"), join(clientDir, "404.html"));

  console.log(`SEO: wrote sitemap.xml with ${discovered.length} URLs, robots.txt and 404.html`);
  for (const path of discovered.sort()) console.log(`  ${path}`);
}

main().catch((error) => {
  console.error(`SEO generation failed: ${error.message}`);
  process.exit(1);
});
