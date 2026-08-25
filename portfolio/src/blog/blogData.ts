import { imagery } from "../data/imagery";

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
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
 * Studio writing for the Gidev blog. Dates are set in 2026 so the archive
 * matches the current year. Cover images are topic/atmosphere shots — no
 * people portraits. Replace with real photography or product screenshots
 * when available.
 */
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "custom-web-apps-vs-instagram-shops-african-smes-2026",
    title: "Custom Web Apps vs Instagram Shops: What African SMEs Need in 2026",
    date: "12 August, 2026",
    author: "Joseph Macharia",
    category: "Product",
    image: imagery.productUi.src,
    excerpt:
      "Selling on Instagram still works — until inventory, invoices, and repeat customers outgrow DMs. Here is when a real web app starts to pay for itself.",
    content: [
      {
        type: "paragraph",
        text: "Across Nairobi, Accra, and Lagos, a huge share of retail still runs on Instagram posts, WhatsApp catalogues, and manual payment confirmation. That stack is fine for early sales. In 2026 it starts to crack the moment you hire a second person, stock more SKUs, or need clean records for tax and lenders.",
      },
      { type: "heading", text: "What Instagram is still good for" },
      {
        type: "paragraph",
        text: "Discovery. Brand personality. Soft launches. If your main job this quarter is finding customers, stay close to the platforms where they already scroll. Do not rebuild a social network inside your website.",
      },
      { type: "heading", text: "When a custom web app becomes the better tool" },
      {
        type: "list",
        ordered: false,
        items: [
          "Orders arrive faster than you can confirm them by hand",
          "You need stock levels, invoices, or delivery status in one place",
          "Customers expect saved carts, order history, or loyalty",
          "You want M-Pesa, cards, and bank transfers without spreadsheet reconciliation",
        ],
      },
      { type: "heading", text: "A practical middle path" },
      {
        type: "paragraph",
        text: "Many Gidev clients keep Instagram for marketing and move checkout, inventory, and admin into a focused web app. The brand stays loud where people hang out; the operations live somewhere reliable. That split is usually cheaper — and saner — than trying to automate everything in chat.",
      },
    ],
  },
  {
    id: 2,
    slug: "designing-checkout-for-mpesa-and-mobile-money-2026",
    title: "Designing Checkout for M-Pesa and Mobile Money in 2026",
    date: "28 July, 2026",
    author: "Joseph Macharia",
    category: "E-commerce",
    image: imagery.checkout.src,
    excerpt:
      "Card-first checkout copy from US templates still ships on African stores. Here is how we design payment flows for the wallets people actually use.",
    content: [
      {
        type: "paragraph",
        text: "If your storefront’s primary CTA assumes a credit card, you are designing for a minority of East African shoppers. M-Pesa, MoMo, and similar wallets are not “alternative methods” here — they are the default. Checkout UX has to reflect that.",
      },
      { type: "heading", text: "Lead with the wallet people already trust" },
      {
        type: "paragraph",
        text: "Put mobile money first in the payment list. Use local labels (“Pay with M-Pesa”) instead of generic “Mobile money.” Show the phone number format you expect and what happens after the STK push — waiting, success, failed, and how to retry without losing the cart.",
      },
      { type: "heading", text: "Reduce abandoned carts with clear states" },
      {
        type: "list",
        ordered: true,
        items: [
          "Tell the shopper when to check their phone for the prompt",
          "Keep the order in a pending state long enough for slow networks",
          "Confirm with an SMS or in-app receipt they can forward to finance",
          "Offer a fallback (paybill / till) when the push fails",
        ],
      },
      { type: "heading", text: "Build for ops, not just the happy path" },
      {
        type: "paragraph",
        text: "Your team still needs to match payments to orders when a customer pays late or mistypes a reference. Admin tools that show pending, paid, and disputed states save more time than another homepage animation. In 2026, that operational clarity is part of good e-commerce design.",
      },
    ],
  },
  {
    id: 3,
    slug: "practical-ai-for-kenyan-businesses-in-2026",
    title: "Practical AI for Kenyan Businesses in 2026",
    date: "9 June, 2026",
    author: "Joseph Macharia",
    category: "AI",
    image: imagery.codeOnScreen.src,
    excerpt:
      "Skip the hype deck. Here are AI uses that actually fit small and mid-size teams in Kenya — and what still needs a human in the loop.",
    content: [
      {
        type: "paragraph",
        text: "Every pitch deck now has an “AI-powered” slide. Most of those features do not survive contact with messy data, intermittent connectivity, or a three-person ops team. At Gidev we only recommend AI where it shortens a real workflow you already pay people to do.",
      },
      { type: "heading", text: "Where AI helps this year" },
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
        text: "Do not put an unattended model in charge of prices, medical advice, or legal commitments. Do not train on customer data you have not permissioned. And do not bolt a chatbot onto a broken process — AI amplifies whatever system you already have.",
      },
      { type: "heading", text: "How we scope AI work" },
      {
        type: "paragraph",
        text: "Start with one measurable task, ship a thin integration, measure whether staff actually use it, then expand. That is slower than a buzzword launch — and far more likely to still be running next year.",
      },
    ],
  },
  {
    id: 4,
    slug: "business-website-or-web-application-how-to-choose",
    title: "Business Website or Web Application: How to Choose",
    date: "21 May, 2026",
    author: "Joseph Macharia",
    category: "Strategy",
    image: imagery.designBoard.src,
    excerpt:
      "Founders often ask for “a website” when they need software. A quick decision guide before you write the brief.",
    content: [
      {
        type: "paragraph",
        text: "A marketing site and a web application look similar in a Figma file. They are not the same product. Mixing them up is how budgets disappear into endless “just one more feature” cycles.",
      },
      { type: "heading", text: "Choose a business website when…" },
      {
        type: "list",
        ordered: false,
        items: [
          "Your main job is trust, SEO, and inbound leads",
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
          "You store orders, roles, permissions, or workflows",
          "Integrations (payments, SMS, ERPs) are core, not optional",
          "The product is how you deliver the service",
        ],
      },
      { type: "heading", text: "You can sequence both" },
      {
        type: "paragraph",
        text: "Many studios ship a sharp marketing site first, then the authenticated product once the offer is proven. That order protects cash and keeps the public brand from waiting on engineering edge cases. Tell us which outcome you need this quarter — we will recommend the thinner build that gets you there.",
      },
    ],
  },
  {
    id: 5,
    slug: "mobile-apps-for-mid-range-android-east-africa-2026",
    title: "Mobile Apps for Mid-Range Android in East Africa, 2026",
    date: "4 April, 2026",
    author: "Joseph Macharia",
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80",
    excerpt:
      "Most field teams are not on flagship phones. Here is how we design and ship apps that stay usable on the devices people actually carry.",
    content: [
      {
        type: "paragraph",
        text: "Demo day phones are not the phones in the field. If your agents, riders, or clerks use mid-range Android devices on uneven networks, performance and offline behaviour matter more than glassmorphism.",
      },
      { type: "heading", text: "Design constraints we take seriously" },
      {
        type: "list",
        ordered: true,
        items: [
          "Smaller screens and denser UI — tap targets over decoration",
          "Lower RAM and storage — lean assets and careful caching",
          "Spotty data — queue actions offline and sync when possible",
          "Battery life — avoid aggressive background work",
        ],
      },
      { type: "heading", text: "Native, hybrid, or progressive web?" },
      {
        type: "paragraph",
        text: "There is no universal answer. A progressive web app can cover many internal tools without an app-store loop. Native or well-built cross-platform apps still win when you need camera reliability, background location, or deeper OS hooks. We pick based on the job, not the trend chart.",
      },
      { type: "heading", text: "Test on real devices early" },
      {
        type: "paragraph",
        text: "Budget time to run builds on the cheapest phone in your team’s pocket. Catching a slow list screen in week two is cheaper than after launch. In 2026 that discipline still separates apps people keep from apps they uninstall.",
      },
    ],
  },
  {
    id: 6,
    slug: "questions-to-ask-a-software-studio-before-you-sign",
    title: "Questions to Ask a Software Studio Before You Sign",
    date: "18 March, 2026",
    author: "Joseph Macharia",
    category: "Founders",
    image: imagery.serverRack.src,
    excerpt:
      "A short checklist for African founders hiring a build partner — so scope, ownership, and handoff are clear before money moves.",
    content: [
      {
        type: "paragraph",
        text: "The wrong studio relationship usually fails in the same places: fuzzy scope, unclear ownership of code, and no plan for what happens after launch. Ask these questions early. Good partners answer them without theatre.",
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
          "Who owns the code, designs, and accounts after payment?",
          "Where will the product be hosted, and who pays for it?",
          "How are credentials and domains handed over?",
          "What support exists in the first 30–90 days after launch?",
        ],
      },
      { type: "heading", text: "Why we publish this" },
      {
        type: "paragraph",
        text: "Gidev Innovations is based in Nairobi and builds web apps, e-commerce, mobile products, and business systems for teams that need clarity more than jargon. If these questions feel useful, bring them to our next call — we expect to answer every one.",
      },
    ],
  },
  {
    id: 7,
    slug: "startup-studio-thinking-for-african-founders-2026",
    title: "Startup Studio Thinking for African Founders in 2026",
    date: "5 February, 2026",
    author: "Joseph Macharia",
    category: "Founders",
    image: imagery.urbanDusk.src,
    excerpt:
      "Not every idea needs a full product team on day one. How we help founders validate, ship a thin first version, and decide what to build next.",
    content: [
      {
        type: "paragraph",
        text: "Capital is tighter and expectations are higher. Founders who win in 2026 tend to ship a narrow product that proves one painful workflow, then expand. Studio partnership works best when it matches that pace — not when it pretends you already need a fifty-screen platform.",
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
          "Ship, watch usage, and decide what earns the next sprint",
          "Keep code and accounts in your ownership from the start",
        ],
      },
      { type: "heading", text: "A note on vanity features" },
      {
        type: "paragraph",
        text: "Dashboards nobody opens, admin panels that mirror spreadsheets, and AI demos that do not touch operations — we will push back. Not because ambition is bad, but because unfinished ambition is expensive. If you want a studio that argues for the thinner path when it protects the business, we should talk.",
      },
    ],
  },
];
