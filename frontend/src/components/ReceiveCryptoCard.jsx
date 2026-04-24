import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";

export default function ReceiveCryptoCard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const walletAddress = user?.walletAddress || "No wallet address found";

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.log("Copy failed");
    }
  };

  return (
    <div className="premium-card receive-card">
      <div className="section-header">
        <h2>Receive Cryptocurrency</h2>
        <p>Share this wallet address to receive cryptocurrency.</p>
      </div>

      <div className="receive-content">
        <div className="qr-box">
          <QRCodeCanvas value={walletAddress} size={180} />
        </div>

        <div className="receive-details">
          <label className="receive-label">Wallet Address</label>
          <div className="address-box">
            <span>{walletAddress}</span>
          </div>

          <button className="primary-btn" onClick={handleCopy}>
            {copied ? "Copied!" : "Copy Address"}
          </button>

          <p className="receive-note">
            Ask the sender to use this wallet address while sending crypto.
          </p>
        </div>
      </div>
    </div>
  );
}