/**
 * Single source of truth for site-wide SEO data.
 *
 * The route table below drives three things that must never disagree:
 *   1. per-route <title>/<meta> tags (via each route module's `meta` export)
 *   2. the `prerender` list in react-router.config.ts
 *   3. the generated sitemap.xml
 *
 * Adding a page means adding one entry here.
 */

export const SITE = {
  name: "Gidev Innovations",
  /** No trailing slash. Used to build canonical + og:url values. */
  url: "https://gidevtech.com",
  locale: "en_KE",
  /**
   * TODO [NEEDS REAL CONTENT]: no Open Graph image exists in the repo yet.
   * Until a 1200x630 asset is added at portfolio/public/og-image.png, link
   * previews on WhatsApp/LinkedIn will fall back to no image.
   */
  ogImage: "/og-image.png",
  ogImageWidth: "1200",
  ogImageHeight: "630",
} as const;

export type SiteRoute = {
  path: string;
  title: string;
  description: string;
  /** sitemap.xml <priority> */
  priority: string;
  /** sitemap.xml <changefreq> */
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
};

/**
 * Static routes that get pre-rendered to HTML at build time.
 *
 * Descriptions are intentionally specific — a distinct description per page is
 * what stops search engines collapsing them as duplicates.
 */
export const siteRoutes: SiteRoute[] = [
  {
    path: "/",
    title: "Gidev Innovations | Web & Mobile App Development in Nairobi, Kenya",
    description:
      "Gidev Innovations is a software development studio in Nairobi, Kenya. We build web applications, e-commerce platforms, mobile apps, and business systems for teams across Africa.",
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/services",
    title: "Software Development Services | Gidev Innovations",
    description:
      "Web application development, e-commerce platforms, mobile apps for Android and iOS, business systems, and UI/UX design — built and maintained by Gidev Innovations in Nairobi.",
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    path: "/projects",
    title: "Our Work | Gidev Innovations Case Studies",
    description:
      "Selected software projects delivered by Gidev Innovations, covering the client, the problem, what we built, and the outcome.",
    priority: "0.9",
    changefreq: "weekly",
  },
  {
    path: "/about",
    title: "About Our Studio | Gidev Innovations, Nairobi",
    description:
      "Gidev Innovations is a software studio founded by Joseph Macharia in Nairobi, Kenya, building digital products for African businesses and the founders scaling them.",
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    path: "/contact",
    title: "Contact Gidev Innovations | Book a Free 15-Minute Call",
    description:
      "Talk to Gidev Innovations about your project. Book a free 15-minute call to scope your web app, e-commerce store, mobile app, or business system.",
    priority: "0.8",
    changefreq: "monthly",
  },
  {
    path: "/blog",
    title: "Blog | Gidev Innovations",
    description:
      "Notes on software development, product delivery, and building digital products from Nairobi.",
    priority: "0.6",
    changefreq: "weekly",
  },
];

/** Absolute URL for a path, safe against double slashes. */
export function absoluteUrl(path: string): string {
  return path === "/" ? `${SITE.url}/` : `${SITE.url}${path}`;
}

/** Look up a route's SEO record by path. */
export function routeFor(path: string): SiteRoute | undefined {
  return siteRoutes.find((r) => r.path === path);
}
