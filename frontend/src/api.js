import axios from "axios";

// add connection to FastAPI
const api = axios.create({
  baseURL: "http://localhost:8000",
});

export default api;
