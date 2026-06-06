import { FaHtml5, FaReact, FaJsSquare, FaBootstrap, FaCss3Alt } from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiExpress, SiNodedotjs } from "react-icons/si";
import BlurText from "./BlurText";
import usePortfolio from "../../../hooks/usePortfolio";

const Banner = () => {
  const { portfolio } = usePortfolio();
  const { banner } = portfolio;

  const skills = [
    { icon: FaHtml5, color: "#E34F26" },
    { icon: FaCss3Alt, color: "#1572B6" },
    { icon: FaJsSquare, color: "#F7DF1E" },
    { icon: FaReact, color: "#61DAFB" },
    { icon: FaBootstrap, color: "#7952B3" },
    { icon: SiTailwindcss, color: "#06B6D4" },
    { icon: SiMongodb, color: "#47A248" },
    { icon: SiExpress, color: "#000000" },
    { icon: SiNodedotjs, color: "#339933" },
  ];

  return (
    <section
      id="home"
      className="min-h-[calc(100vh-64px)] bg-blue-50/40 flex flex-col items-center justify-center px-4 pt-20 pb-8 sm:pt-28 sm:pb-12"
    >
      <div className="w-full max-w-6xl flex flex-col-reverse md:flex-row items-center justify-between gap-6 sm:gap-10 md:gap-14">
        <div className="w-full md:w-1/2 space-y-3 sm:space-y-5 text-center md:text-left">
          <p className="inline-flex max-w-full rounded-full border border-blue-200 bg-white/80 px-3 sm:px-4 py-1 text-[10px] sm:text-sm font-semibold tracking-wide text-blue-700">
            {banner.badge}
          </p>
          <BlurText
            text={banner.headline}
            animateBy="words"
            direction="top"
            delay={150}
            className="justify-center md:justify-start text-2xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900"
          />
          <p className="text-slate-600 max-w-xl mx-auto md:mx-0 text-[13px] sm:text-base leading-relaxed px-2 sm:px-0">
            {banner.intro}
          </p>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-40 h-40 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-xl ring-4 ring-white">
            <div className="overflow-hidden w-full h-full">
              <img
                src={banner.image}
                alt="Profile"
                width={384}
                height={384}
                fetchPriority="high"
                decoding="async"
                className="object-cover object-top w-full h-full transition-transform duration-500 ease-in-out scale-125 sm:scale-140"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mt-16 w-full max-w-6xl rounded-2xl border border-blue-100 bg-white/80 p-3.5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <p className="text-slate-500 text-xs sm:text-sm max-w-[160px] leading-relaxed text-center sm:text-left">
            {banner.skillsNote}
          </p>
          <span className="hidden sm:block h-12 w-px bg-gray-200" />
          <div className="grid grid-cols-4 sm:flex sm:flex-wrap justify-center sm:justify-start items-center gap-2.5 sm:gap-4">
            {skills.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <div
                  key={i}
                  className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center bg-white rounded-full shadow-md hover:shadow-lg transition transform hover:scale-110"
                  style={{ color: skill.color }}
                >
                  <Icon size={18} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
