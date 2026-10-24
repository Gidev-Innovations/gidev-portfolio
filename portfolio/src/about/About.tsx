import { useState } from "react";
import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";
import { services } from "../data/services";
import { imagery } from "../data/imagery";
import ResponsiveImage from "../components/ResponsiveImage";
import Eyebrow from "../components/Eyebrow";
import PageHero from "../components/PageHero";
import TeamGrid from "./TeamGrid";
import { trustReasons } from "../data/trust";


/* ─── icons & shared UI ──────────────────────────────────── */
const SectionTag = ({ text }: { text: string }) => (
  <div className="text-center">
    <Eyebrow>{text}</Eyebrow>
  </div>
);

/* ─── data ───────────────────────────────────────────────── */


/**
 * Derived from the shared service list so this page can't drift out of sync
 * with /services the way it previously had. Images live on each service in
 * services.ts (stock mood shots until real product photography exists).
 */
const serviceList = services.map((service, i) => ({
  label: service.title.toUpperCase(),
  slug: service.slug,
  num: String(i + 1).padStart(3, "0"),
  img: service.image.name,
  alt: service.image.alt,
}));

const values = [
  {
    num: "01",
    title: "Build each other up",
    body: "We chose to build a team, not take jobs. Every project sharpens our craft, and every win is shared. We invest in each other the same way we invest in the products we build.",
  },
  {
    num: "02",
    title: "Designed around real users",
    body: "We consider the devices, needs and constraints of the people who will use what we build. Thoughtful products work well for their audience, not just in a perfect demo.",
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
      <header>
        <PageHero
          eyebrow="About"
          title="We build digital foundations and each other."
          breadcrumb={[{ label: "Home", to: "/" }, { label: "About" }]}
          intro="Gidev Innovations is a digital studio creating useful software, thoughtful brand experiences and practical AI solutions for businesses worldwide."
          className="pb-0"
        />

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
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-dark mb-4">
              Mission
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-950 leading-snug mb-4">
              Bring business goals and digital possibility together.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Businesses need more than software alone. We help with the
              technology, search visibility, design, marketing and ongoing
              website support that make a digital presence useful and easier to
              grow.
            </p>
          </div>

          <div className="border-t-2 border-brand pt-8">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-dark mb-4">
              Vision
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-950 leading-snug mb-4">
              Businesses that shape their digital future with confidence.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              We want every business to have access to thoughtful digital
              services shaped around its work: from custom software and AI to
              brand, marketing and continued support.
            </p>
          </div>
        </Reveal>

        {/* ══ 2b. GLOBAL COLLABORATION ═════════════════════════ */}
        <Reveal className="mb-24">
          <div
            className="rounded-3xl px-8 md:px-12 py-10 gidev-surface-dots"
            style={{
              backgroundColor: "var(--color-brand-light)",
              borderRadius: "28px",
            }}
          >
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-dark mb-5">
              Work with us worldwide
            </p>

            <div className="max-w-2xl">
              <div
                className="gidev-band mb-4"
                style={{ height: "8px", width: "42px" }}
                aria-hidden="true"
              />
              <p className="font-bold text-gray-950 mb-1.5">Remote collaboration, worldwide</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Clear communication, planned reviews and a practical handover
                make it easy to work together across teams and time zones.
              </p>
            </div>
          </div>
        </Reveal>

        {/* ══ 2c. WHY CLIENTS TRUST US ═══════════════════════════ */}
        <section aria-labelledby="about-trust-heading" className="mb-28">
          <Reveal className="mb-14 text-center">
            <SectionTag text="Why clients trust us" />
            <h2 id="about-trust-heading" className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] text-gray-950">
              How we earn it
            </h2>
          </Reveal>
          <ol className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
            {trustReasons.map((reason, index) => (
              <Reveal as="li" key={reason.title} delay={(index % 2) * 90} className="border-t border-gray-300 pt-6">
                <p className="text-6xl font-semibold leading-none tracking-[-0.05em] text-gray-300 tabular-nums" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-2 mt-5 text-xl font-semibold text-gray-950">{reason.title}</h3>
                <p className="leading-relaxed text-gray-600">{reason.body}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        <TeamGrid />

        {/* ══ 3. VALUES ══════════════════════════════════════════ */}
        <Reveal className="mb-28">
          <div className="text-center mb-14">
            <SectionTag text="Our values" />
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] text-gray-950">
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
            <SectionTag text="Digital, creative & AI services" />
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-950 mb-4">
              Our Services
            </h2>
            <p className="text-gray-500 text-base max-w-sm mx-auto leading-relaxed">
              We bring software, AI, brand design, marketing and ongoing
              support together to help businesses move forward.
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
                    <Link viewTransition
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
