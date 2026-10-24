import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Counter from "../components/Counter";
import Eyebrow from "../components/Eyebrow";
import Reveal from "../components/Reveal";
import { BUSINESS } from "../data/site";
import { digitalDeliveryProcess, serviceGroups, services } from "../data/services";
import { trackPointer } from "../lib/spotlight";

/** Only numbers that already appear in the copy: the service count, the process steps and the intro-call length. */
const stats = [
  { value: services.length, suffix: "", label: "services, from software to SEO and support" },
  { value: digitalDeliveryProcess.length, suffix: "", label: "clear steps from first brief to handover" },
  { value: Number.parseInt(BUSINESS.callLength, 10), suffix: " min", label: "free intro call to talk through your goals" },
];

export default function HomeServices() {
  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="home-services-heading">
      <div className="gidev-stage">
        <Reveal className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>What we do</Eyebrow>
            <h2
              id="home-services-heading"
              className="text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-5xl md:text-6xl"
            >
              A connected team for your digital world.
            </h2>
          </div>
          <div className="max-w-md md:pb-1">
            <p className="text-base leading-relaxed text-gray-600 md:text-lg">
              From digital products and AI to brand, marketing and ongoing
              support, we bring the right capabilities together around your
              business goals.
            </p>
            <Link viewTransition
              to="/services"
              className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-dark underline decoration-brand-border underline-offset-4 transition-colors hover:text-ink"
            >
              See all services <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <Reveal as="dl" className="mb-14 grid gap-px overflow-hidden rounded-3xl border border-gray-200 bg-gray-200 sm:grid-cols-3 md:mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-2 bg-white p-6 sm:p-8">
              <dt className="text-sm leading-snug text-gray-600">{stat.label}</dt>
              <dd className="text-5xl font-semibold tracking-[-0.05em] text-ink md:text-6xl">
                <Counter to={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </Reveal>

        {serviceGroups.map((group) => {
          const slugId = `home-services-${group === serviceGroups[0] ? "build" : "grow"}`;
          return (
            <section key={group} className="mt-14 first:mt-0" aria-labelledby={slugId}>
              <h3 id={slugId} className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-600">
                {group}
              </h3>
              <ul className="border-t border-gray-200">
                {services
                  .filter((service) => service.group === group)
                  .map((service) => {
                    const index = services.indexOf(service);
                    const Icon = service.icon;
                    return (
                      <Reveal as="li" key={service.slug} delay={(index % 4) * 60} className="border-b border-gray-200">
                        <Link viewTransition
                          to={`/services/${service.slug}`}
                          onPointerMove={trackPointer}
                          className="spot group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 px-2 py-7 transition-[padding] duration-300 hover:px-5 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-dark motion-reduce:transition-none sm:gap-x-8 md:py-9"
                        >
                          <span className="row-span-2 w-16 text-5xl font-semibold leading-none tracking-[-0.06em] text-gray-300 transition-colors duration-300 group-hover:text-brand-dark group-focus-visible:text-brand-dark sm:w-24 md:w-32 md:text-7xl">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <h4 className="flex items-center gap-3 text-xl font-semibold leading-snug tracking-tight text-ink md:text-3xl">
                            {service.title}
                            <Icon size={20} strokeWidth={1.6} className="hidden text-gray-400 sm:block" aria-hidden="true" />
                          </h4>
                          <span
                            className="row-span-2 flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-ink transition-[background-color,border-color,color,transform] duration-300 group-hover:-rotate-45 group-hover:border-brand-dark group-hover:bg-brand-dark group-hover:text-white group-focus-visible:-rotate-45 group-focus-visible:bg-brand-dark group-focus-visible:text-white motion-reduce:transition-none motion-reduce:group-hover:rotate-0"
                            aria-hidden="true"
                          >
                            <ArrowUpRight size={18} className="rotate-45" />
                          </span>
                          <p className="col-start-2 max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
                            {service.shortDescription}
                          </p>
                        </Link>
                      </Reveal>
                    );
                  })}
              </ul>
            </section>
          );
        })}
      </div>
    </section>
  );
}
