import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  LogOut,
  LayoutDashboard,
  User,
  Briefcase,
  Layers,
  Mail,
  FolderKanban,
  Menu,
  X,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";

const navItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { path: "/dashboard/banner", icon: Sparkles, label: "Hero / Banner" },
  { path: "/dashboard/about", icon: User, label: "About" },
  { path: "/dashboard/services", icon: Layers, label: "Skills & Services" },
  { path: "/dashboard/experience", icon: Briefcase, label: "Experience" },
  { path: "/dashboard/projects", icon: FolderKanban, label: "Projects" },
  { path: "/dashboard/contact", icon: Mail, label: "Contact" },
];

const pageTitles = {
  "/dashboard": "Overview",
  "/dashboard/banner": "Hero / Banner",
  "/dashboard/about": "About",
  "/dashboard/services": "Skills & Services",
  "/dashboard/experience": "Experience",
  "/dashboard/projects": "Projects",
  "/dashboard/contact": "Contact",
};

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentTitle = pageTitles[location.pathname] || "Dashboard";
  const isOverview = location.pathname === "/dashboard";

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Log out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Log out",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      await logOut();
      navigate("/login");
    }
  };

  const isActive = (path) =>
    path === "/dashboard"
      ? location.pathname === "/dashboard"
      : location.pathname.startsWith(path);

  const displayName = user?.displayName || user?.email?.split("@")[0] || "Admin";

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top bar */}
      <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-slate-200 bg-white">
        <div className="flex h-full items-center justify-between gap-3 px-4 lg:pl-[280px]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <nav className="flex items-center gap-1 text-sm text-slate-500">
              <Link to="/dashboard" className="hover:text-blue-600">
                Admin
              </Link>
              {!isOverview && (
                <>
                  <ChevronRight size={14} className="shrink-0" />
                  <span className="font-medium text-slate-900">{currentTitle}</span>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="btn btn-sm gap-1 border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            >
              <Home size={16} />
              <span className="hidden sm:inline">View site</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="btn btn-sm gap-1 border-none bg-slate-800 text-white hover:bg-slate-900"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 z-40 flex h-[calc(100vh-4rem)] w-[280px] flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-slate-100 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white">
              AP
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-slate-900">Portfolio Admin</p>
              <p className="truncate text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Content
          </p>
          <ul className="space-y-0.5">
            {navItems.map(({ path, icon: Icon, label }) => {
              const active = isActive(path);
              return (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      active
                        ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-slate-100 p-4 text-center text-[11px] text-slate-400">
          Abdullah Portfolio CMS
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 top-16 z-30 bg-slate-900/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <main className="min-h-screen pt-16 lg:pl-[280px]">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
