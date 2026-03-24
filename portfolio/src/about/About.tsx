import { useState } from "react";
import { motion, type Variants } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const headerContainerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.45, delayChildren: 0.1 } },
};

const titleVariant: Variants = {
  hidden: { opacity: 0, y: 70 },
  show: { opacity: 1, y: 0, transition: { duration: 1.6, ease } },
};

const subtitleVariant: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 1.4, ease } },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1.2, ease } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0, transition: { duration: 1.0, ease } },
};

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.22, delayChildren: 0.1 } },
};

/* ─── data ───────────────────────────────────────────────── */
const services = [
  {
    label: "WEB DEVELOPMENT",
    num: "001",
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
  },
  {
    label: "MOBILE APPS",
    num: "002",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
  },
  {
    label: "UI/UX DESIGN",
    num: "003",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
  },
  {
    label: "STARTUP STUDIO",
    num: "004",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
  },
];

const values = [
  {
    num: "01",
    title: "Build each other up",
    body: "We chose to build a team, not take jobs. Every project sharpens our craft, and every win is shared.",
  },
  {
    num: "02",
    title: "Quality that competes globally",
    body: "We hold our work to a standard that has no geography. Clean code, sharp design, real delivery.",
  },
  {
    num: "03",
    title: "Move fast, stay grounded",
    body: "Speed matters. But we move fast with intention — we execute quickly because we plan well.",
  },
];

/* ════════════════════════════════════════════════════════════ */
export default function About() {
  const [activeService, setActiveService] = useState(0);

  return (
    <div className="min-h-screen bg-white mt-10 md:mt-14">
      {/* ══ 1. HERO ══════════════════════════════════════════════ */}
      <motion.header
        className="pt-20 pb-0 text-center px-6"
        variants={headerContainerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          variants={titleVariant}
          className="text-4xl md:text-6xl font-OutfitMedium tracking-tight text-gray-950"
        >
          We build great products
          <br />
          and each other.
        </motion.h1>

        <motion.p
          variants={subtitleVariant}
          className="mt-4 text-gray-500 text-base max-w-lg mx-auto leading-relaxed"
        >
          Gidev Innovations is a lean team of developers, designers, and
          builders on a mission to connect African businesses to the internet,
          to AI, and to what is actually possible when technology is done right.
        </motion.p>

        <motion.div
          variants={subtitleVariant}
          className="mx-auto mt-16 overflow-hidden rounded-2xl max-w-[1100px]"
        >
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=80"
            alt="Gidev Innovations team collaborating"
            className="w-full object-cover"
            style={{ height: 480 }}
          />
        </motion.div>
      </motion.header>

      {/* ══ 2. MISSION & VISION ══════════════════════════════════ */}
      <div className="max-w-[1100px] mx-auto px-8">
        <motion.div
          className="mt-28 mb-28"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* MISSION */}
          <motion.div variants={cardVariants} className="mb-20">
            <p className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-6">
              Mission
            </p>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-950 leading-[1.05] mb-8"
              style={{ letterSpacing: "-0.03em", maxWidth: "820px" }}
            >
              Bridge the gap between African businesses and the digital world.
            </h2>
            <p
              className="text-gray-500 text-base md:text-lg leading-relaxed"
              style={{ maxWidth: "560px" }}
            >
              Too many businesses across Africa are still operating below their
              potential because the right digital tools, automations, and
              systems are out of reach. We exist to change that — bringing AI,
              web technology, and smart systems to businesses that are ready to
              grow, built with the craft it deserves.
            </p>
          </motion.div>

          {/* divider */}
          <motion.div
            variants={cardVariants}
            className="w-full h-px bg-gray-100 mb-20"
          />

          {/* VISION — indented for rhythm */}
          <motion.div variants={cardVariants} className="md:pl-[180px]">
            <p className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-6">
              Vision
            </p>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-950 leading-[1.05] mb-8"
              style={{ letterSpacing: "-0.03em" }}
            >
              A generation of African founders that own their digital future.
            </h2>
            <p
              className="text-gray-500 text-base md:text-lg leading-relaxed"
              style={{ maxWidth: "560px" }}
            >
              We are not just building software. We are building a studio where
              talented developers grow into world-class builders, where every
              client engagement raises the bar, and where the products we ship
              become proof that exceptional technology is made here too.
            </p>
          </motion.div>
        </motion.div>

        {/* ══ 3. VALUES ══════════════════════════════════════════ */}
        <motion.div
          className="mb-28"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={cardVariants}
            className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-16"
          >
            How We Work
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.num}
                variants={cardVariants}
                transition={{ delay: i * 0.1 }}
                className="border-t border-gray-200 pt-8"
              >
                <p className="text-xs font-mono text-gray-300 tracking-widest mb-5">
                  {v.num}
                </p>
                <h3 className="text-lg font-bold text-gray-950 mb-3 leading-snug">
                  {v.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ══ 4. SERVICES ══════════════════════════════════════════ */}
      <main className="max-w-[1400px] mx-auto px-8 pb-28">
        <motion.div
          className="pt-4"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="pb-14 text-center">
            <p className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-4">
              Core
            </p>
            <h2
              className="text-5xl md:text-6xl font-bold tracking-tight text-gray-950 mb-4"
              style={{ letterSpacing: "-0.02em" }}
            >
              Our Services
            </h2>
            <p className="text-gray-500 text-base max-w-sm mx-auto leading-relaxed">
              From website development and mobile apps to startup incubation and
              e-commerce platforms, we build digital solutions that move Africa
              forward.
            </p>
          </div>

          <div className="flex gap-12 items-start">
            <div className="flex-1 min-w-0">
              {services.map((s, i) => {
                const active = activeService === i;
                return (
                  <motion.div
                    key={s.num}
                    onMouseEnter={() => setActiveService(i)}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="cursor-pointer"
                  >
                    <div
                      className="flex items-center justify-between py-5 transition-colors duration-200"
                      style={{
                        borderBottom: active
                          ? "2px solid #030712"
                          : "1px solid #e5e7eb",
                      }}
                    >
                      <span
                        className="font-bold tracking-tight transition-colors duration-200"
                        style={{
                          fontSize: "clamp(24px, 4vw, 46px)",
                          letterSpacing: "-0.02em",
                          color: active ? "#030712" : "#b0b0b0",
                        }}
                      >
                        {s.label}
                      </span>
                      <span
                        className="font-mono text-sm transition-colors duration-200"
                        style={{ color: active ? "#6b7280" : "#d1d5db" }}
                      >
                        {s.num}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="hidden md:block flex-shrink-0 sticky top-24 w-[290px]">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease }}
                className="rounded-2xl overflow-hidden bg-gray-100"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
              >
                <img
                  src={services[activeService].img}
                  alt={`Gidev Innovations ${services[activeService].label}`}
                  className="w-full object-cover"
                  style={{ height: 220 }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
