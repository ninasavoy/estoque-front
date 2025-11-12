// src/api/client.ts
import axios, { AxiosInstance } from "axios";

const VITE_API_URL = import.meta.env.VITE_API_URL as string || "https://estoque-back-production.up.railway.app";

const api: AxiosInstance = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15_000,
});

// Interceptor to attach token from localStorage (if present)
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore if storage not available
  }
  return config;
}, (error) => Promise.reject(error));

// Optional response interceptor to centralize error shape
api.interceptors.response.use(
  (resp) => resp,
  (error) => {
    // Normalize error
    if (error.response) {
      const data = error.response.data;
      const message = data?.detail || data?.message || error.message;
      return Promise.reject({ status: error.response.status, message, data });
    }
    return Promise.reject({ status: 0, message: error.message });
  }
);

export default api;
