import React from "react";
import {
  CheckCircleIcon,
  PencilIcon,
  CodeBracketIcon,
  WrenchIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const skills = [
  { name: "JavaScript (ES6+)", level: 90 },
  { name: "React JS", level: 92 },
  { name: "Node.js & Express", level: 88 },
  { name: "MongoDB", level: 87 },
  { name: "TypeScript", level: 85 },
  { name: "MERN Stack", level: 93 },
  { name: "HTML, CSS & Tailwind", level: 90 },
];

const features = [
  {
    icon: <CheckCircleIcon className="w-8 h-8 text-blue-600" />,
    title: "Research & Planning",
  },
  {
    icon: <PencilIcon className="w-8 h-8 text-blue-600" />,
    title: "UI / UX Design",
  },
  {
    icon: <CodeBracketIcon className="w-8 h-8 text-blue-600" />,
    title: "MERN Development",
  },
  {
    icon: <WrenchIcon className="w-8 h-8 text-blue-600" />,
    title: "Maintenance & Support",
  },
  {
    icon: <StarIcon className="w-8 h-8 text-blue-600" />,
    title: "Code Quality",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-blue-50/40">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-start">
        {/* Left Side */}
        <div className="px-0 sm:px-2">
          <p className="text-blue-600 font-semibold mb-1 sm:mb-2 text-xs sm:text-sm">SERVICES</p>

          <h2 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-4 leading-snug text-slate-900">
            Full-Cycle MERN Stack <br /> Web Development Services
          </h2>

          <p className="text-slate-600 mb-5 sm:mb-6 leading-relaxed text-sm sm:text-base">
            I’m a MERN Stack Developer specializing in building scalable,
            high-performance web applications using MongoDB, Express, React,
            and Node.js. I focus on clean architecture, modern UI, and
            maintainable code to deliver reliable, business-ready solutions.
          </p>

          {/* Skill bars */}
          <div className="space-y-3 sm:space-y-4">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-700 text-xs sm:text-base">
                    {skill.name}
                  </span>
                  <span className="text-gray-500 text-xs sm:text-sm">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 h-1 rounded-full">
                  <div
                    className="bg-blue-600 h-1 rounded-full transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

    {/* Right Side - Feature Cards */}
<div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-5 md:my-auto">
  {features.map((feature, index) => (
    <div
      key={index}
      className="bg-white min-h-28 sm:min-h-36 rounded-2xl border border-blue-100 shadow-sm flex flex-col items-center justify-center text-center py-4 sm:py-6 px-3 sm:px-4 hover:shadow-md transition"
    >
      <div className="scale-75 sm:scale-100">{feature.icon}</div>
      <h3 className="mt-3 font-semibold text-slate-800 text-sm sm:text-base">
        {feature.title}
      </h3>
    </div>
  ))}
</div>

      </div>
    </section>
  );
};

export default ServicesSection;
