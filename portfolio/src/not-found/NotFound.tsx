import { motion, animate } from "framer-motion";
import type { Transition, Variants } from "framer-motion";
import { useState, useRef } from "react";
import type { ReactNode } from "react";

const spring: Transition = { type: "spring", stiffness: 300, damping: 20 };
const softSpring: Transition = { type: "spring", stiffness: 200, damping: 18 };

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 18 } as Transition,
  },
};

function BouncyDigit({ children }: { children: ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const handleClick = () => {
    if (isAnimating || !ref.current) return;
    setIsAnimating(true);
    animate(
      ref.current,
      {
        y: [0, -36, 10, -18, 5, 0],
        rotate: [0, -10, 10, -5, 3, 0],
        scale: [1, 1.25, 0.92, 1.12, 0.97, 1],
      },
      { duration: 0.65, ease: "easeInOut" },
    ).then(() => setIsAnimating(false));
  };

  return (
    <motion.span
      ref={ref}
      onClick={handleClick}
      whileHover={{ scale: 1.12, y: -10, transition: spring }}
      whileTap={{ scale: 0.88, transition: spring }}
      className="text-[10rem] sm:text-[14rem] font-bold leading-none text-brand-dark tracking-tighter select-none cursor-pointer inline-block"
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.span>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-light flex flex-col items-center justify-center px-6 pt-24 pb-16 md:pt-40 text-center overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial={false}
        animate="show"
        className="flex flex-col items-center"
      >
        {/* 404 — each digit bounces independently on click */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4 sm:gap-6 -mb-2"
        >
          <BouncyDigit>4</BouncyDigit>
          <BouncyDigit>0</BouncyDigit>
          <BouncyDigit>4</BouncyDigit>
        </motion.div>

        {/* Tap hint */}
        <motion.p
          variants={itemVariants}
          className="text-[10px] uppercase tracking-widest text-brand-dark font-bold mb-7"
        >
          tap the numbers
        </motion.p>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="w-12 h-px bg-brand opacity-40 mb-8"
        />

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl font-bold text-ink tracking-tight mb-3"
        >
          Page not found
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base text-gray-600 max-w-xs leading-relaxed mb-10"
        >
          This page doesn&apos;t exist or has been moved. Head back home, or
          tell us what you were looking for.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="/"
          variants={itemVariants}
          whileHover={{ scale: 1.05, transition: spring }}
          whileTap={{ scale: 0.95, transition: spring }}
          className="inline-flex items-center gap-3 bg-ink text-white text-sm font-medium px-7 py-3.5 rounded-full hover:bg-brand-dark transition-colors"
        >
          Go back home
          <motion.svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            whileHover={{ x: 3, y: -3, transition: softSpring }}
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </motion.svg>
        </motion.a>
        <motion.a
          href="/contact"
          variants={itemVariants}
          className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-ink underline underline-offset-4"
        >
          Contact us
        </motion.a>
      </motion.div>
    </div>
  );
}
