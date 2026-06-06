import axios from "axios";
import { API_BASE_URL } from "../config/api.js";
import { getToken } from "../services/authService.js";

const axiosSecure = axios.create({
  baseURL: API_BASE_URL,
});

axiosSecure.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useAxiosSecure = () => axiosSecure;

export default useAxiosSecure;
