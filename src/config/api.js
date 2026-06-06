export const getApiBaseUrl = () => {
  const configured = (import.meta.env.VITE_API_URL || "").trim();

  if (configured) {
    return configured.replace(/\/$/, "");
  }

  if (import.meta.env.DEV) {
    return "http://localhost:5000";
  }

  return "";
};

export const API_BASE_URL = getApiBaseUrl();
