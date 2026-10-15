import type { MetaArgs } from "react-router";
import ProjectDetails from "../projects/ProjectDetails";
import { projectBySlug } from "../projects/projects.data";
import { buildMeta } from "../seo/meta";
import { SITE } from "../data/site";

export const meta = ({ params }: MetaArgs) => {
  const project = projectBySlug(params.slug ?? "");

  if (!project) {
    return [
      ...buildMeta(`/projects/${params.slug}`, {
        title: `Project not found | ${SITE.name}`,
        description: "This project could not be found.",
      }),
      { name: "robots", content: "noindex, follow" },
    ];
  }

  return buildMeta(`/projects/${project.slug}`, {
    title: `${project.title} — ${project.sector} | ${SITE.name}`,
    description: project.summary,
    type: "article",
  });
};

export default ProjectDetails;
