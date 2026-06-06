import usePortfolio from "../../../hooks/usePortfolio";
import { getExperienceIcon } from "../../../utils/contentIcons";

const Experience = () => {
  const { portfolio } = usePortfolio();
  const { experience } = portfolio;

  return (
    <section id="experience" className="scroll-mt-24 py-12 sm:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-blue-600 font-semibold text-center mb-1 sm:mb-2 text-xs sm:text-sm">
          {experience.label}
        </p>

        <h2 className="text-xl sm:text-3xl font-bold mb-7 sm:mb-12 text-center text-gray-900">
          {experience.title}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
          {experience.items.map((exp) => (
            <div
              key={exp.title}
              className="flex flex-col items-center text-center p-4 sm:p-7 bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="mb-3 scale-90 sm:scale-100">{getExperienceIcon(exp.icon)}</div>
              <h3 className="text-base sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">
                {exp.title}
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
