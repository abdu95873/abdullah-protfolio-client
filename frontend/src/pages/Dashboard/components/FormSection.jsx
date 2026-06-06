const FormSection = ({ title, description, children, className = "" }) => (
  <section className={`rounded-2xl border border-slate-200/80 bg-white shadow-sm ${className}`}>
    {(title || description) && (
      <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
        {title && <h2 className="text-base font-bold text-slate-900">{title}</h2>}
        {description && (
          <p className="mt-0.5 text-sm text-slate-500">{description}</p>
        )}
      </div>
    )}
    <div className="space-y-5 p-5 sm:p-6">{children}</div>
  </section>
);

export default FormSection;
