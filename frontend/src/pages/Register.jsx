import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/Api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    walletAddress: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={container}>
      <form style={formBox} onSubmit={handleRegister}>
        <h2 style={{ marginBottom: "20px" }}>Register</h2>

        <input
          name="name"
          placeholder="Enter name"
          value={form.name}
          onChange={handleChange}
          style={input}
          required
        />

        <input
          name="email"
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

        <input
          name="walletAddress"
          placeholder="Enter wallet address"
          value={form.walletAddress}
          onChange={handleChange}
          style={input}
          required
        />

        <button type="submit" style={button}>Register</button>
      </form>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f1f5f9"
};

const formBox = {
  width: "360px",
  padding: "30px",
  borderRadius: "12px",
  background: "white",
  boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
};

const input = {
  width: "100%",
  padding: "11px",
  margin: "10px 0",
  borderRadius: "8px",
  border: "1px solid #ccc",
  boxSizing: "border-box"
};

const button = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(to right, #4f46e5, #3b82f6)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};