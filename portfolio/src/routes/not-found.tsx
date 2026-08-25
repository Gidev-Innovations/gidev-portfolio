import NotFound from "../not-found/NotFound";
import { buildMeta } from "../seo/meta";
import { SITE } from "../data/site";

export const meta = () => [
  ...buildMeta("/404", {
    title: `Page not found | ${SITE.name}`,
    description: "The page you were looking for doesn't exist.",
  }),
  { name: "robots", content: "noindex, follow" },
];

export default NotFound;
