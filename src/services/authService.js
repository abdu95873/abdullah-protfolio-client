import axios from "axios";
import { API_BASE_URL } from "../config/api.js";

const TOKEN_KEY = "portfolio_token";
const USER_KEY = "portfolio_user";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getStoredUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const clearAuthStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const saveAuthSession = ({ token, user }) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const registerUser = async ({ name, email, password }) => {
  const res = await api.post("/api/auth/register", { name, email, password });
  return res.data;
};

export const loginUser = async ({ email, password }) => {
  const res = await api.post("/api/auth/login", { email, password });
  return res.data;
};

export const fetchCurrentUser = async () => {
  const token = getToken();
  if (!token) return null;

  const res = await api.get("/api/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.user;
};
