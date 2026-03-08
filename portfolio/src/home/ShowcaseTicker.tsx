import { useRef, useEffect } from "react";

const carouselImages = [
  {
    url: "https://picsum.photos/seed/tech1/900/600",
    alt: "Digital product design",
  },
  {
    url: "https://picsum.photos/seed/africa2/900/600",
    alt: "Software development",
  },
  {
    url: "https://picsum.photos/seed/startup3/900/600",
    alt: "Scalable technology",
  },
];

const companies = [
  "Zenvault",
  "Orbitpay",
  "Stacklane",
  "Nuvora",
  "Crestbit",
  "Pulseforge",
  "Luminary",
  "Driftware",
];

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

      {/* Image Carousel — framed, no rounded corners */}
      <section className="bg-white pt-4 px-8">
        <div
          className="mx-auto overflow-hidden"
          style={{ maxWidth: "1100px", height: "480px" }}
        >
          <div
            ref={trackRef}
            className="flex h-full"
            style={{ gap: "16px", width: "max-content" }}
          >
            {[...carouselImages, ...carouselImages].map((img, i) => (
              <div
                key={i}
                className="flex-shrink-0 rounded-2xl overflow-hidden h-full"
                style={{ width: "680px" }}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Ticker */}
      <section className="bg-white py-16 px-8">
        <p
          className="text-center text-gray-400 mb-10"
          style={{ fontSize: "14px" }}
        >
          Join 40+ companies already growing
        </p>

        <div className="mx-auto overflow-hidden" style={{ maxWidth: "1100px" }}>
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
    </>
  );
}
