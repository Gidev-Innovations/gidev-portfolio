import type { MetaDescriptor } from "react-router";
import { SITE, absoluteUrl, routeFor } from "../data/site";

/**
 * Builds the full tag set for a page: title, description, canonical, Open
 * Graph, and Twitter Card. Centralised so every route emits a consistent set
 * and a new page can't silently ship missing its social tags.
 *
 * Pass `overrides` for dynamic pages (blog posts, case studies) whose copy
 * isn't in the static route table.
 */
export function buildMeta(
  path: string,
  overrides?: { title?: string; description?: string; image?: string },
): MetaDescriptor[] {
  const record = routeFor(path);

  const title = overrides?.title ?? record?.title ?? SITE.name;
  const description = overrides?.description ?? record?.description ?? "";
  const url = absoluteUrl(path);
  const image = `${SITE.url}${overrides?.image ?? SITE.ogImage}`;

  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },

    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE.name },
    { property: "og:locale", content: SITE.locale },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:image:width", content: SITE.ogImageWidth },
    { property: "og:image:height", content: SITE.ogImageHeight },

    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
}
