/**
 * Single source of truth for what Gidev sells.
 *
 * Previously the service list was written out three separate times — on the
 * Services page, in the About page's interactive list, and on the homepage —
 * and the three had already drifted apart. Everything now reads from here.
 *
 * Software and digital services share this catalog so every surface uses the
 * same names, descriptions, and detail-page routes.
 */

import { imagery, type Photo } from "./imagery";
import type { Faq } from "./faqs";
import {
  Building2,
  Code2,
  Megaphone,
  Palette,
  Search,
  ShoppingBag,
  Sparkles,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type ServiceStep = { title: string; body: string };
export const serviceGroups = ["Build", "Grow & Support"] as const;

type ServiceEntry = {
  slug: string;
  aliases?: string[];
  group: (typeof serviceGroups)[number];
  name: string;
  h1: string;
  summary: string;
  image: Photo;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  bestFor: string;
  problems: { title: string; body: string }[];
  includes: string[];
  stack?: string[];
  faqs: Faq[];
  relatedPosts: string[];
  relatedProjects: string[];
};

export type Service = Omit<ServiceEntry, "name" | "summary" | "intro" | "includes" | "process"> & {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: LucideIcon;
  includedItems: string[];
  deliverables: string[];
  processSteps: ServiceStep[];
  relatedServiceIds: string[];
};

const serviceEntries: ServiceEntry[] = [
  {
    slug: "web-apps",
    group: "Build",
    name: "Web Applications",
    h1: "Custom Web Application Development",
    summary:
      "Custom web systems that handle real business logic — dashboards, portals, booking, and internal tools.",
        image: imagery.serviceWebApps,
    metaTitle: "Custom Web Application Development | Gidev",
    metaDescription:
      "Custom web applications for growing teams: dashboards, client portals, booking systems and internal tools, designed around your workflows.",
    intro: [
      "When a spreadsheet stops coping and off-the-shelf software doesn't fit how you work, you need a system built around your process. We design and build web applications that hold up under daily use by real teams.",
      "A web application is software your staff or customers use in a browser: for example, a dashboard, client portal, booking flow or internal tool. The user roles, devices and connections it needs to support are clarified during scoping.",
      "We agree the requirements and deliverables before implementation. Reviews are scheduled around the work so you can give feedback while the application takes shape.",
    ],
    bestFor:
      "Businesses outgrowing manual processes, and teams whose operations no longer fit a generic SaaS tool.",
    problems: [
      {
        title: "Your business runs on spreadsheets and WhatsApp",
        body: "Orders, stock and customer records can become scattered across spreadsheets that are difficult to keep aligned. We can bring the agreed workflows into one system, with access shaped around the team's roles.",
      },
      {
        title: "Off-the-shelf software almost fits",
        body: "You pay for software that solves only part of the problem, then work around the rest. A custom application can fit your process, connect to the tools you already use and give you ownership of the result.",
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
      "Payment integrations for the methods your customers use",
      "Integrations with the tools and APIs you already use",
      "Automated data handling to replace manual spreadsheet work",
      "Deployment, monitoring, and a post-launch revision period",
    ],
    stack: ["React", "TypeScript", "Next.js / React Router", "Node.js", "PostgreSQL", "Cloudflare / Vercel"],
    faqs: [
      {
        question: "What is the difference between a website and a web application?",
        answer:
          "A website mainly presents information. A web application adds interactive tasks such as accounts, orders, records or approvals. The right option depends on what your customers or team need to do.",
      },
      {
        question: "Will I own the code?",
        answer:
          "Yes. On full payment the code and the data are yours. We host it in an account in your name, or hand it over to your team, so you are never locked in to us.",
      },
      {
        question: "Can it work with our payment provider and existing systems?",
        answer:
          "Yes. We can connect payment providers, accounting tools, messaging services and other APIs that fit your requirements.",
      },
      {
        question: "Does it work on phones?",
        answer:
          "The target devices and screen sizes are agreed during scoping. We can include responsive layouts and device testing in the delivery plan.",
      },
      {
        question: "What happens after launch?",
        answer:
          "Post-launch support can be included in the agreed scope or arranged as a separate monthly retainer or partnership.",
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
    group: "Build",
    name: "E-Commerce Platforms",
    h1: "E-commerce Website Development",
    summary:
      "Online stores with a clear shopping experience, flexible payment options and reliable order management.",
    image: imagery.serviceEcommerce,
    metaTitle: "E-commerce Website Development | Gidev",
    metaDescription:
      "Mobile-friendly online stores with flexible payments, product management, fulfilment options and a smooth customer checkout.",
    intro: [
      "An online store should reflect how your customers browse and pay. We scope a mobile-friendly catalogue and checkout around your products, audience and preferred payment options.",
      "If you are selling through social platforms today, you may know the pain: answering the same price questions, confirming payments manually and losing track of orders. A well-planned store brings products, checkout and order management into one clear workflow.",
      "We can assess platforms such as Shopify and WooCommerce alongside a custom store. The choice depends on the catalogue, order workflow, integrations and ongoing ownership needs in your brief.",
    ],
    bestFor:
      "Retail and lifestyle brands selling direct, and businesses moving off social-media-only selling.",
    problems: [
      {
        title: "Matching payments to orders by hand",
        body: "When payments and orders are tracked separately, teams spend time checking references and updating records. Integrating a supported payment provider can confirm the result and connect it to the right order.",
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
      "Payment-provider integrations suited to your customers",
      "Product catalogue, variants, and inventory management",
      "Delivery options, fees and collection preferences",
      "Order management, customer accounts and SMS/email notifications",
      "Performance tuning for low-bandwidth connections",
      "Analytics setup so you can see what actually sells",
    ],
    stack: ["Shopify or WooCommerce (when they fit)", "React / Next.js for custom stores", "Payment provider APIs", "PostgreSQL"],
    faqs: [
      {
        question: "Can customers use different payment methods?",
        answer:
          "Yes. We can scope supported card, bank and mobile-wallet providers around your customers and the platforms available to your business.",
      },
      {
        question: "Shopify, WooCommerce or custom: which should I choose?",
        answer:
          "An established platform can suit a store whose needs match its built-in features. A custom store may be worth considering when the required workflows or integrations do not fit. We compare the options against your needs and ongoing operating preferences.",
      },
      {
        question: "Can I accept card payments from customers abroad?",
        answer:
          "Yes. We can include card payments and other supported options so customers can pay through the methods available to them.",
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
    group: "Build",
    name: "Mobile Apps",
    h1: "Mobile App Development for Android & iOS",
    summary:
      "Android and iOS apps from one codebase, built to work on mid-range devices and patchy connections.",
    image: imagery.serviceMobileApps,
    metaTitle: "Mobile App Development for Android & iOS | Gidev",
    metaDescription:
      "Mobile app development for Android and iOS, with one shared codebase, thoughtful performance and support through release.",
    intro: [
      "An app that only works on high-end phones and a perfect connection can exclude the people who need it. We build with React Native so a single codebase can serve Android and iOS, and test against the devices and conditions that matter to your audience.",
      "We keep apps focused and responsive, cache what users need where it makes sense, and make sure important actions are not lost when a connection drops.",
      "Before recommending an app, we will ask whether you need one. A fast mobile website is often cheaper and reaches more people. When you do need an app, for push notifications, offline use, camera or location features, or daily-use tools for staff or riders, we will build it properly.",
    ],
    bestFor:
      "Products that need to be in a user's pocket, and services where the phone is the primary way people access you.",
    problems: [
      {
        title: "Your users are on mid-range Android phones",
        body: "Apps designed only for high-end devices can feel slow or unreliable for many users. We profile on representative devices and keep the app focused so it installs and runs well.",
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
      "Payment integrations in-app where needed",
      "Push notifications and device integrations (camera, location)",
      "App Store and Play Store submission support",
      "Post-launch updates and maintenance",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Node.js / Supabase backends", "Firebase Cloud Messaging", "Payment provider APIs"],
    faqs: [
      {
        question: "Do I need a mobile app or a mobile website?",
        answer:
          "If people use your service occasionally, a fast mobile website usually serves them better and costs less. An app makes sense for daily use, offline work, push notifications, or device features such as camera and GPS.",
      },
      {
        question: "Will the app work on both Android and iOS?",
        answer:
          "Yes. We build with React Native, so one codebase produces both apps. We agree which platforms and devices to prioritise based on your audience.",
      },
      {
        question: "Can the app accept payments?",
        answer:
          "Yes. We can include supported payment integrations in the agreed app scope.",
      },
      {
        question: "Who publishes the app to the Play Store and App Store?",
        answer:
          "We prepare the listings and handle submission, under developer accounts in your company's name so you own the apps.",
      },
      {
        question: "How do updates work after launch?",
        answer:
          "The release method depends on the change and the platform. We can agree an update and maintenance arrangement as part of the project scope or through a separate monthly retainer or partnership.",
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
    group: "Build",
    name: "Business Websites & Systems",
    h1: "Business Website Design & Development",
    summary:
      "Fast, findable websites — plus the internal systems that automate the work behind them.",
    image: imagery.serviceBusinessWebsites,
    metaTitle: "Business Website Design & Development | Gidev",
    metaDescription:
      "Fast, clear business websites designed to strengthen your online presence and turn the right visits into enquiries.",
    intro: [
      "A business website should do two things: be found by people looking for you, and load quickly when they arrive. We build sites that do both, and where it helps, the internal systems that handle the work behind them.",
      "Many business websites are built once and then left to drift. They can become slow, difficult to find and unclear about what a visitor should do next. We create or refresh sites so each page serves a purpose, loads quickly and makes it easy to get in touch.",
      "Behind the website, many businesses still quote, invoice and schedule by hand. Where it pays for itself, we automate that too: an enquiry form that creates a quote, a quote that becomes an invoice, and a simple dashboard showing what is outstanding.",
    ],
    bestFor:
      "Established businesses whose current site is invisible in search, and operations teams still running on paper or spreadsheets.",
    problems: [
      {
        title: "Customers can't find you on Google",
        body: "If people search for your service and find competitors first, you may miss opportunities. We structure pages around relevant searches, with clear titles, descriptions and structured data.",
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
    faqs: [
      {
        question: "How long does it take to build a business website?",
        answer:
          "Timing depends on the page count, content readiness, review cycle and integrations. We agree a schedule after the scope and responsibilities are clear.",
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
  {
    slug: "seo",
    group: "Grow & Support",
    name: "SEO Services",
    h1: "Search Engine Optimization",
    summary:
      "Practical search optimisation that helps the right people find your business and take the next step.",
    image: imagery.serviceSeo,
    metaTitle: "Search Engine Optimization Services | Gidev",
    metaDescription:
      "Technical and on-page SEO that helps the right audience find your business through useful content and a stronger search foundation.",
    intro: [
      "Search visibility is built from small things working together: a site search engines can understand, pages that answer the right questions and useful information for your audience. We help teams improve those foundations without promising overnight rankings.",
      "We start by understanding what your customers search for and how your site currently performs. From there, we prioritise technical fixes, page improvements and content opportunities that match your business goals.",
    ],
    bestFor:
      "Businesses that want more qualified discovery through organic search and a clear plan for improving their website.",
    problems: [
      {
        title: "Your site is hard to find",
        body: "We review how pages are indexed, structured and linked, then identify the technical and content issues that may be holding visibility back.",
      },
      {
        title: "Search traffic does not lead to enquiries",
        body: "We align page intent, useful information and calls to action so visitors can move from finding your business to understanding what to do next.",
      },
      {
        title: "You are not sure what to work on first",
        body: "A prioritised audit separates high-impact improvements from busywork and gives your team a practical order of operations.",
      },
    ],
    includes: [
      "Technical and on-page SEO review",
      "Keyword and search-intent mapping",
      "Page structure, metadata and internal-link recommendations",
      "Audience and market-specific search guidance",
      "Content priorities based on your services and audience",
      "Progress reporting with clear next steps",
    ],
    faqs: [
      {
        question: "Can you guarantee a first-page Google ranking?",
        answer:
          "No. Search rankings depend on many factors outside any provider's control. We focus on sound technical foundations, relevant content and transparent progress rather than guaranteed positions.",
      },
      {
        question: "Do you work on websites you did not build?",
        answer:
          "Yes. We can review and improve an existing website, and we will explain any platform limitations before recommending changes.",
      },
      {
        question: "How soon will SEO changes make a difference?",
        answer:
          "Technical corrections can be made quickly, but search engines need time to recrawl and reassess pages. The timing and impact vary by site, competition and the work involved.",
      },
    ],
    relatedPosts: [],
    relatedProjects: [],
  },
  {
    slug: "maintenance",
    aliases: ["website-maintenance"],
    group: "Grow & Support",
    name: "Website Maintenance & Support",
    h1: "Website Maintenance & Support",
    summary:
      "Keep your website dependable, current and supported with planned updates and a clear route to help.",
    image: imagery.serviceMaintenance,
    metaTitle: "Website Maintenance & Support | Gidev",
    metaDescription:
      "Reliable website maintenance and support, including updates, checks, content changes and practical help for your team.",
    intro: [
      "A website needs care after launch. Software updates, content changes and small issues can build up when there is no clear owner for them. We provide practical ongoing support so your site stays current and your team knows where to turn when something needs attention.",
      "We begin by understanding how your website is built, who has access and what support you need. The plan can cover scheduled maintenance, agreed content updates and help with issues, with the scope made clear before work begins.",
    ],
    bestFor:
      "Businesses that depend on their website but do not have an in-house team to maintain it.",
    problems: [
      {
        title: "Updates keep getting postponed",
        body: "We help establish a routine for supported platform, plugin and dependency updates, with checks around changes that could affect the live site.",
      },
      {
        title: "Small website changes are hard to get done",
        body: "A support arrangement gives your team a clear way to request agreed content and layout updates without starting a new project each time.",
      },
      {
        title: "You are unsure what shape the site is in",
        body: "A baseline review can surface obvious maintenance needs, access gaps and performance concerns before we recommend an ongoing plan.",
      },
    ],
    includes: [
      "A baseline review of the website and its operating setup",
      "Planned maintenance for the supported platform",
      "Agreed content and small website updates",
      "Basic availability and form checks where supported",
      "Issue triage and a clear escalation route",
      "Regular summary of work completed and open items",
    ],
    faqs: [
      {
        question: "Can you maintain a website built by another provider?",
        answer:
          "Usually, after we review the platform, code and available access. We will explain any constraints and agree the handover needed before taking on ongoing support.",
      },
      {
        question: "Does maintenance include a full redesign?",
        answer:
          "No. Routine support covers the agreed maintenance and update scope. A redesign or substantial new feature would be scoped as separate work.",
      },
      {
        question: "Can you provide one-off support?",
        answer:
          "Yes. We can first scope a specific issue or update, then discuss ongoing support if regular help would be more useful.",
      },
    ],
    relatedPosts: [],
    relatedProjects: [],
  },
  {
    slug: "branding",
    aliases: ["branding-graphic-design"],
    group: "Grow & Support",
    name: "Branding & Graphic Design",
    h1: "Branding & Graphic Design",
    summary:
      "Create a recognisable, consistent identity and useful design assets for your business.",
    image: imagery.serviceBranding,
    metaTitle: "Branding & Graphic Design | Gidev",
    metaDescription:
      "Brand identity and graphic design, from visual direction and core assets to a consistent system for your digital channels.",
    intro: [
      "A clear visual identity helps people recognise your business and understand what it stands for. We bring strategy and design together to create a practical brand system your team can use across your website, social channels and business materials.",
      "Whether you are starting fresh or bringing an existing identity into line, we agree the audience, direction and deliverables first. The result is designed to be useful beyond a single launch graphic.",
    ],
    bestFor:
      "New and growing businesses that need a coherent identity or a more consistent set of visual materials.",
    problems: [
      {
        title: "Your brand looks different everywhere",
        body: "A shared visual direction and usable guidelines make it easier for your team to create consistent materials across channels.",
      },
      {
        title: "Your business has outgrown its current identity",
        body: "We can refine or refresh the visual system so it better reflects what the business does today without losing useful recognition.",
      },
      {
        title: "You need design assets that work in practice",
        body: "We scope the formats and contexts up front so the finished assets are usable across the channels and materials you actually need.",
      },
    ],
    includes: [
      "Creative direction informed by your business and audience",
      "Logo and core identity design within the agreed scope",
      "Colour and typography system",
      "Practical brand usage guidance",
      "Selected digital and print-ready design assets",
      "Handover of agreed final files",
    ],
    faqs: [
      {
        question: "Can you refresh an existing brand rather than start over?",
        answer:
          "Yes. We can review what already works and build a focused refresh around it, rather than replacing recognisable elements without a reason.",
      },
      {
        question: "Will we receive the design files?",
        answer:
          "The handover includes the agreed final export formats and usage guidance. Editable source files and any third-party asset licences are clarified in the project scope.",
      },
      {
        question: "Can branding be combined with a website project?",
        answer:
          "Yes. Brand identity and website work can be scoped together so the visual system carries through consistently to the digital experience.",
      },
    ],
    relatedPosts: [],
    relatedProjects: [],
  },
  {
    slug: "digital-marketing",
    group: "Grow & Support",
    name: "Digital Marketing",
    h1: "Digital Marketing",
    summary:
      "Plan and improve social media and email activity around your audience, message and business goals.",
    image: imagery.serviceDigitalMarketing,
    metaTitle: "Digital Marketing Services | Gidev",
    metaDescription:
      "Digital marketing support across social media and email, planned around clear audiences, goals and useful measurement.",
    intro: [
      "Digital marketing works best when the message, audience and next step are clear. We help businesses plan practical social media and email activity that supports their goals, rather than publishing for the sake of keeping a calendar full.",
      "We start by learning what you offer, who you need to reach and what channels you can support. The scope can cover campaign planning, content direction and email activity, with responsibilities and reporting agreed up front.",
    ],
    bestFor:
      "Businesses that want more consistent social and email communication and a clearer way to connect activity to business priorities.",
    problems: [
      {
        title: "Marketing happens only when there is spare time",
        body: "A workable plan gives your team a steady rhythm and clear priorities without demanding an unrealistic volume of content.",
      },
      {
        title: "Your message changes from channel to channel",
        body: "We align campaign themes and content direction with your brand so customers receive a more consistent impression.",
      },
      {
        title: "You cannot tell what is worth repeating",
        body: "We agree useful measures for the work and review them regularly, while staying honest about what the available data can tell you.",
      },
    ],
    includes: [
      "Audience, offer and channel review",
      "Social media and email activity planning",
      "Campaign themes and content direction",
      "Email campaign setup and copy within the agreed scope",
      "Publishing cadence and responsibility planning",
      "Performance review and next-step recommendations",
    ],
    faqs: [
      {
        question: "Do you provide social media and email marketing?",
        answer:
          "Yes. We help plan social media and email activity around your audience, business goals and the capacity available to create and approve content.",
      },
      {
        question: "Will you guarantee sales or follower growth?",
        answer:
          "No. Results depend on the offer, audience, budget, consistency and market conditions. We agree suitable measures and report progress without promising outcomes we cannot control.",
      },
      {
        question: "Can you work with our existing marketing team?",
        answer:
          "Yes. We can support planning and delivery alongside your team, with responsibilities and approval steps agreed before work begins.",
      },
    ],
    relatedPosts: [],
    relatedProjects: [],
  },
  {
    slug: "ai-services",
    group: "Build",
    name: "AI Services & Automation",
    h1: "Practical AI Services & Workflow Automation",
    summary:
      "Apply AI where it makes work simpler, with useful integrations, clear safeguards and people in control.",
    image: imagery.serviceAi,
    metaTitle: "AI Services & Workflow Automation | Gidev",
    metaDescription:
      "Practical AI and workflow automation for growing teams, from useful integrations to custom assistants designed around real work.",
    intro: [
      "AI is most useful when it solves a specific problem. We help teams identify where automation can save time, improve access to information or support a better customer experience, then shape a focused solution around the tools and workflows already in use.",
      "We keep people in control of important decisions. Each engagement starts with a clear use case, data and integration requirements, and a way to evaluate whether the result is useful before expanding it.",
    ],
    bestFor:
      "Teams exploring AI and automation who want a practical starting point, a clear scope and a responsible path to delivery.",
    problems: [
      {
        title: "Repetitive work takes time away from the team",
        body: "We look for repeatable tasks that can be streamlined, such as sorting requests, preparing summaries or moving information between systems.",
      },
      {
        title: "Useful knowledge is hard to find",
        body: "A carefully scoped assistant can help people find answers in approved information, with clear limits and a route to human support.",
      },
      {
        title: "You are unsure where AI fits",
        body: "We assess possible use cases against the effort, risks and expected value, then recommend a small, measurable first step—or advise when AI is not the right tool.",
      },
    ],
    includes: [
      "AI opportunity and workflow assessment",
      "Custom assistants grounded in approved business information",
      "Workflow automation and integrations with existing tools",
      "Human review and escalation paths for important decisions",
      "Testing for usefulness, reliability and data handling",
      "Documentation and guidance for the team using the solution",
    ],
    stack: ["AI provider APIs", "Workflow automation tools", "TypeScript", "Existing business APIs"],
    faqs: [
      {
        question: "What kind of AI solutions do you build?",
        answer:
          "Depending on the use case, we can build focused assistants, connect AI capabilities to existing software or automate repeatable workflows. We agree the scope and safeguards before implementation.",
      },
      {
        question: "Can AI work with our existing tools?",
        answer:
          "Often, if the tools provide suitable integrations and access controls. We review the systems and data involved before recommending an approach.",
      },
      {
        question: "Will AI make decisions without human review?",
        answer:
          "Not by default. We design review and escalation into workflows where accuracy, context or accountability matters, and agree the level of automation with you.",
      },
    ],
    relatedPosts: ["practical-ai-for-kenyan-businesses-in-2026"],
    relatedProjects: [],
  },
];

/** Shared workflow for the homepage process section. */
export const digitalDeliveryProcess: ServiceStep[] = [
  {
    title: "Understand the brief",
    body: "We learn about your business, audience, current setup and the outcome you want to support.",
  },
  {
    title: "Agree the scope",
    body: "We put the priorities, deliverables, responsibilities and review points in writing before work starts.",
  },
  {
    title: "Deliver in steps",
    body: "We share work at agreed checkpoints so you can review it and give direction as it develops.",
  },
  {
    title: "Review & improve",
    body: "We hand over the agreed work, review what is working and identify sensible next steps.",
  },
];

/** Delivered as part of the services above rather than sold separately. */
export const capabilities = [
  "Clear scope and agreed deliverables",
  "Regular reviews and communication",
  "Quality checks appropriate to the work",
  "Practical handover and next steps",
];

const serviceDetails: Record<
  string,
  { deliverables: string[]; processSteps: ServiceStep[]; relatedServiceIds: string[] }
> = {
  "web-apps": {
    deliverables: [
      "A scoped application structure based on agreed user roles and workflows",
      "The agreed browser-based application and integrations",
      "Deployment and handover notes for the delivered system",
    ],
    processSteps: [
      { title: "Map the workflow", body: "We document who will use the system, the tasks they need to complete and the information it must handle." },
      { title: "Shape the application", body: "We agree the screens, permissions, integrations and first delivery scope before implementation." },
      { title: "Build and review", body: "We develop the agreed workflows and share them at review points so feedback is addressed in context." },
      { title: "Deploy and hand over", body: "We prepare the agreed production setup, walk through the system and document the next steps." },
    ],
    relatedServiceIds: ["ecommerce", "business-websites", "maintenance"],
  },
  ecommerce: {
    deliverables: [
      "A product catalogue and storefront structure within the agreed scope",
      "A checkout flow with the selected payment integration",
      "Store administration and handover guidance for agreed order workflows",
    ],
    processSteps: [
      { title: "Plan the store", body: "We clarify products, customer journeys, fulfilment needs and the platform that fits the brief." },
      { title: "Design the checkout", body: "We map the catalogue, checkout, payment confirmation and order-management steps." },
      { title: "Configure and test", body: "We implement the agreed storefront and check the purchasing flow against the brief." },
      { title: "Prepare for handover", body: "We review store administration, agreed integrations and operating steps with your team." },
    ],
    relatedServiceIds: ["web-apps", "seo", "digital-marketing"],
  },
  "mobile-apps": {
    deliverables: [
      "A documented mobile-app scope for the agreed platforms and user flows",
      "The agreed app build and connected services",
      "Store-submission or deployment handover for the agreed release",
    ],
    processSteps: [
      { title: "Check the use case", body: "We compare the app idea with a mobile website and identify which device capabilities matter." },
      { title: "Define the first release", body: "We agree the priority user journeys, target platforms and any backend or device integrations." },
      { title: "Build and validate", body: "We implement the app and review key flows against the selected device and connectivity requirements." },
      { title: "Release and hand over", body: "We prepare the agreed store submission or deployment and explain how the delivered app is maintained." },
    ],
    relatedServiceIds: ["web-apps", "ecommerce", "maintenance"],
  },
  "business-websites": {
    deliverables: [
      "A page structure and content plan agreed for the project",
      "A responsive business website with the specified contact paths",
      "Search and accessibility checks appropriate to the agreed scope",
    ],
    processSteps: [
      { title: "Clarify the audience", body: "We identify who the site serves, what information they need and what action each key page should support." },
      { title: "Plan the pages", body: "We agree the site structure, content responsibilities, visual direction and technical requirements." },
      { title: "Build and review", body: "We create the pages and test the agreed user journeys across target screen sizes." },
      { title: "Publish and support", body: "We prepare the launch and hand over the agreed editing, analytics or ongoing-support arrangements." },
    ],
    relatedServiceIds: ["seo", "branding", "maintenance"],
  },
  seo: {
    deliverables: [
      "A review of the site's technical and on-page search foundations",
      "A prioritised set of search-intent and content recommendations",
      "A progress review based on the data available for the engagement",
    ],
    processSteps: [
      { title: "Review the search baseline", body: "We look at the site, current visibility, audience and the questions your customers search for." },
      { title: "Set priorities", body: "We separate technical, page and content opportunities into a practical order of work." },
      { title: "Apply agreed changes", body: "We make the scoped improvements or coordinate with your team to implement them." },
      { title: "Review the evidence", body: "We assess available search data and use it to shape the next set of recommendations." },
    ],
    relatedServiceIds: ["business-websites", "ecommerce", "digital-marketing"],
  },
  maintenance: {
    deliverables: [
      "A review of the current website setup and support needs",
      "A written maintenance scope, request path and agreed responsibilities",
      "Records of completed work and any follow-up needs within scope",
    ],
    processSteps: [
      { title: "Review the website", body: "We understand the platform, access arrangements, dependencies and issues that need attention." },
      { title: "Agree support boundaries", body: "We document the maintenance tasks, request route, responsibilities and engagement model." },
      { title: "Carry out planned work", body: "We complete the agreed updates and respond to requests within the defined scope." },
      { title: "Report and prioritise", body: "We share completed work, flag follow-ups and agree what should be handled next." },
    ],
    relatedServiceIds: ["business-websites", "web-apps", "seo"],
  },
  branding: {
    deliverables: [
      "A visual direction grounded in the agreed business and audience brief",
      "The identity elements and channel-specific design assets in scope",
      "Final files and usage guidance in the agreed formats",
    ],
    processSteps: [
      { title: "Understand the brand", body: "We discuss your audience, offer, existing identity and where the design needs to work." },
      { title: "Agree a direction", body: "We define the visual approach and specific assets before design production begins." },
      { title: "Develop the design", body: "We create and refine the selected work against the agreed brief and review points." },
      { title: "Prepare the files", body: "We deliver the approved assets in the formats and usage contexts set out in the scope." },
    ],
    relatedServiceIds: ["business-websites", "digital-marketing"],
  },
  "digital-marketing": {
    deliverables: [
      "A channel plan for the agreed social media and email activity",
      "Campaign themes and content direction aligned with the brief",
      "A review of available performance signals and next steps",
    ],
    processSteps: [
      { title: "Understand the audience", body: "We review your offer, customers, current channels and the outcomes the activity should support." },
      { title: "Plan the activity", body: "We agree channel roles, campaign themes, cadence and approval responsibilities." },
      { title: "Create and coordinate", body: "We prepare the agreed social and email work and coordinate publishing with your team." },
      { title: "Review and refine", body: "We examine available performance signals and use them to inform the next cycle." },
    ],
    relatedServiceIds: ["branding", "seo", "ecommerce"],
  },
  "ai-services": {
    deliverables: [
      "A prioritised AI or automation use case with clear success measures",
      "The agreed integration, assistant or workflow",
      "Usage guidance, safeguards and a practical handover",
    ],
    processSteps: [
      { title: "Find the right use case", body: "We learn how the work happens today and identify where AI or automation may help." },
      { title: "Set the boundaries", body: "We agree the data, integrations, review steps and measures that shape a responsible first release." },
      { title: "Build and test", body: "We implement a focused solution and test it against representative workflows and expected edge cases." },
      { title: "Review and improve", body: "We assess how the solution performs with your team and identify evidence-based next steps." },
    ],
    relatedServiceIds: ["web-apps", "business-websites", "maintenance"],
  },
};

const serviceIcons: Record<string, LucideIcon> = {
  "web-apps": Code2,
  ecommerce: ShoppingBag,
  "mobile-apps": Smartphone,
  "business-websites": Building2,
  seo: Search,
  maintenance: Wrench,
  branding: Palette,
  "digital-marketing": Megaphone,
  "ai-services": Sparkles,
};

export const services: Service[] = serviceEntries.map(({ name, summary, intro, includes, ...entry }) => {
  const details = serviceDetails[entry.slug];
  const icon = serviceIcons[entry.slug];
  if (!details || !icon) throw new Error(`Missing service details for "${entry.slug}"`);
  return {
    ...entry,
    id: entry.slug,
    title: name,
    shortDescription: summary,
    longDescription: intro.join("\n\n"),
    icon,
    includedItems: includes,
    ...details,
  };
});

export function serviceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug || service.aliases?.includes(slug));
}
