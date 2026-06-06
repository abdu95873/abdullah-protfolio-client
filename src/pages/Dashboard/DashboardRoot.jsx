import PortfolioProvider from "../../contexts/PortfolioContext/PortfolioProvider";
import AdminRoute from "../../routes/AdminRoute";
import DashboardLayout from "../../layouts/DashboardLayout";

const DashboardRoot = () => (
  <AdminRoute>
    <PortfolioProvider>
      <DashboardLayout />
    </PortfolioProvider>
  </AdminRoute>
);

export default DashboardRoot;
