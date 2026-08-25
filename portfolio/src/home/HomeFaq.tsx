import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Settings, Plus } from "lucide-react";
import { faqs } from "../data/faqs";

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
        className="text-gray-500 mx-auto mb-14"
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
                  {faq.question}
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
                      {faq.answer}
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
