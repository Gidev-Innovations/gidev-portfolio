import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from "lucide-react";
import Eyebrow from "../components/Eyebrow";
import Reveal from "../components/Reveal";
import { approvedTestimonials, type Testimonial } from "../data/testimonials";
import { serviceBySlug } from "../data/services";

const AUTOPLAY_MS = 7000;

function Slide({ item, index, total, onVideoState }: { item: Testimonial; index: number; total: number; onVideoState: (playing: boolean) => void }) {
  const tags = (item.serviceIds ?? []).map((id) => serviceBySlug(id)?.title).filter(Boolean);
  return (
    <figure
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${total}`}
      className="flex w-full shrink-0 snap-center flex-col gap-6 px-1 md:flex-row md:items-center md:gap-10"
    >
      {item.video && (
        <video
          className="aspect-video w-full rounded-2xl bg-ink object-cover md:w-1/2"
          controls
          preload="none"
          playsInline
          poster={item.video.poster}
          onPlay={() => onVideoState(true)}
          onPause={() => onVideoState(false)}
          onEnded={() => onVideoState(false)}
        >
          <source src={item.video.src} />
          <track kind="captions" src={item.video.captions} srcLang="en" label="English" default />
        </video>
      )}
      <div className="flex-1">
        <Quote size={28} className="text-brand" aria-hidden="true" />
        <blockquote className="mt-4 text-xl font-medium leading-snug tracking-[-0.02em] text-ink sm:text-2xl md:text-3xl">
          “{item.quote}”
        </blockquote>
        <figcaption className="mt-6">
          <span className="block font-semibold text-ink">{item.author}</span>
          <span className="block text-sm text-gray-600">
            {item.role}, {item.company}
          </span>
          {tags.length > 0 && <span className="mt-2 block text-xs font-medium text-brand-dark">{tags.join(" · ")}</span>}
        </figcaption>
      </div>
    </figure>
  );
}

export default function Testimonials() {
  const items = approvedTestimonials();
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);
  const count = items.length;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track || count === 0) return;
      const next = (index + count) % count;
      track.scrollTo({ left: next * track.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
    },
    [count, reduceMotion],
  );

  const playing = count > 1 && !reduceMotion && !userPaused && !hovered && !focused && !dragging && !videoPlaying;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      if (!document.hidden) goTo(active + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [playing, active, goTo]);

  if (count === 0) return null;

  const onScroll = () => {
    const track = trackRef.current;
    if (track) setActive(Math.round(track.scrollLeft / track.clientWidth));
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.target instanceof HTMLElement && event.target.closest("video")) return;
    const keys: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: count - 1 };
    if (event.key in keys) {
      event.preventDefault();
      goTo(keys[event.key]);
    }
  };

  // Mouse drag only; touch uses native scrolling with scroll-snap.
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || (event.target as HTMLElement).closest("video")) return;
    drag.current = { x: event.clientX, left: event.currentTarget.scrollLeft };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current) event.currentTarget.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
  };
  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false);
    const track = event.currentTarget;
    goTo(Math.round(track.scrollLeft / track.clientWidth));
  };

  return (
    <section className="bg-white py-20 md:py-28" aria-labelledby="home-testimonials-heading">
      <div className="gidev-stage">
        <Reveal className="mb-10 md:mb-14">
          <Eyebrow>Client words</Eyebrow>
          <h2 id="home-testimonials-heading" className="text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-5xl md:text-6xl">
            What clients say.
          </h2>
        </Reveal>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          className="rounded-3xl border border-gray-200 p-6 sm:p-10"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={onKeyDown}
        >
          <div
            ref={trackRef}
            tabIndex={0}
            aria-live={playing ? "off" : "polite"}
            aria-label="Testimonials. Use the left and right arrow keys to move between them."
            onScroll={onScroll}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className={`flex overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark ${
              dragging ? "cursor-grabbing select-none" : "snap-x snap-mandatory md:cursor-grab"
            }`}
          >
            {items.map((item, index) => (
              <Slide key={item.id} item={item} index={index} total={count} onVideoState={setVideoPlaying} />
            ))}
          </div>

          {count > 1 && (
            <div className="mt-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1">
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Show testimonial ${index + 1}`}
                    aria-current={index === active}
                    onClick={() => goTo(index)}
                    className="flex h-11 w-8 items-center justify-center focus-visible:outline-2 focus-visible:outline-brand-dark"
                  >
                    <span className={`h-1.5 rounded-full transition-all ${index === active ? "w-6 bg-brand-dark" : "w-1.5 bg-gray-300"}`} />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {!reduceMotion && (
                  <button
                    type="button"
                    aria-label={userPaused ? "Resume autoplay" : "Pause autoplay"}
                    onClick={() => setUserPaused((value) => !value)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-ink hover:border-brand-border focus-visible:outline-2 focus-visible:outline-brand-dark"
                  >
                    {userPaused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
                  </button>
                )}
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => goTo(active - 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-ink hover:border-brand-border focus-visible:outline-2 focus-visible:outline-brand-dark"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => goTo(active + 1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-ink hover:border-brand-border focus-visible:outline-2 focus-visible:outline-brand-dark"
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
