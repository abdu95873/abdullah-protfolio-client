import usePortfolio from "../../../hooks/usePortfolio";
import ProjectCard from "./ProjectCard";

export default function ScrollSpySection() {
  const { portfolio } = usePortfolio();
  const data = portfolio.projects.items;
  const sectionMeta = portfolio.projects;

  return (
    <section
      id="projects"
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.08),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />

      <div className="relative mx-auto max-w-7xl">
        <header className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <span className="inline-flex items-center rounded-full border border-blue-200/80 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700">
            {sectionMeta.label}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            {sectionMeta.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            {sectionMeta.description}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
          {data.map((item, index) => (
            <ProjectCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
