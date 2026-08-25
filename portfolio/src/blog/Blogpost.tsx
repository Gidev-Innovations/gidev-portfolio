import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { blogPosts } from "./blogData";
import type { BlogContent } from "./blogData";

const ease = [0.16, 1, 0.3, 1] as const;

// ── ANIMATION VARIANTS ────────────────────────────────────────────────────────

const heroContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.05,
    },
  },
};

const heroItemVariant: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease },
  },
};

// Title is the lead car — travels furthest, takes longest
const heroTitleVariant: Variants = {
  hidden: { opacity: 0, y: 52 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.6, ease },
  },
};

// ── SCROLL REVEAL ─────────────────────────────────────────────────────────────
function ScrollReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.1, ease: [0.25, 0.1, 0.0, 1.0] }}
    >
      {children}
    </motion.div>
  );
}

// ── CONTENT RENDERER ─────────────────────────────────────────────────────────

function renderContent(block: BlogContent, idx: number) {
  if (block.type === "paragraph") {
    return (
      <ScrollReveal key={idx}>
        <p className="text-gray-600 leading-[1.95] text-xl">{block.text}</p>
      </ScrollReveal>
    );
  }

  if (block.type === "heading") {
    return (
      <ScrollReveal key={idx}>
        <h2 className="text-gray-950 font-bold text-3xl mt-14 mb-3 tracking-tight">
          {block.text}
        </h2>
      </ScrollReveal>
    );
  }

  if (block.type === "list") {
    const Tag = block.ordered ? "ol" : "ul";
    return (
      <ScrollReveal key={idx}>
        <Tag
          className={`text-xl text-gray-600 leading-[1.95] space-y-4 pl-6 ${
            block.ordered ? "list-decimal" : "list-disc"
          }`}
        >
          {block.items.map((item, j) => {
            const colonIdx = item.indexOf(":");
            const hasBold = colonIdx !== -1;
            return (
              <li key={j}>
                {hasBold ? (
                  <>
                    <span className="font-semibold text-gray-900">
                      {item.slice(0, colonIdx + 1)}
                    </span>
                    {item.slice(colonIdx + 1)}
                  </>
                ) : (
                  item
                )}
              </li>
            );
          })}
        </Tag>
      </ScrollReveal>
    );
  }

  return null;
}

// ── PAGE COMPONENT ────────────────────────────────────────────────────────────

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post) {
      navigate("/blog");
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [post, navigate]);

  if (!post) return null;

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white mt-36">
      {/* ── HERO SECTION ────────────────────────────────────────────────────────
          Stage rail is the source of truth for alignment. Title stays in a
          copy-width max so the image can go wider than the article.
      ────────────────────────────────────────────────────────────────────────── */}

      <motion.div
        className="gidev-stage"
        variants={heroContainerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Category + date */}
        <motion.div
          variants={heroItemVariant}
          className="flex items-center gap-3 text-sm text-gray-500 tracking-widest uppercase mt-8 mb-5"
        >
          <span className="text-gray-800 font-semibold">{post.category}</span>
          <span>—</span>
          <span>{post.date}</span>
        </motion.div>

        {/* Title — lead car, biggest element */}
        <motion.h1
          variants={heroTitleVariant}
          className="text-heading-4 font-semibold text-gray-950 leading-[1.08] tracking-tight max-w-4xl"
        >
          {post.title}
        </motion.h1>

        {/* Hero image — full width of the stage rail */}
        <motion.div
          variants={heroItemVariant}
          className="mt-10 rounded-2xl overflow-hidden bg-gray-100 aspect-[16/9]"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Author sits just below the image, aligned left with it */}
        <motion.p
          variants={heroItemVariant}
          className="mt-4 text-base text-gray-500 tracking-wide"
        >
          By {post.author}
        </motion.p>
      </motion.div>

      {/* ── BODY CONTENT ──────────────────────────────────────────────────────
          Copy rail — narrower than the image intentionally so long reading
          lines stay comfortable.
      ────────────────────────────────────────────────────────────────────────── */}
      <div className="gidev-copy mt-16 space-y-7 pb-24">
        {post.content.map((block, idx) => renderContent(block, idx))}
      </div>

      {/* ── MORE POSTS ────────────────────────────────────────────────────────
          Same stage rail as the hero so related cards match the image width.
      ────────────────────────────────────────────────────────────────────────── */}
      <motion.div
        className="gidev-stage pb-32 pt-12 border-t border-gray-100"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease, delay: 0.1 }}
      >
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-10">
          More posts
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {relatedPosts.map((related, i) => (
            <motion.div
              key={related.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 1.0, ease, delay: i * 0.12 }}
            >
              <Link to={`/blog/${related.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
                  <motion.img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 1.0, ease }}
                  />
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 tracking-wide">
                  <span className="text-gray-700 font-medium">
                    {related.category}
                  </span>
                  <span>—</span>
                  <span>{related.date}</span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-gray-900 leading-snug group-hover:text-black transition-colors duration-300">
                  {related.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
