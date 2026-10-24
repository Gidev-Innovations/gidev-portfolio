export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  /** Shorter <title> when `title` is over 60 characters. */
  seoTitle?: string;
  date: string;
  author: string;
  category: string;
  image: string;
  excerpt: string;
  content: BlogContent[];
}

export type BlogContent =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; ordered: boolean; items: string[] };

/**
 * Gidev Innovations blog posts. Dates are set in 2026 so the archive
 * matches the current year. Cover images are topic/atmosphere shots, with no
 * people portraits. Replace with real photography or product screenshots
 * when available.
 *
 * NOTE: slugs and image paths are referenced by services.ts (relatedPosts)
 * and by the generated /og images, so change them only together.
 */
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "custom-web-apps-vs-instagram-shops-african-smes-2026",
    title: "Custom Web Apps vs Social Commerce: What Growing Businesses Need",
    seoTitle: "Custom Web Apps vs Social Commerce",
    date: "12 August, 2026",
    author: "Gidev Innovations team",
    category: "Web Apps",
    image: "/og/custom-web-apps-vs-instagram-shops-african-smes-2026.png",
    excerpt:
      "Selling on Instagram still works, until inventory, invoices and repeat customers outgrow DMs. Here is when a real web app starts to pay for itself.",
    content: [
      {
        type: "paragraph",
        text: "Many growing retailers start with social posts, messaging apps and manual payment confirmation. That approach can work for early sales, but it starts to strain as orders, products and the team grow.",
      },
      { type: "heading", text: "What Instagram is still good for" },
      {
        type: "paragraph",
        text: "Discovery, brand personality and soft launches. If your main job this quarter is finding customers, stay close to the platforms where they already scroll. There is no need to rebuild a social network inside your website.",
      },
      { type: "heading", text: "When a custom web app becomes the better tool" },
      {
        type: "list",
        ordered: false,
        items: [
          "Orders arrive faster than you can confirm them by hand",
          "You need stock levels, invoices or delivery status in one place",
          "Customers expect saved carts, order history or loyalty",
          "You want to connect payment methods without spreadsheet reconciliation",
        ],
      },
      { type: "heading", text: "A practical middle path" },
      {
        type: "paragraph",
        text: "You don’t have to choose one or the other. Keep Instagram for marketing, and move checkout, inventory and admin into a focused web app. The brand stays visible where people already spend time, while operations live somewhere reliable. That split is often simpler to run than trying to automate everything in chat.",
      },
    ],
  },
  {
    id: 2,
    slug: "designing-checkout-for-mpesa-and-mobile-money-2026",
    title: "Designing Checkout for Mobile Wallets & Online Payments",
    date: "28 July, 2026",
    author: "Gidev Innovations team",
    category: "E-Commerce",
    image: "/og/designing-checkout-for-mpesa-and-mobile-money-2026.png",
    excerpt:
      "A clear payment flow gives customers familiar options and confidence at checkout. Here is how to design one around the methods your audience uses.",
    content: [
      {
        type: "paragraph",
        text: "If your storefront assumes every customer pays by card, you may be overlooking the methods your audience prefers. Mobile wallets such as M-Pesa, bank transfers and cards can all be primary choices, depending on the customer and the market. Your checkout should reflect that.",
      },
      { type: "heading", text: "Lead with the wallet people already trust" },
      {
        type: "paragraph",
        text: "Present payment options in the order that makes sense for your customers. Use clear labels, explain what happens next, and provide helpful waiting, success and error states so customers can retry without losing their cart.",
      },
      { type: "heading", text: "Reduce abandoned carts with clear states" },
      {
        type: "list",
        ordered: true,
        items: [
          "Tell the shopper when to check their phone for the prompt",
          "Keep the order in a pending state long enough for slow networks",
          "Confirm with an SMS or in-app receipt they can forward to finance",
          "Offer a clear alternative if the first payment attempt fails",
        ],
      },
      { type: "heading", text: "Build for ops, not just the happy path" },
      {
        type: "paragraph",
        text: "Your team still needs to match payments to orders when a customer pays late or mistypes a reference. Admin tools that show pending, paid and disputed states save more time than another homepage animation. That operational clarity is part of good e-commerce design.",
      },
      {
        type: "paragraph",
        text: "Gidev can connect supported payment providers to your store and business systems, so checkout fits how your customers actually pay.",
      },
    ],
  },
  {
    id: 3,
    slug: "practical-ai-for-kenyan-businesses-in-2026",
    title: "Practical AI for Growing Businesses in 2026",
    date: "9 June, 2026",
    author: "Gidev Innovations team",
    category: "AI & Automation",
    image: "/og/practical-ai-for-kenyan-businesses-in-2026.png",
    excerpt:
      "Skip the hype deck. Explore practical AI uses for growing teams, and the decisions that still need a human in the loop.",
    content: [
      {
        type: "paragraph",
        text: "Every pitch deck now has an “AI-powered” slide. Most of those features do not survive contact with messy data, intermittent connectivity or a three-person ops team. At Gidev we only recommend AI where it shortens a real workflow you already pay people to do.",
      },
      { type: "heading", text: "Where AI helps today" },
      {
        type: "list",
        ordered: false,
        items: [
          "Drafting first-pass customer replies from a knowledge base you control",
          "Summarising long support threads or delivery notes for managers",
          "Classifying incoming requests so the right person sees them first",
          "Extracting fields from invoices or forms so humans do less retyping",
        ],
      },
      { type: "heading", text: "Where to stay cautious" },
      {
        type: "paragraph",
        text: "Do not put an unattended model in charge of prices, medical advice or legal commitments. Do not train on customer data you have not permissioned. And do not bolt a chatbot onto a broken process, because AI amplifies whatever system you already have. Keep people in control, with clear safeguards and a human who can review or override.",
      },
      { type: "heading", text: "How we scope AI work" },
      {
        type: "paragraph",
        text: "Start with one measurable task, ship a thin integration, measure whether staff actually use it, then expand. That is slower than a buzzword launch, and far more likely to still be running next year.",
      },
    ],
  },
  {
    id: 4,
    slug: "business-website-or-web-application-how-to-choose",
    title: "Business Website or Web Application: How to Choose",
    date: "21 May, 2026",
    author: "Gidev Innovations team",
    category: "Business Websites",
    image: "/og/business-website-or-web-application-how-to-choose.png",
    excerpt:
      "Founders often ask for “a website” when they need software. A quick decision guide before you write the brief.",
    content: [
      {
        type: "paragraph",
        text: "A marketing site and a web application can look similar in a design file, but they are not the same product. Mixing them up is how budgets disappear into endless “just one more feature” cycles.",
      },
      { type: "heading", text: "Choose a business website when…" },
      {
        type: "list",
        ordered: false,
        items: [
          "Your main job is trust, SEO and inbound leads",
          "Content changes weekly, not hourly",
          "There is no logged-in customer experience yet",
          "Success means calls booked and brand clarity",
        ],
      },
      { type: "heading", text: "Choose a web application when…" },
      {
        type: "list",
        ordered: false,
        items: [
          "Users log in and return to do work",
          "You store orders, roles, permissions or workflows",
          "Integrations (payments, SMS, ERPs) are core, not optional",
          "The product is how you deliver the service",
        ],
      },
      { type: "heading", text: "You can sequence both" },
      {
        type: "paragraph",
        text: "Many teams ship a sharp marketing site first, then the logged-in product once the offer is proven. That order protects cash and keeps the public brand from waiting on engineering edge cases. Tell us which outcome you need this quarter and we will recommend the thinner build that gets you there.",
      },
    ],
  },
  {
    id: 5,
    slug: "mobile-apps-for-mid-range-android-east-africa-2026",
    title: "Mobile Apps for Mid-Range Android Devices in 2026",
    date: "4 April, 2026",
    author: "Gidev Innovations team",
    category: "Mobile Apps",
    image: "/og/mobile-apps-for-mid-range-android-east-africa-2026.png",
    excerpt:
      "Most field teams are not on flagship phones. Here is how we design and ship apps that stay usable on the devices people actually carry.",
    content: [
      {
        type: "paragraph",
        text: "Demo day phones are not the phones in the field. If your agents, riders or clerks use mid-range Android devices on uneven networks, performance and offline behaviour matter more than glossy visuals. That is how we build mobile apps at Gidev: for mid-range devices and patchy connections.",
      },
      { type: "heading", text: "Design constraints we take seriously" },
      {
        type: "list",
        ordered: true,
        items: [
          "Smaller screens and denser UI: tap targets over decoration",
          "Lower RAM and storage: lean assets and careful caching",
          "Spotty data: queue actions offline and sync when possible",
          "Battery life: avoid aggressive background work",
        ],
      },
      { type: "heading", text: "Native, hybrid or progressive web?" },
      {
        type: "paragraph",
        text: "There is no universal answer. A progressive web app can cover many internal tools without an app-store loop. Native or well-built cross-platform apps still win when you need camera reliability, background location or deeper OS hooks. We pick based on the job, not the trend chart.",
      },
      { type: "heading", text: "Test on real devices early" },
      {
        type: "paragraph",
        text: "Budget time to run builds on the cheapest phone on your team. Catching a slow list screen in week two is cheaper than catching it after launch. In 2026 that discipline still separates apps people keep from apps they uninstall.",
      },
    ],
  },
  {
    id: 6,
    slug: "questions-to-ask-a-software-studio-before-you-sign",
    title: "Questions to Ask a Software Development Partner Before You Sign",
    seoTitle: "Questions to Ask a Software Partner Before You Sign",
    date: "18 March, 2026",
    author: "Gidev Innovations team",
    category: "Founders",
    image: "/og/questions-to-ask-a-software-studio-before-you-sign.png",
    excerpt:
      "A short checklist for founders hiring a build partner, so scope, ownership and handoff are clear before work begins.",
    content: [
      {
        type: "paragraph",
        text: "A relationship with a software partner usually fails in the same places: fuzzy scope, unclear ownership of code, and no plan for what happens after launch. Ask these questions early. Good partners answer them without theatre.",
      },
      { type: "heading", text: "Scope and delivery" },
      {
        type: "list",
        ordered: false,
        items: [
          "What is explicitly in and out of this phase?",
          "How do you handle change requests mid-build?",
          "Who is the day-to-day contact on your side and ours?",
          "What does “done” look like for the first release?",
        ],
      },
      { type: "heading", text: "Ownership and operations" },
      {
        type: "list",
        ordered: false,
        items: [
          "Who owns the code, designs and accounts after payment?",
          "Where will the product be hosted, and who pays for it?",
          "How are credentials and domains handed over?",
          "What support exists in the first 30–90 days after launch?",
        ],
      },
      { type: "heading", text: "Why we publish this" },
      {
        type: "paragraph",
        text: "Gidev Innovations builds web apps, e-commerce, mobile apps, business systems and practical AI, then helps with SEO, branding, digital marketing and ongoing support, for teams that need clarity more than jargon. If these questions feel useful, bring them to a free 30-minute call. We expect to answer every one.",
      },
    ],
  },
  {
    id: 7,
    slug: "startup-studio-thinking-for-african-founders-2026",
    title: "Start Thin: How Founders Should Build a First Version in 2026",
    seoTitle: "Start Thin: Building a Founder’s First Version",
    date: "5 February, 2026",
    author: "Gidev Innovations team",
    category: "Founders",
    image: "/og/startup-studio-thinking-for-african-founders-2026.png",
    excerpt:
      "Not every idea needs a full product team on day one. How to validate, ship a thin first version and decide what to build next.",
    content: [
      {
        type: "paragraph",
        text: "Budgets are tight and expectations are high. Founders tend to do better when they ship a narrow product that proves one painful workflow, then expand. A good build partner matches that pace instead of pretending you already need a fifty-screen platform.",
      },
      { type: "heading", text: "What “thin” actually means" },
      {
        type: "paragraph",
        text: "One primary user, one primary job, one clear success metric. Everything else is backlog. That discipline feels uncomfortable in workshops and saves months in engineering.",
      },
      { type: "heading", text: "How we partner" },
      {
        type: "list",
        ordered: true,
        items: [
          "Clarify the problem and the buyer in plain language",
          "Map the smallest build that can be used in the real world",
          "Ship, watch usage and decide what earns the next sprint",
          "Keep code and accounts in your ownership from the start",
        ],
      },
      { type: "heading", text: "A note on vanity features" },
      {
        type: "paragraph",
        text: "Dashboards nobody opens, admin panels that mirror spreadsheets and AI demos that do not touch operations: we will push back. Not because ambition is bad, but because unfinished ambition is expensive. If you want a partner that argues for the thinner path when it protects the business, book a free 30-minute call.",
      },
    ],
  },
];