import axios from "axios";
import { API_BASE_URL } from "../config/api.js";
import { getToken } from "./authService.js";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getPortfolio = async () => {
  const res = await api.get("/api/portfolio");
  return res.data;
};

export const savePortfolioSection = async (section, data) => {
  const token = getToken();
  if (!token) {
    throw new Error("You must be logged in to save changes.");
  }

  const res = await api.put(`/api/portfolio/${section}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
