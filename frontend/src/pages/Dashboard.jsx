import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const [receiverWallet, setReceiverWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (storedUser?.walletAddress) {
      fetchUser();
      fetchTransactions();
    }
  }, []);

  const fetchUser = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/users/${storedUser.walletAddress}`
    );
    setUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data));
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/transactions/${storedUser.walletAddress}`
      );

      console.log("HISTORY DATA:", res.data.transactions);
      setTransactions(res.data.transactions || []);
    } catch (error) {
      console.error("History error:", error);
      setTransactions([]);
    }
  };

  const handleSendCrypto = async () => {
    try {
      if (!receiverWallet || !amount) {
        alert("Please enter receiver wallet and amount");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/transactions/send", {
        senderWallet: storedUser.walletAddress,
        receiverWallet,
        amount: Number(amount),
        message,
      });

      alert(res.data.message);

      setReceiverWallet("");
      setAmount("");
      setMessage("");

      await fetchUser();
      await fetchTransactions();
    } catch (error) {
      alert(error.response?.data?.message || "Transaction failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      {/* NAVBAR */}
      <div style={navbar}>
        <h3 style={{ margin: 0 }}>Crypto Transaction System</h3>

        <div>
          <button style={navBtn} onClick={() => (window.location.href = "/")}>
            Home
          </button>

          <button
            style={navBtn}
            onClick={() => (window.location.href = "/dashboard")}
          >
            Dashboard
          </button>

          <button
            style={navBtn}
            onClick={() => (window.location.href = "/receive")}
          >
            Receive
          </button>

        
          <button style={logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div style={pageStyle}>
        <div style={headerStyle}>
          <h2>CRYPTO DASHBOARD</h2>
          <h1>Welcome, {user?.name} 👋</h1>
          <p>Manage your wallet, send cryptocurrency, and track transactions.</p>
        </div>

        <div style={gridStyle}>
          <div style={cardStyle}>
            <p>Current Balance</p>
            <h1>{user?.balance ?? 0} ETH 💰</h1>
            <p>Your available wallet balance is shown here.</p>
          </div>

          <div style={cardStyle}>
            <h2>Send Cryptocurrency</h2>

            <input
              style={inputStyle}
              placeholder="Enter receiver wallet"
              value={receiverWallet}
              onChange={(e) => setReceiverWallet(e.target.value)}
            />

            <input
              style={inputStyle}
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <input
              style={inputStyle}
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button style={buttonStyle} onClick={handleSendCrypto}>
              Send Crypto
            </button>
          </div>
        </div>

        <div style={{ ...cardStyle, marginTop: "25px" }}>
          <h2>Transaction History</h2>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Wallet</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>

            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td style={tdStyle} colSpan="4">
                    No transactions found
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => {
                  const isSender = tx.senderWallet === storedUser.walletAddress;

                  return (
                    <tr key={tx._id}>
                      <td style={tdStyle}>
                        {isSender ? tx.receiverWallet : tx.senderWallet}
                      </td>

                      <td style={tdStyle}>{tx.amount} ETH</td>

                      <td
                        style={{
                          ...tdStyle,
                          color: isSender ? "red" : "green",
                          fontWeight: "bold",
                        }}
                      >
                        {isSender ? "Sent" : "Received"}
                      </td>

                      <td style={tdStyle}>
                        <span style={statusStyle}>{tx.status}</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const navbar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 25px",
  background: "#0f172a",
  color: "white",
};

const navBtn = {
  margin: "0 6px",
  padding: "7px 12px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const logoutBtn = {
  marginLeft: "10px",
  padding: "7px 12px",
  background: "#ef4444",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const pageStyle = {
  padding: "20px",
  background: "#eef3ff",
  minHeight: "100vh",
};

const headerStyle = {
  background: "#2f3b52",
  color: "white",
  padding: "30px",
  borderRadius: "12px",
  marginBottom: "25px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "25px",
};

const cardStyle = {
  background: "white",
  padding: "30px",
  borderRadius: "14px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "13px",
  marginTop: "15px",
  border: "none",
  borderRadius: "8px",
  color: "white",
  fontWeight: "bold",
  background: "linear-gradient(90deg, #5b5ff0, #3f8efc)",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  marginTop: "20px",
  borderCollapse: "collapse",
};

const thStyle = {
  textAlign: "left",
  padding: "12px",
  background: "#f5f7fb",
};

const tdStyle = {
  padding: "12px",
  borderTop: "1px solid #eee",
};

const statusStyle = {
  background: "#d6f5df",
  color: "green",
  padding: "5px 12px",
  borderRadius: "15px",
  fontWeight: "bold",
};