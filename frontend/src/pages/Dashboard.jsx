import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import WalletCard from "../components/WalletCard";
import SendCryptoForm from "../components/SendCryptoForm";
import TransactionHistory from "../components/TransactionHistory";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [refreshHistory, setRefreshHistory] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleTransactionSuccess = () => {
    setRefreshHistory((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-page">
        <div className="dashboard-hero">
          <p className="hero-badge">CRYPTO DASHBOARD</p>
          <h1>Welcome, {user?.name || "User"} 👋</h1>
          <p>
            Manage your wallet, send cryptocurrency, and track your transaction history.
          </p>
        </div>

        <div className="dashboard-grid">
          <WalletCard />
          <SendCryptoForm onTransactionSuccess={handleTransactionSuccess} />
        </div>

        <TransactionHistory refreshTrigger={refreshHistory} />
      </div>
    </>
  );
}