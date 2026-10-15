import { useState } from "react";
import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";
import { services } from "../data/services";
import { imagery } from "../data/imagery";
import ResponsiveImage from "../components/ResponsiveImage";


/* ─── icons & shared UI ──────────────────────────────────── */
const GearIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className="text-muted"
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


/**
 * Derived from the shared service list so this page can't drift out of sync
 * with /services the way it previously had. Images live on each service in
 * services.ts (stock mood shots until real product photography exists).
 */
const serviceList = services.map((service, i) => ({
  label: service.name.toUpperCase(),
  slug: service.slug,
  num: String(i + 1).padStart(3, "0"),
  img: service.image.name,
  alt: service.image.alt,
}));

/**
 * Markets and jurisdictions.
 *
 * Only Nairobi is stated as fact, because it is the only one that can be
 * backed up right now. Claiming delivery in markets we have not worked in
 * would be the same category of invention as a fake testimonial.
 */
const markets = [
  {
    place: "Nairobi, Kenya",
    note: "Our home base. Where the studio is registered and where the team works from.",
  },
  // TODO [NEEDS REAL CONTENT]: add real markets once there is delivered work
  // to point to, and say what was actually done there. Do not invent
  // jurisdictions. Entries below stay commented so placeholders never ship.
  // { place: "…", note: "…" },
];

const values = [
  {
    num: "01",
    title: "Build each other up",
    body: "We chose to build a team, not take jobs. Every project sharpens our craft, and every win is shared. We invest in each other the same way we invest in the products we build.",
  },
  {
    num: "02",
    title: "Built for the conditions we build in",
    body: "We test on mid-range Android phones and slow connections because that is what our users have. Software that only works on fast hardware and fast internet is software that excludes most of the continent.",
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
      <header className="pt-20 pb-0 text-center">
        <h1
          className="gidev-copy text-4xl md:text-6xl font-medium tracking-tight text-gray-950"
        >
          We build great products{" "}
          <br />
          and each other.
        </h1>

        <p
          className="gidev-copy mt-4 text-gray-500 text-base max-w-lg mx-auto leading-relaxed"
        >
          Gidev Innovations is a lean team of developers, designers, and
          builders on a mission to connect African businesses to the internet,
          to AI, and to what is actually possible when technology is done right.
        </p>

        <div className="gidev-stage mt-16">
          <div className="overflow-hidden rounded-2xl aspect-[4/3] md:aspect-[21/9]">
            <ResponsiveImage
              name={imagery.womanCity.name}
              alt={imagery.womanCity.alt}
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </header>

      {/* ══ 2. MISSION & VISION ══════════════════════════════════ */}
      <div className="max-w-[1100px] mx-auto px-8 mt-28">
        <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="border-t-2 border-gray-950 pt-8">
            <p className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-4">
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

          <div className="border-t-2 border-brand pt-8">
            <p className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-4">
              Vision
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-950 leading-snug mb-4">
              A generation of African founders and businesses that own their
              digital future.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              We are not just building software. We are building a studio where
              developers here grow into the engineers other teams want to hire,
              and where the products we ship are the argument that serious
              technology is built on this continent, for this continent.
            </p>
          </div>
        </Reveal>

        {/* ══ 2b. WHERE WE WORK ══════════════════════════════════ */}
        <Reveal className="mb-24">
          <div
            className="rounded-3xl px-8 md:px-12 py-10 gidev-surface-dots"
            style={{
              backgroundColor: "var(--color-brand-light)",
              borderRadius: "28px",
            }}
          >
            <p className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-5">
              Where we work
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {markets.map((market) => (
                <div key={market.place}>
                  <div
                    className="gidev-band mb-4"
                    style={{ height: "8px", width: "42px" }}
                    aria-hidden="true"
                  />
                  <p className="font-bold text-gray-950 mb-1.5">
                    {market.place}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {market.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ══ 3. VALUES ══════════════════════════════════════════ */}
        <Reveal className="mb-28">
          <div className="text-center mb-14">
            <SectionTag text="How We Work" />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-950">
              What we stand on
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {values.map((v) => (
              <div key={v.num}>
                <p className="text-xs font-mono text-brand-dark tracking-widest mb-4">
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
        </Reveal>
      </div>


      {/* ══ 5. SERVICES ══════════════════════════════════════════ */}
      <section className="gidev-stage pb-28">
        <Reveal className="pt-4">
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
              {serviceList.map((s, i) => {
                const active = activeService === i;
                return (
                  <div
                    key={s.num}
                    onMouseEnter={() => setActiveService(i)}
                    onFocus={() => setActiveService(i)}
                  >
                    <Link
                      to={`/services/${s.slug}`}
                      className="flex items-center justify-between py-5 transition-colors duration-200"
                      style={{
                        borderBottom: active
                          ? "2.5px solid var(--color-brand)"
                          : "1px solid var(--color-gray-200)",
                      }}
                    >
                      <span
                        className="font-bold tracking-tight transition-colors duration-200"
                        style={{
                          fontSize: "clamp(24px, 4vw, 46px)",
                          color: active ? "var(--color-ink)" : "var(--color-muted)",
                        }}
                      >
                        {s.label}
                      </span>
                      <span
                        className="font-mono text-sm transition-colors duration-200"
                        style={{ color: active ? "var(--color-muted)" : "var(--color-gray-300)" }}
                      >
                        {s.num}
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="hidden md:block flex-shrink-0 sticky top-24 w-[290px]">
              <div
                className="rounded-2xl overflow-hidden bg-gray-100"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
              >
                <div style={{ height: 220 }}>
                  <ResponsiveImage
                    name={serviceList[activeService].img}
                    alt={serviceList[activeService].alt}
                    sizes="(min-width: 1024px) 400px, 90vw"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
