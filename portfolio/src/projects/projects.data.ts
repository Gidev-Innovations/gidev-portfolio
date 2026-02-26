import m1 from "./images/custom.jpg"
import m2 from "./images/m2.jpg"
import m3 from "./images/m3.jpg"
import m4 from "./images/m4.jpg"
import m5 from "./images/R-Flex.png"

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
      tagline: "Redefining Personal Finance for the Digital Generation.",
      overview:
        "We designed and developed a modern financial management application focused on simplifying budgeting, savings tracking, and digital payments. The app delivers a secure, intuitive, and performance-optimized experience for users managing their finances in real time.",
      mission:
        "To empower individuals with smart, secure, and accessible financial tools that promote financial literacy and independence.",
      technologies: ["React", "TypeScript", "Vite", "CSS"]
    },
    {
      id: 2,
      title: "Agricultural Innovations",
      year: "2022",
      image: m2,
      tagline: "Empowering Smart Farming Through Technology.",
      overview:
        "A digital solution built to support modern farmers with data-driven decision-making tools, crop monitoring systems, and resource optimization platforms.",
      mission:
        "To bridge technology and agriculture for increased productivity, sustainability, and economic growth.",
      technologies: ["React", "TypeScript", "Vite", "CSS"]
    },
    {
      id: 3,
      title: "Neural Interface",
      year: "2023",
      image: m1,
      tagline: "Connecting Human Intelligence with Digital Systems.",
      overview:
        "An experimental tech interface focused on bridging human input and machine responsiveness through advanced signal interpretation and adaptive UI systems.",
      mission:
        "To explore the future of human-computer interaction by developing adaptive, intelligent interfaces.",
      technologies: ["React", "TypeScript", "Vite", "CSS"]
    },
    {
      id: 4,
      title: "Custom Technology",
      year: "2024",
      image: m4,
      tagline: "Engineering Tailored Digital Solutions for Unique Challenges.",
      overview:
        "A collection of customized digital tools and systems built to solve unique business-specific problems across industries.",
      mission:
        "To deliver precision-built technological solutions that align perfectly with client operational needs.",
      technologies: ["React", "TypeScript", "Vite", "CSS"]
    },

        {
      id: 5,
      title: "R-Flex(E-Commerce)",
      year: "2024",
      image: m5,
      tagline: "Where Streetwear Meets Digital Excellence.",
      overview:
        "We developed a modern e-commerce platform for R-Flex — a premium fashion and lifestyle brand specializing in sneakers, belts, caps, and shirts. The platform delivers a bold, high-performance shopping experience aligned with the brand identity.",
      mission:
        "To build a scalable, visually powerful e-commerce system that reflects R-Flex’s ambition to become a global lifestyle brand.",
      technologies: ["React", "TypeScript", "Vite", "CSS"]
    },
  ]