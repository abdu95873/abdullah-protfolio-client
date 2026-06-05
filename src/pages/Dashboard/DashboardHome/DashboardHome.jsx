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
        description={`Signed in as ${user?.email}. Portfolio content is hardcoded — no Firebase needed for the live site.`}
      />

      <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-200 text-blue-800">
            <FileCode2 size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-blue-900">Hardcoded content</h2>
            <p className="mt-1 text-sm text-blue-800/90">
              All portfolio data lives in{" "}
              <code className="rounded bg-blue-100 px-1.5 py-0.5 text-xs">
                src/data/defaultPortfolio.js
              </code>
              . Edit that file, push to GitHub, and Vercel will redeploy with the new content.
            </p>
            <p className="mt-2 text-xs text-blue-700">
              Images use URLs from{" "}
              <code className="rounded bg-blue-100 px-1">src/data/imgbb-urls.json</code>.
              No environment variables required for the public site.
            </p>
          </div>
        </div>
      </div>

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

      <p className="mb-3 text-sm font-semibold text-slate-700">Preview sections (session only)</p>
      <p className="mb-4 text-xs text-slate-500">
        Forms below preview changes in this browser session only. To publish, update{" "}
        <code className="rounded bg-slate-100 px-1">defaultPortfolio.js</code>.
      </p>
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
