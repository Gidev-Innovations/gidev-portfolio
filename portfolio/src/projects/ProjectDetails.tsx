import { useParams, Link } from "react-router-dom"
import { projects } from "./projects.data"

function ProjectDetails() {
  const { id } = useParams()

  const project = projects.find(
    (p) => p.id === Number(id)
  )

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold">
          Project not found
        </h2>
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-gray-50 py-20 px-6 flex justify-center">
      <div className="max-w-4xl w-full">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-semibold mb-2">
          {project.title}
        </h1>

        {/* Meta */}
        <p className="text-gray-500 text-sm tracking-wide mb-8">
          {project.year} • {project.technologies.join(" • ")}
        </p>

        {/* Image */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full rounded-xl mb-12 shadow-sm"
        />

        {/* Tagline */}
        <h2 className="text-xl font-semibold border-l-4 border-black pl-3 mb-3">
          Tagline
        </h2>
        <p className="italic text-gray-600 text-lg mb-10">
          {project.tagline}
        </p>

        {/* Work Overview */}
        <h2 className="text-xl font-semibold border-l-4 border-black pl-3 mb-3">
          Work Overview
        </h2>
        <p className="text-gray-700 leading-relaxed mb-10">
          {project.overview}
        </p>

        {/* Mission */}
        <h2 className="text-xl font-semibold border-l-4 border-black pl-3 mb-3">
          Mission
        </h2>
        <p className="text-gray-700 leading-relaxed mb-12">
          {project.mission}
        </p>

        {/* Technologies */}
        <h2 className="text-xl font-semibold border-l-4 border-black pl-3 mb-4">
          Technologies Used
        </h2>
        <div className="flex flex-wrap gap-3 mb-12">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-black text-white rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Back Button */}
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-black text-white rounded-full transition-all duration-300 hover:text-cyan-400 hover:-translate-y-1"
        >
          ← Back to Projects
        </Link>

      </div>
    </section>
  )
}

export default ProjectDetails