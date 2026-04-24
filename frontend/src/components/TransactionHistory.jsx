import { useEffect, useState } from "react";
import { getTransactionHistory } from "../services/transactionService";

export default function TransactionHistory({ refreshTrigger }) {
  const [transactions, setTransactions] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await getTransactionHistory();
      setTransactions(res.transactions || []);
    } catch (err) {
      console.error("Error fetching history", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [refreshTrigger]);

  const user = JSON.parse(localStorage.getItem("user"));

  const userTransactions = transactions.filter(
    (tx) =>
      tx.senderWallet === user?.walletAddress ||
      tx.receiverWallet === user?.walletAddress
  );

  return (
    <div className="history-card">
      <h2>Transaction History</h2>

      <table className="history-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {userTransactions.length === 0 ? (
            <tr>
              <td colSpan="5">No transactions found</td>
            </tr>
          ) : (
            userTransactions.map((tx) => {
              const isSender = tx.senderWallet === user?.walletAddress;

              return (
                <tr key={tx._id}>
                  <td>
                    {isSender
                      ? tx.receiver?.name || tx.receiverWallet
                      : tx.sender?.name || tx.senderWallet}
                  </td>

                  <td>{tx.amount}</td>

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

                  <td>{new Date(tx.createdAt).toLocaleString()}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}