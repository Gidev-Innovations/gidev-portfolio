import { useRef, useEffect, useState, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  MotionValue,
} from "framer-motion";
import { getLenis } from "../lib/lenis";
import { galleryImages } from "../data/imagery";

// ─── TODO [NEEDS REAL CONTENT] ──────────────────────────────────────────────
// Stock photography of East African cities and product-work contexts — not
// Gidev's own shots, and not photos of the team. Replace with screenshots of
// shipped products or real studio photography before launch.
const IMAGES = galleryImages.map((img) => img.src);
const IMAGE_ALTS = new Map(galleryImages.map((img) => [img.src, img.alt]));

const SCROLL_BUDGET = 1800;
const TRAVEL = 900;

// Separate them so calcColHeight is accurate per breakpoint.
const GAP_5 = 20; // gap-5, used on desktop + tablet
const GAP_3 = 12; // gap-3, used on mobile

function calcColHeight(
  imgCount: number,
  cardWidth: number,
  gap: number,
): number {
  const cardHeight = cardWidth * (5 / 3); // aspect-ratio 3/5
  return imgCount * cardHeight + (imgCount - 1) * gap;
}

// ─── ImageCard ───────────────────────────────────────────────────────────────
function ImageCard({ src, index }: { src: string; index: number }) {
  return (
    <div
      className="w-full overflow-hidden rounded-2xl flex-shrink-0"
      style={{ aspectRatio: "3/5" }}
    >
      {/* Lazy throughout: this gallery sits well below the fold, and eagerly
          fetching the first four competed with the render-blocking CSS. */}
      <img
        src={src}
        alt={IMAGE_ALTS.get(src) ?? `Gallery image ${index + 1}`}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

// ─── ParallaxColumn ──────────────────────────────────────────────────────────
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

// ─── useCenterOffsets ────────────────────────────────────────────────────────
function useCenterOffsets() {
  const [offsets, setOffsets] = useState({ desktop: 0, tablet: 0, mobile: 0 });

  useEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;
      const vpH = window.innerHeight;

      const desktopContainerW = Math.min(vw, 1152) - 64;
      const desktopCardW = (desktopContainerW - GAP_5 * 3) / 4;
      const desktopColH = calcColHeight(3, desktopCardW, GAP_5);
      const desktopOffset = (desktopColH - vpH) / 2;

      const tabletContainerW = Math.min(vw, 768) - 48;
      const tabletCardW = (tabletContainerW - GAP_5 * 2) / 3;
      const tabletColH = calcColHeight(4, tabletCardW, GAP_5);
      const tabletOffset = (tabletColH - vpH) / 2;

      const mobileContainerW = vw - 32;
      const mobileCardW = (mobileContainerW - GAP_3) / 2;
      const mobileColH = calcColHeight(6, mobileCardW, GAP_3);
      const mobileOffset = (mobileColH - vpH) / 2;

      setOffsets({
        desktop: desktopOffset,
        tablet: tabletOffset,
        mobile: mobileOffset,
      });
    };

    // Debounced resize
    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(measure, 100);
    };

    measure();
    const t1 = setTimeout(measure, 300);
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t1);
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return offsets;
}

// ─── ParallaxGallery ─────────────────────────────────────────────────────────
export default function ParallaxGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const offsets = useCenterOffsets();

  useEffect(() => {
    const onScroll = ({ scroll }: { scroll: number }) => {
      if (!sectionRef.current) return;
      const sectionTop =
        sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const p = Math.min(Math.max((scroll - sectionTop) / SCROLL_BUDGET, 0), 1);
      progress.set(p);
    };
    const lenis = getLenis();
    lenis?.on("scroll", onScroll);
    return () => lenis?.off("scroll", onScroll);
  }, [progress]);

  const half = TRAVEL / 2;

  const d_odd = useTransform(
    progress,
    [0, 1],
    useMemo(
      () => [-offsets.desktop - half, -offsets.desktop + half],
      [offsets.desktop, half],
    ),
  );
  const d_even = useTransform(
    progress,
    [0, 1],
    useMemo(
      () => [-offsets.desktop + half, -offsets.desktop - half],
      [offsets.desktop, half],
    ),
  );
  const t_down = useTransform(
    progress,
    [0, 1],
    useMemo(
      () => [-offsets.tablet + half, -offsets.tablet - half],
      [offsets.tablet, half],
    ),
  );
  const t_up = useTransform(
    progress,
    [0, 1],
    useMemo(
      () => [-offsets.tablet - half, -offsets.tablet + half],
      [offsets.tablet, half],
    ),
  );
  const m_down = useTransform(
    progress,
    [0, 1],
    useMemo(
      () => [-offsets.mobile + half, -offsets.mobile - half],
      [offsets.mobile, half],
    ),
  );
  const m_up = useTransform(
    progress,
    [0, 1],
    useMemo(
      () => [-offsets.mobile - half, -offsets.mobile + half],
      [offsets.mobile, half],
    ),
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
          {/* Desktop: 4 cols × 3 rows */}
          <div className="hidden lg:grid absolute inset-0 grid-cols-4 gap-5 px-8 max-w-6xl mx-auto left-0 right-0">
            <ParallaxColumn images={dCol1} yMotion={d_odd} />
            <ParallaxColumn images={dCol2} yMotion={d_even} />
            <ParallaxColumn images={dCol3} yMotion={d_odd} />
            <ParallaxColumn images={dCol4} yMotion={d_even} />
          </div>

          {/* Tablet: 3 cols × 4 rows — outer cols down, mid col up */}
          <div className="hidden sm:grid lg:hidden absolute inset-0 grid-cols-3 gap-5 px-6 max-w-3xl mx-auto left-0 right-0">
            <ParallaxColumn images={tCol1} yMotion={t_down} />
            <ParallaxColumn images={tCol2} yMotion={t_up} />
            <ParallaxColumn images={tCol3} yMotion={t_down} />
          </div>

          {/* Mobile: 2 cols × 6 rows — left down, right up */}
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
                "linear-gradient(to top, white 15%, transparent 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
