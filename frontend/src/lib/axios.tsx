import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
  headers: {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
});