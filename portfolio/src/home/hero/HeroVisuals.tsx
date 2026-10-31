import { useMemo, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { CSSProperties, RefObject } from "react";
import { imagery, type Photo } from "../../data/imagery";
import { services } from "../../data/services";
import ResponsiveImage from "../../components/ResponsiveImage";
import "./orbit.css";

const buildSlugs = ["web-apps", "ecommerce", "mobile-apps", "business-websites", "ai-services"];
const growSlugs = ["seo", "maintenance", "branding", "digital-marketing"];

const faces: { photo: Photo; caption: string }[] = [
  { photo: imagery.serviceAi, caption: "AI & Automation" },
  { photo: imagery.serviceEcommerce, caption: "E-Commerce" },
  { photo: imagery.serviceMobileApps, caption: "Mobile Apps" },
  { photo: imagery.serviceBranding, caption: "Branding" },
];

type HeroVisualsProps = { heroRef: RefObject<HTMLElement | null>; entrance: "pending" | "first" | "repeat" };

function serviceRing(
  slugs: string[],
  ring: "inner" | "outer",
  activeNode: string | null,
  setActiveNode: (id: string | null) => void,
  touchRevealedNode: string | null,
  setTouchRevealedNode: (id: string | null) => void,
) {
  const bySlug = new Map(services.map((service) => [service.slug, service]));

  return slugs.flatMap((slug, index) => {
    const service = bySlug.get(slug);
    if (!service) return [];
    const Icon = service.icon;
    const isActive = activeNode === service.id;
    return [
      <li
        key={service.id}
        className="orbit-node"
        style={{
          "--node-index": index,
          "--node-count": slugs.length,
          "--node-delay-index": index + (ring === "outer" ? buildSlugs.length : 0),
        } as CSSProperties}
      >
        <a
          href={`/services/${service.slug}`}
          aria-label={service.title}
          className={`orbit-node-face${isActive ? " orbit-node-active" : ""}`}
          onFocus={() => setActiveNode(service.id)}
          onBlur={() => setActiveNode(null)}
          onMouseEnter={() => setActiveNode(service.id)}
          onMouseLeave={() => setActiveNode(null)}
          onClick={(event) => {
            if (window.matchMedia("(hover: none)").matches && touchRevealedNode !== service.id) {
              event.preventDefault();
              setActiveNode(service.id);
              setTouchRevealedNode(service.id);
            }
          }}
        >
          <span className={`orbit-face-counter orbit-face-counter-${ring}`}>
            <span className="orbit-icon"><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
            <span className="orbit-label" aria-hidden="true">{service.title}</span>
          </span>
        </a>
      </li>,
    ];
  });
}

export default function HeroVisuals({ heroRef, entrance }: HeroVisualsProps) {
  const reduceMotion = useReducedMotion();
  const inView = useInView(heroRef, { amount: 0.05 });
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [touchRevealedNode, setTouchRevealedNode] = useState<string | null>(null);
  const [cubePaused, setCubePaused] = useState(false);
  const cubeRotation = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 180]);
  const cubeTilt = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 12]);
  const cubeScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.9]);
  const cubeY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -48]);
  const innerY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -30]);
  const outerY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -42]);
  const innerOffset = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 48]);
  const outerOffset = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -56]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, reduceMotion ? 1 : 0.85, reduceMotion ? 1 : 0]);
  const servicesByRing = useMemo(() => ({
    inner: serviceRing(buildSlugs, "inner", activeNode, setActiveNode, touchRevealedNode, setTouchRevealedNode),
    outer: serviceRing(growSlugs, "outer", activeNode, setActiveNode, touchRevealedNode, setTouchRevealedNode),
  }), [activeNode, touchRevealedNode]);

  const activeMotion = !reduceMotion && inView;
  const ringStyle = {
    animationPlayState: activeMotion ? "running" : "paused",
  } as const;

  return (
    <div
      className={`orbit-visual${reduceMotion ? " orbit-reduced-motion" : ""}${cubePaused ? " orbit-cube-paused" : ""}${activeMotion ? " orbit-active" : " orbit-motion-paused"}`}
      role="group"
      aria-label="Gidev services and projects"
      data-entrance={reduceMotion ? "reduced" : entrance}
    >
      <motion.div className="orbit-layer orbit-outer-layer" style={{ y: outerY, rotateZ: outerOffset }}>
        <div className="orbit-ring-entrance orbit-ring-entrance-outer">
          <div className="orbit-ring orbit-ring-outer" style={ringStyle}>
            <ul className="orbit-nodes orbit-nodes-outer" aria-label="Grow and support services">
              {servicesByRing.outer}
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div className="orbit-layer orbit-inner-layer" style={{ y: innerY, rotateZ: innerOffset }}>
        <div className="orbit-ring-entrance orbit-ring-entrance-inner">
          <div className="orbit-ring orbit-ring-inner" style={ringStyle}>
            <ul className="orbit-nodes orbit-nodes-inner" aria-label="Build services">
              {servicesByRing.inner}
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="orbit-cube-layer"
        style={{ y: cubeY, rotateY: cubeRotation, rotateX: cubeTilt, scale: cubeScale, opacity: visualOpacity }}
      >
        <div
          className="orbit-cube-stage"
          tabIndex={0}
          aria-label="Rotating showcase of Gidev project imagery"
          onMouseEnter={() => setCubePaused(true)}
          onMouseLeave={() => setCubePaused(false)}
          onFocus={() => setCubePaused(true)}
          onBlur={() => setCubePaused(false)}
        >
          <div className="orbit-cube-float">
            <div className="orbit-cuboid-spin">
              <div className="orbit-cuboid">
                {faces.map(({ photo, caption }, index) => (
                  <div key={photo.name} className={`orbit-cuboid-face orbit-cuboid-face-${index + 1}`}>
                    <ResponsiveImage
                      name={photo.name}
                      alt={photo.alt}
                      sizes="(min-width: 1024px) 200px, (min-width: 640px) 160px, 125px"
                      priority={index === 0}
                      className="orbit-face-image"
                    />
                    <span className="orbit-face-caption">{caption}</span>
                  </div>
                ))}
                <div className="orbit-cuboid-top" aria-hidden="true">
                  <span className="orbit-g-mark">g</span>
                </div>
                <div className="orbit-cuboid-bottom" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
        <div className="orbit-floor-shadow" aria-hidden="true" />
      </motion.div>
    </div>
  );
}
