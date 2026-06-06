import { Link } from "react-router-dom";
import {
  Sparkles,
  User,
  Layers,
  Briefcase,
  FolderKanban,
  Mail,
  ExternalLink,
  FileCode2,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
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

  return (
    <div className="pb-8">
      <PageHeader
        title="Overview"
        description={`Signed in as ${user?.email}. Preview edits in session — publish via src/data/defaultPortfolio.js`}
      />

      <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-200 text-blue-800">
            <FileCode2 size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-900">Content source</h2>
            <p className="mt-1 text-sm text-blue-800/90">
              Edit{" "}
              <code className="rounded bg-blue-100 px-1.5 py-0.5 text-xs">src/data/defaultPortfolio.js</code>{" "}
              to update the live site.
            </p>
          </div>
        </div>
      </div>

      <FormSection title="Quick actions" className="mb-6">
        <a href="/" target="_blank" rel="noreferrer" className="btn btn-sm gap-2 border-slate-200 bg-white">
          <ExternalLink size={16} />
          Preview live site
        </a>
      </FormSection>

      <p className="mb-3 text-sm font-semibold text-slate-700">Edit sections (preview)</p>
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
