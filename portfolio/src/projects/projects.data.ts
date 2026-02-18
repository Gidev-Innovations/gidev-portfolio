import m1 from "./images/custom.jpg"
import m2 from "./images/m2.jpg"
import m3 from "./images/m3.jpg"
import m4 from "./images/m4.jpg"

export type Project = {
    id: number
    title: string
    year: string
    image: string
    tagline: string
    overview: string
    mission: string
    technologies: string[]
  }
  
  
  export const projects: Project[] = [
    {
      id: 1,
      title: "Financial App",
      year: "2023",
      image: m3,
      tagline: "A modern digital identity built for impact.",
      overview:
        "This project is a fully responsive portfolio website built using React and TypeScript. It focuses on clean UI, performance, and scalability.",
      mission:
        "The mission was to create a fast, elegant, and developer-friendly portfolio that showcases skills and projects professionally.",
      technologies: ["React", "TypeScript", "Vite", "CSS"]
    },
    {
      id: 2,
      title: "Agricultural Innovations",
      year: "2022",
      image: m2,
      tagline: "A modern digital identity built for impact.",
      overview:
        "This project is a fully responsive portfolio website built using React and TypeScript. It focuses on clean UI, performance, and scalability.",
      mission:
        "The mission was to create a fast, elegant, and developer-friendly portfolio that showcases skills and projects professionally.",
      technologies: ["React", "TypeScript", "Vite", "CSS"]
    },
    {
      id: 3,
      title: "Neural Interface",
      year: "2023",
      image: m1,
      tagline: "A modern digital identity built for impact.",
      overview:
        "This project is a fully responsive portfolio website built using React and TypeScript. It focuses on clean UI, performance, and scalability.",
      mission:
        "The mission was to create a fast, elegant, and developer-friendly portfolio that showcases skills and projects professionally.",
      technologies: ["React", "TypeScript", "Vite", "CSS"]
    },
    {
      id: 4,
      title: "Custom Technology",
      year: "2024",
      image: m4,
      tagline: "A modern digital identity built for impact.",
      overview:
        "This project is a fully responsive portfolio website built using React and TypeScript. It focuses on clean UI, performance, and scalability.",
      mission:
        "The mission was to create a fast, elegant, and developer-friendly portfolio that showcases skills and projects professionally.",
      technologies: ["React", "TypeScript", "Vite", "CSS"]
    },
  ]