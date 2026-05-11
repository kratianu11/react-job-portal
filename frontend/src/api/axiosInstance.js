import axios from "axios";

const fallbackApiUrl = "https://react-job-portal-backend-hvst.onrender.com/api/v1";
const baseURL = (import.meta.env.VITE_API_URL || fallbackApiUrl).replace(/\/$/, "");

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
