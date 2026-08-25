import { Link } from "react-router-dom"
import type { CaseStudy } from "./projects.data"

interface ProjectCardProps {
  project: CaseStudy
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="block group"
    >
      <div className="overflow-hidden rounded-xl shadow-md aspect-[4/3]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <p className="mt-4 text-xs font-mono text-gray-500 tracking-widest uppercase">
        {project.sector}
      </p>

      <h3 className="mt-1 text-lg font-semibold transition-all duration-300 group-hover:text-cyan-400">
          {project.title}
      </h3>

      <p className="mt-2 text-sm text-gray-500 leading-relaxed">
        {project.summary}
      </p>
    </Link>
  )
}

export default ProjectCard
