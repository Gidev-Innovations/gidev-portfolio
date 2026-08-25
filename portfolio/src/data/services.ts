/**
 * Single source of truth for what Gidev sells.
 *
 * Previously the service list was written out three separate times — on the
 * Services page, in the About page's interactive list, and on the homepage —
 * and the three had already drifted apart. Everything now reads from here.
 *
 * `services` are the four offerings with their own detail pages. `studio` and
 * `capabilities` appear as sections on the /services hub but are deliberately
 * not standalone pages: they either target a different audience (studio) or
 * are part of how the four services are delivered (capabilities).
 */

export type Service = {
  slug: string;
  /** Display name, used in headings and cards. */
  name: string;
  /** One-line summary for cards and the hub grid. */
  summary: string;
  /** <title> for the detail page. */
  metaTitle: string;
  /** <meta name="description"> for the detail page. */
  metaDescription: string;
  /** Opening paragraph on the detail page. */
  intro: string;
  /** Concrete deliverables. Specifics beat adjectives. */
  includes: string[];
  /** Who this is the right fit for. */
  bestFor: string;
};

export const services: Service[] = [
  {
    slug: "web-apps",
    name: "Web Applications",
    summary:
      "Custom web systems that handle real business logic — dashboards, portals, booking, and internal tools.",
    metaTitle: "Web Application Development | Gidev Innovations, Nairobi",
    metaDescription:
      "We build custom web applications: dashboards, client portals, booking systems, and internal tools. React and TypeScript, built in Nairobi for teams across Africa.",
    intro:
      "When a spreadsheet stops coping and off-the-shelf software doesn't fit how you actually work, you need a system built around your process. We design and build web applications that hold up under daily use by real teams.",
    includes: [
      "Discovery and technical scoping before any code is written",
      "Custom dashboards, admin panels, and client portals",
      "Role-based access and user permissions",
      "Integrations with the tools and APIs you already use",
      "Automated data handling to replace manual spreadsheet work",
      "Deployment, monitoring, and a post-launch revision period",
    ],
    bestFor:
      "Businesses outgrowing manual processes, and teams whose operations no longer fit a generic SaaS tool.",
  },
  {
    slug: "ecommerce",
    name: "E-Commerce Platforms",
    summary:
      "Online stores built for the way African customers actually pay — mobile-first, with local payment rails.",
    metaTitle: "E-Commerce Website Development | Gidev Innovations, Nairobi",
    metaDescription:
      "Custom e-commerce platforms with mobile money and card payment integration, inventory management, and mobile-first checkout. Built by Gidev Innovations in Nairobi, Kenya.",
    intro:
      "Most e-commerce templates are built for card-first, desktop-first markets. That is not how most customers on this continent buy. We build stores that load fast on mobile data and check out through the payment methods your customers already trust.",
    includes: [
      "Mobile-first storefront and checkout flow",
      "Mobile money and card payment integration",
      "Product catalogue, variants, and inventory management",
      "Order management and customer accounts",
      "Performance tuning for low-bandwidth connections",
      "Analytics setup so you can see what actually sells",
    ],
    bestFor:
      "Retail and lifestyle brands selling direct, and businesses moving off social-media-only selling.",
  },
  {
    slug: "mobile-apps",
    name: "Mobile Apps",
    summary:
      "Android and iOS apps from one codebase, built to work on mid-range devices and patchy connections.",
    metaTitle: "Mobile App Development Android & iOS | Gidev Innovations",
    metaDescription:
      "React Native mobile app development for Android and iOS. Offline-tolerant apps built for mid-range devices and real network conditions, by Gidev Innovations in Nairobi.",
    intro:
      "An app that only works on a flagship phone with full signal is an app most of your users cannot use. We build with React Native so a single codebase ships to both Android and iOS, and we test against the conditions your users are actually in.",
    includes: [
      "One React Native codebase targeting Android and iOS",
      "Offline-tolerant behaviour and graceful handling of dropped connections",
      "Performance tuning for mid-range Android devices",
      "Push notifications and device integrations",
      "App Store and Play Store submission support",
      "Post-launch updates and maintenance",
    ],
    bestFor:
      "Products that need to be in a user's pocket, and services where the phone is the primary way people access you.",
  },
  {
    slug: "business-websites",
    name: "Business Websites & Systems",
    summary:
      "Fast, findable websites — plus the internal systems that automate the work behind them.",
    metaTitle: "Business Website Development | Gidev Innovations, Nairobi",
    metaDescription:
      "Business websites built to be fast and findable in search, plus internal systems that automate quoting, invoicing, and reporting. Gidev Innovations, Nairobi, Kenya.",
    intro:
      "A business website should do two things: be found by people looking for you, and load quickly when they arrive. We build sites that do both, and where it helps, the internal systems that handle the work behind them.",
    includes: [
      "Search-ready build with per-page titles, descriptions, and structured data",
      "Server-rendered or pre-rendered pages so search engines see real content",
      "Content structure you can update without a developer",
      "Internal systems: quoting, invoicing, scheduling, and reporting",
      "Workflow automation to remove repeated manual steps",
      "Performance and accessibility checks before launch",
    ],
    bestFor:
      "Established businesses whose current site is invisible in search, and operations teams still running on paper or spreadsheets.",
  },
];

/**
 * Startup studio work. A separate audience from the fixed-scope services
 * above: founders looking for a build partner rather than a vendor.
 */
export const studioOfferings = [
  {
    name: "MVP Development",
    summary:
      "Get a testable product in front of real users quickly, so decisions come from evidence rather than opinion.",
  },
  {
    name: "Startup Incubation",
    summary:
      "End-to-end support across product strategy, technical build, and go-to-market for founders at the idea stage.",
  },
  {
    name: "Product Partnership",
    summary:
      "We co-build with founders, combining our technical execution with your domain knowledge and vision.",
  },
  {
    name: "Revenue-Sharing & Equity",
    summary:
      "For high-potential products, we structure engagements around shared upside instead of an upfront invoice.",
  },
];

/** Delivered as part of the services above rather than sold separately. */
export const capabilities = [
  "UI/UX design and prototyping",
  "Technical architecture and code review",
  "Performance and accessibility auditing",
  "Ongoing maintenance and retainers",
];

export function serviceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
