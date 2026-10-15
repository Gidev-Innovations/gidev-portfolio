/**
 * Checks every pre-rendered page in build/client: title, meta description,
 * canonical, a single h1, and that each JSON-LD block parses and carries the
 * properties Google requires for its rich result type. Titles ≤ 60 and
 * descriptions ≤ 155 characters, so Google shows them untruncated on mobile.
 * Exits 1 on any error.
 *
 *   npm run build && node scripts/validate-seo.mjs [--json]
 */
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../build/client", import.meta.url));

const required = {
  ProfessionalService: ["name", "url", "logo", "address"],
  WebSite: ["name", "url"],
  BreadcrumbList: ["itemListElement"],
  FAQPage: ["mainEntity"],
  Service: ["name", "provider"],
  BlogPosting: ["headline", "image", "datePublished", "author"],
  CreativeWork: ["name"],
  SoftwareApplication: ["name"],
};

async function pages(dir, base = "") {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) out.push(...(await pages(join(dir, entry.name), `${base}/${entry.name}`)));
    else if (entry.name === "index.html") out.push(base || "/");
  }
  return out;
}

const text = (s) => s?.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/\s+/g, " ").trim();

function checkNode(node, errors) {
  const type = node["@type"];
  for (const key of required[type] ?? []) {
    if (node[key] === undefined || (Array.isArray(node[key]) && node[key].length === 0)) {
      errors.push(`${type} missing ${key}`);
    }
  }
  if (type === "BreadcrumbList") {
    node.itemListElement.forEach((item, i) => {
      if (item.position !== i + 1 || !item.name || !item.item) errors.push(`BreadcrumbList item ${i + 1} incomplete`);
    });
  }
  if (type === "FAQPage") {
    for (const q of node.mainEntity) {
      if (!q.name || !q.acceptedAnswer?.text) errors.push("FAQPage question without name/answer");
    }
  }
  if (type === "BlogPosting" && !/^\d{4}-\d{2}-\d{2}/.test(node.datePublished)) {
    errors.push("BlogPosting datePublished not ISO 8601");
  }
}

const report = [];
for (const path of (await pages(root)).sort()) {
  const html = await readFile(join(root, ...path.split("/").filter(Boolean), "index.html"), "utf8");
  const errors = [];
  const title = text(html.match(/<title>([\s\S]*?)<\/title>/)?.[1]);
  const description = text(html.match(/<meta name="description" content="([^"]*)"/)?.[1]);
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => text(m[1]));
  const types = [];

  if (!title) errors.push("no <title>");
  else if (title.length > 60) errors.push(`title ${title.length} chars (> 60)`);
  if (!description) errors.push("no meta description");
  else if (description.length > 155) errors.push(`description ${description.length} chars (> 155)`);
  if (!canonical) errors.push("no canonical");
  if (h1s.length !== 1) errors.push(`${h1s.length} h1 elements`);

  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      for (const node of [JSON.parse(json)].flat()) {
        types.push(node["@type"]);
        if (node["@context"] !== "https://schema.org") errors.push(`${node["@type"]} missing @context`);
        checkNode(node, errors);
      }
    } catch (e) {
      errors.push(`JSON-LD parse error: ${e.message}`);
    }
  }

  report.push({ path, title, titleLength: title?.length, description, descriptionLength: description?.length, canonical, h1: h1s[0], types, errors });
}

if (process.argv.includes("--json")) {
  console.log(JSON.stringify(report, null, 2));
} else {
  for (const r of report) {
    console.log(`${r.errors.length ? "FAIL" : "ok  "} ${r.path}  [${r.types.join(", ")}]`);
    for (const e of r.errors) console.log(`       - ${e}`);
  }
}
process.exit(report.some((r) => r.errors.length) ? 1 : 0);
