import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Star } from "lucide-react";
import SplitText from "../components/SplitText";
import { reviewProof, trustFacts } from "../data/proof";
import HeroBackground from "./hero/HeroBackground";
import HeroVisuals from "./hero/HeroVisuals";

const HEADLINE = "Websites, apps and AI that help your business grow.";
const HIGHLIGHT = "AI";

/** Load sequence: each block starts ~100ms after the previous (see .hero-in in index.css). */
const at = (ms: number) => ({ animationDelay: `${ms}ms` });

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const textOpacity = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.6]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -40]);
  const [entrance, setEntrance] = useState<"pending" | "first" | "repeat">("pending");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      let seen = false;
      try {
        seen = Boolean(window.sessionStorage.getItem("gidev-orbit-hero-seen"));
        window.sessionStorage.setItem("gidev-orbit-hero-seen", "1");
      } catch {
        seen = true;
      }
      setEntrance(seen ? "repeat" : "first");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const review = reviewProof;
  return (
    <section
      ref={heroRef}
      data-orbit-entrance={reduceMotion ? "reduced" : entrance}
      className="home-orbit-hero relative isolate overflow-hidden bg-brand-light pt-28 pb-20 md:pt-36 md:pb-28"
    >
      <HeroBackground />

      <div className="gidev-stage grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <motion.div className="max-w-3xl" style={{ opacity: textOpacity, y: textY }}>
          <h1 className="mb-6 max-w-3xl text-[2.05rem] font-semibold leading-[1.02] tracking-[-0.055em] text-ink sm:text-6xl lg:text-[clamp(3.75rem,5.6vw,6rem)]">
            <SplitText text={HEADLINE} highlight={HIGHLIGHT} />
          </h1>

          <p className="hero-in max-w-2xl text-lg leading-relaxed text-gray-700 md:text-xl" style={at(550)}>
            Gidev Innovations designs and builds web applications, e-commerce stores, mobile apps and business systems, then helps you grow with SEO, branding, digital marketing and ongoing support. One team, from first idea to long-term care.
          </p>

          <div className="hero-in mt-9 flex flex-col gap-3 sm:flex-row" style={at(650)}>
            <Link viewTransition
              to="/contact"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-ink px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark"
            >
              Book a free 30-minute call
              <span className="relative flex h-5 w-5 items-center justify-center overflow-hidden" aria-hidden="true">
                <ArrowUpRight size={17} className="transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5 motion-reduce:transition-none" />
                <ArrowUpRight size={17} className="absolute -translate-x-5 translate-y-5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 motion-reduce:transition-none" />
              </span>
            </Link>
            <Link viewTransition
              to="/services"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-gray-300 bg-white/60 px-6 py-3 font-semibold text-ink transition-colors duration-200 hover:border-brand-dark hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark"
            >
              Explore our services
            </Link>
          </div>

          <div className="hero-in mt-10 border-t border-ink/10 pt-6" style={at(750)}>
            <ul className="grid gap-x-6 gap-y-3 text-sm text-gray-700 sm:grid-cols-2">
              {trustFacts.map(({ id, label, icon: Icon }) => (
                <li key={id} className="flex items-center gap-2.5">
                  <Icon size={17} className="flex-none text-brand-dark" strokeWidth={1.8} aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
            {review && (
              <p className="mt-5 flex items-center gap-2 text-sm text-gray-700">
                <span className="flex text-brand-dark" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} size={15} fill={i < Math.round(review.rating) ? "currentColor" : "none"} />
                  ))}
                </span>
                <span>
                  <strong className="font-semibold text-ink">{review.rating.toFixed(1)}</strong> from {review.count} reviews on{" "}
                  {review.url ? (
                    <a href={review.url} className="font-semibold underline underline-offset-4" rel="noopener noreferrer">
                      {review.source}
                    </a>
                  ) : (
                    review.source
                  )}
                </span>
              </p>
            )}
          </div>
        </motion.div>

        <HeroVisuals heroRef={heroRef} entrance={entrance} />
      </div>

      <a
        href="#home-services-heading"
        className="hero-in absolute bottom-4 left-1/2 hidden min-h-11 -translate-x-1/2 flex-col items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-gray-600 transition-colors hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark lg:flex"
        style={at(1100)}
      >
        Scroll
        <span className="relative h-7 w-px overflow-hidden bg-ink/15" aria-hidden="true">
          <span className="hero-cue absolute inset-x-0 top-0 h-3 bg-brand-dark" />
        </span>
        <span className="sr-only">to explore services</span>
      </a>
    </section>
  );
}
