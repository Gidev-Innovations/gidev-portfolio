import { expect, test } from "@playwright/test";

/**
 * Pages are served at the no-trailing-slash URL their canonical names, with
 * no redirect. Mirrors `html_handling: "drop-trailing-slash"` in
 * wrangler.jsonc, which scripts/serve-build.mjs emulates.
 */

const PAGES = ["/about", "/services", "/projects", "/blog", "/contact"];

for (const path of PAGES) {
  test(`${path} returns 200 with no redirect`, async ({ request }) => {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(200);

    const html = await response.text();
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    expect(canonical).toBe(`https://gidevtech.com${path}`);
  });

  test(`${path}/ redirects to ${path}`, async ({ request }) => {
    const response = await request.get(`${path}/`, { maxRedirects: 0 });
    expect(response.status()).toBe(307);
    expect(response.headers()["location"]).toBe(path);
  });
}

test("sitemap URLs have no trailing slash", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  expect(locs.length).toBeGreaterThan(0);
  expect(locs.filter((loc) => loc !== "https://gidevtech.com/" && loc.endsWith("/"))).toEqual([]);
});
