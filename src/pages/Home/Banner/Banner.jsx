import { FaHtml5, FaReact, FaJsSquare, FaBootstrap, FaCss3Alt } from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiExpress, SiNodedotjs } from "react-icons/si";
import BlurText from "./BlurText";

const Banner = () => {
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
      className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 pt-24"
    >
      {/* Top content */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left side - Text */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <BlurText
            text="Web Developer"
            animateBy="words"
            direction="top"
            delay={150}
            className="text-5xl md:text-6xl font-extrabold text-gray-900"
          />
          <p className="text-gray-600 max-w-md mx-auto md:mx-0">
            Hi, I'm Abdullah. A passionate Web Developer building fast, responsive, and modern web apps.
          </p>
        </div>

        {/* Right side - Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-lg">
            <img
              src="/src/assets/a87e14e3-2719-43c9-af36-6ed2c9866d22.jfif"
              alt="Abdullah"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Skills section */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mt-16 w-full max-w-5xl">
        {/* Left text */}
        <p className="text-gray-500 text-sm max-w-[130px] leading-relaxed text-center sm:text-left">
          High knowledge on softwares
        </p>

        {/* Vertical divider */}
        <span className="hidden sm:block h-12 w-px bg-gray-200"></span>

        {/* Icons */}
        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <div
                key={i}
                className="w-14 h-14 flex items-center justify-center 
                           bg-white rounded-full shadow-md
                           hover:shadow-lg transition transform hover:scale-110"
                style={{ color: skill.color }}
              >
                <Icon size={26} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Banner;
