import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ResponsiveImage from "../components/ResponsiveImage";
import { serviceBySlug } from "../data/services";
import type { Project } from "./projects.data";

/** Homepage teaser. Links to the project's case-study page. */
export default function ProjectTeaser({ project }: { project: Project }) {
  const tags = project.serviceIds
    .map((id) => serviceBySlug(id))
    .filter((service) => service !== undefined);

  return (
    <Link viewTransition
      to={`/projects/${project.slug}`}
      className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-brand-light shadow-md">
        <ResponsiveImage
          name={project.image}
          alt={project.imageAlt}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-end justify-start bg-gradient-to-t from-ink/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:hidden"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-ink">
            View case study <ArrowUpRight size={15} />
          </span>
        </span>
      </div>

      {tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Services">
          {tags.map((service) => (
            <li
              key={service.id}
              className="rounded-full border border-brand-border bg-brand-light px-2.5 py-0.5 text-xs font-medium text-brand-dark"
            >
              {service.title}
            </li>
          ))}
        </ul>
      )}

      <h3 className="mt-2 text-lg font-semibold transition-colors duration-300 group-hover:text-brand-dark">
        {project.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">
        {project.outcome ?? project.summary}
      </p>
      <span className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-dark [@media(hover:hover)]:sr-only">
        View case study <ArrowUpRight size={15} aria-hidden="true" />
      </span>
    </Link>
  );
}
