// This file handles API calls from the frontend, providing a centralised place to manage communication with the backend.

import axios from "axios";

// add connection to FastAPI
const api = axios.create({
  baseURL: "http://localhost:8000",
});

export default api;
