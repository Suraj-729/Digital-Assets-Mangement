import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/", // Change this to your backend API URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;