import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={container}>
      
      {/* Title Section */}
      <h1 style={title}>Crypto Transaction System 💰</h1>
      <p style={subtitle}>
        Send, receive and track cryptocurrency securely using blockchain.
      </p>

      {/* Buttons */}
      <div style={{ marginTop: "30px" }}>
        <button onClick={() => navigate("/login")} style={btnPrimary}>
          Login
        </button>

        <button onClick={() => navigate("/register")} style={btnSecondary}>
          Register
        </button>
      </div>

      {/* Features Section */}
      <div style={featuresContainer}>
        <div style={card}>
          <h3>🔐 Secure</h3>
          <p>Transactions are stored safely using blockchain technology.</p>
        </div>

        <div style={card}>
          <h3>⚡ Fast</h3>
          <p>Send and receive cryptocurrency instantly.</p>
        </div>

        <div style={card}>
          <h3>📊 Track</h3>
          <p>View complete transaction history anytime.</p>
        </div>
      </div>

    </div>
  );
}

const container = {
  textAlign: "center",
  marginTop: "80px",
  padding: "20px"
};

const title = {
  fontSize: "40px",
  fontWeight: "bold",
  color: "#1e293b"
};

const subtitle = {
  marginTop: "10px",
  fontSize: "18px",
  color: "#64748b"
};

const btnPrimary = {
  margin: "10px",
  padding: "12px 25px",
  background: "linear-gradient(to right, #4f46e5, #3b82f6)",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px"
};

const btnSecondary = {
  margin: "10px",
  padding: "12px 25px",
  background: "#e2e8f0",
  color: "#1e293b",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px"
};

const featuresContainer = {
  display: "flex",
  justifyContent: "center",
  marginTop: "60px",
  gap: "20px",
  flexWrap: "wrap"
};

const card = {
  width: "250px",
  padding: "20px",
  borderRadius: "12px",
  background: "white",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
};