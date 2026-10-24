import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

const SPOT = 640;

export default function GlobalCursorEffect() {
  const spotRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 90, damping: 24, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 90, damping: 24, mass: 0.6 });
  const cursorX = useTransform(sx, (value) => value + SPOT / 2 - 8);
  const cursorY = useTransform(sy, (value) => value + SPOT / 2 - 8);

  useEffect(() => {
    if (reduceMotion) return;
    const spot = spotRef.current;
    const cursor = cursorRef.current;
    if (!spot || !cursor) return;
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!query.matches) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX - SPOT / 2);
      y.set(event.clientY - SPOT / 2);
      spot.style.opacity = "1";
      cursor.style.opacity = "1";
    };
    const onLeave = () => {
      spot.style.opacity = "0";
      cursor.style.opacity = "0";
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion, x, y]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden="true">
      <motion.div
        ref={spotRef}
        style={{ x: sx, y: sy, width: SPOT, height: SPOT }}
        className="mouse-spotlight absolute left-0 top-0 opacity-0 transition-opacity duration-500"
      />
      <motion.div
        ref={cursorRef}
        style={{ x: cursorX, y: cursorY }}
        className="mouse-cursor absolute left-0 top-0 opacity-0 transition-opacity duration-200"
      />
    </div>
  );
}
