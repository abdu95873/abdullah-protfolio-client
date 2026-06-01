import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { isAdminUser } from "../utils/isAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading, logOut } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-dots loading-xl text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: { pathname: "/dashboard" } }} />;
  }

  if (!isAdminUser(user)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Access denied</h1>
        <p className="max-w-md text-slate-600">
          This dashboard is for the site admin only. Sign in with your admin email.
        </p>
        <button
          type="button"
          className="btn bg-blue-600 text-white"
          onClick={() => logOut()}
        >
          Sign out
        </button>
      </div>
    );
  }

  return children;
};

export default AdminRoute;
