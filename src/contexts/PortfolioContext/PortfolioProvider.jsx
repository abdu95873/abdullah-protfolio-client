import { useCallback, useState } from "react";
import { PortfolioContext } from "./PortfolioContext";
import { defaultPortfolio } from "../../data/defaultPortfolio";

/** Portfolio content from src/data/defaultPortfolio.js */
const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState(defaultPortfolio);
  const [saving, setSaving] = useState(false);

  const updateSection = useCallback(async (section, data) => {
    setSaving(true);
    try {
      setPortfolio((prev) => ({ ...prev, [section]: data }));
    } finally {
      setSaving(false);
    }
  }, []);

  return (
    <PortfolioContext
      value={{
        portfolio,
        documentExists: true,
        loading: false,
        error: null,
        saving,
        updateSection,
      }}
    >
      {children}
    </PortfolioContext>
  );
};

export default PortfolioProvider;
