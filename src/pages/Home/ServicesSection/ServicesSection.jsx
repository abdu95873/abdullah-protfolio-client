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
    icon: <CheckCircleIcon className="w-8 h-8 text-orange-600" />,
    title: "Research & Planning",
  },
  {
    icon: <PencilIcon className="w-8 h-8 text-orange-600" />,
    title: "UI / UX Design",
  },
  {
    icon: <CodeBracketIcon className="w-8 h-8 text-orange-600" />,
    title: "MERN Development",
  },
  {
    icon: <WrenchIcon className="w-8 h-8 text-orange-600" />,
    title: "Maintenance & Support",
  },
  {
    icon: <StarIcon className="w-8 h-8 text-orange-600" />,
    title: "Code Quality",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16 px-6 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Left Side */}
        <div className="px-16">
          <p className="text-orange-600 font-semibold mb-2">SERVICES</p>

          <h2 className="text-3xl font-bold mb-4 leading-snug">
            Full-Cycle MERN Stack <br /> Web Development Services
          </h2>

          <p className="text-gray-500 mb-6 leading-relaxed">
            I’m a MERN Stack Developer specializing in building scalable,
            high-performance web applications using MongoDB, Express, React,
            and Node.js. I focus on clean architecture, modern UI, and
            maintainable code to deliver reliable, business-ready solutions.
          </p>

          {/* Skill bars */}
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-gray-700">
                    {skill.name}
                  </span>
                  <span className="text-gray-500">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 h-1 rounded-full">
                  <div
                    className="bg-orange-600 h-1 rounded-full transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Feature Cards */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          {/* Left Column */}
          <div className="flex flex-col gap-8 pt-16">
            {features
              .filter((_, i) => i === 0 || i === 4)
              .map((feature, index) => (
                <div
                  key={index}
                  className="bg-white h-52 w-52 rounded-2xl shadow-md flex flex-col items-center justify-center text-center hover:shadow-xl transition"
                >
                  {feature.icon}
                  <h3 className="mt-4 font-semibold">
                    {feature.title}
                  </h3>
                </div>
              ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8 -ml-4">
            {features
              .filter((_, i) => i !== 0 && i !== 4)
              .map((feature, index) => (
                <div
                  key={index}
                  className="bg-white h-52 w-52 rounded-2xl shadow-md flex flex-col items-center justify-center text-center hover:shadow-xl transition"
                >
                  {feature.icon}
                  <h3 className="mt-4 font-semibold">
                    {feature.title}
                  </h3>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
