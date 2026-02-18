import "./projects.css"
import ProjectCard from "./ProjectCard"
import { projects } from "./projects.data"

function Projects() {
  return (
    <section className="projects-section">
      <div className="projects-header">
        <h2>Our Projects</h2>
        <p>
          Discover how our projects showcase innovation and real-world impact.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}

export default Projects