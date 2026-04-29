import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/Api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/login", form);

      // ✅ Store token + user
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login successful!");
      navigate("/dashboard");

      // 🔄 Force refresh so navbar updates
      window.location.reload();

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <form style={card} onSubmit={handleLogin}>
        <div style={icon}>🔐</div>

        <h2 style={title}>Welcome Back</h2>
        <p style={subtitle}>Login to manage your crypto wallet</p>

        <input
          name="email"
          type="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          style={input}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          style={input}
          required
        />

        <button type="submit" style={button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={bottomText}>
          Don't have an account?{" "}
          <span style={link} onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

/* -------- Styles -------- */

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #eef2ff, #f8fafc)"
};

const card = {
  width: "380px",
  padding: "35px",
  borderRadius: "18px",
  background: "white",
  boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
  textAlign: "center"
};

const icon = {
  fontSize: "42px",
  marginBottom: "10px"
};

const title = {
  margin: "0",
  fontSize: "28px",
  color: "#0f172a"
};

const subtitle = {
  fontSize: "14px",
  color: "#64748b",
  marginBottom: "25px"
};

const input = {
  width: "100%",
  padding: "13px",
  marginBottom: "14px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  outline: "none",
  fontSize: "14px",
  boxSizing: "border-box"
};

const button = {
  width: "100%",
  padding: "13px",
  background: "linear-gradient(to right, #4f46e5, #3b82f6)",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px"
};

const bottomText = {
  marginTop: "18px",
  fontSize: "14px",
  color: "#64748b"
};

const link = {
  color: "#2563eb",
  fontWeight: "bold",
  cursor: "pointer"
};