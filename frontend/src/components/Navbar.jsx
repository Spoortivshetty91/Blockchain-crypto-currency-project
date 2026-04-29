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
        {/* Always visible */}
        <Link to="/">Home</Link>

        {/* Before login */}
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {/* After login */}
        {token && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/receive">Receive</Link>
            

            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}