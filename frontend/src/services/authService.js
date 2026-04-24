import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const loginUser = async (formData) => {
  const response = await axios.post(`${API}/login`, formData);
  return response.data;
};

export const registerUser = async (formData) => {
  const response = await axios.post(`${API}/register`, formData);
  return response.data;
};