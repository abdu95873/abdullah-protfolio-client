import { Save } from "lucide-react";

const SaveBar = ({ saving, onSave, label = "Save changes" }) => (
  <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6 lg:left-[280px]">
    <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
      <p className="hidden text-xs text-slate-500 sm:block">
        Saves to MongoDB via the Express API (admin only).
      </p>
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="btn ml-auto gap-2 border-none bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {saving ? (
          <>
            <span className="loading loading-spinner loading-sm" />
            Saving...
          </>
        ) : (
          <>
            <Save size={18} />
            {label}
          </>
        )}
      </button>
    </div>
  </div>
);

export default SaveBar;
