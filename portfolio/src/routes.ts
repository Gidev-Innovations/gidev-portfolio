import { type RouteConfig, index, route } from "@react-router/dev/routes";

/**
 * Route modules are thin wrappers in src/routes/ that add a `meta` export and
 * render the existing page component unchanged. Keeping the page components
 * untouched means this migration didn't alter any layout or styling.
 */
export default [
  index("routes/home.tsx"),
  route("services", "routes/services.tsx"),
  route("services/:slug", "routes/service-detail.tsx"),
  route("projects", "routes/projects.tsx"),
  route("projects/:slug", "routes/project-detail.tsx"),
  route("about", "routes/about.tsx"),
  route("contact", "routes/contact.tsx"),
  route("blog", "routes/blog.tsx"),
  route("blog/:slug", "routes/blog-post.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
