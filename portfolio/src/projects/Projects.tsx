import { projects } from "./projects.data"
import ProjectCard from "./ProjectCard"

function Projects() {
  return (
<section className="min-h-screen py-20 px-6 bg-white">
  <div className="max-w-6xl mx-auto text-center">

    <h1 className="text-4xl md:text-5xl font-semibold mb-4 opacity-0 animate-[fadeIn_0.8s_ease-in_forwards]">
      Projects
    </h1>

    <p className="text-gray-600 max-w-2xl mx-auto mb-12 opacity-0 animate-[fadeIn_1.2s_ease-in_forwards]">
      Explore a collection of our recent work, showcasing innovative solutions,
      modern design systems, and scalable applications built with performance
      and user experience in mind.
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
    </div>

  </div>
</section>
  )
}

export default Projects