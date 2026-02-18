import m1 from "./images/custom.jpg"
import m2 from "./images/m2.jpg"
import m3 from "./images/m3.jpg"
import m4 from "./images/m4.jpg"

export type Project = {
    id: number
    title: string
    year: string
    image: string
  }
  
  
  export const projects: Project[] = [
    {
      id: 1,
      title: "Financial App",
      year: "2023",
      image: m3,
    },
    {
      id: 2,
      title: "Agricultural Innovations",
      year: "2022",
      image: m2,
    },
    {
      id: 3,
      title: "Neural Interface",
      year: "2023",
      image: m1,
    },
    {
      id: 4,
      title: "Custom Technology",
      year: "2024",
      image: m4,
    },
  ]