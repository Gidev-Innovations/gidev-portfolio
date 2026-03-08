import { motion, useInView } from "framer-motion";
import type { Transition } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import { projects } from "../projects/projects.data";

const springEntry: Transition = { type: "spring", stiffness: 50, damping: 16 };

const featured = projects.slice(0, 4);

export default function HomeProjects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const navigate = useNavigate();

  return (
    <section className="bg-white px-8 py-16 text-center">
      {/* Label */}
      <div className="flex items-center justify-center gap-2 text-gray-500 mb-3">
        <Settings size={13} strokeWidth={1.5} />
        <span style={{ fontSize: "13px" }}>Projects</span>
      </div>

      {/* Heading */}
      <h2
        className="font-black text-black mx-auto mb-3"
        style={{
          fontSize: "clamp(28px, 4vw, 52px)",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          maxWidth: "520px",
        }}
      >
        View our current projects
      </h2>

      <p
        className="text-gray-400 mx-auto mb-12"
        style={{ fontSize: "14px", lineHeight: 1.7, maxWidth: "420px" }}
      >
        Discover our latest projects showcasing our most recent and innovative
        work.
      </p>

      {/* Grid */}
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto text-left"
        style={{ maxWidth: "900px" }}
      >
        {featured.map((project, i) => (
          <motion.div
            key={project.id}
            className="cursor-pointer group"
            initial={{ y: 50, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ ...springEntry, delay: i * 0.12 }}
            onClick={() => navigate(`/projects/${project.id}`)}
          >
            {/* Image */}
            <div
              className="overflow-hidden rounded-2xl mb-3"
              style={{ height: "260px" }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between px-1">
              <span
                className="font-semibold text-black"
                style={{ fontSize: "15px" }}
              >
                {project.title}
              </span>
              <span className="text-gray-400" style={{ fontSize: "14px" }}>
                {project.year}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
