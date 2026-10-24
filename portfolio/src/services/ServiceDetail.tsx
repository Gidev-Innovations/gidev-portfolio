import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import type { Service } from "../data/services";
import { services } from "../data/services";
import Reveal from "../components/Reveal";
import PageHero from "../components/PageHero";
import ResponsiveImage from "../components/ResponsiveImage";
import Faqs from "./Faqs";
import JsonLd from "../seo/JsonLd";
import { breadcrumbSchema, faqSchema, serviceSchema } from "../seo/schema";

const eyebrow = "text-xs font-semibold tracking-[0.18em] uppercase text-brand-dark";
const heading = "font-semibold tracking-tight text-gray-950";

export default function ServiceDetail({ service }: { service: Service }) {
  const relatedServices = service.relatedServiceIds
    .map((id) => services.find((item) => item.id === id))
    .filter((item): item is Service => item !== undefined);

  return (
    <div className="min-h-screen bg-white pt-10 md:pt-14">
      <JsonLd
        data={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
          faqSchema(service.faqs),
        ]}
      />

      <PageHero
        eyebrow={service.group}
        title={service.h1}
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Services", to: "/services" },
          { label: service.title },
        ]}
        intro={service.shortDescription}
      >
        <Link viewTransition
          to="/contact"
          className="inline-flex min-h-12 items-center rounded-full bg-ink px-7 py-3 font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark"
        >
          Talk to us about this service
        </Link>
      </PageHero>

      <div className="mx-auto max-w-[1100px] px-6 pb-24 md:px-8">
        <figure className="mb-16 aspect-[16/8] overflow-hidden rounded-3xl bg-brand-light">
          <ResponsiveImage
            name={service.image.name}
            alt={service.image.alt}
            sizes="(min-width: 1100px) 1036px, calc(100vw - 48px)"
            className="h-full w-full object-cover"
          />
        </figure>

        <section aria-labelledby="service-intro-heading" className="mb-20 max-w-3xl">
          <h2 id="service-intro-heading" className={`${eyebrow} mb-5`}>A considered approach</h2>
          <div className="space-y-5">
            {service.longDescription.split("\n\n").map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="text-lg leading-relaxed text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section aria-labelledby="service-included-heading" className="mb-20">
          <Reveal className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <div className="border-t-2 border-brand pt-7">
              <p className={`${eyebrow} mb-4`}>{service.group}</p>
              <h2 id="service-included-heading" className={`${heading} text-3xl md:text-4xl`}>
                What’s included
              </h2>
              <p className="mt-4 leading-relaxed text-gray-600">{service.bestFor}</p>
            </div>
            <ul className="space-y-4 border-t-2 border-gray-950 pt-7">
              {service.includedItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-light">
                    <Check size={12} strokeWidth={2.4} className="text-brand-dark" aria-hidden="true" />
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section aria-labelledby="service-process-heading" className="mb-20">
          <Reveal className="mb-8 max-w-2xl">
            <p className={`${eyebrow} mb-4`}>A clear sequence</p>
            <h2 id="service-process-heading" className={`${heading} text-3xl md:text-4xl`}>
              How we work on {service.title.toLowerCase()}
            </h2>
          </Reveal>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.processSteps.map((step, index) => (
              <Reveal
                as="li"
                key={step.title}
                delay={index * 70}
                className="border-t-2 border-gray-200 pt-5"
              >
                <p className="mb-3 text-xs font-mono tracking-widest text-brand-dark">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-2 text-lg font-semibold text-gray-950">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        <section aria-labelledby="service-deliverables-heading" className="mb-20">
          <Reveal className="rounded-3xl border border-brand-border bg-brand-light p-7 md:p-10">
            <p className={`${eyebrow} mb-4`}>Clear outcomes</p>
            <h2 id="service-deliverables-heading" className={`${heading} mb-7 text-3xl md:text-4xl`}>
              Deliverables
            </h2>
            <ul className="grid gap-4 md:grid-cols-3">
              {service.deliverables.map((item) => (
                <li key={item} className="rounded-2xl bg-white p-5 leading-relaxed text-gray-700">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {relatedServices.length > 0 && (
          <nav aria-label="Related services" className="mb-20">
            <p className={`${eyebrow} mb-5`}>Related services</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedServices.map((related) => (
                <Link viewTransition
                  key={related.id}
                  to={`/services/${related.slug}`}
                  className="group rounded-2xl border border-gray-200 p-5 transition-colors hover:border-brand-border hover:bg-brand-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
                >
                  <h3 className="font-semibold text-gray-950 group-hover:text-brand-dark">{related.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{related.shortDescription}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark">
                    Explore service <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </nav>
        )}

        <div className="mb-20">
          <Faqs items={service.faqs} title={`${service.title}: common questions`} />
        </div>

        <Reveal className="rounded-3xl bg-brand-light px-8 py-14 text-center md:px-14">
          <p className={`${eyebrow} mb-4`}>Next step</p>
          <h2 className={`${heading} mx-auto mb-3 max-w-xl text-3xl md:text-4xl`}>
            Tell us what you need
          </h2>
          <p className="mx-auto mb-8 max-w-xl leading-relaxed text-gray-600">
            Share what you want to achieve. We’ll discuss the right scope and whether a fixed project,
            monthly retainer or partnership is the best fit.
          </p>
          <Link viewTransition
            to="/contact"
            className="inline-flex min-h-12 items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark"
          >
            Start a conversation
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink">
              <ArrowUpRight size={15} aria-hidden="true" />
            </span>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
