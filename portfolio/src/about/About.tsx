import { useState } from "react";
import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";
import { services } from "../data/services";
import { imagery } from "../data/imagery";
import ResponsiveImage from "../components/ResponsiveImage";
import Eyebrow from "../components/Eyebrow";
import PageHero from "../components/PageHero";
import TeamGrid from "./TeamGrid";

/* ─── icons & shared UI ──────────────────────────────────── */
const SectionTag = ({ text }: { text: string }) => (
  <div className="text-center">
    <Eyebrow>{text}</Eyebrow>
  </div>
);

const primaryBtn =
  "inline-flex items-center justify-center rounded-full bg-gray-950 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950";
const secondaryBtn =
  "inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-7 py-3.5 text-sm font-semibold text-gray-950 transition-colors duration-200 hover:border-gray-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950";

/* ─── data ───────────────────────────────────────────────── */

type Service = (typeof services)[number];

/** Matches the Build / Grow & Support grouping used in the main menu. */
const buildSlugs = [
  "web-apps",
  "ecommerce",
  "mobile-apps",
  "business-websites",
  "ai-services",
];
const growSlugs = [
  "seo",
  "maintenance",
  "branding",
  "digital-marketing",
];

/**
 * One-line descriptions, taken from the services menu so the About page
 * and the menu say the same thing. Keyed by slug. If a slug is missing
 * the row simply shows no description.
 * NOTE: the menu text for e-commerce and maintenance was cut off in the
 * screenshot, so check those two against services.ts.
 */
const serviceDescriptions: Record<string, string> = {
  "web-apps":
    "Custom web systems that handle real business logic: dashboards, portals, booking and internal tools.",
  ecommerce:
    "Online stores with a clear shopping experience, flexible payment options and reliable order handling.",
  "mobile-apps":
    "Android and iOS apps from one codebase, built to work on mid-range devices and patchy connections.",
  "business-websites":
    "Fast, findable websites, plus the internal systems that automate the work behind them.",
  "ai-services":
    "AI where it makes work simpler, with useful integrations, clear safeguards and people in control.",
  seo: "Practical search optimisation that helps the right people find your business and take the next step.",
  maintenance:
    "Keep your website dependable, current and supported, with planned updates and a clear route to help.",
  branding:
    "A recognisable, consistent identity and useful design assets for your business.",
  "digital-marketing":
    "Plan and improve social media and email activity around your audience, message and business goals.",
};

const toItem = (service: Service) => ({
  label: service.title.toUpperCase(),
  slug: service.slug,
  img: service.image.name,
  alt: service.image.alt,
  description: serviceDescriptions[service.slug] ?? "",
});

const bySlug = (slugs: string[]) =>
  slugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s))
    .map(toItem);

const buildItems = bySlug(buildSlugs);
const knownSlugs = new Set([...buildSlugs, ...growSlugs]);
/* Any service not listed above still appears, at the end of Grow & Support. */
const growItems = [
  ...bySlug(growSlugs),
  ...services.filter((s) => !knownSlugs.has(s.slug)).map(toItem),
];

const serviceGroups = [
  { title: "Build", items: buildItems },
  { title: "Grow & Support", items: growItems },
];
const flatServices = [...buildItems, ...growItems];

/** Four trust points. Kept local so the shared trust data used elsewhere is untouched. */
const aboutTrust = [
  {
    title: "Scope and terms agreed before work starts",
    body: "Before work begins we agree the scope and commercial terms, whether that is a fixed project, a monthly retainer or a partnership. You know what you are getting before we write a line of code or design a page.",
  },
  {
    title: "A straight answer before you commit",
    body: "The free intro call gives you a plain view on fit, timeline and cost, with no obligation.",
  },
  {
    title: "Built for real users and real conditions",
    body: "We design around the devices, connections and needs of the people who will use what we build, and test the important journeys against those requirements.",
  },
  {
    title: "Support after launch",
    body: "Maintenance and support is a service in its own right, so what we hand over has a clear owner for planned updates, agreed content changes and small issues.",
  },
];

const values = [
  {
    num: "01",
    title: "Build each other up",
    body: "We chose to build a team, not just take jobs. Every project sharpens our craft, and every win is shared.",
  },
  {
    num: "02",
    title: "Practical before impressive",
    body: "We build what helps your business, not what looks clever in a demo. Good products work well for their audience.",
  },
  {
    num: "03",
    title: "Move fast, stay grounded",
    body: "We work quickly because we plan well, communicate clearly and care about what we ship.",
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
          eyebrow="About Gidev"
          title="One team for the websites, apps and AI your business runs on."
          breadcrumb={[{ label: "Home", to: "/" }, { label: "About" }]}
          intro="Gidev Innovations is an IT and digital company. We design, build and support practical technology for ambitious businesses, from first idea to long-term care."
          className="pb-0"
        />

        <div className="gidev-stage mt-10 flex flex-wrap gap-3">
          <Link to="/contact#book" className={primaryBtn}>
            Book a free 30-minute call
          </Link>
          <Link to="/services" className={secondaryBtn}>
            Explore our services
          </Link>
        </div>

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

      {/* ══ 2. OUR STORY ═════════════════════════════════════════ */}
      <div className="max-w-[1100px] mx-auto px-8 mt-28">
        <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="border-t-2 border-gray-950 pt-8">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-dark mb-4">
              Our story
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-950 leading-snug">
              Why Gidev exists
            </h2>
          </div>

          <div className="border-t-2 border-brand pt-8 space-y-4">
            <p className="text-gray-500 text-base leading-relaxed">
              Most businesses need more than a website. They need software that
              fits how they work, a brand people recognise, a way to be found
              online, and someone to look after it all afterwards. Too often
              that means juggling several suppliers who never talk to each
              other.
            </p>
            <p className="text-gray-500 text-base leading-relaxed">
              Gidev brings those pieces together. We build web applications,
              e-commerce stores, mobile apps, business systems and practical AI,
              then help you grow with SEO, branding and digital marketing, and
              keep everything running with ongoing support.
            </p>
          </div>
        </Reveal>

        {/* ══ 2b. MISSION ══════════════════════════════════════ */}
        <Reveal className="mb-24">
          <div
            className="rounded-3xl px-8 md:px-12 py-10 gidev-surface-dots"
            style={{
              backgroundColor: "var(--color-brand-light)",
              borderRadius: "28px",
            }}
          >
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-dark mb-5">
              Our mission
            </p>

            <div className="max-w-2xl">
              <div
                className="gidev-band mb-4"
                style={{ height: "8px", width: "42px" }}
                aria-hidden="true"
              />
              <p className="text-xl md:text-2xl font-bold text-gray-950 leading-snug">
                To give ambitious businesses practical technology they can
                trust, and a team that stays with them after launch.
              </p>
              {/*
                Optional, only if it is true and you want it shown:
                <p className="text-gray-500 text-sm leading-relaxed mt-4">
                  Based in Nairobi, Kenya, working with clients across [regions].
                </p>
              */}
            </div>
          </div>
        </Reveal>

        {/* ══ 2c. WHY CLIENTS TRUST US ═══════════════════════════ */}
        <section aria-labelledby="about-trust-heading" className="mb-28">
          <Reveal className="mb-14 text-center">
            <SectionTag text="Why clients trust us" />
            <h2
              id="about-trust-heading"
              className="text-4xl md:text-5xl font-semibold tracking-[-0.04em] text-gray-950"
            >
              How we earn it
            </h2>
          </Reveal>
          <ol className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
            {aboutTrust.map((reason, index) => (
              <Reveal
                as="li"
                key={reason.title}
                delay={(index % 2) * 90}
                className="border-t border-gray-300 pt-6"
              >
                <p
                  className="text-6xl font-semibold leading-none tracking-[-0.05em] text-gray-300 tabular-nums"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-2 mt-5 text-xl font-semibold text-gray-950">
                  {reason.title}
                </h3>
                <p className="leading-relaxed text-gray-600">{reason.body}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* TeamGrid is unchanged. Hide it inside that component if there are
            no real team members and photos yet. */}
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
      <section className="gidev-stage pb-28" aria-labelledby="about-services-heading">
        <Reveal className="pt-4">
          <div className="pb-14 text-center">
            <SectionTag text="What we do" />
            <h2
              id="about-services-heading"
              className="text-4xl md:text-5xl font-bold tracking-tight text-gray-950 mb-4"
            >
              Everything your business needs, in one place
            </h2>
            <p className="text-gray-500 text-base max-w-md mx-auto leading-relaxed">
              Software, AI, brand design, marketing and ongoing support from
              one team, so what you build and how it reaches people work
              together.
            </p>
          </div>

          <div className="flex gap-12 items-start">
            <div className="flex-1 min-w-0">
              {serviceGroups.map((group) => (
                <div key={group.title} className="mb-10 last:mb-0">
                  <p className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-dark mb-2">
                    {group.title}
                  </p>
                  {group.items.map((s) => {
                    const i = flatServices.indexOf(s);
                    const active = activeService === i;
                    return (
                      <div
                        key={s.slug}
                        onMouseEnter={() => setActiveService(i)}
                        onFocus={() => setActiveService(i)}
                      >
                        <Link
                          viewTransition
                          to={`/services/${s.slug}`}
                          className="flex items-center justify-between gap-6 py-5 transition-colors duration-200"
                          style={{
                            borderBottom: active
                              ? "2.5px solid var(--color-brand)"
                              : "1px solid var(--color-gray-200)",
                          }}
                        >
                          <span className="min-w-0">
                            <span
                              className="block font-bold tracking-tight transition-colors duration-200"
                              style={{
                                fontSize: "clamp(22px, 3.4vw, 40px)",
                                color: active
                                  ? "var(--color-ink)"
                                  : "var(--color-muted)",
                              }}
                            >
                              {s.label}
                            </span>
                            {s.description && (
                              <span className="mt-1.5 block max-w-xl text-sm leading-relaxed text-gray-500">
                                {s.description}
                              </span>
                            )}
                          </span>
                          <span
                            className="font-mono text-sm transition-colors duration-200"
                            style={{
                              color: active
                                ? "var(--color-muted)"
                                : "var(--color-gray-300)",
                            }}
                          >
                            {String(i + 1).padStart(3, "0")}
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="hidden md:block flex-shrink-0 sticky top-24 w-[290px]">
              <div
                className="rounded-2xl overflow-hidden bg-gray-100"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
              >
                <div style={{ height: 220 }}>
                  <ResponsiveImage
                    name={flatServices[activeService].img}
                    alt={flatServices[activeService].alt}
                    sizes="(min-width: 1024px) 400px, 90vw"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══ 6. CLOSING CTA ═══════════════════════════════════════ */}
      <section className="gidev-stage pb-28" aria-labelledby="about-cta-heading">
        <Reveal>
          <div
            className="px-8 md:px-12 py-14 text-center gidev-surface-dots"
            style={{
              backgroundColor: "var(--color-brand-light)",
              borderRadius: "28px",
            }}
          >
            <SectionTag text="Taking on new projects" />
            <h2
              id="about-cta-heading"
              className="mt-4 text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-gray-950"
            >
              Ready to talk about your goals?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-600 leading-relaxed">
              Book a free 30-minute call, or send us a few lines about what your
              business needs.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/contact#book" className={primaryBtn}>
                Book a free 30-minute call
              </Link>
              <Link to="/contact#message" className={secondaryBtn}>
                Send us a message
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}