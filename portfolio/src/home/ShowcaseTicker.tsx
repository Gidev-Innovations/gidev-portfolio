import { useRef, useEffect } from "react";
import { showcaseImages } from "../data/imagery";

// TODO: Replace with real photography or screenshots of shipped Gidev work.
const carouselImages = showcaseImages;

// TODO: Replace with the names of real Gidev clients who have agreed to be
// listed publicly. The previous entries were invented template brand names.
// Leave this list empty rather than filling it with placeholder names — the
// ticker hides itself when empty so we never imply clients we don't have.
const companies: string[] = [];

export default function ShowcaseTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;

    const animate = () => {
      posRef.current -= 0.5;
      if (Math.abs(posRef.current) >= totalWidth) {
        posRef.current = 0;
      }
      track.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      <style>{`
        @keyframes scroll-logos {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .logo-track {
          display: flex;
          align-items: center;
          gap: 64px;
          width: max-content;
          animation: scroll-logos 20s linear infinite;
        }
        .logo-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Image carousel. overflow-hidden on the section, not just the inner
          frame: wide cards otherwise expand document scrollWidth on
          375px viewports. */}
      <section className="bg-white pt-4 overflow-hidden">
        <div className="gidev-stage overflow-hidden h-52 md:h-[min(62vh,560px)]">
          <div
            ref={trackRef}
            className="flex h-full"
            style={{ gap: "16px", width: "max-content" }}
          >
            {[...carouselImages, ...carouselImages].map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 rounded-2xl overflow-hidden h-full w-[min(680px,calc(100vw-48px))] md:w-[min(72vw,920px)]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  width={920}
                  height={560}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Ticker */}
      {companies.length > 0 && (
        <section className="bg-white py-16 px-8">
          <p
            className="text-center text-gray-500 mb-10"
            style={{ fontSize: "14px" }}
          >
            Teams we've built with
          </p>

          <div className="gidev-stage overflow-hidden">
            <div className="logo-track">
              {[...companies, ...companies].map((name, i) => (
                <span
                  key={i}
                  className="flex-shrink-0 text-gray-300 font-bold tracking-tight select-none"
                  style={{ fontSize: "22px", whiteSpace: "nowrap" }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
