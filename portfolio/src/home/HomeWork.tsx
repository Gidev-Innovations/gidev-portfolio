import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProjectTeaser from "../projects/ProjectTeaser";
import { featuredProjects } from "../projects/projects.data";
import Eyebrow from "../components/Eyebrow";
import Reveal from "../components/Reveal";

export default function HomeWork() {
  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="home-work-heading">
      <div className="gidev-stage">
        <Reveal className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between md:mb-14">
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <h2
              id="home-work-heading"
              className="text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-5xl md:text-6xl"
            >
              Ideas, made tangible.
            </h2>
          </div>
          <Link viewTransition
            to="/projects"
            className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand-dark underline decoration-brand-border underline-offset-4 transition-colors hover:text-ink"
          >
            View all work <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {featuredProjects().map((project, index) => (
            <Reveal
              key={project.slug}
              delay={index * 80}
              className="rounded-3xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-brand-border hover:shadow-[0_20px_60px_rgba(20,20,19,0.08)] motion-reduce:transform-none sm:p-5"
            >
              <ProjectTeaser project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
