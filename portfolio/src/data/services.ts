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

import { imagery, type Photo } from "./imagery";
import type { Faq } from "./faqs";

type ServicePricing = {
  /** Starting price, KES only on the public site. e.g. "KES 50,000" */
  fromKes: string;
  /** Qualifier shown after the standard sentence. */
  note?: string;
};

export type Service = {
  slug: string;
  /** Display name, used in cards and breadcrumbs. */
  name: string;
  /** Keyword-led <h1> for the detail page. */
  h1: string;
  /** One-line summary for cards and the hub grid. */
  summary: string;
  /** Mood / product-context image for hub cards and About. */
  image: Photo;
  /** <title> for the detail page (≤60 chars, primary keyword first). */
  metaTitle: string;
  /** <meta name="description"> for the detail page (≤155 chars). */
  metaDescription: string;
  /** Opening paragraphs on the detail page. */
  intro: string[];
  /** Who this is the right fit for. */
  bestFor: string;
  /** Problems this service solves, phrased the way clients describe them. */
  problems: { title: string; body: string }[];
  /** Concrete deliverables. Specifics beat adjectives. */
  includes: string[];
  /** Typical stack. */
  stack: string[];
  /** Honest timeline guidance. */
  timeline: string;
  pricing: ServicePricing;
  faqs: Faq[];
  relatedPosts: string[];
  relatedProjects: string[];
};

export const services: Service[] = [
  {
    slug: "web-apps",
    name: "Web Applications",
    h1: "Web Application Development in Nairobi, Kenya",
    summary:
      "Custom web systems that handle real business logic — dashboards, portals, booking, and internal tools.",
    image: imagery.dashboard,
    metaTitle: "Web App Development Company in Nairobi, Kenya | Gidev",
    metaDescription:
      "Custom web applications for Kenyan businesses: dashboards, client portals, booking systems and internal tools, with M-Pesa built in. Nairobi studio.",
    intro: [
      "When a spreadsheet stops coping and off-the-shelf software doesn't fit how you actually work, you need a system built around your process. We design and build web applications that hold up under daily use by real teams in Nairobi and across Kenya.",
      "A web application is software your staff or customers use in a browser: a dashboard that shows today's sales across branches, a portal where clients track their orders, a booking system that takes an M-Pesa deposit, or an internal tool that replaces three WhatsApp groups and a shared Excel file. Because it runs in the browser, there is nothing to install, it works on the laptops and phones your team already has, and updates reach everyone the moment we ship them.",
      "We work as a small studio, which means the person you talk to on the first call is the person writing the code. You get a written scope and price before work starts, a working version you can click through early, and short build cycles where you see progress every week rather than at the end.",
    ],
    bestFor:
      "Businesses outgrowing manual processes, and teams whose operations no longer fit a generic SaaS tool.",
    problems: [
      {
        title: "Your business runs on spreadsheets and WhatsApp",
        body: "Orders, stock and customer records live in several Excel files that disagree with each other. Someone spends hours each week reconciling them, and mistakes reach customers. We replace that with one system that is the single source of truth, with the right people able to see and edit the right things.",
      },
      {
        title: "Off-the-shelf software almost fits",
        body: "You pay for a foreign SaaS tool in dollars, use a third of it, and work around the rest. It doesn't take M-Pesa, doesn't understand KRA requirements, and support is in another timezone. A custom application does exactly what your process needs and nothing else, and you own it.",
      },
      {
        title: "Customers keep asking for updates by phone",
        body: "Clients call or message to ask where their order, booking or application stands. A client portal lets them log in and see status, documents and payments themselves, which frees your team for work that actually needs a person.",
      },
      {
        title: "You can't see what's happening across the business",
        body: "Reports are assembled by hand at the end of the month, so decisions are made on old numbers. A dashboard pulls live data from your operations and payments so you can see sales, stock and performance today.",
      },
    ],
    includes: [
      "Discovery and technical scoping before any code is written",
      "Custom dashboards, admin panels, and client portals",
      "Role-based access and user permissions",
      "M-Pesa (Daraja) and card payment integration where money changes hands",
      "Integrations with the tools and APIs you already use",
      "Automated data handling to replace manual spreadsheet work",
      "Deployment, monitoring, and a post-launch revision period",
    ],
    stack: ["React", "TypeScript", "Next.js / React Router", "Node.js", "PostgreSQL", "Cloudflare / Vercel"],
    timeline:
      "A focused first version (an MVP) typically takes 4–8 weeks from signed scope to launch. Larger systems are delivered in stages, so you are using the first part while we build the next.",
    pricing: { fromKes: "KES 250,000" },
    faqs: [
      {
        question: "What is the difference between a website and a web application?",
        answer:
          "A website mostly presents information. A web application lets people do things: log in, place orders, manage records, approve requests. If your users need accounts or your staff need to work in it every day, you need a web application.",
      },
      {
        question: "Will I own the code?",
        answer:
          "Yes. On full payment the code and the data are yours. We host it in an account in your name, or hand it over to your team, so you are never locked in to us.",
      },
      {
        question: "Can it work with M-Pesa and our existing systems?",
        answer:
          "Yes. We integrate M-Pesa through Safaricom's Daraja API, card payments through providers such as Paystack or Flutterwave, and connect to accounting tools, SMS gateways and other APIs you already use.",
      },
      {
        question: "Does it work on phones?",
        answer:
          "Every application we build is responsive and tested on mid-range Android phones, because that is how many of your staff and customers will use it.",
      },
      {
        question: "What happens after launch?",
        answer:
          "Every project includes a revision period after launch. After that, most clients keep us on a monthly retainer for fixes, improvements and new features.",
      },
    ],
    relatedPosts: [
      "business-website-or-web-application-how-to-choose",
      "practical-ai-for-kenyan-businesses-in-2026",
      "questions-to-ask-a-software-studio-before-you-sign",
    ],
    relatedProjects: ["sticky-day", "kibandaski-finder"],
  },
  {
    slug: "ecommerce",
    name: "E-Commerce Platforms",
    h1: "E-Commerce Website Development in Kenya, with M-Pesa Checkout",
    summary:
      "Online stores built for the way African customers actually pay — mobile-first, with local payment rails.",
    image: imagery.shopOwner,
    metaTitle: "E-commerce Website Development in Kenya with M-Pesa | Gidev",
    metaDescription:
      "Online stores for Kenyan businesses with M-Pesa STK Push and card checkout, inventory, delivery options and fast mobile pages. Built in Nairobi.",
    intro: [
      "Most e-commerce templates are built for card-first, desktop-first markets. That is not how most customers in Kenya buy. We build stores that load fast on mobile data and check out through the payment methods your customers already trust, starting with M-Pesa.",
      "If you are selling through Instagram, TikTok and WhatsApp today, you already know the pain: answering the same price questions, confirming payments by screenshot, losing track of who paid for what. An online store does that work for you. Customers browse your catalogue, pay with an M-Pesa prompt on their phone, and you get a confirmed order with the payment already matched to it.",
      "We build both on platforms such as Shopify and WooCommerce where they fit, and custom stores where you need something they can't do well, such as complex delivery zones across Nairobi, wholesale pricing, or deep integration with your stock system. We will tell you on the first call which one makes sense for your size and budget.",
    ],
    bestFor:
      "Retail and lifestyle brands selling direct, and businesses moving off social-media-only selling.",
    problems: [
      {
        title: "Confirming M-Pesa payments by screenshot",
        body: "Customers send a screenshot, someone checks the Till statement, and the order is processed by hand. With STK Push checkout the customer gets a prompt on their phone, enters their PIN, and the order is marked paid automatically when Safaricom confirms it.",
      },
      {
        title: "Selling only through social media",
        body: "Instagram and WhatsApp are good for discovery but poor for running a shop. You can't search a catalogue, stock is out of date, and every sale needs a conversation. A store gives you a catalogue that is always current and checkout that works at 2am.",
      },
      {
        title: "A store that is slow on mobile data",
        body: "Many customers browse on mid-range Android phones on bundles. A heavy theme with large images and many plugins loses them before the page loads. We keep pages light, compress images properly and test on real devices.",
      },
      {
        title: "Delivery and stock are managed separately",
        body: "Orders come in online but stock is tracked in a notebook and riders are arranged by phone. We connect orders, inventory and delivery so you can see what is in stock and what needs to go out today.",
      },
    ],
    includes: [
      "Mobile-first storefront and checkout flow",
      "M-Pesa STK Push, Paybill/Till and card payment integration",
      "Product catalogue, variants, and inventory management",
      "Delivery zones and fees for Nairobi, upcountry and pickup",
      "Order management, customer accounts and SMS/email notifications",
      "Performance tuning for low-bandwidth connections",
      "Analytics setup so you can see what actually sells",
    ],
    stack: ["Shopify or WooCommerce (when they fit)", "React / Next.js for custom stores", "Safaricom Daraja API", "Paystack / Flutterwave / Pesapal", "PostgreSQL"],
    timeline:
      "A store on an established platform is usually live in 2–4 weeks. A custom store with integrations typically takes 6–10 weeks, delivered in stages so you can start selling sooner.",
    pricing: { fromKes: "KES 120,000" },
    faqs: [
      {
        question: "Can customers pay with M-Pesa on my website?",
        answer:
          "Yes. We use Safaricom's Daraja API so customers receive an STK Push prompt on their phone at checkout. You need a Paybill or Till number; we help with the Daraja setup if you don't have it yet.",
      },
      {
        question: "Shopify, WooCommerce or custom: which should I choose?",
        answer:
          "For most small stores, an established platform is faster and cheaper to run. Custom makes sense when you need workflows the platforms handle badly, or when monthly app fees start to exceed the cost of building it once. We will recommend one honestly on the first call.",
      },
      {
        question: "Can I accept card payments from customers abroad?",
        answer:
          "Yes. We add card checkout through providers such as Paystack, Flutterwave or Pesapal alongside M-Pesa, so diaspora and international customers can pay too.",
      },
      {
        question: "Can I update products myself?",
        answer:
          "Yes. You get an admin area to add products, change prices, manage stock and see orders without needing a developer.",
      },
      {
        question: "Will my store show up on Google?",
        answer:
          "We build stores with proper page titles, product structured data and fast pages, which are the technical foundations for search. Ranking also depends on content and time, and we will explain what to expect.",
      },
    ],
    relatedPosts: [
      "designing-checkout-for-mpesa-and-mobile-money-2026",
      "custom-web-apps-vs-instagram-shops-african-smes-2026",
      "questions-to-ask-a-software-studio-before-you-sign",
    ],
    relatedProjects: ["r-flex"],
  },
  {
    slug: "mobile-apps",
    name: "Mobile Apps",
    h1: "Mobile App Development in Kenya: Android & iOS",
    summary:
      "Android and iOS apps from one codebase, built to work on mid-range devices and patchy connections.",
    image: imagery.kibanda,
    metaTitle: "Mobile App Development in Kenya: Android & iOS | Gidev",
    metaDescription:
      "Android and iOS app developers in Nairobi. One React Native codebase, offline-tolerant, tested on mid-range phones, with M-Pesa and Play Store launch.",
    intro: [
      "An app that only works on a flagship phone with full signal is an app most of your users cannot use. We build with React Native so a single codebase ships to both Android and iOS, and we test against the conditions your users are actually in.",
      "In Kenya, that mostly means Android. Many of your users will be on phones with 2–4 GB of RAM, limited storage they are reluctant to give up, and data bundles they watch closely. We keep app size small, cache what users need so screens still open when the network drops, and make sure actions such as placing an order are not lost on a bad connection.",
      "Before recommending an app, we will ask whether you need one. A fast mobile website is often cheaper and reaches more people. When you do need an app, for push notifications, offline use, camera or location features, or daily-use tools for staff or riders, we will build it properly.",
    ],
    bestFor:
      "Products that need to be in a user's pocket, and services where the phone is the primary way people access you.",
    problems: [
      {
        title: "Your users are on mid-range Android phones",
        body: "Apps designed on the latest iPhone often stutter or crash on the phones most Kenyans carry. We profile on real mid-range devices and keep the app light so it installs and runs well.",
      },
      {
        title: "The network drops in the field",
        body: "Sales reps, riders and field agents lose signal constantly. We design apps that keep working offline, queue actions, and sync when the connection returns, so no data is lost.",
      },
      {
        title: "Two separate apps cost twice as much",
        body: "Building native Android and iOS apps separately doubles the cost and the bugs. React Native gives you both from one codebase, with the native performance users expect.",
      },
      {
        title: "Getting through the app stores",
        body: "Play Store and App Store reviews reject apps for reasons that are not obvious the first time. We handle store listings, privacy declarations and submission so launch day is not a surprise.",
      },
    ],
    includes: [
      "One React Native codebase targeting Android and iOS",
      "Offline-tolerant behaviour and graceful handling of dropped connections",
      "Performance tuning for mid-range Android devices",
      "M-Pesa and card payments in-app",
      "Push notifications and device integrations (camera, location)",
      "App Store and Play Store submission support",
      "Post-launch updates and maintenance",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Node.js / Supabase backends", "Firebase Cloud Messaging", "Safaricom Daraja API"],
    timeline:
      "A first version for one platform audience typically takes 6–10 weeks, plus store review time (usually a few days on Google Play, sometimes longer on Apple's App Store).",
    pricing: {
      fromKes: "KES 200,000",
      note: "This covers an MVP. Apps with payments or a custom backend are quoted separately.",
    },
    faqs: [
      {
        question: "Do I need a mobile app or a mobile website?",
        answer:
          "If people use your service occasionally, a fast mobile website usually serves them better and costs less. An app makes sense for daily use, offline work, push notifications, or device features such as camera and GPS.",
      },
      {
        question: "Will the app work on both Android and iOS?",
        answer:
          "Yes. We build with React Native, so one codebase produces both apps. In Kenya we usually prioritise testing on Android, where most of your users will be.",
      },
      {
        question: "Can the app take M-Pesa payments?",
        answer:
          "Yes. We integrate M-Pesa STK Push through the Daraja API so users can pay inside the app, and card payments where needed.",
      },
      {
        question: "Who publishes the app to the Play Store and App Store?",
        answer:
          "We prepare the listings and handle submission, under developer accounts in your company's name so you own the apps.",
      },
      {
        question: "How do updates work after launch?",
        answer:
          "Small fixes can often be shipped over the air without a store update. Larger changes go through the stores. Most clients keep us on retainer for ongoing updates.",
      },
    ],
    relatedPosts: [
      "mobile-apps-for-mid-range-android-east-africa-2026",
      "designing-checkout-for-mpesa-and-mobile-money-2026",
      "questions-to-ask-a-software-studio-before-you-sign",
    ],
    relatedProjects: ["kibandaski-finder"],
  },
  {
    slug: "business-websites",
    name: "Business Websites & Systems",
    h1: "Business Website Design & Development in Nairobi",
    summary:
      "Fast, findable websites — plus the internal systems that automate the work behind them.",
    image: imagery.code,
    metaTitle: "Business Website Design in Nairobi, Kenya | Gidev",
    metaDescription:
      "Fast business websites for Kenyan companies, built to be found on Google and to turn visits into calls and enquiries. Plus quoting and invoicing systems.",
    intro: [
      "A business website should do two things: be found by people looking for you, and load quickly when they arrive. We build sites that do both, and where it helps, the internal systems that handle the work behind them.",
      "Many business websites in Kenya were built once, years ago, and never touched again. They are slow on phones, don't show up when someone searches for what you do in Nairobi, and the contact form goes to an inbox nobody checks. We rebuild them so each page targets a real search, loads fast on mobile data, and makes it obvious how to get in touch.",
      "Behind the website, many businesses still quote, invoice and schedule by hand. Where it pays for itself, we automate that too: an enquiry form that creates a quote, a quote that becomes an invoice, and a simple dashboard showing what is outstanding.",
    ],
    bestFor:
      "Established businesses whose current site is invisible in search, and operations teams still running on paper or spreadsheets.",
    problems: [
      {
        title: "Customers can't find you on Google",
        body: "If someone searches for your service in Nairobi and finds your competitors, you are losing work you never hear about. We structure pages around real searches, with proper titles, descriptions and structured data, and pre-render them so Google reads real content.",
      },
      {
        title: "Your website is slow on phones",
        body: "Most visitors arrive on a phone, often on mobile data. A slow site loses them in seconds. We build light pages, compress images and test on mid-range Android devices.",
      },
      {
        title: "Visitors don't turn into enquiries",
        body: "A site with no clear next step gets read and closed. Every page we build has an obvious way to get in touch, whether that is a short form, a call booking or a WhatsApp link.",
      },
      {
        title: "Quoting and invoicing eat your week",
        body: "If quotes are typed up in Word and invoices chased by phone, we can automate the routine steps and give you a clear view of what is outstanding.",
      },
    ],
    includes: [
      "Search-ready build with per-page titles, descriptions, and structured data",
      "Server-rendered or pre-rendered pages so search engines see real content",
      "Google Business Profile and Search Console setup guidance",
      "Content structure you can update without a developer",
      "Contact forms and call booking that reach the right person",
      "Internal systems: quoting, invoicing, scheduling, and reporting",
      "Performance and accessibility checks before launch",
    ],
    stack: ["React Router / Next.js (pre-rendered)", "Tailwind CSS", "Headless CMS where needed", "Cloudflare", "Google Search Console & Analytics"],
    timeline:
      "A typical business website takes 2–4 weeks from content sign-off to launch. Internal systems are scoped separately and usually take 4–8 weeks.",
    pricing: { fromKes: "KES 50,000" },
    faqs: [
      {
        question: "How long does it take to build a business website?",
        answer:
          "Usually 2–4 weeks once we have your content. The most common delay is waiting for text and photos, so we help you plan those early.",
      },
      {
        question: "Will my website rank on Google?",
        answer:
          "We build the technical foundations search engines need: fast pages, real pre-rendered content, proper titles and structured data. Ranking also depends on your content, reviews and time, and we will be straight with you about that.",
      },
      {
        question: "Can I edit the website myself?",
        answer:
          "Yes. Where you need to update content regularly, we set up a simple editor so you can change text, images and blog posts without a developer.",
      },
      {
        question: "Do you help with Google Business Profile?",
        answer:
          "Yes. We make sure your website and Google Business Profile carry the same name, location and contact details, which matters for showing up in local searches.",
      },
    ],
    relatedPosts: [
      "business-website-or-web-application-how-to-choose",
      "custom-web-apps-vs-instagram-shops-african-smes-2026",
      "questions-to-ask-a-software-studio-before-you-sign",
    ],
    relatedProjects: ["r-flex"],
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

/** Shared delivery process, shown on every service page. */
export const deliveryProcess = [
  {
    title: "Free call",
    body: "A 30-minute call to understand what you need, who it is for, and whether we are the right fit. No obligation.",
  },
  {
    title: "Written scope and price",
    body: "We write down what will be built, the timeline and the price before any code exists, so the number at the end is the number you agreed.",
  },
  {
    title: "Build in short sprints",
    body: "You see working software every week or two and can change direction early, instead of discovering problems at the end.",
  },
  {
    title: "Launch and support",
    body: "We deploy, train your team, and stay on through a revision period. After that, a monthly retainer is available if you want us to keep going.",
  },
];

export function serviceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
