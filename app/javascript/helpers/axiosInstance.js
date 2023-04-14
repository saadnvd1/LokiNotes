import axios from "axios";

const token = localStorage.getItem("lnt");

const axiosI = axios.create({
  // TODO_PROD: change when launching obviously
  baseURL: "http://192.168.1.67:3000",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

axiosI.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default axiosI;
