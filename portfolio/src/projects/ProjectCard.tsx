import { Link } from "react-router-dom"
import type { Project } from "./projects.data"

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/projects/${project.id}`} className="project-card">
      <img src={project.image} alt={project.title} />
      <h3>{project.title}</h3>
    </Link>
  )
}

export default ProjectCard