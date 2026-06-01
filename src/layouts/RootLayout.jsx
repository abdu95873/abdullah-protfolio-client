import { Outlet } from "react-router";
import PortfolioProvider from "../contexts/PortfolioContext/PortfolioProvider";
import Navbar from "../pages/Home/Shared/Navbar/Navbar";
import Footer from "../pages/Home/Shared/Footer/Footer";

const RootLayout = () => {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-[72px]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </PortfolioProvider>
  );
};

export default RootLayout;
