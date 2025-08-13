// src/api/scriptApi.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const saveScript = (data) =>
  axios.post(`${API_URL}/scripts/save`, data, { withCredentials: true });

export const getScripts = () =>
  axios.get(`${API_URL}/scripts/my-scripts`, { withCredentials: true });
