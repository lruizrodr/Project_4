import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    accept: false,
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    accept: "",
  });

  function updateField(field, value) {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.username) {
      setErrors((e) => ({ ...e, username: "Username required" }));
      return;
    }
    if (!form.password) {
      setErrors((e) => ({ ...e, password: "Password required" }));
      return;
    }
    if (!form.accept) {
      setErrors((e) => ({ ...e, accept: "You must accept terms" }));
      return;
    }

    const res = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.username,
        password: form.password,
      }),
    });

    if (res.status === 201) {
      nav("/login");
    } else {
      const data = await res.json();
      setErrors((e) => ({ ...e, username: data.message }));
    }
  }

  return (
    <div>
      <div className="navbar">eCloud Software FAQ & Help Forum</div>

      <div className="page-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => updateField("username", e.target.value)}
            />
          </div>
          {errors.username && <p>{errors.username}</p>}

          <div>
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => updateField("password", e.target.value)}
            />
          </div>
          {errors.password && <p>{errors.password}</p>}

          <div>
            <label>
              <input
                type="checkbox"
                checked={form.accept}
                onChange={(e) => updateField("accept", e.target.checked)}
              />
              Accept terms and conditions
            </label>
          </div>
          {errors.accept && <p>{errors.accept}</p>}

          <button type="submit">Create Account</button>

          <div className="bottom-link">
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
