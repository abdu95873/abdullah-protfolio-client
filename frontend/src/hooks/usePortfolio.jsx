import { use } from "react";
import { PortfolioContext } from "../contexts/PortfolioContext/PortfolioContext";

const usePortfolio = () => {
  const context = use(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }
  return context;
};

export default usePortfolio;
