import React from "react";

export default function WalletCard({ balance }) {
  return (
    <div style={{
      background: "#f5f7fb",
      borderRadius: "15px",
      padding: "20px",
      width: "100%",
      boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
    }}>
      <p style={{ color: "#666" }}>Current Balance</p>

      <h2 style={{ fontSize: "28px", fontWeight: "bold" }}>
        {balance ?? 0} ETH 💰
      </h2>

      <p style={{ color: "#888" }}>
        Your available wallet balance is shown here.
      </p>
    </div>
  );
}