import { Link, Outlet } from "react-router";
import AuthProvider from "../contexts/AuthContext/AuthProvider";
import ProFastLogo from "../pages/Home/Shared/Logo/ProFastLogo";
import imgbb from "../data/imgbb-urls.json";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/">
            <ProFastLogo />
          </Link>
        </div>

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 lg:grid-cols-2 gap-4 px-4 sm:px-6 lg:px-8 pb-8">
          <div className="flex min-h-[calc(100vh-120px)] items-center justify-center rounded-2xl border border-blue-100 bg-white shadow-sm">
            <Outlet />
          </div>

          <div className="hidden lg:flex rounded-2xl bg-gradient-to-br from-blue-100 via-sky-100 to-indigo-100 items-center justify-center overflow-hidden border border-blue-100">
            <img
              src={imgbb["abdullah.png"]}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

export default AuthLayout;
