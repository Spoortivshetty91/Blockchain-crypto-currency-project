import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">Crypto Transaction System</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/register">Register</Link>}
        {token && <Link to="/dashboard">Dashboard</Link>}
        {token && <Link to="/receive">Receive</Link>}
        {token && <button onClick={handleLogout} className="logout-btn">Logout</button>}
      </div>
    </nav>
  );
}