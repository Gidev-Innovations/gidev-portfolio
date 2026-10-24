import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "./projects.data"
import ResponsiveImage from "../components/ResponsiveImage"

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  const external = project.kind !== "Client project" && project.liveUrl

  const body: ReactNode = (
    <>
      <div className="overflow-hidden rounded-xl shadow-md aspect-[4/3] bg-brand-light">
        <ResponsiveImage
          name={project.image}
          alt={project.imageAlt}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <span className="mt-4 inline-block rounded-full border border-brand-border bg-brand-light px-2.5 py-0.5 text-xs font-medium text-brand-dark">
        {project.kind}
      </span>

      <h3 className="mt-2 flex items-center gap-1.5 text-lg font-semibold transition-colors duration-300 group-hover:text-brand-dark">
        {project.title}
        {external && <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />}
      </h3>

      <p className="mt-2 text-sm text-gray-500 leading-relaxed">
        {project.summary}
      </p>

      {project.whyWeBuiltIt && (
        <p className="mt-2 text-sm text-gray-700 leading-relaxed">
          <span className="font-semibold">Why we built it:</span> {project.whyWeBuiltIt}
        </p>
      )}
    </>
  )

  if (external) {
    return (
      <a href={external} target="_blank" rel="noopener noreferrer" className="block group">
        {body}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    )
  }

  return (
    <Link viewTransition to={`/projects/${project.slug}`} className="block group">
      {body}
    </Link>
  )
}

export default ProjectCard
