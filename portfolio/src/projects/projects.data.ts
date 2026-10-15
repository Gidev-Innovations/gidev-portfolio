import type { ImageName } from "../data/images";

/**
 * Work shown on /projects. Each entry describes what changed: who it was for,
 * the problem, what we built, and the result.
 *
 * Rules for adding entries:
 *   - Nothing invented. Unknown facts are `null` (or empty) with a
 *     TODO(human) marker; the page hides a section until it has content.
 *   - `outcome` must be verifiable. No invented metrics, percentages, or
 *     revenue figures; a true qualitative result is fine.
 *   - `client` must be a real, named client who has agreed to be referenced,
 *     or a truthful description such as "Private client, retail sector".
 *   - `quote` only with the client's written approval.
 */
type ProjectKind = "Client project" | "Open-source studio project" | "Studio project";

export type Project = {
  /** URL segment: /projects/<slug> */
  slug: string;
  title: string;
  /** Honest label shown as a tag on cards: who the work was for. */
  kind: ProjectKind;
  client: string;
  /** One line on who the client is and what they sell. */
  clientDescription: string;
  sector: string;
  year: string;
  image: ImageName;
  imageAlt: string;
  /** One-line hook used on cards and as the meta description. */
  summary: string;
  /**
   * Studio projects only: one line under the card. Studio cards link to the
   * live product (new tab) instead of the detail page.
   */
  whyWeBuiltIt?: string;
  problem: string | null;
  whatWeDid: string;
  features: string[];
  screenshots: { image: ImageName; alt: string }[];
  outcome: string | null;
  quote: { text: string; attribution: string } | null;
  technologies: string[];
  /** Optional public product URL. */
  liveUrl?: string;
  /** Optional public source repository. */
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "r-flex",
    title: "R-Flex",
    kind: "Client project",
    // TODO(human): confirm R-Flex has agreed to be named as a client, and how
    // they want to be credited.
    client: "R-Flex",
    clientDescription:
      "A streetwear and lifestyle brand selling sneakers, belts, caps and shirts.",
    sector: "Fashion & lifestyle retail",
    year: "2024",
    image: "r-flex",
    imageAlt: "R-Flex logo",
    summary:
      "An e-commerce platform for a streetwear and lifestyle brand selling sneakers, belts, caps, and shirts.",
    // TODO(human): how R-Flex sold before the build (e.g. physical shop,
    // Instagram, WhatsApp orders) and what wasn't working about it.
    problem: null,
    whatWeDid:
      "We designed and built a custom e-commerce platform for R-Flex, built around the brand's visual identity.",
    // TODO(human): confirm and extend (payment methods, admin/stock tools,
    // delivery options) — only features that actually shipped.
    features: [
      "Storefront in the R-Flex brand identity",
      "Product catalogue for sneakers, belts, caps and shirts",
      "Online ordering and checkout",
    ],
    // TODO(human): add screenshots of the live R-Flex site (phone + desktop).
    // The only R-Flex image in the repo is the logo.
    screenshots: [],
    // TODO(human): one real outcome; qualitative is fine.
    outcome: null,
    // TODO(human): client quote pending approval.
    quote: null,
    technologies: ["React", "TypeScript", "Vite", "CSS"],
  },
  {
    slug: "kibandaski-finder",
    title: "Kibandaski Finder",
    kind: "Open-source studio project",
    client: "Gidev Innovations (community open-source)",
    clientDescription: "Our own non-commercial, community-run directory.",
    sector: "Local food discovery",
    year: "2026",
    image: "kibandaski",
    imageAlt: "Kibanda dishes — chapati, sukuma wiki, beans, mandazi and chai — under a kibanda menu board",
    summary:
      "An open-source directory for discovering fixed kibandas and mobile street-food vendors in Kenya — with map browse, prices, hours, and honest reviews.",
    whyWeBuiltIt:
      "Local food vendors are hard to find unless you already know where to walk, and no free shared directory covered them.",
    problem:
      "Small local food vendors — both pinned kibandas and mobile route-based sellers — are hard to find unless you already know where to walk. Delivery apps and paid map listings rarely cover them, so people rely on word of mouth, miss opening hours and prices, and have no shared place for honest reviews from real customers.",
    whatWeDid:
      "We are building Kibandaski Finder as a community-run, non-commercial directory: vendors register as fixed (map pin) or mobile (route + schedule), anyone can browse on a map or list with search and filters, and signed-in users leave ratings and reviews. Directions hand off to Google Maps while browsing uses Leaflet and OpenStreetMap so there is no paid map API. New listings go through a lightweight moderation queue before they go public. Design is complete; Next.js scaffolding and Cloudflare deployment are underway.",
    features: [],
    screenshots: [],
    quote: null,
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
  {
    slug: "sticky-day",
    title: "Sticky Day",
    kind: "Studio project",
    client: "Gidev Innovations (own product, open source)",
    clientDescription: "Our own product, built and used in-house.",
    sector: "Personal productivity",
    year: "2026",
    image: "sticky-day",
    imageAlt: "Sticky Day board with colourful sticky notes, a timer clipboard and a done tray",
    summary:
      "A whiteboard for your day: type what you want to get done, AI turns it into sticky notes, and at day's end the app writes you a short note on how it went.",
    whyWeBuiltIt:
      "Most planners make you fill in forms before you've thought about your day; we wanted one that starts from a plain sentence.",
    problem:
      "Most planners ask you to structure your day before you've thought about it — fields, priorities, due dates — and then report on it like a manager. People who think in sentences, not forms, end up with a to-do app they stop opening. There was also no low-cost way to learn what it takes to run a real AI feature in production: prompt design, model fallback, cost caps, privacy.",
    whatWeDid:
      "We built Sticky Day as a single-page board: one text box takes a plain-language brain dump and a language model splits it into notes with a rough time and energy level; notes are dragged to a clipboard to work on with a timer, to a tray when done, or to a restorable bin. Unfinished notes roll over to tomorrow. At a time the user chooses, in their own timezone, the app writes an end-of-day page in a warm, non-corporate voice on a rotating theme, with no minutes or scores. Every model answer is validated against a schema before it touches anything; the app does its own arithmetic. Models run in a fallback chain across Gemini and Groq free tiers, with per-account daily caps, row-level security in Postgres, and a privacy page that states plainly what the providers' free-tier terms allow.",
    features: [],
    screenshots: [],
    quote: null,
    outcome:
      "Version 1 is live at sticky-day.vercel.app with Google sign-in and three pages — board, calendar, your day. The code is open source with a self-hosting guide, so anyone can run it on their own keys. It is in daily use by its author; no usage metrics are published yet.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "Postgres / RLS",
      "Vercel AI SDK",
      "Gemini / Groq",
      "Tailwind",
      "Framer Motion",
    ],
    liveUrl: "https://sticky-day.vercel.app",
    repoUrl: "https://github.com/Josekariz/sticky-day",
  },
];

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
