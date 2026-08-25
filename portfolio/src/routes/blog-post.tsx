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

  return buildMeta(`/blog/${post.slug}`, {
    title: `${post.title} | ${SITE.name}`,
    description: post.excerpt,
  });
};

export default BlogPost;
