import { useEffect, useState } from "react"
import { projects } from "./projects.data"
import ProjectCard from "./ProjectCard"

function Projects() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="min-h-screen py-20 bg-white md:mt-12">
      <div className="gidev-stage">

        {/* Title */}
        <h1
          className={`text-4xl md:text-5xl font-semibold mb-4 text-center md:text-left transition-all duration-700 ease-out transform ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          Case Studies
        </h1>

        {/* Paragraph */}
        <p
          className={`text-gray-600 max-w-2xl mx-auto md:mx-0 mb-12 text-center md:text-left transition-all duration-700 ease-out transform ${
            visible
              ? "opacity-100 translate-y-0 delay-200"
              : "opacity-0 translate-y-8"
          }`}
        >
          Real client work, written up honestly: who we built for, the problem
          they came with, what we built, and what changed afterwards.
        </p>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-10 text-left">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className={`transition-all duration-700 ease-out transform ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: visible
                  ? `${index * 150 + 400}ms`
                  : "0ms",
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Projects