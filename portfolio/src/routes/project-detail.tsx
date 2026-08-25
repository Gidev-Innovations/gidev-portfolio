import type { MetaArgs } from "react-router";
import ProjectDetails from "../projects/ProjectDetails";
import { projects } from "../projects/projects.data";
import { buildMeta } from "../seo/meta";
import { SITE } from "../data/site";

export const meta = ({ params }: MetaArgs) => {
  const project = projects.find((p) => p.id === Number(params.id));

  if (!project) {
    return buildMeta(`/projects/${params.id}`, {
      title: `Project not found | ${SITE.name}`,
      description: "This project could not be found.",
    });
  }

  return buildMeta(`/projects/${project.id}`, {
    title: `${project.title} | ${SITE.name}`,
    description: project.tagline,
  });
};

export default ProjectDetails;
