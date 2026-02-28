import { useState } from "react";

import { motion, type Variants } from "framer-motion";

/* ─── same ease curve as Blog page ───────────────────────── */
const ease = [0.16, 1, 0.3, 1] as const;

/* ─── header stagger (same pattern as Blog) ──────────────── */
const headerContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.45,
      delayChildren: 0.1,
    },
  },
};

const titleVariant: Variants = {
  hidden: { opacity: 0, y: 70 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.6, ease },
  },
};

const subtitleVariant: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease },
  },
};

/* ─── grid stagger (same pattern as Blog cards) ──────────── */
const gridVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.7,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease },
  },
};

/* ─── section fade-up (for sections below the hero) ─────── */
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease },
  },
};

/* ─── gear icon ──────────────────────────────────────────── */
const GearIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#888"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const SectionTag = ({ text }: { text: string }) => (
  <div className="flex items-center justify-center gap-2 mb-3">
    <GearIcon />
    <span className="text-sm text-gray-500 tracking-wide">{text}</span>
  </div>
);

/* ─── data ───────────────────────────────────────────────── */
const team = [
  {
    name: "Darlene Robertson",
    role: "CEO & Founder",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80",
  },
  {
    name: "Guy Hawkins",
    role: "Project Manager",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80",
  },
  {
    name: "Idrish Jan",
    role: "Manager",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
  },
  {
    name: "Albert Flores",
    role: "Motion Designer",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80",
  },
  {
    name: "Labib Khan",
    role: "Developer",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80",
  },
  {
    name: "Kathryn Murphy",
    role: "Studio Manager",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&q=80",
  },
];

const services = [
  {
    label: "WEB DESIGN",
    num: "001",
    img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
  },
  {
    label: "DEVELOPMENT",
    num: "002",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
  },
  {
    label: "UX/UI CONCEPT",
    num: "003",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
  },
  {
    label: "BRANDING",
    num: "004",
    img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&q=80",
  },
];

/* ════════════════════════════════════════════════════════════ */
export default function About() {
  const [activeService, setActiveService] = useState(0);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ══ 1. HERO ════════════════════════════════════════════ */}
      <motion.header
        className="pt-20 pb-0 text-center px-6"
        variants={headerContainerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          variants={titleVariant}
          className="text-5xl md:text-6xl font-bold tracking-tight text-gray-950"
        >
          Inspire growth with
          <br />
          unique designs.
        </motion.h1>

        <motion.p
          variants={subtitleVariant}
          className="mt-4 text-gray-500 text-base max-w-md mx-auto leading-relaxed"
        >
          Successful brands capture hearts and minds. Their logos are symbols of
          quality and their stories resonate. It's not luck; it's the power of
          exceptional design and consistent visibility.
        </motion.p>

        {/* hero image — animates in with the subtitle's delay */}
        <motion.div
          variants={subtitleVariant}
          className="mx-auto mt-14 overflow-hidden rounded-2xl max-w-[1100px]"
        >
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=80"
            alt="Team collaborating"
            className="w-full object-cover"
            style={{ height: 480 }}
          />
        </motion.div>
      </motion.header>

      {/* ══ 2. TEAM ════════════════════════════════════════════ */}
      <main className="max-w-[1400px] mx-auto px-8 pb-28">
        {/* section heading */}
        <motion.div
          className="pt-28 pb-14 text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <SectionTag text="Get To Know" />
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-950 mb-4">
            Our Team
          </h2>
          <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
            Our team is a powerhouse of creativity and precision. We pride
            ourselves on crafting designs that are not only visually stunning
            but also strategically sound.
          </p>
        </motion.div>

        {/* team grid — same stagger pattern as blog cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {team.map((member) => (
            <motion.div key={member.name} variants={cardVariants}>
              {/* portrait */}
              <div className="overflow-hidden rounded-2xl aspect-[3/4] bg-gray-100">
                <motion.img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 1.0, ease }}
                />
              </div>
              {/* name + role */}
              <p className="mt-4 text-[15px] font-bold text-gray-900 leading-snug">
                {member.name}
              </p>
              <p className="mt-0.5 text-sm text-gray-400">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ══ 3. SERVICES ══════════════════════════════════════ */}
        <motion.div
          className="pt-28"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="pb-14 text-center">
            <SectionTag text="Core" />
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-950 mb-4">
              Services
            </h2>
            <p className="text-gray-500 text-base max-w-sm mx-auto leading-relaxed">
              We excel in strategic thinking, aligning design with business
              goals for maximum impact.
            </p>
          </div>

          <div className="flex gap-12 items-start">
            {/* service rows */}
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
                          ? "2.5px solid #2dd4bf"
                          : "1px solid #e5e7eb",
                      }}
                    >
                      <span
                        className="font-bold tracking-tight transition-colors duration-200"
                        style={{
                          fontSize: "clamp(24px, 4vw, 46px)",
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

            {/* sticky preview image */}
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
                  alt={services[activeService].label}
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
