import type { Config } from "@react-router/dev/config";
import { siteRoutes } from "./src/data/site";
import { blogPosts } from "./src/blog/blogData";
import { projects } from "./src/projects/projects.data";
import { services } from "./src/data/services";

export default {
  // Keeps the existing src/ layout instead of moving everything into app/.
  appDirectory: "src",

  // No runtime server: the site deploys as static files to Cloudflare R2.
  ssr: false,

  // Opt into React Router v8 behavior now so the terminal stops warning on
  // every `npm run dev` / build. This app has no loaders that inspect
  // request.url normalization, so these are safe to enable together.
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
  },

  // Every path here becomes a real HTML file containing rendered content, so
  // crawlers no longer receive an empty <div id="root">. Derived from the same
  // route table that generates the sitemap, so the two cannot drift apart.
  prerender: [
    ...siteRoutes.map((r) => r.path),
    ...services.map((s) => `/services/${s.slug}`),
    ...blogPosts.map((p) => `/blog/${p.slug}`),
    ...projects.map((p) => `/projects/${p.slug}`),
  ],
} satisfies Config;
