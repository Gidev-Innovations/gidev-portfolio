import { useParams, Link } from "react-router-dom"
import { projects } from "./projects.data"

function ProjectDetails() {
  const { id } = useParams()

  const project = projects.find(
    (p) => p.id === Number(id)
  )

  if (!project) {
    return (
      <h2 className="text-center mt-20 text-2xl font-semibold">
        Project not found
      </h2>
    )
  }

  return (
    <section className="px-6 md:px-20 py-16 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h1 className="text-4xl font-bold mb-10 text-center">
          {project.title}
        </h1>

        {/* Image */}
        <div className="mb-16">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-16">

          {/* Left Column */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Work Overview
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Right Column */}
          <div className="space-y-10">

            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Mission
              </h2>

              <p className="text-gray-600 leading-relaxed">
                {project.mission}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Tagline
              </h2>

              <p className="text-gray-600 leading-relaxed">
                {project.tagline}
              </p>
            </div>

          </div>
        </div>

        {/* Back Button */}
        <div className="mt-16">
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-full bg-black text-white hover:text-cyan-400 transition"
          >
            ← Back to Projects
          </Link>
        </div>

      </div>
    </section>
  )
}

export default ProjectDetails