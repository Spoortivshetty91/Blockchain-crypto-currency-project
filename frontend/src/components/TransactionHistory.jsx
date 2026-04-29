import { useEffect, useState } from "react";
import { getTransactionHistory } from "../services/transactionService";

export default function TransactionHistory({ refreshTrigger }) {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchHistory = async () => {
    try {
      if (!user?.walletAddress) return;

      const res = await getTransactionHistory(user.walletAddress);
      setTransactions(res.transactions || []);
    } catch (err) {
      console.error("Error fetching history", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [refreshTrigger]);

  const filteredTransactions = transactions.filter((tx) => {
    const search = searchTerm.toLowerCase();

    return (
      tx.senderWallet?.toLowerCase().includes(search) ||
      tx.receiverWallet?.toLowerCase().includes(search) ||
      tx.txHash?.toLowerCase().includes(search) ||
      String(tx.amount).includes(search)
    );
  });

  return (
    <div className="history-card">
      <h2>Transaction History</h2>

      <input
        type="text"
        className="search-input"
        placeholder="Search by wallet, txHash, or amount"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="history-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Type</th>
            <th>TxHash</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {filteredTransactions.length === 0 ? (
            <tr>
              <td colSpan="6">No transactions found</td>
            </tr>
          ) : (
            filteredTransactions.map((tx) => {
              const isSender = tx.senderWallet === user?.walletAddress;

              return (
                <tr key={tx._id}>
                  <td>
                    {isSender
                      ? tx.receiverName || tx.receiverWallet
                      : tx.senderName || tx.senderWallet}
                  </td>

                  <td>
                    <strong>{tx.amount} ETH</strong>
                  </td>

                  <td>
                    <span className="status success">
                      {tx.status || "success"}
                    </span>
                  </td>

                  <td>
                    {isSender ? (
                      <span className="type sent">Sent</span>
                    ) : (
                      <span className="type received">Received</span>
                    )}
                  </td>

                  <td title={tx.txHash}>
                    {tx.txHash
                      ? `${tx.txHash.slice(0, 10)}...${tx.txHash.slice(-6)}`
                      : "N/A"}
                  </td>

                  <td>
                    {tx.createdAt
                      ? new Date(tx.createdAt).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}