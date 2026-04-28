import { useState } from "react";
import { motion, type Variants } from "framer-motion";

/*
 * SEO – paste these inside your framework's <Head> component (e.g. next/head):
 *
 * <title>About Us | Gidev Innovations – Digital Transformation Across Africa</title>
 * <meta name="description" content="Gidev Innovations is a software development studio powering digital transformations across Africa. We build websites, mobile apps, web applications, and partner with startups." />
 * <meta name="keywords" content="Gidev Innovations, software development Africa, digital transformation, web development Kenya, mobile app development Africa, startup studio, MVP development, UI UX design Africa" />
 * <meta name="robots" content="index, follow" />
 * <link rel="canonical" href="https://www.gidev.com/about" />
 * <meta property="og:type" content="website" />
 * <meta property="og:url" content="https://www.gidev.com/about" />
 * <meta property="og:title" content="About Us | Gidev Innovations – Digital Transformation Across Africa" />
 * <meta property="og:description" content="Gidev Innovations is a software development studio powering digital growth across Africa." />
 * <meta property="og:image" content="https://www.gidev.com/og-image.jpg" />
 * <meta name="twitter:card" content="summary_large_image" />
 * <meta name="twitter:title" content="About Us | Gidev Innovations – Digital Transformation Across Africa" />
 * <meta name="twitter:description" content="Gidev Innovations powers digital transformations across Africa through software development and startup partnerships." />
 */

/* ─── ease curve ──────────────────────────────────────────── */
const ease = [0.16, 1, 0.3, 1] as const;

/* ─── variants ───────────────────────────────────────────── */
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

/* ── Team variants – kept for when team section is re-enabled
const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.7 } },
};
*/

/* ─── icons & shared UI ──────────────────────────────────── */
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

/* ── Team data – kept for when team section is re-enabled
const team = [
  { name: "Darlene Robertson", role: "CEO & Founder",   img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80" },
  { name: "Guy Hawkins",       role: "Project Manager", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&q=80" },
  { name: "Idrish Jan",        role: "Manager",         img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80" },
  { name: "Albert Flores",     role: "Motion Designer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80" },
  { name: "Labib Khan",        role: "Developer",       img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80" },
  { name: "Kathryn Murphy",    role: "Studio Manager",  img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&q=80" },
];
*/

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
    img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&q=80",
  },
];

const values = [
  {
    num: "01",
    title: "Build each other up",
    body: "We chose to build a team, not take jobs. Every project sharpens our craft, and every win is shared. We invest in each other the same way we invest in the products we build.",
  },
  {
    num: "02",
    title: "Quality that competes globally",
    body: "We hold our work to a standard that has no geography. Whether a client is in Nairobi or New York, the code is clean, the design is sharp, and the delivery is real.",
  },
  {
    num: "03",
    title: "Move fast, stay grounded",
    body: "Speed matters. But we move fast with intention, not shortcuts. We execute quickly because we plan well, communicate clearly, and care about what we ship.",
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
            alt="Gidev Innovations team collaborating on digital solutions"
            className="w-full object-cover"
            style={{ height: 480 }}
          />
        </motion.div>
      </motion.header>

      {/* ══ 2. MISSION & VISION ══════════════════════════════════ */}
      <div className="max-w-[1100px] mx-auto px-8 mt-28">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="border-t-2 border-gray-950 pt-8">
            <p className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-4">
              Mission
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-950 leading-snug mb-4">
              Bridge the gap between African businesses and the digital world.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Too many businesses across Africa are still operating below their
              potential because the right digital tools, automations, and
              systems are out of reach. We exist to change that. We bring AI,
              web technology, and smart systems to businesses that are ready to
              grow, and we build it with the craft it deserves.
            </p>
          </div>

          <div className="border-t-2 border-teal-400 pt-8">
            <p className="text-xs font-mono text-gray-400 tracking-widest uppercase mb-4">
              Vision
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-950 leading-snug mb-4">
              A generation of African founders and businesses that own their
              digital future.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              We are not just building software. We are building a studio where
              talented developers grow into world-class builders, where every
              client engagement raises the bar, and where the products we ship
              become proof that exceptional technology is made here too.
            </p>
          </div>
        </motion.div>

        {/* ══ 3. VALUES ══════════════════════════════════════════ */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-28"
        >
          <div className="text-center mb-14">
            <SectionTag text="How We Work" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-950">
              What we stand on
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.num}>
                <p className="text-xs font-mono text-teal-400 tracking-widest mb-4">
                  {v.num}
                </p>
                <h3 className="text-lg font-bold text-gray-950 mb-3 leading-snug">
                  {v.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ══ 4. TEAM – uncomment to re-enable ════════════════════
      <div className="max-w-[1400px] mx-auto px-8">
        <motion.div
          className="pt-28 pb-14 text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <SectionTag text="Get To Know" />
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-950 mb-4">Our Team</h2>
          <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
            Our team is a powerhouse of creativity and precision.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {team.map((member) => (
            <motion.div key={member.name} variants={cardVariants}>
              <div className="overflow-hidden rounded-2xl aspect-[3/4] bg-gray-100">
                <motion.img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover object-top"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 1.0, ease }}
                />
              </div>
              <p className="mt-4 text-[15px] font-bold text-gray-900 leading-snug">{member.name}</p>
              <p className="mt-0.5 text-sm text-gray-400">{member.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      ══════════════════════════════════════════════════════════ */}

      {/* ══ 5. SERVICES ══════════════════════════════════════════ */}
      <main className="max-w-[1400px] mx-auto px-8 pb-28">
        <motion.div
          className="pt-4"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="pb-14 text-center">
            <SectionTag text="Core" />
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-950 mb-4">
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
