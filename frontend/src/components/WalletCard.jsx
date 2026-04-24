import { useEffect, useState } from "react";
import axios from "axios";

export default function WalletCard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) return;

        const res = await axios.get("http://localhost:5000/api/users");

        const currentUser = res.data.users.find(
          (u) => u.email === storedUser.email
        );

        if (currentUser) {
          setUser(currentUser);
          localStorage.setItem("user", JSON.stringify(currentUser));
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="wallet-card">
      <p>Current Balance</p>
      <h2>{user ? `${user.balance} ETH` : "Loading..."}</h2>
      <p>Your available wallet balance is shown here.</p>
    </div>
  );
}