import { motion, useInView } from "framer-motion";
import type { Transition } from "framer-motion";
import { useRef } from "react";
import { Settings, Lightbulb, Code2, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-white px-8 py-8">
      <div
        className="mx-auto rounded-3xl px-6 md:px-14 py-16 md:py-20 text-center gidev-surface-dots"
        style={{
          maxWidth: "900px",
          backgroundColor: "var(--color-brand-light)",
          border: " var(--color-brand-border)",
          borderRadius: "28px",
        }}
      >
        {/* Label */}
        <div className="flex items-center justify-center gap-2 text-gray-500 mb-3">
          <Settings size={13} strokeWidth={1.5} />
          <span style={{ fontSize: "13px" }}>Process</span>
        </div>

        {/* Heading */}
        <h2
          className="font-bold text-black mb-3"
          style={{
            fontSize: "clamp(28px, 3.5vw, 48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          How We Work
        </h2>

        <p
          className="text-gray-500 max-w-md mx-auto mb-16"
          style={{ fontSize: "15px", lineHeight: 1.6 }}
        >
          Three stages, and you know what is happening at every point. Most
          projects are scoped and started within a week.
        </p>

        {/* Steps */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Discovery */}
          <Reveal className="flex flex-col items-center text-center" delay={0}>
            <div
              className="flex items-center justify-center rounded-2xl mb-6 bg-white shadow-sm"
              style={{ width: "68px", height: "68px" }}
            >
              <motion.div
                style={{ display: "flex", color: "var(--color-ink)" }}
                animate={
                  inView
                    ? {
                        rotate: [0, -15, 15, -10, 10, 0],
                        color: ["var(--color-ink)", "var(--color-brand-dark)", "var(--color-ink)"],
                      }
                    : {}
                }
                transition={
                  {
                    duration: 0.8,
                    repeat: Infinity,
                    repeatDelay: 2.5,
                    delay: 0.6,
                  } as Transition
                }
              >
                <Lightbulb size={32} strokeWidth={1.5} />
              </motion.div>
            </div>
            <h3
              className="font-bold text-black mb-2"
              style={{ fontSize: "17px", lineHeight: 1.2 }}
            >
              Discovery & Scoping
            </h3>
            <p
              className="text-gray-500"
              style={{ fontSize: "14px", lineHeight: 1.6 }}
            >
              We start with a free 30-minute call to understand the problem,
              then write down the scope, timeline, and price before any code
              exists. Most projects kick off within a week.
            </p>
          </Reveal>

          {/* Agile */}
          <Reveal className="flex flex-col items-center text-center" delay={150}>
            <div
              className="flex items-center justify-center rounded-2xl mb-6 bg-white shadow-sm"
              style={{ width: "68px", height: "68px" }}
            >
              <motion.div
                style={{ display: "flex", color: "var(--color-ink)" }}
                animate={
                  inView
                    ? {
                        y: [0, -5, 0, -3, 0],
                        color: ["var(--color-ink)", "var(--color-brand-dark)", "var(--color-ink)"],
                      }
                    : {}
                }
                transition={
                  {
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 2,
                    delay: 0.75,
                  } as Transition
                }
              >
                <Code2 size={32} strokeWidth={1.5} />
              </motion.div>
            </div>
            <h3
              className="font-bold text-black mb-2"
              style={{ fontSize: "17px", lineHeight: 1.2 }}
            >
              Build in Short Sprints
            </h3>
            <p
              className="text-gray-500"
              style={{ fontSize: "14px", lineHeight: 1.6 }}
            >
              We build in tight sprints and keep you updated throughout, so
              there are no surprises at the end. Typical MVPs land in four to
              eight weeks depending on scope.
            </p>
          </Reveal>

          {/* Launch */}
          <Reveal className="flex flex-col items-center text-center" delay={300}>
            <div
              className="flex items-center justify-center rounded-2xl mb-6 bg-white shadow-sm"
              style={{ width: "68px", height: "68px" }}
            >
              <motion.div
                style={{ display: "flex", color: "var(--color-ink)" }}
                animate={
                  inView
                    ? {
                        y: [0, -10, -2, -8, 0],
                        rotate: [0, 8, -4, 6, 0],
                        color: ["var(--color-ink)", "var(--color-brand-dark)", "var(--color-ink)"],
                      }
                    : {}
                }
                transition={
                  {
                    duration: 1.4,
                    repeat: Infinity,
                    repeatDelay: 1.8,
                    delay: 0.9,
                  } as Transition
                }
              >
                <Rocket size={32} strokeWidth={1.5} />
              </motion.div>
            </div>
            <h3
              className="font-bold text-black mb-2"
              style={{ fontSize: "17px", lineHeight: 1.2 }}
            >
              Launch & Support
            </h3>
            <p
              className="text-gray-500"
              style={{ fontSize: "14px", lineHeight: 1.6 }}
            >
              We deploy it, then stay on through a revision period until you
              are satisfied. Many clients keep us on retainer afterwards for
              new features and maintenance.
            </p>
          </Reveal>
        </div>

        {/* CTA */}
        <Reveal delay={450}>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-gray-900 text-white rounded-full pl-6 pr-2 py-2 font-semibold hover:bg-brand-dark transition-colors duration-200"
            style={{ fontSize: "15px" }}
          >
            Book a free call
            <span className="flex items-center justify-center bg-white text-gray-900 rounded-full w-8 h-8">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 12L12 2M12 2H5M12 2V9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
