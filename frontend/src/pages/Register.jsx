import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    walletAddress: ""   // ✅ FIX: added here
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
      const data = await registerUser(formData);

      alert(data.message || "Registration successful");

      // ✅ Clear form after success
      setFormData({
        name: "",
        email: "",
        password: "",
        walletAddress: ""
      });

      // ✅ Redirect to login page
      navigate("/login");

    } catch (error) {
      console.error("REGISTER ERROR:", error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1>Register</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            required
          />

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

          <input
            type="text"
            name="walletAddress"
            placeholder="Enter wallet address"
            value={formData.walletAddress}
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}