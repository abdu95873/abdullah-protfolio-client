import axios from "axios";
import { auth } from "../firebase/firebase.init";
import { mergePortfolio } from "../data/defaultPortfolio";

const API_URL = import.meta.env.VITE_API_URL ?? "";

export const getPortfolio = async () => {
  const res = await axios.get(`${API_URL}/api/portfolio`);
  return mergePortfolio(res.data);
};

export const savePortfolioSection = async (section, data) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("You must be signed in to save changes.");
  }

  const token = await user.getIdToken();
  const res = await axios.put(`${API_URL}/api/portfolio/${section}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};
