import { useCallback, useEffect, useState } from "react";
import { mergePortfolio } from "../../data/defaultPortfolio";
import {
  getPortfolio,
  savePortfolioSection,
} from "../../services/portfolioService";
import { PortfolioContext } from "./PortfolioContext";

const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState(mergePortfolio({}));
  const [documentExists, setDocumentExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadPortfolio = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getPortfolio();
        if (cancelled) return;

        setPortfolio(mergePortfolio(data));
        setDocumentExists(Boolean(data?.updatedAt));
      } catch (err) {
        if (!cancelled) {
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadPortfolio();

    return () => {
      cancelled = true;
    };
  }, []);

  const updateSection = useCallback(async (section, data) => {
    setSaving(true);
    setError(null);

    try {
      await savePortfolioSection(section, data);
      setPortfolio((prev) => ({ ...prev, [section]: data }));
      setDocumentExists(true);
    } catch (err) {
      setError(err);
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
