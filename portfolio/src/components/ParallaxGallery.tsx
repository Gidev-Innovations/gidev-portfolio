import { useRef, useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  MotionValue,
} from "framer-motion";
import { lenis } from "../main";

const IMAGES = Array.from(
  { length: 12 },
  (_, i) => `https://picsum.photos/seed/${i + 10}/600/800`,
);

const SCROLL_BUDGET = 2800;
const TRAVEL = 900;
const GAP = 16; // gap-4 = 16px

// Returns the natural pixel height of a column given:
// - how many images it holds
// - the width of each card (px)
// - aspect ratio height/width multiplier
function calcColHeight(imgCount: number, cardWidth: number): number {
  const cardHeight = cardWidth * (5 / 3); // aspect ratio 3/5
  return imgCount * cardHeight + (imgCount - 1) * GAP;
}

function ImageCard({ src, index }: { src: string; index: number }) {
  return (
    <div
      className="w-full overflow-hidden rounded-2xl flex-shrink-0"
      style={{ aspectRatio: "3/5" }}
    >
      <img
        src={src}
        alt={`Gallery image ${index + 1}`}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

function ParallaxColumn({
  images,
  yMotion,
}: {
  images: string[];
  yMotion: MotionValue<number>;
}) {
  return (
    <motion.div style={{ y: yMotion }} className="flex flex-col gap-4 w-full">
      {images.map((src, i) => (
        <ImageCard key={src} src={src} index={i} />
      ))}
    </motion.div>
  );
}

// Hook: measures center offset for each breakpoint on mount + resize
function useCenterOffsets() {
  const [offsets, setOffsets] = useState({ desktop: 0, tablet: 0, mobile: 0 });

  useEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;
      const vpH = window.innerHeight;

      // ── Desktop (≥1024px): 4 cols, px=8 on each side, gap-5=20px, max-w-6xl≈1152px
      const desktopContainerW = Math.min(vw, 1152) - 64; // px-8 both sides
      const desktopCardW = (desktopContainerW - 20 * 3) / 4; // gap-5 × 3
      const desktopColH = calcColHeight(3, desktopCardW);
      const desktopOffset = (desktopColH - vpH) / 2;

      // ── Tablet (640–1023px): 3 cols, px-6=24 both sides, gap-5=20px, max-w-3xl≈768px
      const tabletContainerW = Math.min(vw, 768) - 48;
      const tabletCardW = (tabletContainerW - 20 * 2) / 3;
      const tabletColH = calcColHeight(4, tabletCardW);
      const tabletOffset = (tabletColH - vpH) / 2;

      // ── Mobile (<640px): 2 cols, px-4=16 both sides, gap-3=12px
      const mobileContainerW = vw - 32;
      const mobileCardW = (mobileContainerW - 12) / 2;
      const mobileColH = calcColHeight(6, mobileCardW);
      const mobileOffset = (mobileColH - vpH) / 2;

      setOffsets({
        desktop: desktopOffset,
        tablet: tabletOffset,
        mobile: mobileOffset,
      });
    };

    measure();
    const t1 = setTimeout(measure, 300);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t1);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return offsets;
}

export default function ParallaxGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const offsets = useCenterOffsets();

  useEffect(() => {
    const onScroll = ({ scroll }: { scroll: number }) => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.offsetTop;
      const p = Math.min(Math.max((scroll - sectionTop) / SCROLL_BUDGET, 0), 1);
      progress.set(p);
    };
    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [progress]);

  const half = TRAVEL / 2;

  // ── Desktop motion values (4 cols: odd=up, even=down) ──
  const d_odd: MotionValue<number> = useTransform(
    progress,
    [0, 1],
    [-offsets.desktop - half, -offsets.desktop + half],
  );
  const d_even: MotionValue<number> = useTransform(
    progress,
    [0, 1],
    [-offsets.desktop + half, -offsets.desktop - half],
  );

  // ── Tablet motion values (3 cols: col1=down, col2=up, col3=down) ──
  const t_down: MotionValue<number> = useTransform(
    progress,
    [0, 1],
    [-offsets.tablet + half, -offsets.tablet - half],
  );
  const t_up: MotionValue<number> = useTransform(
    progress,
    [0, 1],
    [-offsets.tablet - half, -offsets.tablet + half],
  );

  // ── Mobile motion values (2 cols: col1=down, col2=up) ──
  const m_down: MotionValue<number> = useTransform(
    progress,
    [0, 1],
    [-offsets.mobile + half, -offsets.mobile - half],
  );
  const m_up: MotionValue<number> = useTransform(
    progress,
    [0, 1],
    [-offsets.mobile - half, -offsets.mobile + half],
  );

  const dCol1 = IMAGES.slice(0, 3);
  const dCol2 = IMAGES.slice(3, 6);
  const dCol3 = IMAGES.slice(6, 9);
  const dCol4 = IMAGES.slice(9, 12);

  const tCol1 = IMAGES.slice(0, 4);
  const tCol2 = IMAGES.slice(4, 8);
  const tCol3 = IMAGES.slice(8, 12);

  const mCol1 = IMAGES.slice(0, 6);
  const mCol2 = IMAGES.slice(6, 12);

  return (
    <div
      ref={sectionRef}
      style={{ height: `${SCROLL_BUDGET}px` }}
      className="relative w-full"
    >
      <div
        className="sticky top-0 h-screen bg-white"
        style={{ overflow: "hidden" }}
      >
        <div className="absolute inset-0">
          {/* ── Desktop: 4 cols × 3 rows ── */}
          <div className="hidden lg:grid absolute inset-0 grid-cols-4 gap-5 px-8 max-w-6xl mx-auto left-0 right-0">
            <ParallaxColumn images={dCol1} yMotion={d_odd} />
            <ParallaxColumn images={dCol2} yMotion={d_even} />
            <ParallaxColumn images={dCol3} yMotion={d_odd} />
            <ParallaxColumn images={dCol4} yMotion={d_even} />
          </div>

          {/* ── Tablet: 3 cols × 4 rows (outer down, mid up) ── */}
          <div className="hidden sm:grid lg:hidden absolute inset-0 grid-cols-3 gap-5 px-6 max-w-3xl mx-auto left-0 right-0">
            <ParallaxColumn images={tCol1} yMotion={t_down} />
            <ParallaxColumn images={tCol2} yMotion={t_up} />
            <ParallaxColumn images={tCol3} yMotion={t_down} />
          </div>

          {/* ── Mobile: 2 cols × 6 rows (left down, right up) ── */}
          <div className="grid sm:hidden absolute inset-0 grid-cols-2 gap-3 px-4">
            <ParallaxColumn images={mCol1} yMotion={m_down} />
            <ParallaxColumn images={mCol2} yMotion={m_up} />
          </div>

          {/* Top fade */}
          <div
            className="absolute top-0 inset-x-0 pointer-events-none z-10"
            style={{
              height: "90px",
              background:
                "linear-gradient(to bottom, white 15%, transparent 100%)",
            }}
          />
          {/* Bottom fade */}
          <div
            className="absolute bottom-0 inset-x-0 pointer-events-none z-10"
            style={{
              height: "140px",
              background:
                "linear-gradient(to top, white 20%, transparent 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
