import { Settings, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import ParallaxGallery from "../components/ParallaxGallery";
import { services } from "../data/services";

export default function HomeServices() {
  return (
    <>
      {/* Header */}
      <section className="bg-white text-center px-6 pt-20 pb-10">
        <div className="flex items-center justify-center gap-2 text-gray-500 mb-4">
          <Settings size={13} strokeWidth={1.5} />
          <span style={{ fontSize: "13px" }}>Services</span>
        </div>

        <h2
          className="font-black text-black mx-auto mb-4"
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: "600px",
          }}
        >
          Web apps, stores
          <br className="hidden md:inline" />
          and mobile products
        </h2>

        <p
          className="text-gray-500 mx-auto mb-10"
          style={{ fontSize: "15px", lineHeight: 1.6, maxWidth: "420px" }}
        >
          Four things we build, and the systems that keep them running after
          launch.
        </p>

        {/* Links through to each service page */}
        <nav
          className="flex flex-wrap items-center justify-center gap-3"
          aria-label="Services"
        >
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="group inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-gray-700 hover:text-black transition-colors duration-200"
              style={{
                fontSize: "14.5px",
                backgroundColor: "var(--color-spring-wood-50)",
                border: "1px solid var(--color-spring-wood-100)",
              }}
            >
              {service.name}
              <ArrowUpRight
                size={15}
                strokeWidth={2}
                className="text-teal-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          ))}
        </nav>
      </section>

      <ParallaxGallery />
    </>
  );
}
