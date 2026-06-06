import { useCallback, useEffect, useState } from "react";
import { PortfolioContext } from "./PortfolioContext";
import { defaultPortfolio } from "../../data/defaultPortfolio";
import { getPortfolio, savePortfolioSection } from "../../services/portfolioService";

const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState(defaultPortfolio);
  const [documentExists, setDocumentExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await getPortfolio();
        if (cancelled) return;
        setPortfolio(data);
        setDocumentExists(true);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        console.error("Failed to load portfolio:", err);
        setPortfolio(defaultPortfolio);
        setDocumentExists(false);
        setError(err.response?.data?.message || err.message || "Failed to load portfolio");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const updateSection = useCallback(async (section, data) => {
    setSaving(true);
    try {
      await savePortfolioSection(section, data);
      setPortfolio((prev) => ({ ...prev, [section]: data }));
      setDocumentExists(true);
      setError(null);
    } catch (err) {
      console.error(`Failed to save section "${section}":`, err);
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  return (
    <PortfolioContext
      value={{
        portfolio,
        documentExists,
        loading,
        error,
        saving,
        updateSection,
      }}
    >
      {children}
    </PortfolioContext>
  );
};

export default PortfolioProvider;
