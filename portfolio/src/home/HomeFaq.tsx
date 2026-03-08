import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Settings, Plus } from "lucide-react";

const faqs = [
  {
    q: "How fast can Gidev deliver a complete product?",
    a: "Most projects are scoped and kicked off within a week. Depending on complexity, we typically deliver MVPs in 4–8 weeks. We work in tight sprints and keep you updated throughout so there are no surprises.",
  },
  {
    q: "Do you offer revisions after the project is delivered?",
    a: "Yes. Every engagement includes a revision period post-delivery. We don't consider the work done until you're fully satisfied. For ongoing clients we offer retainer arrangements that include continuous iteration.",
  },
  {
    q: "What factors influence Gidev's pricing?",
    a: "Pricing is based on project scope, timeline, and the technologies involved. We offer three models: fixed project-based pricing, monthly retainers, and long-term partnership structures. We'll recommend the right fit after our discovery call.",
  },
  {
    q: "Can Gidev support ongoing development needs for my business?",
    a: "Absolutely. Many of our clients retain us after launch for feature development, bug fixes, performance optimization, and scaling. We become a natural extension of your team.",
  },
  {
    q: "What technologies does Gidev specialize in?",
    a: "Our core stack is React, TypeScript, Node.js, and modern cloud infrastructure. We also work with React Native for mobile, and tailor our tech choices to what best serves your product goals.",
  },
  {
    q: "Do you work with early-stage startups or only established businesses?",
    a: "Both. We love working with founders at the idea stage to build their first product, and equally enjoy helping established businesses modernize or scale their existing systems.",
  },
];

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="bg-white px-8 py-16 text-center">
      {/* Label */}
      <div className="flex items-center justify-center gap-2 text-gray-500 mb-3">
        <Settings size={13} strokeWidth={1.5} />
        <span style={{ fontSize: "13px" }}>FAQ</span>
      </div>

      {/* Heading */}
      <h2
        className="font-black text-black mx-auto mb-3"
        style={{
          fontSize: "clamp(32px, 5vw, 62px)",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          maxWidth: "560px",
        }}
      >
        Essential FAQs Answered for You
      </h2>

      <p
        className="text-gray-400 mx-auto mb-14"
        style={{ fontSize: "14px", lineHeight: 1.7, maxWidth: "360px" }}
      >
        Everything you need to know before we start building together.
      </p>

      {/* Accordion */}
      <div
        className="mx-auto flex flex-col gap-3"
        style={{ maxWidth: "760px" }}
      >
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="rounded-2xl text-left overflow-hidden cursor-pointer"
              style={{
                backgroundColor: "var(--color-spring-wood-50)",
                border: "1px solid var(--color-spring-wood-100)",
              }}
              onClick={() => toggle(i)}
            >
              <div className="flex items-center justify-between px-7 py-5">
                <span
                  className="text-black"
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    lineHeight: 1.4,
                    paddingRight: "24px",
                  }}
                >
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="flex-shrink-0"
                >
                  <Plus size={18} strokeWidth={1.8} className="text-gray-500" />
                </motion.div>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 22 }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      className="text-gray-500 px-7 pb-6"
                      style={{ fontSize: "14px", lineHeight: 1.8 }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
