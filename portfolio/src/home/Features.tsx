import { motion, useInView } from "framer-motion";
import type { Transition } from "framer-motion";
import { useRef } from "react";
import {
  Settings,
  Layers,
  Zap,
  Palette,
  Tag,
  Server,
  Shield,
} from "lucide-react";

const springEntry: Transition = { type: "spring", stiffness: 45, damping: 14 };

const features = [
  {
    Icon: Layers,
    title: "Scope Agreed Upfront",
    description:
      "Timeline and price written down before work starts, so the number at the end is the number you agreed.",
    anim: { y: [0, -4, 0] },
    transition: {
      duration: 1.2,
      repeat: Infinity,
      repeatDelay: 2.5,
      delay: 0.6,
    } as Transition,
  },
  {
    Icon: Zap,
    title: "Built for Real Networks",
    description:
      "Tested on mid-range phones and slow connections, not just fast office wifi.",
    anim: { rotate: [0, -10, 10, -5, 0] },
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatDelay: 2.8,
      delay: 0.75,
    } as Transition,
  },
  {
    Icon: Palette,
    title: "Local Payment Rails",
    description:
      "Mobile money and card payments integrated for how customers here actually pay.",
    anim: { scale: [1, 1.18, 1] },
    transition: {
      duration: 0.9,
      repeat: Infinity,
      repeatDelay: 2.2,
      delay: 0.9,
    } as Transition,
  },
  {
    Icon: Tag,
    title: "Three Ways to Engage",
    description:
      "Fixed project pricing, a monthly retainer, or a partnership with shared upside.",
    anim: { x: [0, -4, 4, -2, 0] },
    transition: {
      duration: 0.7,
      repeat: Infinity,
      repeatDelay: 3,
      delay: 0.6,
    } as Transition,
  },
  {
    Icon: Server,
    title: "Found in Search",
    description:
      "Pre-rendered pages with real content, so search engines can actually read your site.",
    anim: { y: [0, -5, 0] },
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 2.4,
      delay: 0.75,
    } as Transition,
  },
  {
    Icon: Shield,
    title: "We Stay After Launch",
    description:
      "A revision period until you're satisfied, then a retainer if you want us to keep going.",
    anim: { scale: [1, 1.12, 1] },
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 2.6,
      delay: 0.9,
    } as Transition,
  },
];

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-16">
      <div className="mx-auto px-8 text-center" style={{ maxWidth: "820px" }}>
      {/* Label */}
      <div className="flex items-center justify-center gap-2 text-gray-500 mb-3">
        <Settings size={13} strokeWidth={1.5} />
        <span style={{ fontSize: "13px" }}>Features</span>
      </div>

      {/* Heading */}
      <h2
        className="font-black text-black mx-auto mb-3"
        style={{
          fontSize: "clamp(32px, 4.5vw, 56px)",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          maxWidth: "500px",
        }}
      >
        What Working With Us Is Like
      </h2>

      <p
        className="text-gray-500 mx-auto mb-12"
        style={{ fontSize: "14px", lineHeight: 1.7, maxWidth: "400px" }}
      >
        The practical things that tend to matter once a project is underway.
      </p>

      {/* Grid */}
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {features.map(({ Icon, title, description, anim, transition }, i) => (
          <motion.div
            key={title}
            className="flex flex-col items-center text-center rounded-2xl px-6 py-8"
            style={{
              backgroundColor: "var(--color-spring-wood-50)",
              border: "1px solid var(--color-spring-wood-100)",
            }}
            initial={{ y: 60, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ ...springEntry, delay: i * 0.12 }}
          >
            {/* Icon box */}
            <div
              className="flex items-center justify-center rounded-xl mb-5 bg-white"
              style={{
                width: "64px",
                height: "64px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              }}
            >
              <motion.div
                style={{ display: "flex", color: "#111" }}
                animate={
                  inView
                    ? { ...anim, color: ["#111111", "#d75f38", "#111111"] }
                    : {}
                }
                transition={transition}
              >
                <Icon size={28} strokeWidth={1.4} />
              </motion.div>
            </div>

            <h3
              className="font-bold text-black mb-2"
              style={{ fontSize: "16px", lineHeight: 1.3 }}
            >
              {title}
            </h3>
            <p
              className="text-gray-500"
              style={{ fontSize: "13.5px", lineHeight: 1.75 }}
            >
              {description}
            </p>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
