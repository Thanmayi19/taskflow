import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { setToken } from "../auth/auth";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");

    const form = new URLSearchParams();
    form.append("username", email); // username field holds email
    form.append("password", password);

    api
      .post("/auth/login", form, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((res) => {
        setToken(res.data.access_token);
        nav("/");
      })
      .catch(() => setError("Invalid email or password"));
  };

  return (
    <div className="page">
      <header className="navbar">
        <h1>TaskFlow</h1>
      </header>
      <main className="content">
        <section className="card">
          <h2>Login</h2>
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
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn primary" type="submit">
              Login
            </button>
          </form>
          <p className="muted" style={{ marginTop: 10 }}>
            New here?{" "}
            <Link className="link-back" to="/register">
              Register
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
