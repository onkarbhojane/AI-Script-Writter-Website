// src/api/scriptApi.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Helper to add Authorization header
const getAuthHeaders = () => {
  const storedUser = localStorage.getItem("user");
  let token = null;
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      token = parsedUser?.token;
    } catch (err) {
      console.error("Error parsing stored user:", err);
    }
  }
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const saveScript = (data) =>
  axios.post(`${API_URL}/scripts/save`, data, {
    withCredentials: true,
    headers: {
      ...getAuthHeaders(),
    },
  });

export const getScripts = () =>
  axios.get(`${API_URL}/scripts/my-scripts`, {
    withCredentials: true,
    headers: {
      ...getAuthHeaders(),
    },
  });
export const generateScriptApi = (prompt) =>
  axios.post(
    `${API_URL}/scripts/generate`,
    { prompt },
    {
      withCredentials: true,
      headers: {
        ...getAuthHeaders(),
      },
    }
  );
