import api from "./api";

// ✅ Get balance (optional)
export const getWalletBalance = async (walletAddress) => {
  const response = await api.get(`/users/${walletAddress}`);
  return response.data;
};

// ✅ Send crypto
export const sendTransaction = async (transactionData) => {
  const response = await api.post("/transactions/send", transactionData);
  return response.data;
};

// ✅ FIXED: Get history using walletAddress
export const getTransactionHistory = async (walletAddress) => {
  const response = await api.get(`/transactions/${walletAddress}`);
  return response.data;
};