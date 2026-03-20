import axios from "axios";

const api = axios.create({
  baseURL: "http://10.9.144.48:5001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
