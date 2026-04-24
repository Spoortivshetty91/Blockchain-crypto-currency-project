import Navbar from "../components/Navbar";
import ReceiveCryptoCard from "../components/ReceiveCryptoCard";

export default function ReceiveCrypto() {
  return (
    <>
      <Navbar />
      <div className="dashboard-page">
        <div className="dashboard-hero">
          <p className="hero-badge">RECEIVE CRYPTO</p>
          <h1>Receive Cryptocurrency</h1>
          <p>
            Use your wallet address or QR code to receive crypto from other users.
          </p>
        </div>

        <ReceiveCryptoCard />
      </div>
    </>
  );
}