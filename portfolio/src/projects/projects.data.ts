import m1 from "./images/custom.jpg"
import m2 from "./images/m2.jpg"
import m3 from "./images/m3.jpg"
import m4 from "./images/m4.jpg"

export type Project = {
    id: number
    title: string
    year: string
    image: string
    description: string
    technologies: string[]
  }
  
  
  export const projects: Project[] = [
    {
      id: 1,
      title: "Financial App",
      year: "2023",
      image: m3,
      description: "A modern responsive portfolio website built with React and TypeScript.",
      technologies: ["React", "TypeScript", "Vite", "CSS"]
    },
    {
      id: 2,
      title: "Agricultural Innovations",
      year: "2022",
      image: m2,
      description: "An online store with cart functionality and payment integration.",
      technologies: ["React", "Redux", "Node.js"]
    },
    {
      id: 3,
      title: "Neural Interface",
      year: "2023",
      image: m1,
      description: "An online store with cart functionality and payment integration.",
      technologies: ["React", "Redux", "Node.js"]
    },
    {
      id: 4,
      title: "Custom Technology",
      year: "2024",
      image: m4,
      description: "An online store with cart functionality and payment integration.",
      technologies: ["React", "Redux", "Node.js"]
    },
  ]