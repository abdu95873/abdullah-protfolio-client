import React from "react";
import { FaReact, FaLaptopCode, FaServer } from "react-icons/fa";

const experiences = [
  {
    icon: <FaReact size={24} className="text-blue-500" />,
    title: "React Development",
    description:
      "Built multiple production-ready web applications using modern React architecture and best practices.",
  },
  {
    icon: <FaLaptopCode size={24} className="text-purple-500" />,
    title: "Frontend Development",
    description:
      "Designed responsive UIs with HTML, CSS, Tailwind CSS, and JavaScript to create seamless user experiences.",
  },
  {
    icon: <FaServer size={24} className="text-green-500" />,
    title: "Fullstack Projects",
    description:
      "Implemented fullstack apps with clean architecture, backend integration, and database management.",
  },
];

const Experience = () => {
  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-12 text-center text-gray-900">
          Experience & Highlights
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.title}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition-transform transform hover:-translate-y-2"
            >
              <div className="mb-4">{exp.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {exp.title}
              </h3>
              <p className="text-gray-600 text-sm">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
