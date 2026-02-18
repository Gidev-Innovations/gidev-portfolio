import { useParams, Link } from "react-router-dom"
import { projects } from "./projects.data"
import "./projectDetails.css"

function ProjectDetails() {
  const { id } = useParams()

  const project = projects.find(
    (p) => p.id === Number(id)
  )

  if (!project) {
    return <h2 className="not-found">Project not found</h2>
  }

  return (
    <section className="project-details">
      <div className="details-container">
        <h1 className="details-title">{project.title}</h1>

        <p className="details-meta">
          {project.year} • {project.technologies.join(" • ")}
        </p>

        <img
          src={project.image}
          alt={project.title}
          className="details-image"
        />

        {/* Tagline */}
        <h2 className="section-title">Tagline</h2>
        <p className="details-tagline">
          {project.tagline}
        </p>

        {/* Work Overview */}
        <h2 className="section-title">Work Overview</h2>
        <p className="details-text">
          {project.overview}
        </p>

        {/* Mission */}
        <h2 className="section-title">Mission</h2>
        <p className="details-text">
          {project.mission}
        </p>

        {/* Technologies */}
        <h2 className="section-title">Technologies Used</h2>
        <ul className="tech-list">
          {project.technologies.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>

        <Link to="/" className="back-button">
          ← Back to Projects
        </Link>
      </div>
    </section>
  )
}

export default ProjectDetails