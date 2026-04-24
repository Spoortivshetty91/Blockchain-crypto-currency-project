import api from "./api";

export const getWalletBalance = async () => {
  const response = await api.get("/users/balance");
  return response.data;
};

export const sendTransaction = async (transactionData) => {
  const response = await api.post("/transactions/send", transactionData);
  return response.data;
};

export const getTransactionHistory = async () => {
  const response = await api.get("/transactions");
  return response.data;
};