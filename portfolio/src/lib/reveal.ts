/**
 * Progressive-enhancement scroll reveal for elements marked `data-reveal`.
 *
 * Everything is visible until this runs. It hides only elements that are
 * still below the viewport, and reveals them slightly before they scroll in.
 * Elements that a fast scroll skips past (never intersecting) are revealed
 * too, so nothing can be left invisible above the viewport.
 */
let observer: IntersectionObserver | null = null;

function reveal(el: Element) {
  el.classList.add("is-revealed");
  observer?.unobserve(el);
}

export function scanReveals() {
  if (typeof window === "undefined") return;
  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            reveal(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px 20% 0px" },
    );
  }

  const pending = document.querySelectorAll("[data-reveal]:not(.is-revealed)");
  for (const el of pending) {
    if (el.getBoundingClientRect().top < window.innerHeight * 1.1) {
      el.classList.add("is-revealed");
    } else {
      observer.observe(el);
    }
  }

  document.documentElement.classList.add("reveal-ready");
}
