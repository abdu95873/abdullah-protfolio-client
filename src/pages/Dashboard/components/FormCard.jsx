import { Trash2 } from "lucide-react";

const FormCard = ({
  title,
  subtitle,
  onRemove,
  removeLabel = "Remove",
  dragHandle,
  children,
}) => (
  <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">
    <div className="mb-4 flex items-start gap-3">
      {dragHandle}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">{title}</h3>
            {subtitle && (
              <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
            )}
          </div>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="btn btn-ghost btn-sm shrink-0 text-red-600 hover:bg-red-50"
            >
              <Trash2 size={16} />
              <span className="hidden sm:inline">{removeLabel}</span>
            </button>
          )}
        </div>
      </div>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

export default FormCard;
