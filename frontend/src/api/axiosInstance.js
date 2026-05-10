import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL && import.meta.env.PROD) {
  console.warn("VITE_API_URL is not set. Frontend API requests may fail in production.");
}

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
