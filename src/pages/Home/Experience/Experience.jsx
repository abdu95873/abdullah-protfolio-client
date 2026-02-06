import React from "react";
import { FaReact, FaLaptopCode, FaServer } from "react-icons/fa";

const experiences = [
  {
    icon: <FaReact size={26} className="text-blue-500" />,
    title: "React & Frontend Engineering",
    description:
      "Developed scalable and maintainable React applications using hooks, reusable components, and modern state management. Focused on performance and clean UI architecture.",
  },
  {
    icon: <FaLaptopCode size={26} className="text-purple-500" />,
    title: "Modern UI Development",
    description:
      "Crafted responsive and accessible interfaces using HTML, CSS, Tailwind CSS, and JavaScript, ensuring consistent design across devices and browsers.",
  },
  {
    icon: <FaServer size={26} className="text-green-500" />,
    title: "MERN Stack Applications",
    description:
      "Built full-stack applications with MongoDB, Express, React, and Node.js, including REST APIs, authentication, database modeling, and secure server-side logic.",
  },
];

const Experience = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-orange-600 font-semibold text-center mb-2">
          EXPERIENCE
        </p>

        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">
          Experience & Technical Highlights
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.title}
              className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="mb-4">{exp.icon}</div>

              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                {exp.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
