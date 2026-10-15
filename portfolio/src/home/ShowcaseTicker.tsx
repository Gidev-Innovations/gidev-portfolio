import { useEffect, useRef } from "react";
import { showcaseImages } from "../data/imagery";
import ResponsiveImage from "../components/ResponsiveImage";

/**
 * Slow image marquee under the hero. The track holds the set twice so the
 * loop is seamless; the second copy is aria-hidden and not focusable.
 * Stops entirely for prefers-reduced-motion and pauses while off screen.
 */
export default function ShowcaseTicker() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let pos = 0;
    let raf = 0;
    let running = false;

    const step = () => {
      pos -= 0.5;
      if (Math.abs(pos) >= track.scrollWidth / 2) pos = 0;
      track.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(step);
      } else if (!entry.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(section);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-white pt-4 overflow-hidden" aria-label="Our work in context">
      <div className="gidev-stage overflow-hidden h-52 md:h-[min(62vh,560px)]">
        <div ref={trackRef} className="flex h-full" style={{ gap: "16px", width: "max-content" }}>
          {[0, 1].map((copy) =>
            showcaseImages.map((img, i) => (
              <div
                key={`${copy}-${img.name}`}
                aria-hidden={copy === 1 ? true : undefined}
                className="flex-shrink-0 rounded-2xl overflow-hidden h-full w-[min(680px,calc(100vw-48px))] md:w-[min(72vw,920px)] bg-brand-light"
              >
                <ResponsiveImage
                  name={img.name}
                  alt={copy === 1 ? "" : img.alt}
                  sizes="(min-width: 768px) min(72vw, 920px), calc(100vw - 48px)"
                  priority={copy === 0 && i === 0}
                  className="w-full h-full object-cover"
                />
              </div>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
