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

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "maximizing-creativity-how-unlimited-design-subscriptions-work-for-you",
    title: "Maximizing Creativity: How Unlimited Design Subscriptions Work for You",
    date: "20 May, 2024",
    author: "Darlene Robertson",
    category: "Innovative",
    image: "https://picsum.photos/seed/design1/800/500",
    excerpt:
      "In today's fast-paced digital world, businesses need to stay ahead of the curve with fresh, innovative design.",
    content: [
      {
        type: "paragraph",
        text: "In today's fast-paced digital world, businesses need to stay ahead of the curve with fresh, innovative design. However, hiring a full-time designer or working with traditional agencies can be both costly and time-consuming.",
      },
      { type: "heading", text: "What is an Unlimited Design Subscription?" },
      {
        type: "paragraph",
        text: "An unlimited design subscription is a service model where businesses pay a flat monthly fee for access to a wide range of design services. This includes everything from graphic design and web development to video editing and more. The key feature of this model is the 'unlimited' aspect, which means clients can request as many design projects as they need each month without worrying about additional costs.",
      },
      { type: "heading", text: "The Benefits of Unlimited Design Subscriptions" },
      {
        type: "list",
        ordered: true,
        items: [
          "Cost-Effective Solution: Instead of paying per project or hiring a full-time designer, you pay a fixed monthly fee, which can save your business thousands of dollars annually.",
          "Flexibility and Scalability: With an unlimited design subscription, you have the flexibility to scale your design needs up or down based on your current requirements.",
          "Access to a Diverse Skill Set: Subscription services typically employ a team of experienced designers with diverse skills across various design disciplines.",
          "Speed and Efficiency: With a dedicated design team at your disposal, projects are completed faster, allowing you to meet tight deadlines.",
          "Consistency and Quality: Working with the same team over time ensures consistency in your branding and design quality.",
        ],
      },
      { type: "heading", text: "Conclusion" },
      {
        type: "paragraph",
        text: "Unlimited design subscriptions are transforming the way businesses approach their creative needs. By offering a cost-effective, flexible, and efficient solution, these services empower companies to maximize their creativity and stay competitive in a rapidly evolving market.",
      },
    ],
  },
  {
    id: 2,
    slug: "the-future-of-freelancing-benefits-of-a-subscription-based-creative-agency",
    title: "The Future of Freelancing: Benefits of a Subscription-Based Creative Agency",
    date: "20 April, 2023",
    author: "James Hawkins",
    category: "Innovative",
    image: "https://picsum.photos/seed/design2/800/500",
    excerpt:
      "The freelance economy is booming, but clients and agencies alike are discovering a smarter model.",
    content: [
      {
        type: "paragraph",
        text: "The freelance economy is booming, but clients and agencies alike are discovering a smarter model: the subscription-based creative agency. This approach combines the flexibility of freelancing with the reliability of an in-house team.",
      },
      { type: "heading", text: "Why Subscription Agencies Are Winning" },
      {
        type: "paragraph",
        text: "Traditional project-based work can be unpredictable. Subscription models create a steady workflow for creatives and predictable costs for clients, making the relationship far more productive.",
      },
      { type: "heading", text: "Key Advantages" },
      {
        type: "list",
        ordered: false,
        items: [
          "Predictable monthly billing with no surprise invoices",
          "Dedicated team that understands your brand deeply",
          "Priority turnaround on all design requests",
          "Cancel or pause anytime — full flexibility",
        ],
      },
      {
        type: "paragraph",
        text: "As businesses continue to digitize, the demand for creative output will only grow. Subscription agencies are perfectly positioned to meet that demand at scale.",
      },
    ],
  },
  {
    id: 3,
    slug: "why-a-monthly-subscription-is-better-than-hiring-full-time-designers",
    title: "Why a Monthly Subscription is Better Than Hiring Full-Time Designers",
    date: "20 June, 2022",
    author: "Cody Fisher",
    category: "Innovative",
    image: "https://picsum.photos/seed/design3/800/500",
    excerpt:
      "Hiring a full-time designer seems like the obvious solution — until you look at the true cost.",
    content: [
      {
        type: "paragraph",
        text: "Hiring a full-time designer seems like the obvious solution — until you look at the true cost. Salary, benefits, equipment, software licenses, and management overhead add up fast.",
      },
      { type: "heading", text: "The Real Cost of a Full-Time Designer" },
      {
        type: "list",
        ordered: true,
        items: [
          "Average annual salary: $65,000–$95,000",
          "Benefits and taxes: +20–30% on top of salary",
          "Software & tools: $2,000–$5,000 per year",
          "Recruitment and onboarding: 2–3 months of lost productivity",
        ],
      },
      { type: "heading", text: "The Subscription Alternative" },
      {
        type: "paragraph",
        text: "A design subscription gives you an entire team — illustrators, UI designers, motion designers — for a fraction of that cost. You get more range, more speed, and zero HR headaches.",
      },
    ],
  },
  {
    id: 4,
    slug: "what-to-expect-from-your-first-month-with-our-subscription-service",
    title: "What to Expect from Your First Month with Our Subscription Service",
    date: "20 March, 2023",
    author: "Esther Howard",
    category: "Innovative",
    image: "https://picsum.photos/seed/design4/800/500",
    excerpt:
      "Starting something new always comes with questions. Here's exactly what your first month looks like.",
    content: [
      {
        type: "paragraph",
        text: "Starting something new always comes with questions. Here's a transparent walkthrough of exactly what your first month with a design subscription looks like — no surprises.",
      },
      { type: "heading", text: "Week 1: Onboarding & Brand Discovery" },
      {
        type: "paragraph",
        text: "Your dedicated project manager will schedule a kick-off call to understand your brand, design preferences, and immediate needs. Expect your first deliverable within 48 hours of submitting a request.",
      },
      { type: "heading", text: "Week 2–3: Into the Workflow" },
      {
        type: "paragraph",
        text: "By week two you'll have a rhythm. Submit requests via your project board, leave feedback, and watch revisions land quickly. Most clients submit 4–8 requests in this window.",
      },
      { type: "heading", text: "Week 4: Review & Optimize" },
      {
        type: "paragraph",
        text: "End of month review: what worked, what can be faster, what's coming up next month. This is where the relationship really starts to click.",
      },
    ],
  },
  {
    id: 5,
    slug: "how-unlimited-design-subscriptions-can-save-you-time-and-money",
    title: "How Unlimited Design Subscriptions Can Save You Time and Money",
    date: "10 May, 2024",
    author: "Robert Fox",
    category: "Innovative",
    image: "https://picsum.photos/seed/design5/800/500",
    excerpt:
      "Time and money are your two most precious resources. Here's how a design subscription protects both.",
    content: [
      {
        type: "paragraph",
        text: "Time and money are your two most precious resources. Every hour spent briefing a new freelancer or chasing invoices is an hour not spent growing your business.",
      },
      { type: "heading", text: "Time Savings" },
      {
        type: "list",
        ordered: false,
        items: [
          "No recruitment cycles — your team is ready day one",
          "Async workflow means work happens while you sleep",
          "Reusable brand guidelines cut briefing time by 70%",
        ],
      },
      { type: "heading", text: "Financial Savings" },
      {
        type: "list",
        ordered: false,
        items: [
          "Flat monthly rate — budget with certainty",
          "No per-revision fees eating into your margins",
          "Pause when business is slow, scale up when it isn't",
        ],
      },
      {
        type: "paragraph",
        text: "The math is simple. A subscription costs less than one freelance project per month and delivers 10x the output. For growing businesses, it's a no-brainer.",
      },
    ],
  },
  {
    id: 6,
    slug: "transform-your-business-with-expert-digital-solutions",
    title: "Transform Your Business with Expert Digital Solutions",
    date: "16 June, 2024",
    author: "Jenny Wilson",
    category: "Innovative",
    image: "https://picsum.photos/seed/design6/800/500",
    excerpt:
      "Digital transformation isn't a buzzword — it's the difference between businesses that survive and those that thrive.",
    content: [
      {
        type: "paragraph",
        text: "Digital transformation isn't a buzzword — it's the difference between businesses that survive and those that thrive in the next decade. Expert digital solutions give you the tools to compete at the highest level.",
      },
      { type: "heading", text: "What Expert Digital Solutions Cover" },
      {
        type: "list",
        ordered: true,
        items: [
          "Brand identity and visual design systems",
          "Web design and development",
          "Motion graphics and video production",
          "Social media content at scale",
          "UX/UI for apps and digital products",
        ],
      },
      { type: "heading", text: "The Compounding Effect" },
      {
        type: "paragraph",
        text: "Great design compounds. A strong brand today means higher conversion rates tomorrow, better retention next month, and a premium positioning next year. Every dollar invested in design returns multiples.",
      },
      {
        type: "paragraph",
        text: "Don't wait for the perfect moment. Start building your digital presence now and let the results speak for themselves.",
      },
    ],
  },
];