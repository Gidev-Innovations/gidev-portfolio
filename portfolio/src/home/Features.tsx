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
    title: "Structured Process",
    description:
      "Clear discovery, architecture, and execution from idea to deployment.",
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
    title: "Fast Turnaround",
    description:
      "Efficient workflows that move projects forward without compromising quality.",
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
    title: "Product-Focused Design",
    description: "Thoughtful UI/UX that balances usability and performance.",
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
    title: "Transparent Pricing",
    description:
      "Flexible models including project-based, retainer, or partnership structures.",
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
    title: "Scalable Architecture",
    description: "Systems designed to integrate, expand, and evolve.",
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
    title: "Reliable Delivery",
    description: "Tested, optimized, and maintained for long-term stability.",
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
    <section className="bg-white px-8 py-16 text-center">
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
        How We Deliver Excellence
      </h2>

      <p
        className="text-gray-400 mx-auto mb-12"
        style={{ fontSize: "14px", lineHeight: 1.7, maxWidth: "380px" }}
      >
        We combine technical expertise with structured execution to build
        software that performs and scales.
      </p>

      {/* Grid */}
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto"
        style={{ maxWidth: "820px" }}
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
                    ? { ...anim, color: ["#111111", "#18aeb4", "#111111"] }
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
    </section>
  );
}
