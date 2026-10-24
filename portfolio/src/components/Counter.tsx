import { useEffect, useRef } from "react";

/**
 * Counts up to `to` the first time it scrolls into view. The server renders the
 * final number, so the HTML is correct without JS and nothing changes on hydration.
 * Only use it for numbers that already appear in the copy.
 */
export default function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const duration = 1200;
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        el.textContent = String(Math.round(to * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to]);

  return (
    <>
      <span ref={ref} className="inline-block text-left tabular-nums" style={{ minWidth: `${String(to).length}ch` }}>
        {to}
      </span>
      {suffix && <span className="ml-2">{suffix.trim()}</span>}
    </>
  );
}
