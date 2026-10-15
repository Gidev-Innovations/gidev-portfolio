import type { ReactNode } from "react"
import { useParams, Link } from "react-router-dom"
import { projectBySlug } from "./projects.data"
import JsonLd from "../seo/JsonLd"
import ResponsiveImage from "../components/ResponsiveImage"
import { breadcrumbSchema } from "../seo/schema"

const labelClass = "text-xs font-mono text-gray-500 tracking-widest uppercase mb-3"

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-gray-200 pt-8 mt-12">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </section>
  )
}

function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>()

  const project = projectBySlug(slug ?? "")

  if (!project) {
    return (
      <h2 className="text-center mt-20 text-2xl font-semibold">
        Project not found
      </h2>
    )
  }

  return (
    <article className="pt-24 pb-16 bg-white md:mt-12">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />

      <header className="gidev-copy text-center md:text-left">
        <span className="inline-block rounded-full border border-brand-border bg-brand-light px-2.5 py-0.5 text-xs font-medium text-brand-dark mb-3">
          {project.kind}
        </span>

        <h1 className="text-4xl font-bold mb-6">
          {project.title}
        </h1>

        <p className="text-gray-500 max-w-2xl md:mx-0 mx-auto mb-10 leading-relaxed">
          {project.summary}
        </p>

        {(project.liveUrl || project.repoUrl) && (
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center px-5 py-2.5 rounded-full bg-black text-white text-sm hover:bg-brand-dark transition"
              >
                View live
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center px-5 py-2.5 rounded-full border border-gray-300 text-gray-900 text-sm hover:border-brand-dark hover:text-brand-dark transition"
              >
                GitHub
              </a>
            )}
          </div>
        )}
      </header>

      <div className="gidev-stage mb-4">
        <div className="w-full aspect-[16/9] overflow-hidden rounded-2xl shadow-lg bg-brand-light">
          <ResponsiveImage
            name={project.image}
            alt={project.imageAlt}
            sizes="(min-width: 1600px) 1536px, 100vw"
            priority
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="gidev-copy">
        <Section title="Client">
          <p className="text-gray-900 font-semibold">{project.client}</p>
          <p className="text-gray-600 leading-relaxed mt-1">{project.clientDescription}</p>
          <p className="text-gray-500 text-sm mt-2">
            {project.sector} · {project.year}
          </p>
        </Section>

        {project.problem && (
          <Section title="The problem">
            <p className="text-gray-600 leading-relaxed">{project.problem}</p>
          </Section>
        )}

        <Section title="What we built">
          <p className="text-gray-600 leading-relaxed">{project.whatWeDid}</p>
          {project.features.length > 0 && (
            <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-600 leading-relaxed">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          )}
          {project.screenshots.length > 0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {project.screenshots.map((shot) => (
                <div key={shot.image} className="overflow-hidden rounded-xl shadow-md bg-brand-light">
                  <ResponsiveImage
                    name={shot.image}
                    alt={shot.alt}
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          )}
        </Section>

        <Section title="Stack">
          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li key={tech} className="rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-700">
                {tech}
              </li>
            ))}
          </ul>
        </Section>

        {project.outcome && (
          <Section title="Result">
            <p className="text-gray-600 leading-relaxed">{project.outcome}</p>
          </Section>
        )}

        {project.quote && (
          <figure className="mt-12 rounded-2xl border-l-4 border-brand bg-brand-light px-6 py-8 md:px-10">
            <blockquote className="text-xl md:text-2xl text-gray-900 leading-snug">
              “{project.quote.text}”
            </blockquote>
            <figcaption className={`${labelClass} mt-4 mb-0`}>{project.quote.attribution}</figcaption>
          </figure>
        )}
      </div>

      <div className="gidev-stage">
        <div
          className="mt-20 rounded-3xl px-8 md:px-14 py-12 text-center"
          style={{ backgroundColor: "var(--color-brand-light)" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
            Want something like this built?
          </h2>
          <p className="text-gray-600 mb-6">
            Tell us what you're working on. You'll get a straight answer on fit, timeline and cost.
          </p>
          <Link
            to="/contact"
            className="inline-flex min-h-12 items-center rounded-full bg-gray-900 px-7 font-semibold text-white hover:bg-brand-dark transition-colors"
          >
            Get in touch
          </Link>
        </div>

        <div className="mt-12">
          <Link
            to="/projects"
            className="inline-flex min-h-11 items-center px-6 rounded-full border border-gray-300 text-gray-900 hover:border-brand-dark hover:text-brand-dark transition"
          >
            ← Back to Work
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ProjectDetails
