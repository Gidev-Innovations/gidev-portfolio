import type { MetaArgs } from "react-router";
import BlogPost from "../blog/Blogpost";
import { blogPosts } from "../blog/blogData";
import { buildMeta } from "../seo/meta";
import { SITE } from "../data/site";

export const meta = ({ params }: MetaArgs) => {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return buildMeta(`/blog/${params.slug}`, {
      title: `Post not found | ${SITE.name}`,
      description: "This article could not be found.",
    });
  }

  const title = post.seoTitle ?? post.title;
  const branded = `${title} | ${SITE.name}`;

  return buildMeta(`/blog/${post.slug}`, {
    title: branded.length <= 60 ? branded : title,
    description: post.excerpt,
    image: post.image,
    type: "article",
  });
};

export default BlogPost;
