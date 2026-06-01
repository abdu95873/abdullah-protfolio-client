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
  Loader2,
} from "lucide-react";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import usePortfolio from "../../../hooks/usePortfolio";
import { syncImgbbPortfolioToFirestore } from "../../../utils/syncImgbbToFirestore";
import { getFirestoreErrorMessage } from "../../../utils/firestoreSanitize";
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
  const { documentExists, loading } = usePortfolio();
  const [syncing, setSyncing] = useState(false);

  const handleInitialize = async () => {
    setSyncing(true);
    try {
      await syncImgbbPortfolioToFirestore();
      sessionStorage.removeItem("portfolio_content_v1");
      await Swal.fire({
        icon: "success",
        title: "Database initialized",
        html: "Collection <b>portfolio</b> → document <b>content</b> created.<br/>Refresh Firebase Console Data tab.",
        confirmButtonText: "OK",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Setup failed",
        text: getFirestoreErrorMessage(err),
      });
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="pb-8">
      <PageHeader
        title="Overview"
        description={`Signed in as ${user?.email}. Manage your portfolio content below.`}
      />

      {!loading && !documentExists && (
        <div className="mb-6 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-200 text-amber-800">
              <Database size={24} />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-amber-900">Firestore is empty — first-time setup</h2>
              <p className="mt-1 text-sm text-amber-800/90">
                Your Firebase database is ready but has no data yet. Click below to create{" "}
                <code className="rounded bg-amber-100 px-1">portfolio / content</code> with all
                default content and ImgBB images.
              </p>
              <p className="mt-2 text-xs text-amber-700">
                Before clicking: Firestore → <strong>Rules</strong> → publish admin rules → you must be
                logged in as <strong>abdu95873@gmail.com</strong>.
              </p>
              <button
                type="button"
                disabled={syncing}
                onClick={handleInitialize}
                className="btn mt-4 gap-2 border-none bg-amber-600 text-white hover:bg-amber-700"
              >
                {syncing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Database size={18} />
                    Initialize database
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {documentExists && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          Firestore connected — portfolio data is saved in the cloud.
        </div>
      )}

      <FormSection title="Quick actions" className="mb-6">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={syncing}
            onClick={handleInitialize}
            className="btn btn-sm gap-2 border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
          >
            {syncing ? "Saving..." : "Re-sync all content to Firebase"}
          </button>
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
