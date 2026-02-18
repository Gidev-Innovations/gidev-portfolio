import type { Project } from "./projects.data"

type ProjectCardProps = {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card">
      <div className="project-image-wrapper">
        <img src={project.image} alt={project.title} />
      </div>

      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        <span className="project-year">{project.year}</span>
      </div>
    </div>
  )
}

export default ProjectCard