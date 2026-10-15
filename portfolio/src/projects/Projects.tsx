import { Link } from "react-router-dom"
import { projects } from "./projects.data"
import ProjectCard from "./ProjectCard"
import Reveal from "../components/Reveal"
import JsonLd from "../seo/JsonLd"
import { breadcrumbSchema } from "../seo/schema"

function Projects() {
  return (
    <section className="min-h-screen pb-20 bg-white mt-4 md:mt-12">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Work", path: "/projects" }])} />
      <header className="pt-20 pb-16 text-center px-6">
        <h1 className="text-heading-4 md:text-heading-2 font-medium tracking-tight text-gray-950 mb-4">
          Work
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Client work and our own studio products, written up honestly: who
          it was for, the problem, what we built, and where it stands today.
          Studio projects are labelled as such.
        </p>
      </header>

      <div className="gidev-stage">
        <div className="grid md:grid-cols-2 gap-10 text-left">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 2) * 100}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-gray-600 mb-5">Have something similar in mind?</p>
          <Link
            to="/contact"
            className="inline-flex min-h-12 items-center rounded-full bg-gray-900 px-7 font-semibold text-white hover:bg-brand-dark transition-colors"
          >
            Tell us about your project
          </Link>
        </div>

      </div>
    </section>
  )
}

export default Projects
