import { useCallback, useEffect, useState } from "react";
import { PortfolioContext } from "./PortfolioContext";
import { defaultPortfolio, mergePortfolio } from "../../data/defaultPortfolio";
import { savePortfolioSection, subscribePortfolio } from "../../services/portfolioService";

const CACHE_KEY = "portfolio_content_v1";
const CACHE_TTL_MS = 10 * 60 * 1000;

const readCache = () => {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, savedAt } = JSON.parse(raw);
    if (Date.now() - savedAt > CACHE_TTL_MS) return null;
    return mergePortfolio(data);
  } catch {
    return null;
  }
};

const writeCache = (data) => {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, savedAt: Date.now() })
    );
  } catch {
    /* ignore quota errors */
  }
};

const PortfolioProvider = ({ children }) => {
  const cached = readCache();
  const [portfolio, setPortfolio] = useState(cached ?? defaultPortfolio);
  const [documentExists, setDocumentExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let unsubscribe = () => {};
    let cancelled = false;

    const startSync = () => {
      unsubscribe = subscribePortfolio(
        (data, meta) => {
          if (cancelled) return;
          setPortfolio(data);
          setDocumentExists(meta?.exists ?? false);
          writeCache(data);
          setLoading(false);
          setError(null);
        },
        (err) => {
          if (cancelled) return;
          console.error(err);
          if (!cached) setPortfolio(mergePortfolio({}));
          setLoading(false);
          setError(err.message);
        }
      );
    };

    const schedule =
      typeof requestIdleCallback === "function"
        ? requestIdleCallback(startSync, { timeout: 1500 })
        : setTimeout(startSync, 100);

    return () => {
      cancelled = true;
      unsubscribe();
      if (typeof cancelIdleCallback === "function" && typeof schedule === "number") {
        cancelIdleCallback(schedule);
      } else {
        clearTimeout(schedule);
      }
    };
  }, []);

  const updateSection = useCallback(async (section, data) => {
    setSaving(true);
    try {
      await savePortfolioSection(section, data);
      setPortfolio((prev) => {
        const next = { ...prev, [section]: data };
        writeCache(next);
        return next;
      });
    } catch (err) {
      console.error(`Failed to save section "${section}":`, err);
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  return (
    <PortfolioContext
      value={{ portfolio, documentExists, loading, error, saving, updateSection }}
    >
      {children}
    </PortfolioContext>
  );
};

export default PortfolioProvider;
