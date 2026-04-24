import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="home-container">
        
        {/* HERO SECTION */}
        <div className="home-hero">
          <h1>🚀 Crypto Transaction System</h1>
          <p>
            Send and receive cryptocurrency securely using blockchain technology.
          </p>

          <div className="hero-buttons">
            <button onClick={() => navigate("/register")} className="primary-btn">
              Get Started
            </button>

            <button onClick={() => navigate("/login")} className="secondary-btn">
              Login
            </button>
          </div>
        </div>

        {/* FEATURES SECTION */}
        <div className="features-section">
          <h2>✨ Features</h2>

          <div className="features-grid">
            <div className="feature-card">
              <h3>🔐 Secure Transactions</h3>
              <p>Transactions are verified using blockchain technology.</p>
            </div>

            <div className="feature-card">
              <h3>💸 Send & Receive</h3>
              <p>Transfer cryptocurrency between users easily.</p>
            </div>

            <div className="feature-card">
              <h3>📊 Transaction History</h3>
              <p>Track all your transactions with status and details.</p>
            </div>

            <div className="feature-card">
              <h3>📱 QR Code Support</h3>
              <p>Receive payments using QR code wallet scanning.</p>
            </div>
          </div>
        </div>

        {/* STATS SECTION */}
        <div className="stats-section">
          <div className="stat-card">
            <h2>100+</h2>
            <p>Transactions</p>
          </div>

          <div className="stat-card">
            <h2>50+</h2>
            <p>Users</p>
          </div>

          <div className="stat-card">
            <h2>100%</h2>
            <p>Secure</p>
          </div>
        </div>

      </div>
    </>
  );
}