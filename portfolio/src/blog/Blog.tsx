import { Link } from "react-router-dom";
import { blogPosts } from "./blogData";
import { coverWebp, readingMinutes } from "./blogMeta";
import Reveal from "../components/Reveal";
import JsonLd from "../seo/JsonLd";
import { breadcrumbSchema } from "../seo/schema";

export default function Blog() {
  return (
    <div className="min-h-screen bg-white mt-4 md:mt-12">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />
      <header className="pt-20 pb-16 text-center px-6">
        <h1 className="text-heading-4 md:text-heading-2 font-medium tracking-tight text-gray-950 mb-4">
          Software &amp; digital business blog
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Practical writing for Kenyan and East African businesses on building
          software: taking M-Pesa payments online, moving beyond Instagram
          selling, building apps for the phones people actually use, and how
          to choose and work with a software studio.
        </p>
        <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed mt-3">
          Written by the team at Gidev Innovations in Nairobi. If a post raises
          a question about your own project,{" "}
          <Link to="/contact" className="text-brand-dark underline underline-offset-4">
            send us a message
          </Link>
          .
        </p>
      </header>

      <section className="gidev-stage pb-28" aria-label="Articles">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
          {blogPosts.map((post, i) => (
            <Reveal as="article" key={post.id} delay={(i % 2) * 100}>
              <Link to={`/blog/${post.slug}`} className="group block">
                <div className="overflow-hidden rounded-2xl aspect-[1200/630] bg-brand-dark">
                  <picture>
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
