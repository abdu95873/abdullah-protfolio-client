import AuthProvider from "../../contexts/AuthContext/AuthProvider";
import PortfolioProvider from "../../contexts/PortfolioContext/PortfolioProvider";
import AdminRoute from "../../routes/AdminRoute";
import DashboardLayout from "../../layouts/DashboardLayout";

const DashboardRoot = () => (
  <AuthProvider>
    <AdminRoute>
      <PortfolioProvider>
        <DashboardLayout />
      </PortfolioProvider>
    </AdminRoute>
  </AuthProvider>
);

export default DashboardRoot;
