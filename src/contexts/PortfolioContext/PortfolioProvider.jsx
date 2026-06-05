import { useCallback, useState } from "react";
import { PortfolioContext } from "./PortfolioContext";
import { defaultPortfolio } from "../../data/defaultPortfolio";

/** Portfolio content is hardcoded in src/data/defaultPortfolio.js — no Firestore needed. */
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
        isHardcoded: true,
      }}
    >
      {children}
    </PortfolioContext>
  );
};

export default PortfolioProvider;
