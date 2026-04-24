import { useState } from "react";
import { sendTransaction } from "../services/transactionService";

export default function SendCryptoForm({ onTransactionSuccess }) {
  const [formData, setFormData] = useState({
    receiverWallet: "",
    amount: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const downloadReceipt = (receipt) => {
    const content = `
CRYPTO TRANSACTION RECEIPT
----------------------------

Sender Name: ${receipt.senderName}
Sender Wallet: ${receipt.senderWallet}

Receiver Wallet: ${receipt.receiverWallet}

Amount: ${receipt.amount} ETH
Message: ${receipt.message || "No message"}

Transaction Hash: ${receipt.txHash}
Date: ${receipt.date}

Status: Success
----------------------------
Thank you for using Crypto Transaction System
`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "transaction-receipt.txt";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setErrorMessage("User not logged in");
        return;
      }

      const data = await sendTransaction({
        senderWallet: user.walletAddress,
        receiverWallet: formData.receiverWallet,
        amount: Number(formData.amount),
        message: formData.message,
      });

      setSuccessMessage(data.message || "Transaction successful");

      downloadReceipt({
        senderName: user.name,
        senderWallet: user.walletAddress,
        receiverWallet: formData.receiverWallet,
        amount: formData.amount,
        message: formData.message,
        txHash: data.txHash || data.transaction?.txHash || "N/A",
        date: new Date().toLocaleString(),
      });

      setFormData({
        receiverWallet: "",
        amount: "",
        message: "",
      });

      if (onTransactionSuccess) {
        onTransactionSuccess();
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Transaction failed");
    }
  };

  return (
    <div className="premium-card">
      <div className="section-header">
        <h2>Send Cryptocurrency</h2>
        <p>Transfer crypto securely to another wallet.</p>
      </div>

      <form className="premium-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="receiverWallet"
          placeholder="Enter receiver wallet address"
          value={formData.receiverWallet}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Enter amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="message"
          placeholder="Enter message"
          value={formData.message}
          onChange={handleChange}
        />

        <button type="submit" className="primary-btn">
          Send Crypto
        </button>
      </form>

      {successMessage && <div className="alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert-error">{errorMessage}</div>}
    </div>
  );
}