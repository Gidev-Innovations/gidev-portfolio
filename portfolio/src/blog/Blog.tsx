import { Link } from "react-router-dom";
import { blogPosts } from "./blogData";
import { coverWebp, readingMinutes } from "./blogMeta";
import Reveal from "../components/Reveal";
import JsonLd from "../seo/JsonLd";
import { breadcrumbSchema } from "../seo/schema";
import PageHero from "../components/PageHero";

export default function Blog() {
  return (
    <div className="min-h-screen bg-white mt-4 md:mt-12">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />
      <PageHero
        eyebrow="Insights"
        title="Practical ideas for growing with technology."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Blog" }]}
        intro={
          <>
            <p>
              Guides and lessons on websites, apps, e-commerce, AI, SEO and
              digital growth, written for business owners.
            </p>
            <p className="mt-3 text-base text-gray-600">
              Written by the team at Gidev Innovations. If a post raises a
              question about your own project,{" "}
              <Link viewTransition to="/contact" className="text-brand-dark underline underline-offset-4">
                send us a message
              </Link>
              .
            </p>
          </>
        }
      />

      <section className="gidev-stage pb-28" aria-label="Articles">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
          {blogPosts.map((post, i) => (
            <Reveal as="article" key={post.id} delay={(i % 2) * 100}>
              <Link viewTransition to={`/blog/${post.slug}`} className="group block">
                <div className="overflow-hidden rounded-2xl aspect-[1200/630] bg-brand-dark">
                  <picture className="block w-full">
                    <source type="image/webp" srcSet={coverWebp(post)} />
                    <img
                      src={post.image}
                      alt=""
                      width={1200}
                      height={630}
                      loading={i < 2 ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </picture>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-gray-500 tracking-wide">
                  <span className="text-gray-700 font-medium">{post.category}</span>
                  <span aria-hidden="true">—</span>
                  <span>{post.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{readingMinutes(post)} min read</span>
                </div>

                <h2 className="mt-2 text-lg font-bold text-gray-900 leading-snug group-hover:text-brand-dark transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="mt-2 text-gray-500 leading-relaxed" style={{ fontSize: "15px" }}>
                  {post.excerpt}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}