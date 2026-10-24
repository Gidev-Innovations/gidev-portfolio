import { Layers, MessageCircle, Palette, Search, Shield, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Eyebrow from "../components/Eyebrow";
import Reveal from "../components/Reveal";
import { trackPointer } from "../lib/spotlight";

type Feature = { Icon: LucideIcon; title: string; description: string; span: string; large?: boolean };

/** Spans are for the 6-column grid at lg and above; below that the cards stack in 1–2 columns. */
const features: Feature[] = [
  {
    Icon: Target,
    title: "Scope agreed upfront",
    description: "We agree the brief, deliverables and priorities before work begins, so everyone knows what “done” means.",
    span: "lg:col-span-4",
    large: true,
  },
  {
    Icon: MessageCircle,
    title: "Work you can follow",
    description: "Regular check-ins and clear handovers keep the work understandable at every stage.",
    span: "lg:col-span-2",
  },
  {
    Icon: Palette,
    title: "Made to fit your brand",
    description: "Creative work should feel recognisably yours and work across the places customers meet you.",
    span: "lg:col-span-2",
  },
  {
    Icon: Layers,
    title: "Built with the bigger picture",
    description:
      "Software, brand, visibility and marketing can be considered together, not as disconnected tasks.",
    span: "lg:col-span-4",
    large: true,
  },
  {
    Icon: Search,
    title: "Decisions with intent",
    description: "We connect digital work to clear goals and review useful signals as the work progresses.",
    span: "lg:col-span-3",
  },
  {
    Icon: Shield,
    title: "Support beyond launch",
    description: "Website maintenance and continued digital support are available when your business needs them.",
    span: "lg:col-span-3",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="features-heading">
      <div className="gidev-stage">
        <Reveal className="mb-10 max-w-2xl md:mb-14">
          <Eyebrow>Our approach</Eyebrow>
          <h2
            id="features-heading"
            className="mb-4 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-5xl md:text-6xl"
          >
            The details matter.
          </h2>
          <p className="text-base leading-relaxed text-gray-600 md:text-lg">
            Good work comes from clear thinking, considered execution and a team that stays connected.
          </p>
        </Reveal>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {features.map(({ Icon, title, description, span, large }, index) => (
            <Reveal as="li" key={title} delay={(index % 3) * 90} className={`${span} ${large ? "sm:col-span-2" : ""}`}>
              <article
                onPointerMove={trackPointer}
                className={`spot spot-border group flex h-full flex-col justify-between rounded-3xl border border-brand-border bg-brand-light p-6 sm:p-8 ${
                  large ? "min-h-64 lg:min-h-72" : "min-h-56"
                }`}
              >
                <span
                  className={`flex items-center justify-center rounded-2xl bg-white text-ink shadow-[0_2px_10px_rgba(20,20,19,0.06)] transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:text-brand-dark motion-reduce:transform-none ${
                    large ? "h-16 w-16" : "h-12 w-12"
                  }`}
                >
                  <Icon size={large ? 30 : 24} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div className="mt-10">
                  <h3 className={`mb-2 font-semibold tracking-tight text-ink ${large ? "text-2xl md:text-3xl" : "text-xl"}`}>
                    {title}
                  </h3>
                  <p className={`max-w-lg leading-relaxed text-gray-700 ${large ? "text-base md:text-lg" : "text-sm md:text-base"}`}>
                    {description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
