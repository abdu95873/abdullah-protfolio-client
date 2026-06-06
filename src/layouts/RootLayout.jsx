import { Outlet } from "react-router";
import usePortfolio from "../hooks/usePortfolio";
import PortfolioProvider from "../contexts/PortfolioContext/PortfolioProvider";
import Navbar from "../pages/Home/Shared/Navbar/Navbar";
import Footer from "../pages/Home/Shared/Footer/Footer";

const RootLayoutContent = () => {
  const { loading, error } = usePortfolio();

  return (
    <div className="min-h-screen bg-white font-urbanist text-slate-900 antialiased">
      <Navbar />
      {loading && (
        <div className="border-b border-blue-100 bg-blue-50 px-4 py-2 text-center text-sm text-blue-800">
          Loading portfolio…
        </div>
      )}
      {!loading && error && (
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-900">
          Using default content — API unavailable. Start the backend on port 5000 to load saved data.
        </div>
      )}
      <main className="pt-[65px] sm:pt-[72px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const RootLayout = () => {
  return (
    <PortfolioProvider>
      <RootLayoutContent />
    </PortfolioProvider>
  );
};

export default RootLayout;
