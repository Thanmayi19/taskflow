import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [apiStatus, setApiStatus] = useState("Checking API...");

  const loadProjects = () => {
    setLoading(true);
    setError("");

    api
      .get("/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error loading projects:", error);
        setError("Failed to load projects. Is the backend running?");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProjects();
    api
      .get("/")
      .then(() => setApiStatus("Backend: Online ✅"))
      .catch(() => setApiStatus("Backend: Offline ❌"));
  }, []);

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    api
      .post("/projects", {
        name,
        description,
      })
      .then(() => {
        setName("");
        setDescription("");
        loadProjects();
      })
      .catch((error) => {
        console.error("Error creating project:", error);
      });
  };

  return (
    <div className="page">
      <header className="navbar">
        <h1>TaskFlow</h1>
      </header>

      <main className="content">
        <p className="muted">{apiStatus}</p>

        <section className="card">
          <h2>Create New Project</h2>
          <form onSubmit={handleCreateProject} className="form">
            <div className="form-group">
              <label>Project Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Backend Refactor"
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional project description"
              />
            </div>
            <button type="submit" className="btn primary">
              Create Project
            </button>
          </form>
        </section>

        <section className="card">
          <h2>Projects</h2>

          {loading ? (
            <p>Loading projects...</p>
          ) : error ? (
            <p style={{ color: "#fca5a5" }}>{error}</p>
          ) : projects.length === 0 ? (
            <p>No projects yet. Create one above.</p>
          ) : (
            <ul className="list">
              {projects.map((p) => (
                <li key={p.id} className="list-item">
                  <div>
                    <Link to={`/projects/${p.id}`} className="project-link">
                      <strong>{p.name}</strong>
                    </Link>
                    <div className="muted">
                      {p.description || "No description"}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default Projects;
