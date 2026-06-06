import { Outlet } from "react-router";
import PortfolioProvider from "../contexts/PortfolioContext/PortfolioProvider";
import Navbar from "../pages/Home/Shared/Navbar/Navbar";
import Footer from "../pages/Home/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-white font-urbanist text-slate-900 antialiased">
        <Navbar />
        <main className="pt-[65px] sm:pt-[72px]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </PortfolioProvider>
  );
};

export default RootLayout;
