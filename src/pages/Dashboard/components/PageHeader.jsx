const PageHeader = ({ title, description }) => (
  <header className="mb-6">
    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
      {title}
    </h1>
    {description && (
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
        {description}
      </p>
    )}
  </header>
);

export default PageHeader;
