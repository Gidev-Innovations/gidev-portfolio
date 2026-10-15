import { Link } from "react-router-dom";
import { Check, Settings } from "lucide-react";
import type { Service } from "../data/services";
import { services, deliveryProcess } from "../data/services";
import { BUSINESS } from "../data/site";
import { blogPosts } from "../blog/blogData";
import { projects } from "../projects/projects.data";
import Reveal from "../components/Reveal";
import ResponsiveImage from "../components/ResponsiveImage";
import Faqs from "./Faqs";
import JsonLd from "../seo/JsonLd";
import { breadcrumbSchema, faqSchema, serviceSchema } from "../seo/schema";

const eyebrow = "text-xs font-mono text-gray-500 tracking-widest uppercase";

export default function ServiceDetail({ service }: { service: Service }) {
  const others = services.filter((s) => s.slug !== service.slug);
  const posts = service.relatedPosts
    .map((slug) => blogPosts.find((p) => p.slug === slug))
    .filter((p) => p !== undefined);
  const work = service.relatedProjects
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p) => p !== undefined);

  return (
    <div className="bg-white min-h-screen mt-10 md:mt-14">
      <JsonLd
        data={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
          faqSchema(service.faqs),
        ]}
      />

      {/* Hero */}
      <header className="px-6 pt-20 pb-14 text-center">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center justify-center gap-2 text-gray-500" style={{ fontSize: "13px" }}>
            <li>
              <Link to="/" className="inline-flex min-h-11 min-w-11 items-center justify-center hover:text-brand-dark transition-colors">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/services" className="inline-flex min-h-11 items-center gap-1.5 hover:text-brand-dark transition-colors">
                <Settings size={13} strokeWidth={1.5} aria-hidden="true" />
                Services
              </Link>
            </li>
          </ol>
        </nav>

        <h1
          className="font-bold text-black mx-auto mb-5"
          style={{
            fontSize: "clamp(32px, 5vw, 62px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: "860px",
          }}
        >
          {service.h1}
        </h1>

        <div
          className="gidev-band mx-auto mb-6"
          style={{ height: "10px", width: "96px" }}
          aria-hidden="true"
        />

        <p
          className="text-gray-500 mx-auto mb-8"
          style={{ fontSize: "17px", lineHeight: 1.65, maxWidth: "580px" }}
        >
          {service.summary}
        </p>

        <Link
          to="/contact"
          className="inline-flex min-h-12 items-center bg-gray-900 text-white rounded-full px-7 py-3 font-semibold hover:bg-brand-dark transition-colors duration-200"
          style={{ fontSize: "15px" }}
        >
          Book a free 30-minute call
        </Link>
      </header>

      <div className="max-w-[1100px] mx-auto px-6 md:px-8 pb-24">
        <figure className="mb-16 overflow-hidden rounded-3xl aspect-[16/8] bg-brand-light">
          <ResponsiveImage
            name={service.image.name}
            alt={service.image.alt}
            sizes="(min-width: 1100px) 1036px, calc(100vw - 48px)"
            className="w-full h-full object-cover"
          />
        </figure>

        {/* Intro */}
        <Reveal className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 md:gap-16">
          <div className="border-t-2 border-gray-950 pt-8 space-y-5">
            <h2 className={eyebrow}>What this is</h2>
            {service.intro.map((para) => (
              <p key={para.slice(0, 32)} className="text-gray-700 text-[17px] leading-relaxed">
                {para}
              </p>
            ))}
          </div>
          <aside className="border-t-2 border-brand pt-8">
            <h2 className={`${eyebrow} mb-4`}>Best for</h2>
            <p className="text-gray-600 text-base leading-relaxed">{service.bestFor}</p>
            <h2 className={`${eyebrow} mt-10 mb-4`}>Typical timeline</h2>
            <p className="text-gray-600 text-base leading-relaxed">{service.timeline}</p>
          </aside>
        </Reveal>

        {/* Problems */}
        <section className="mt-24">
          <h2
            className="font-bold text-black mb-10"
            style={{ fontSize: "clamp(26px, 3.4vw, 42px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            Problems we solve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.problems.map((problem, i) => (
              <Reveal
                key={problem.title}
                delay={(i % 2) * 100}
                className="rounded-2xl p-6 md:p-8"
                style={{
                  backgroundColor: "var(--color-brand-light)",
                  border: "1px solid var(--color-brand-border)",
                }}
              >
                <h3 className="font-bold text-black mb-3" style={{ fontSize: "18px" }}>
                  {problem.title}
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontSize: "15px" }}>
                  {problem.body}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Included + stack */}
        <Reveal className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div className="border-t-2 border-brand pt-8">
            <h2 className={`${eyebrow} mb-6`}>What's included</h2>
            <ul className="flex flex-col gap-4">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 flex items-center justify-center rounded-full mt-0.5"
                    style={{
                      width: "20px",
                      height: "20px",
                      backgroundColor: "var(--color-brand-border)",
                    }}
                  >
                    <Check size={12} strokeWidth={2.4} className="text-brand-dark" aria-hidden="true" />
                  </span>
                  <span className="text-gray-600 text-[15px] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t-2 border-gray-950 pt-8">
            <h2 className={`${eyebrow} mb-6`}>Tech we typically use</h2>
            <ul className="flex flex-wrap gap-2">
              {service.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full px-4 py-2 text-[14px] text-gray-700 bg-brand-light border border-brand-border"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <h2 className={`${eyebrow} mb-4`}>Indicative pricing</h2>
              <p className="text-gray-700 leading-relaxed">
                Projects typically start from{" "}
                <strong className="text-black font-semibold">{service.pricing.fromKes}</strong>.
                Every quote follows a free {BUSINESS.callLength} scoping call.
              </p>
              {service.pricing.note && (
                <p className="text-gray-600 text-sm mt-2 leading-relaxed">{service.pricing.note}</p>
              )}
            </div>
          </div>
        </Reveal>

        {/* Process */}
        <section className="mt-24">
          <h2
            className="font-bold text-black mb-10"
            style={{ fontSize: "clamp(26px, 3.4vw, 42px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
          >
            How a project runs
          </h2>
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {deliveryProcess.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 80} className="border-t-2 border-gray-200 pt-5">
                <p className="text-xs font-mono text-gray-500 mb-2">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="font-bold text-black mb-2" style={{ fontSize: "16px" }}>{step.title}</h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontSize: "14.5px" }}>{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* Related work */}
        {work.length > 0 && (
          <section className="mt-24">
            <h2 className={`${eyebrow} mb-6`}>Related work</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {work.map((project) => (
                <Link
                  key={project.slug}
                  to={`/projects/${project.slug}`}
                  className="group flex gap-4 items-center rounded-2xl p-4 border border-brand-border hover:bg-brand-light transition-colors"
                >
                  <span className="block w-28 h-20 flex-shrink-0 overflow-hidden rounded-xl">
                    <ResponsiveImage
                      name={project.image}
                      alt=""
                      sizes="112px"
                      className="w-full h-full object-cover"
                    />
                  </span>
                  <span>
                    <span className="block font-bold text-black transition-colors group-hover:text-brand-dark">{project.title}</span>
                    <span className="block text-gray-500 text-sm">{project.kind}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <div className="mt-24">
          <Faqs items={service.faqs} title={`${service.name}: common questions`} />
        </div>

        {/* Related reading */}
        {posts.length > 0 && (
          <section className="mt-24">
            <h2 className={`${eyebrow} mb-6`}>Further reading</h2>
            <ul className="flex flex-col divide-y divide-brand-border border-y border-brand-border">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="flex min-h-14 items-center justify-between gap-4 py-3 text-gray-800 hover:text-brand-dark transition-colors"
                  >
                    <span className="font-medium">{post.title}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA */}
        <Reveal
          className="mt-24 rounded-3xl px-8 md:px-14 py-16 text-center"
          style={{
            backgroundColor: "var(--color-brand-light)",
            borderRadius: "28px",
          }}
        >
          <h2
            className="font-bold text-black mx-auto mb-3"
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
            Send a short message or book a free 30-minute call. You'll get a
            straight answer on fit, timeline and cost.
          </p>
          <Link
            to="/contact"
            className="inline-flex min-h-12 items-center gap-3 bg-gray-900 text-white rounded-full pl-6 pr-2 py-2 font-semibold hover:bg-brand-dark transition-colors duration-200"
            style={{ fontSize: "15px" }}
          >
            Get in touch
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
        </Reveal>

        {/* Other services */}
        <nav className="mt-24" aria-label="Other services">
          <h2 className={`${eyebrow} mb-6 text-center`}>Other services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {others.map((other) => (
              <Link
                key={other.slug}
                to={`/services/${other.slug}`}
                className="group rounded-2xl p-6 transition-colors duration-200 hover:bg-white"
                style={{
                  backgroundColor: "var(--color-brand-light)",
                  border: "1px solid var(--color-brand-border)",
                }}
              >
                <h3 className="font-bold text-black mb-2 transition-colors group-hover:text-brand-dark" style={{ fontSize: "16px" }}>
                  {other.name}
                </h3>
                <p className="text-gray-500" style={{ fontSize: "13.5px", lineHeight: 1.7 }}>
                  {other.summary}
                </p>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
