// src/api/authApi.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);
export const getUserProfile = (token) =>
  axios.get(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
