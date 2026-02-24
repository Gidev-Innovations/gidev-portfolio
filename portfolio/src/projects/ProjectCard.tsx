import { Link } from "react-router-dom"
import type { Project } from "./projects.data"

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="block group"
    >
      <div className="overflow-hidden rounded-xl shadow-md">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <h3 className="mt-4 text-lg font-semibold transition-all duration-300 group-hover:text-cyan-400">
          {project.title}
      </h3>
    </Link>
  )
}

export default ProjectCard