import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";

function ProjectDetail() {
  const { id } = useParams(); // project id from URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // form state for creating a task
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const loadProject = () => {
    setLoading(true);
    setError("");

    api
      .get(`/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch((err) => {
        console.error("Error loading project:", err);
        setError("Failed to load project. Check backend or project id.");
        setProject(null);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProject();
  }, [id]);

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSaving(true);

    api
      .post("/tasks", {
        title,
        description,
        is_completed: false,
        project_id: Number(id),
      })
      .then(() => {
        setTitle("");
        setDescription("");
        loadProject();
      })
      .catch((err) => console.error("Error creating task:", err))
      .finally(() => setSaving(false));
  };

  const toggleTaskCompletion = (task) => {
    api
      .put(`/tasks/${task.id}`, {
        // Only send the field we want to update; schema supports partial
        is_completed: !task.is_completed,
      })
      .then(() => {
        loadProject();
      })
      .catch((err) => {
        console.error("Error updating task:", err);
      });
  };

  if (loading) return <div className="page">Loading...</div>;
  if (!project) return <div className="page">Project not found.</div>;
  if (error) return <div className="page">{error}</div>;

  return (
    <div className="page">
      <header className="navbar">
        <h1>TaskFlow</h1>
      </header>

      <main className="content">
        <section className="card">
          <Link to="/" className="link-back">
            ← Back to Projects
          </Link>
          <h2>{project.name}</h2>
          <p className="muted">
            {project.description || "No description for this project."}
          </p>
        </section>

        <section className="card">
          <h3>Tasks</h3>
          {project.tasks.length === 0 ? (
            <p>No tasks yet.</p>
          ) : (
            <ul className="list">
              {project.tasks.map((t) => (
                <li key={t.id} className="list-item task-item">
                  <div>
                    <strong>{t.title}</strong>{" "}
                    {t.is_completed ? (
                      <span className="status done">Done</span>
                    ) : (
                      <span className="status pending">Pending</span>
                    )}
                    <div className="muted">
                      {t.description || "No description"}
                    </div>
                  </div>
                  <button
                    className="btn small"
                    onClick={() => toggleTaskCompletion(t)}
                  >
                    {t.is_completed ? "Mark Incomplete" : "Mark Complete"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card">
          <h3>Create New Task</h3>
          <form onSubmit={handleCreateTask} className="form">
            <div className="form-group">
              <label>Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Set up CI pipeline"
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional"
              />
            </div>
            <button type="submit" className="btn primary" disabled={saving}>
              {saving ? "Adding..." : "Add Task"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default ProjectDetail;
