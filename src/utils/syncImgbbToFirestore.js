import { getImgbbPortfolioSnapshot } from "../data/defaultPortfolio";
import { saveFullPortfolio } from "../services/portfolioService";

export const syncImgbbPortfolioToFirestore = async () => {
  const snapshot = getImgbbPortfolioSnapshot();
  await saveFullPortfolio(snapshot);
  return snapshot;
};
