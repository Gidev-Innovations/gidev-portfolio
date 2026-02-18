import { Routes, Route } from "react-router-dom"
import Projects from "./projects/Projects"
import ProjectDetails from "./projects/ProjectDetails"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Projects />} />
      <Route path="/projects/:id" element={<ProjectDetails />} />
    </Routes>
  )
}

export default App