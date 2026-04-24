import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ ADD THIS
import Navbar from "../components/Navbar";
import { loginUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate(); // ✅ ADD THIS

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      // ✅ STORE TOKEN
      if (data.token) {
        localStorage.setItem("token", data.token);
      } else {
        localStorage.setItem("token", "dummy-token"); // fallback
      }

      // ✅ STORE USER
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      alert("Login successful");

      // ✅ REDIRECT TO DASHBOARD
      navigate("/dashboard");

    } catch (error) {
      console.log("LOGIN ERROR:", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Login</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}