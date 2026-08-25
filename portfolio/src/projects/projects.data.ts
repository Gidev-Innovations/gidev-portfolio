import m5 from "./images/R-Flex.png";
import kibandaski from "./images/kibandaski.jpg";

/**
 * Case studies, not portfolio entries.
 *
 * The previous shape (tagline / overview / mission) described what a project
 * *was*. This shape describes what *changed*: who the client was, the problem
 * they had, what we built, and the outcome. That is what a prospective client
 * is actually reading for.
 *
 * Rules for adding entries:
 *   - `outcome` must be verifiable. No invented metrics, percentages, or
 *     revenue figures. If there is no measurable result yet, describe what
 *     shipped and leave the measurement out.
 *   - `client` must be a real, named client who has agreed to be referenced,
 *     or a truthful description such as "Private client, retail sector".
 */
export type CaseStudy = {
  /** URL segment: /projects/<slug> */
  slug: string;
  title: string;
  client: string;
  sector: string;
  year: string;
  image: string;
  /** One-line hook used on cards and as the meta description. */
  summary: string;
  problem: string;
  whatWeDid: string;
  outcome: string;
  technologies: string[];
  /** Optional public product URL. */
  liveUrl?: string;
  /** Optional public source repository. */
  repoUrl?: string;
};

export const projects: CaseStudy[] = [
  {
    slug: "r-flex",
    title: "R-Flex",
    // TODO [NEEDS REAL CONTENT]: confirm how R-Flex should be credited and
    // whether they've agreed to be named as a client.
    client: "R-Flex",
    sector: "Fashion & lifestyle retail",
    year: "2024",
    image: m5,
    summary:
      "An e-commerce platform for a streetwear and lifestyle brand selling sneakers, belts, caps, and shirts.",
    problem:
      "Finding the right sneakers and streetwear still meant walking far — hopping between shops across town, hoping sizes and styles were in stock. Physical distance limited who could discover the brand, and inventory sat waiting for foot traffic that might never arrive.",
    whatWeDid:
      "We designed and built a custom e-commerce platform for R-Flex covering the storefront, product catalogue, and checkout, built around the brand's visual identity. Buyers can browse sneakers, belts, caps, and shirts online and order without making the trek.",
    outcome:
      "The storefront shortens the distance between the brand and its customers. People no longer have to walk across town to find the right pair — the catalogue comes to them — so product can stay in play longer and reach buyers who would never have walked far enough to find it in person.",
    technologies: ["React", "TypeScript", "Vite", "CSS"],
  },
  {
    slug: "kibandaski-finder",
    title: "Kibandaski Finder",
    client: "Gidev Innovations (community open-source)",
    sector: "Local food discovery",
    year: "2026",
    image: kibandaski,
    summary:
      "An open-source directory for discovering fixed kibandas and mobile street-food vendors in Kenya — with map browse, prices, hours, and honest reviews.",
    problem:
      "Small local food vendors — both pinned kibandas and mobile route-based sellers — are hard to find unless you already know where to walk. Delivery apps and paid map listings rarely cover them, so people rely on word of mouth, miss opening hours and prices, and have no shared place for honest reviews from real customers.",
    whatWeDid:
      "We are building Kibandaski Finder as a community-run, non-commercial directory: vendors register as fixed (map pin) or mobile (route + schedule), anyone can browse on a map or list with search and filters, and signed-in users leave ratings and reviews. Directions hand off to Google Maps while browsing uses Leaflet and OpenStreetMap so there is no paid map API. New listings go through a lightweight moderation queue before they go public. Design is complete; Next.js scaffolding and Cloudflare deployment are underway.",
    outcome:
      "A coming-soon site is live at kibandaski.gidevtech.com, and the full plan, design, and stack reasoning are public on GitHub so contributors can pick the project up without starting from zero. The product itself is still in build — no usage metrics yet.",
    technologies: [
      "Next.js",
      "Neon / PostGIS",
      "Drizzle",
      "Auth.js",
      "Cloudflare R2",
      "Leaflet",
    ],
    liveUrl: "https://kibandaski.gidevtech.com/",
    repoUrl: "https://github.com/Josekariz/kibandaski-finder",
  },
];

export function caseStudyBySlug(slug: string): CaseStudy | undefined {
  return projects.find((p) => p.slug === slug);
}
