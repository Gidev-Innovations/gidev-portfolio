import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Settings } from "lucide-react";
import type { Service } from "../data/services";
import { services } from "../data/services";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease } },
};

export default function ServiceDetail({ service }: { service: Service }) {
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <div className="bg-white min-h-screen mt-10 md:mt-14">
      {/* Hero */}
      <motion.header
        className="px-6 pt-20 pb-14 text-center"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <div className="flex items-center justify-center gap-2 text-gray-500 mb-4">
          <Settings size={13} strokeWidth={1.5} aria-hidden="true" />
          <span style={{ fontSize: "13px" }}>Services</span>
        </div>

        <h1
          className="font-black text-black mx-auto mb-5"
          style={{
            fontSize: "clamp(36px, 5.5vw, 66px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: "760px",
          }}
        >
          {service.name}
        </h1>

        <p
          className="text-gray-500 mx-auto"
          style={{ fontSize: "17px", lineHeight: 1.65, maxWidth: "580px" }}
        >
          {service.summary}
        </p>
      </motion.header>

      {/* Intro + what's included */}
      <div className="max-w-[1100px] mx-auto px-8 pb-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="border-t-2 border-gray-950 pt-8">
            <p className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-4">
              The problem we solve
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              {service.intro}
            </p>

            <p className="text-xs font-mono text-gray-400 tracking-widest uppercase mt-10 mb-4">
              Best for
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              {service.bestFor}
            </p>
          </div>

          <div className="border-t-2 border-teal-400 pt-8">
            <p className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-6">
              What's included
            </p>
            <ul className="flex flex-col gap-4">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 flex items-center justify-center rounded-full mt-0.5"
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: "var(--color-spring-wood-100)",
                    }}
                  >
                    <Check size={12} strokeWidth={2.4} className="text-teal-500" aria-hidden="true" />
                  </span>
                  <span className="text-gray-600 text-[15px] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-24 rounded-3xl px-8 md:px-14 py-16 text-center"
          style={{
            backgroundColor: "var(--color-spring-wood-50)",
            borderRadius: "28px",
          }}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2
            className="font-black text-black mx-auto mb-3"
            style={{
              fontSize: "clamp(26px, 3.4vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "520px",
            }}
          >
            Tell us what you're building
          </h2>
          <p
            className="text-gray-500 mx-auto mb-8"
            style={{ fontSize: "15px", lineHeight: 1.6, maxWidth: "420px" }}
          >
            A free 15-minute call is usually enough to tell whether this is the
            right fit and what it would take.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-gray-900 text-white rounded-full pl-6 pr-2 py-2 font-semibold hover:bg-gray-700 transition-colors duration-200"
            style={{ fontSize: "15px" }}
          >
            Book a free 15-min call
            <span className="flex items-center justify-center bg-white text-gray-900 rounded-full w-8 h-8">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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

        {/* Other services */}
        <motion.nav
          className="mt-24"
          aria-label="Other services"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-6 text-center">
            Other services
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {others.map((other) => (
              <Link
                key={other.slug}
                to={`/services/${other.slug}`}
                className="rounded-2xl p-6 transition-colors duration-200 hover:bg-white"
                style={{
                  backgroundColor: "var(--color-spring-wood-50)",
                  border: "1px solid var(--color-spring-wood-100)",
                }}
              >
                <h3 className="font-bold text-black mb-2" style={{ fontSize: "16px" }}>
                  {other.name}
                </h3>
                <p className="text-gray-500" style={{ fontSize: "13.5px", lineHeight: 1.7 }}>
                  {other.summary}
                </p>
              </Link>
            ))}
          </div>
        </motion.nav>
      </div>
    </div>
  );
}
