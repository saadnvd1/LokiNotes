import axios from "axios";

const token = localStorage.getItem("lnt");

const axiosI = axios.create({
  // TODO_PROD: change when launching obviously
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://app.lokinotes.com"
      : "http://localhost:3000",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

axiosI.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default axiosI;
