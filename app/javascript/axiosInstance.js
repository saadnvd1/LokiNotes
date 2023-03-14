import axios from "axios";

let token = document.querySelector('meta[name="csrf-token"]').content;

const axiosI = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  headers: { "Content-Type": "application/json", "X-CSRF-Token": token },
  withCredentials: true,
});

export default axiosI;
