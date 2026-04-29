import { QRCodeCanvas } from "qrcode.react";

export default function ReceiveCrypto() {
  const user = JSON.parse(localStorage.getItem("user"));

  const walletAddress =
    user?.walletAddress || "0x4444444444444444444444444444444444444444";

  return (
    <div style={container}>
      <div style={card}>
        <h2>Receive Crypto</h2>
        <p>Your wallet address</p>

        <input value={walletAddress} readOnly style={input} />

        <div style={qrBox}>
          <QRCodeCanvas value={walletAddress} size={180} />
        </div>

        <button
          style={button}
          onClick={() => navigator.clipboard.writeText(walletAddress)}
        >
          Copy Wallet Address
        </button>
      </div>
    </div>
  );
}

const container = {
  minHeight: "90vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f1f5f9"
};

const card = {
  width: "420px",
  background: "white",
  padding: "35px",
  borderRadius: "18px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(0,0,0,0.12)"
};

const input = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  boxSizing: "border-box"
};

const qrBox = {
  marginTop: "25px",
  marginBottom: "25px"
};

const button = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(to right, #4f46e5, #3b82f6)",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold"
};