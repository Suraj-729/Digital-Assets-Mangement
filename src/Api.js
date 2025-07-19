import axios from "axios";




export const baseURL = "http://localhost:5000/";

const api = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;


// const api = axios.create({
//   baseURL: "http://localhost:5000/", // Change this to your backend API URL
//   timeout: 10000,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;