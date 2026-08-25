import { useParams, Link } from "react-router-dom"
import { caseStudyBySlug } from "./projects.data"

function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>()

  const project = caseStudyBySlug(slug ?? "")

  if (!project) {
    return (
      <h2 className="text-center mt-20 text-2xl font-semibold">
        Project not found
      </h2>
    )
  }

  return (
    <section className="pt-24 pb-16 bg-white md:mt-12">
      <div className="gidev-copy text-center md:text-left">

        {/* Title */}
        <p className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-3">
          {project.sector}
        </p>

        <h1 className="text-4xl font-bold mb-6">
          {project.title}
        </h1>

        <p className="text-gray-500 max-w-2xl md:mx-0 mx-auto mb-10 leading-relaxed">
          {project.summary}
        </p>

      </div>

        {/* Image — breaks out of the copy rail */}
        <div className="gidev-stage mb-16">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full aspect-[16/9] object-cover rounded-2xl shadow-lg"
          />
        </div>

      <div className="gidev-stage">
        {/* Meta strip */}
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 pb-12 border-b border-gray-200">
          <div>
            <dt className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-2">
              Client
            </dt>
            <dd className="text-gray-900 font-semibold">{project.client}</dd>
          </div>
          <div>
            <dt className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-2">
              Sector
            </dt>
            <dd className="text-gray-900 font-semibold">{project.sector}</dd>
          </div>
          <div>
            <dt className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-2">
              Year
            </dt>
            <dd className="text-gray-900 font-semibold">{project.year}</dd>
          </div>
          <div>
            <dt className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-2">
              Stack
            </dt>
            <dd className="text-gray-900 font-semibold">
              {project.technologies.join(", ")}
            </dd>
          </div>
        </dl>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-16">

          {/* Left Column */}
          <div className="border-t-2 border-gray-950 pt-8">
            <h2 className="text-2xl font-semibold mb-4">
              The problem
            </h2>

            <p className="text-gray-600 leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Right Column */}
          <div className="space-y-10">

            <div className="border-t-2 border-teal-400 pt-8">
              <h2 className="text-2xl font-semibold mb-4">
                What we did
              </h2>

              <p className="text-gray-600 leading-relaxed">
                {project.whatWeDid}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Outcome
              </h2>

              <p className="text-gray-600 leading-relaxed">
                {project.outcome}
              </p>
            </div>

          </div>
        </div>

        {/* Back Button */}
        <div className="mt-16">
          <Link
            to="/projects"
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
