const PRODUCTION_API_URL = "https://abdullah-protfolio-server.vercel.app";

export const getApiBaseUrl = () => {
  const configured = (import.meta.env.VITE_API_URL || "").trim();

  if (configured) {
    return configured.replace(/\/$/, "");
  }

  if (import.meta.env.DEV) {
    return "http://localhost:5000";
  }

  return PRODUCTION_API_URL;
};

export const API_BASE_URL = getApiBaseUrl();
