import { motion, useInView } from "framer-motion";
import type { Transition } from "framer-motion";
import { useRef } from "react";
import { Settings, Lightbulb, Code2, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const springEntry: Transition = { type: "spring", stiffness: 70, damping: 16 };

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-white px-8 py-8">
      <div
        className="mx-auto rounded-3xl px-14 py-20 text-center"
        style={{
          maxWidth: "900px",
          backgroundColor: "var(--color-spring-wood-50)",
          border: " var(--color-spring-wood-200)",
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
          className="font-black text-black mb-3"
          style={{
            fontSize: "clamp(28px, 3.5vw, 48px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          From Concept to Code
        </h2>

        <p
          className="text-gray-500 max-w-sm mx-auto mb-16"
          style={{ fontSize: "15px", lineHeight: 1.6 }}
        >
          Our founder-led process ensures your product is built on time, on
          budget, and ready to scale.
        </p>

        {/* Steps */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Discovery */}
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ x: 80, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ ...springEntry, delay: 0 }}
          >
            <div
              className="flex items-center justify-center rounded-2xl mb-6 bg-white shadow-sm"
              style={{ width: "68px", height: "68px" }}
            >
              <motion.div
                style={{ display: "flex", color: "#111" }}
                animate={
                  inView
                    ? {
                        rotate: [0, -15, 15, -10, 10, 0],
                        color: ["#111111", "#18aeb4", "#111111"],
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
              Discovery & Strategy
            </h3>
            <p
              className="text-gray-500"
              style={{ fontSize: "14px", lineHeight: 1.6 }}
            >
              We analyze your requirements and business goals to architect a
              roadmap that works.
            </p>
          </motion.div>

          {/* Agile */}
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ x: 80, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ ...springEntry, delay: 0.15 }}
          >
            <div
              className="flex items-center justify-center rounded-2xl mb-6 bg-white shadow-sm"
              style={{ width: "68px", height: "68px" }}
            >
              <motion.div
                style={{ display: "flex", color: "#111" }}
                animate={
                  inView
                    ? {
                        y: [0, -5, 0, -3, 0],
                        color: ["#111111", "#18aeb4", "#111111"],
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
              Agile Development
            </h3>
            <p
              className="text-gray-500"
              style={{ fontSize: "14px", lineHeight: 1.6 }}
            >
              Our full-stack team builds your solution using scalable code,
              running rigorous tests at every sprint.
            </p>
          </motion.div>

          {/* Launch */}
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ x: 80, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ ...springEntry, delay: 0.3 }}
          >
            <div
              className="flex items-center justify-center rounded-2xl mb-6 bg-white shadow-sm"
              style={{ width: "68px", height: "68px" }}
            >
              <motion.div
                style={{ display: "flex", color: "#111" }}
                animate={
                  inView
                    ? {
                        y: [0, -10, -2, -8, 0],
                        rotate: [0, 8, -4, 6, 0],
                        color: ["#111111", "#18aeb4", "#111111"],
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
              Launch & Scale
            </h3>
            <p
              className="text-gray-500"
              style={{ fontSize: "14px", lineHeight: 1.6 }}
            >
              We handle deployment and provide ongoing support to help you grow
              your user base.
            </p>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ ...springEntry, delay: 0.55 }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-gray-900 text-white rounded-full pl-6 pr-2 py-2 font-semibold hover:bg-gray-700 transition-colors duration-200"
            style={{ fontSize: "15px" }}
          >
            Book a 15-min call
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
        </motion.div>
      </div>
    </section>
  );
}
