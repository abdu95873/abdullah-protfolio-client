import { ArrowUpRight } from "lucide-react";

const getHostname = (url) => {
  if (!url) return "live-preview";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "live-preview";
  }
};

const ProjectCard = ({ item, index }) => {
  const techList =
    item.tech?.split(",").map((t) => t.trim()).filter(Boolean) ?? [];

  const CardWrapper = item.link ? "a" : "div";
  const cardProps = item.link
    ? {
        href: item.link,
        target: "_blank",
        rel: "noopener noreferrer",
        className:
          "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white text-left shadow-[0_2px_8px_rgba(15,23,42,0.04),0_16px_48px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-2 hover:border-blue-300/60 hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
      }
    : {
        className:
          "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04),0_16px_48px_rgba(15,23,42,0.06)]",
      };

  return (
    <CardWrapper {...cardProps}>
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 via-transparent to-indigo-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-[0.04]" />

      <div className="relative z-10 flex items-start justify-between gap-3 px-5 pt-5 sm:px-6 sm:pt-6">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-600">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-700 sm:text-2xl">
            {item.title}
          </h3>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 transition-all duration-300 group-hover:border-blue-200 group-hover:bg-blue-600 group-hover:text-white">
          <ArrowUpRight size={18} className="transition-transform group-hover:rotate-12" />
        </span>
      </div>

      {/* macOS Safari-style window */}
      <div className="relative z-10 mx-4 mt-4 mb-4 sm:mx-5 sm:mb-5">
        <div className="overflow-hidden rounded-[12px] border border-slate-300/80 bg-[#ebebeb] shadow-[0_4px_24px_rgba(15,23,42,0.12),0_0_0_1px_rgba(255,255,255,0.5)_inset]">
          {/* Title bar */}
          <div className="flex h-9 items-center gap-3 border-b border-slate-300/60 bg-gradient-to-b from-[#f6f6f6] to-[#e8e8e8] px-3">
            <div className="flex shrink-0 items-center gap-[7px]" aria-hidden="true">
              <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]" />
              <span className="h-[11px] w-[11px] rounded-full bg-[#28c840] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]" />
            </div>
            <div className="flex min-w-0 flex-1 items-center justify-center">
              <div className="flex w-full max-w-[85%] items-center justify-center rounded-md border border-slate-300/50 bg-white/90 px-3 py-1 shadow-[inset_0_1px_2px_rgba(15,23,42,0.04)]">
                <span className="truncate text-[11px] font-medium text-slate-500">
                  {getHostname(item.link)}
                </span>
              </div>
            </div>
            <div className="w-[52px] shrink-0" aria-hidden="true" />
          </div>

          {/* Viewport — shorter height, width-full fit */}
          <div className="relative aspect-[2/1] w-full overflow-hidden bg-white">
            {item.image ? (
              <img
                src={item.image}
                alt={`${item.title} preview`}
                width={1280}
                height={720}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-top bg-white transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                Preview coming soon
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-auto flex flex-1 flex-col px-5 pb-5 sm:px-6 sm:pb-6">
        <p className="text-sm leading-relaxed text-slate-600 line-clamp-3 sm:line-clamp-4">
          {item.description}
        </p>

        {techList.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {techList.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-blue-100 bg-blue-50/80 px-2.5 py-0.5 text-[11px] font-medium text-blue-800"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        {item.link && (
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition group-hover:gap-2.5">
            Open project
            <ArrowUpRight size={15} />
          </span>
        )}
      </div>
    </CardWrapper>
  );
};

export default ProjectCard;
