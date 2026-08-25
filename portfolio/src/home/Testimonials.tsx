import { motion, useInView } from "framer-motion";
import type { Transition } from "framer-motion";
import { useRef } from "react";
import { Settings } from "lucide-react";

const springEntry: Transition = { type: "spring", stiffness: 50, damping: 16 };

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  image: string | null;
};

// TODO [NEEDS REAL CONTENT]: Layout placeholders only. Replace with real
// quotes, names, roles, and approved headshots before treating as social proof.
// Avatars in /mood/avatars are reserved for this section — not used in the
// homepage carousel or parallax gallery.
const testimonials: Testimonial[] = [
  {
    quote: "Placeholder quote — replace with a real client testimonial.",
    name: "Amina Otieno",
    role: "CEO",
    image: "/mood/avatars/ceo.jpg",
  },
  {
    quote: "Placeholder quote — replace with a real client testimonial.",
    name: "Kwame Asante",
    role: "Product Manager",
    image: "/mood/avatars/pm.jpg",
  },
  {
    quote: "Placeholder quote — replace with a real client testimonial.",
    name: "Wanjiru Kamau",
    role: "Founder",
    image: "/mood/avatars/founder.jpg",
  },
  {
    quote: "Placeholder quote — replace with a real client testimonial.",
    name: "Chinedu Okonkwo",
    role: "CTO",
    image: "/mood/avatars/cto.jpg",
  },
];

// Duplicate for seamless infinite loop
const doubled = [...testimonials, ...testimonials];

export default function Testimonials() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section className="bg-white py-16 overflow-hidden">
      {/* Header */}
      <div ref={headerRef} className="text-center px-8 mb-14">
        <motion.div
          className="flex items-center justify-center gap-2 text-gray-500 mb-3"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ ...springEntry, delay: 0 }}
        >
          <Settings size={13} strokeWidth={1.5} />
          <span style={{ fontSize: "13px" }}>Testimonials</span>
        </motion.div>

        <motion.h2
          className="font-black text-black mx-auto mb-3"
          style={{
            fontSize: "clamp(32px, 5vw, 60px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: "620px",
          }}
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ ...springEntry, delay: 0.1 }}
        >
          Our perspective is one of many. Here's theirs.
        </motion.h2>

        <motion.p
          className="text-gray-500 mx-auto"
          style={{ fontSize: "14px", lineHeight: 1.7, maxWidth: "360px" }}
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ ...springEntry, delay: 0.2 }}
        >
          Placeholder cards — swap in real quotes when clients approve them
        </motion.p>
      </div>

      {/* Infinite carousel */}
      <div
        className="relative mx-auto overflow-hidden"
        style={{ maxWidth: "1000px" }}
      >
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: "80px",
            background: "linear-gradient(to right, white, transparent)",
          }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
          style={{
            width: "80px",
            background: "linear-gradient(to left, white, transparent)",
          }}
        />

        <motion.div
          className="flex gap-4"
          style={{ width: "max-content" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          {doubled.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 rounded-2xl p-8 flex flex-col justify-between"
              style={{
                width: "260px",
                minHeight: "320px",
                backgroundColor: "var(--color-spring-wood-50)",
                border: "1px solid var(--color-spring-wood-100)",
              }}
            >
              <p
                className="text-gray-700 mb-10"
                style={{ fontSize: "15.5px", lineHeight: 1.85 }}
              >
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    className="rounded-full object-cover flex-shrink-0"
                    style={{ width: "44px", height: "44px" }}
                  />
                ) : (
                  <div
                    className="rounded-full flex-shrink-0"
                    style={{
                      width: "44px",
                      height: "44px",
                      backgroundColor: "var(--color-spring-wood-100)",
                    }}
                    aria-hidden="true"
                  />
                )}
                <div>
                  <p
                    className="font-bold text-black"
                    style={{ fontSize: "15px" }}
                  >
                    {t.name}
                  </p>
                  <p className="text-gray-500" style={{ fontSize: "13px" }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
