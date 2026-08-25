import m5 from "./images/R-Flex.png";

export type Project = {
  id: number;
  title: string;
  year: string;
  image: string;
  tagline: string;
  overview: string;
  mission: string;
  technologies: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    title: "R-Flex(E-Commerce)",
    year: "2024",
    image: m5,
    tagline: "Where Streetwear Meets Digital Excellence.",
    overview:
      "We developed a modern e-commerce platform for R-Flex — a premium fashion and lifestyle brand specializing in sneakers, belts, caps, and shirts. The platform delivers a bold, high-performance shopping experience aligned with the brand identity.",
    mission:
      "To build a scalable, visually powerful e-commerce system that reflects R-Flex’s ambition to become a global lifestyle brand.",
    technologies: ["React", "TypeScript", "Vite", "CSS"],
  },

  // TODO: Add real Gidev case studies here. Four template-derived entries
  // (Agricultural Innovations, Neural Interface, Custom Technology, Financial
  // App) were removed in the placeholder audit — they described work that
  // could not be verified.
  //
  // Stage 3 will reshape this type into a case-study format (client, problem,
  // what we did, outcome), so new entries added now will need that treatment.
  // Their images remain committed at src/projects/images/ (custom.jpg, m2.jpg,
  // m3.jpg, m4.jpg) and are currently unreferenced — reuse or delete them.
];
