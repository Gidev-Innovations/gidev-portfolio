import type { MetaArgs } from "react-router";
import { useParams } from "react-router-dom";
import ServiceDetail from "../services/ServiceDetail";
import { serviceBySlug } from "../data/services";
import { buildMeta } from "../seo/meta";
import { SITE } from "../data/site";
import NotFound from "../not-found/NotFound";

export const meta = ({ params }: MetaArgs) => {
  const service = serviceBySlug(params.slug ?? "");

  if (!service) {
    return [
      ...buildMeta(`/services/${params.slug}`, {
        title: `Service not found | ${SITE.name}`,
        description: "This service page could not be found.",
      }),
      { name: "robots", content: "noindex, follow" },
    ];
  }

  return buildMeta(`/services/${service.slug}`, {
    title: service.metaTitle,
    description: service.metaDescription,
  });
};

export default function ServiceDetailRoute() {
  const { slug } = useParams<{ slug: string }>();
  const service = serviceBySlug(slug ?? "");

  if (!service) return <NotFound />;

  return <ServiceDetail service={service} />;
}
