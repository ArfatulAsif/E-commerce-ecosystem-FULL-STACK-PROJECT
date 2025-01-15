import axios from "axios";

export const serverUrl = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: serverUrl,
  // baseURL: "https://7c2f-103-74-84-172.ngrok-free.app",
});

export default axiosInstance;
