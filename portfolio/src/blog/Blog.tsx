import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { blogPosts } from "./blogData";

// This is the "personality" of every animation on this page.
// Think of it like the brakes on a car — it starts moving fast
// then slowly glides to a stop instead of cutting off abruptly.
// These 4 numbers are a "cubic bezier curve" that controls that feeling.
const ease = [0.16, 1, 0.3, 1] as const;

// This controls the header section (the title + subtitle).
// "staggerChildren: 0.45" is the key to the two-car effect —
// it means the subtitle waits 0.45 seconds before it even starts moving.
// So the title launches first, and while it's still gliding to its stop,
// the subtitle begins its journey. Like two cars braking one after the other.
const headerContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.45, // how long to wait before the next element starts animating
      delayChildren: 0.1, // small pause before anything moves at all
    },
  },
};

// The title ("Blog page") is the lead car.
// It travels a larger distance (y: 70 means it starts 70px below where it lands)
// and takes 1.6 seconds to arrive — so it feels weighty and important.
const titleVariant: Variants = {
  hidden: { opacity: 0, y: 70 }, // starts invisible and 70px lower than its final position
  show: {
    opacity: 1, // fades in as it moves up
    y: 0, // lands at its natural position
    transition: { duration: 1.6, ease },
  },
};

// The subtitle is the trailing car.
// It starts its animation 0.45s after the title (set above in staggerChildren).
// It travels slightly less distance and finishes a little sooner,
// so both elements feel related but independent — following each other, not copying.
const subtitleVariant: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease },
  },
};

// This controls the blog card grid below the header.
// We delay it by 0.7s so the header fully settles before the cards start appearing.
// Then each card staggers in 0.13s apart — one after another like a wave.
const gridVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13, // each card waits this long after the previous one starts
      delayChildren: 0.7, // grid waits for the header to finish before starting
    },
  },
};

// Each individual blog card fades up from slightly below.
// Kept subtle (y: 35, 1 second) so the cards feel calm, not dramatic.
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease },
  },
};

export default function Blog() {
  return (
    <div className="min-h-screen bg-white mt-4 md:mt-12">
      {/* ── HEADER ──────────────────────────────────────────────────────────
          motion.header wraps both the title and subtitle so Framer Motion
          can stagger them. The variants bubble down automatically —
          we don't need to re-attach the animation logic to each child,
          just name which variant they use (titleVariant / subtitleVariant).
      ────────────────────────────────────────────────────────────────────── */}
      <motion.header
        className="pt-20 pb-20 text-center px-6"
        variants={headerContainerVariants}
        initial="hidden" // starts in the "hidden" state defined above
        animate="show" // animates toward the "show" state on page load
      >
        <motion.h1
          variants={titleVariant}
          className="text-heading-3 md:text-heading-2 font-OutfitMedium tracking-tight text-gray-950 mb-2"
        >
          Blog page
        </motion.h1>

        <motion.p
          variants={subtitleVariant}
          className="text-gray-500 text-base max-w-md mx-auto leading-relaxed"
        >
          We specialize in crafting customized digital solutions to elevate your
          brand and reach your target audience effectively.
        </motion.p>
      </motion.header>

      {/* ── BLOG CARD GRID ───────────────────────────────────────────────────
          Stage rail so cards feel large on laptop. Two columns from tablet
          up — three-up made thumbnails look like a theme grid.
      ────────────────────────────────────────────────────────────────────── */}
      <main className="gidev-stage pb-28">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          variants={gridVariants}
          initial="hidden"
          animate="show"
        >
          {blogPosts.map((post) => (
            <motion.div key={post.id} variants={cardVariants}>
              {/* Clicking anywhere on the card navigates to the full blog post */}
              <Link to={`/blog/${post.slug}`} className="group block">
                {/* ── CARD IMAGE ──────────────────────────────────────────────
                    - rounded-2xl: large border radius for that clean modern look
                    - aspect-[4/3]: keeps all images the same proportional height
                    - overflow-hidden: ensures the zoom on hover stays inside the rounded corners
                    - whileHover scale: subtle zoom when the user mouses over
                ─────────────────────────────────────────────────────────────── */}
                <div className="overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.04 }} // gentle zoom on hover
                    transition={{ duration: 1.0, ease }}
                  />
                </div>

                {/* Category label + date shown in small caps below the image */}
                <div className="mt-5 flex items-center gap-3 text-xs text-gray-500 tracking-wide">
                  <span className="text-gray-700 font-medium">
                    {post.category}
                  </span>
                  <span>—</span>
                  <span>{post.date}</span>
                </div>

                {/* Post title — darkens slightly on hover via the "group" class on the Link */}
                <h2 className="mt-2 text-[15px] font-bold text-gray-900 leading-snug group-hover:text-black transition-colors duration-300">
                  {post.title}
                </h2>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
