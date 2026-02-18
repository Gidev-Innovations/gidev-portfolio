import { useParams } from "react-router-dom"

function ProjectDetails() {
  const { id } = useParams()

  return (
    <div style={{ padding: "80px 40px" }}>
      <h1>Project Details Page</h1>
      <p>Project ID: {id}</p>
    </div>
  )
}

export default ProjectDetails