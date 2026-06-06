import { Link } from "react-router-dom";
import {
  Sparkles,
  User,
  Layers,
  Briefcase,
  FolderKanban,
  Mail,
  ExternalLink,
  Database,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import usePortfolio from "../../../hooks/usePortfolio";
import PageHeader from "../components/PageHeader";
import FormSection from "../components/FormSection";

const sections = [
  { path: "/dashboard/banner", label: "Hero / Banner", icon: Sparkles, desc: "Photo, headline, intro" },
  { path: "/dashboard/about", label: "About", icon: User, desc: "Bio, image, bullets" },
  { path: "/dashboard/services", label: "Skills & Services", icon: Layers, desc: "Skills & service cards" },
  { path: "/dashboard/experience", label: "Experience", icon: Briefcase, desc: "Experience cards" },
  { path: "/dashboard/projects", label: "Projects", icon: FolderKanban, desc: "Featured work" },
  { path: "/dashboard/contact", label: "Contact", icon: Mail, desc: "Email & social links" },
];

const DashboardHome = () => {
  const { user } = useAuth();
  const { loading, error, documentExists } = usePortfolio();

  return (
    <div className="pb-8">
      <PageHeader
        title="Overview"
        description={`Signed in as ${user?.email}. Edit sections below — changes save to MongoDB via the API.`}
      />

      {loading && (
        <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          Loading portfolio from API...
        </div>
      )}

      {!loading && error && (
        <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Could not reach API: {error}. Showing fallback content until the backend is running.
        </div>
      )}

      {!loading && documentExists && !error && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          <div className="flex items-center gap-2">
            <Database size={18} />
            MongoDB connected — portfolio data loaded from the backend.
          </div>
        </div>
      )}

      <FormSection title="Quick actions" className="mb-6">
        <div className="flex flex-wrap gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm gap-2 border-slate-200 bg-white"
          >
            <ExternalLink size={16} />
            Preview live site
          </a>
        </div>
      </FormSection>

      <p className="mb-3 text-sm font-semibold text-slate-700">Edit sections</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {sections.map(({ path, label, icon: Icon, desc }) => (
          <Link
            key={path}
            to={path}
            className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white">
              <Icon size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">{label}</h2>
              <p className="mt-0.5 text-xs text-slate-500">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
