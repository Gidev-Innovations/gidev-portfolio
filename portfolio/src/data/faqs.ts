export type Faq = {
  question: string;
  answer: string;
};

// Single source of truth for FAQs, shared by the homepage and the Services
// page. Previously these two pages carried separate lists, and the Services
// one still held the original template's placeholder copy.
//
// TODO: Confirm the specifics below still match how Gidev actually operates —
// particularly the 4–8 week MVP window and the three pricing models, since
// these set client expectations.
export const faqs: Faq[] = [
  {
    question: "How fast can Gidev deliver a complete product?",
    answer:
      "Most projects are scoped and kicked off within a week. Depending on complexity, we typically deliver MVPs in 4–8 weeks. We work in tight sprints and keep you updated throughout so there are no surprises.",
  },
  {
    question: "Do you offer revisions after the project is delivered?",
    answer:
      "Yes. Every engagement includes a revision period post-delivery. We don't consider the work done until you're fully satisfied. For ongoing clients we offer retainer arrangements that include continuous iteration.",
  },
  {
    question: "What factors influence Gidev's pricing?",
    answer:
      "Pricing is based on project scope, timeline, and the technologies involved. We offer three models: fixed project-based pricing, monthly retainers, and long-term partnership structures. We'll recommend the right fit after our discovery call.",
  },
  {
    question: "Can Gidev support ongoing development needs for my business?",
    answer:
      "Yes. After launch we can stay on for feature development, bug fixes, performance optimization, and scaling, working as an extension of your team for as long as you need us.",
  },
  {
    question: "What technologies does Gidev specialize in?",
    answer:
      "Our core stack is React, TypeScript, Node.js, and modern cloud infrastructure. We also work with React Native for mobile, and tailor our tech choices to what best serves your product goals.",
  },
  {
    question: "Can you integrate M-Pesa and other mobile money payments?",
    answer:
      "Yes. We build M-Pesa checkout on Safaricom's Daraja API (STK Push, Paybill and Till), plus card payments through providers such as Paystack, Flutterwave or Pesapal, and we handle the confirmation callbacks so payments match orders automatically.",
  },
  {
    question: "Do you only work with businesses in Nairobi?",
    answer:
      "No. We are based in Nairobi and happy to meet in person there, but most of the work happens remotely, so we work with businesses across Kenya, East Africa and further afield.",
  },
  {
    question: "Do you work with early-stage startups or only established businesses?",
    answer:
      "Both. We love working with founders at the idea stage to build their first product, and equally enjoy helping established businesses modernize or scale their existing systems.",
  },
];
