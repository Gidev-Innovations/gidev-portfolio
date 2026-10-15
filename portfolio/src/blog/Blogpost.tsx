import { useParams, Link } from "react-router-dom";
import { blogPosts } from "./blogData";
import type { BlogContent } from "./blogData";
import { coverWebp, postIsoDate, readingMinutes, serviceForPost } from "./blogMeta";
import JsonLd from "../seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "../seo/schema";
import NotFound from "../not-found/NotFound";

function renderContent(block: BlogContent, idx: number) {
  if (block.type === "paragraph") {
    return (
      <p key={idx} className="text-gray-600 leading-[1.9] text-lg md:text-xl">
        {block.text}
      </p>
    );
  }

  if (block.type === "heading") {
    return (
      <h2 key={idx} className="text-gray-950 font-bold text-2xl md:text-3xl mt-14 mb-3 tracking-tight">
        {block.text}
      </h2>
    );
  }

  if (block.type === "list") {
    const Tag = block.ordered ? "ol" : "ul";
    return (
      <Tag
        key={idx}
        className={`text-lg md:text-xl text-gray-600 leading-[1.9] space-y-4 pl-6 ${
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
    );
  }

  return null;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <NotFound />;

  const service = serviceForPost(post);
  const relatedPosts = [
    ...blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...blogPosts.filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);

  return (
    <article className="min-h-screen bg-white mt-24 md:mt-36">
      <JsonLd
        data={[
          articleSchema({ ...post, isoDate: postIsoDate(post) }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <header className="gidev-stage">
        <nav aria-label="Breadcrumb" className="mt-8 mb-3 text-sm text-gray-500">
          <Link to="/blog" className="inline-flex min-h-11 items-center hover:text-brand-dark transition-colors">
            ← All articles
          </Link>
        </nav>

        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 tracking-widest uppercase mb-5">
          <span className="text-gray-800 font-semibold">{post.category}</span>
          <span aria-hidden="true">—</span>
          <time dateTime={postIsoDate(post)}>{post.date}</time>
          <span aria-hidden="true">·</span>
          <span>{readingMinutes(post)} min read</span>
        </div>

        <h1 className="text-[28px] sm:text-[34px] md:text-heading-4 font-semibold text-gray-950 leading-[1.08] tracking-tight max-w-4xl">
          {post.title}
        </h1>

        <div className="mt-10 rounded-2xl overflow-hidden bg-brand-dark aspect-[1200/630] max-w-5xl">
          <picture>
            <source type="image/webp" srcSet={coverWebp(post)} />
            <img
              src={post.image}
              alt=""
              width={1200}
              height={630}
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </picture>
        </div>

        <p className="mt-4 text-base text-gray-500 tracking-wide">
          By{" "}
          <Link to="/about" className="inline-flex min-h-11 items-center text-gray-800 underline underline-offset-4">
            {post.author}
          </Link>
        </p>
      </header>

      <div className="gidev-copy mt-16 space-y-7 pb-16">
        {post.content.map((block, idx) => renderContent(block, idx))}
      </div>

      <aside className="gidev-copy pb-24 space-y-6">
        {service && (
          <div
            className="rounded-2xl p-6 md:p-8"
            style={{
              backgroundColor: "var(--color-brand-light)",
              border: "1px solid var(--color-brand-border)",
            }}
          >
            <p className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-3">
              Working on this?
            </p>
            <p className="text-gray-800 text-lg leading-relaxed mb-5">
              We build {service.name.toLowerCase()} for businesses in Kenya and
              across East Africa.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to={`/services/${service.slug}`}
                className="inline-flex min-h-11 items-center rounded-full border border-gray-300 px-5 font-semibold text-gray-900 hover:border-brand-dark hover:text-brand-dark transition-colors"
              >
                About our {service.name.toLowerCase()} work
              </Link>
              <Link
                to="/contact"
                className="inline-flex min-h-11 items-center rounded-full bg-gray-900 px-5 font-semibold text-white hover:bg-brand-dark transition-colors"
              >
                Talk to us
              </Link>
            </div>
          </div>
        )}

        <div className="flex items-start gap-4 border-t border-gray-100 pt-6">
          <img
            src="/favicon.svg"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 flex-shrink-0 rounded-full border border-brand-border bg-white"
          />
          <div>
            <p className="font-semibold text-gray-900">{post.author}</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              A software studio in Nairobi building web apps, e-commerce and
              mobile products for African businesses.
            </p>
          </div>
        </div>
      </aside>

      <section className="gidev-stage pb-32 pt-12 border-t border-gray-100">
        <h2 className="text-sm uppercase tracking-widest text-gray-500 mb-10">
          More posts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {relatedPosts.map((related) => (
            <Link key={related.id} to={`/blog/${related.slug}`} className="group block">
              <div className="aspect-[1200/630] overflow-hidden rounded-2xl bg-brand-dark">
                <picture>
                  <source type="image/webp" srcSet={coverWebp(related)} />
                  <img
                    src={related.image}
                    alt=""
                    width={1200}
                    height={630}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </picture>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 tracking-wide">
                <span className="text-gray-700 font-medium">{related.category}</span>
                <span aria-hidden="true">—</span>
                <span>{related.date}</span>
              </div>
              <h3 className="mt-2 text-lg font-bold text-gray-900 leading-snug group-hover:text-brand-dark transition-colors duration-300">
                {related.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
