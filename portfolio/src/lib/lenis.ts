import Lenis from "lenis";

/**
 * Lenis was previously instantiated at module scope in main.tsx. That runs on
 * import, which crashes during build-time pre-rendering because Lenis touches
 * `window` in its constructor. Creating it lazily keeps the module safe to
 * import from anywhere, including code that renders on the server.
 *
 * Callers are all inside effects, so they run in the browser and get a real
 * instance; `null` is only ever returned during pre-rendering.
 */
let instance: Lenis | null = null;

export function getLenis(): Lenis | null {
  if (typeof window === "undefined") return null;

  if (!instance) {
    instance = new Lenis();

    const raf = (time: number) => {
      instance?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  return instance;
}
