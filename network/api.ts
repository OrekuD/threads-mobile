import axios from "axios";
import getAccessToken from "../utils/getAccessToken";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  //   withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

export default axiosInstance;
