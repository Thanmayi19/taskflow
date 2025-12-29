import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    api
      .post("/auth/register", { email, password })
      .then(() => nav("/login"))
      .catch((err) => {
        const msg = err?.response?.data?.detail || "Registration failed";
        setError(typeof msg === "string" ? msg : "Registration failed");
      });
  };

  return (
    <div className="page">
      <header className="navbar">
        <h1>TaskFlow</h1>
      </header>
      <main className="content">
        <section className="card">
          <h2>Register</h2>
          {error && <p style={{ color: "#fca5a5" }}>{error}</p>}
          <form className="form" onSubmit={onSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password (min 8 chars)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn primary" type="submit">
              Create account
            </button>
          </form>
          <p className="muted" style={{ marginTop: 10 }}>
            Already have an account?{" "}
            <Link className="link-back" to="/login">
              Login
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
