import { useEffect, useState, useRef } from "react";

const data = [
  {
    id: "omar-portfolio",
    title: "Personal Portfolio",
    description:
      "A modern personal portfolio website showcasing projects, skills, and experience with a clean and responsive UI.",
    tech: "React, Tailwind CSS, Firebase",
    link: "https://omar-client.web.app/",
    image: "/omar.png",
  },
  {
    id: "shopping-complex",
    title: "Shopping Complex Web App",
    description:
      "A full-stack MERN application simulating a shopping complex with dynamic UI, product listings, and scalable architecture.",
    tech: "MERN Stack, Node.js, MongoDB",
    link: "https://shopping-complex-8cd2e.web.app/",
    image: "/rohman.png",
  },
  {
  id: "royal-express",
  title: "Royal Express Web App",
  description:
    "A modern web application for Royal Express, a city courier service that allows users to book deliveries, track parcels, and manage shipments with ease.",
  tech: "React, Tailwind CSS, UI Design",
  link: "https://royal-express-671bc.web.app/",
  image: "/royal.png",
},
{
  id: "profast",
  title: "ProFast Courier Web App",
  description:
    "A practice project simulating a city courier service with instant delivery, parcel tracking, and rider management. Designed to demonstrate UI/UX and responsive web design skills.",
  tech: "React, Tailwind CSS, UI Design",
  link: "https://zep-shift-a74e9.web.app/", // you can update with deployed URL later
  image: "/profast.png", // save the screenshot as this file
},

];

export default function ScrollSpySection() {
  const [activeId, setActiveId] = useState(data[0].id);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionsRef.current.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto px-4 py-16 gap-8">
      {/* LEFT: Titles */}
      <div className="hidden lg:flex lg:flex-col gap-4 sticky top-28 w-1/4 self-start">
        {data.map((item) => (
          <div
            key={item.id}
            className={`cursor-pointer text-lg font-semibold ${
              activeId === item.id ? "text-blue-600" : "text-gray-600"
            }`}
          >
            {item.title}
          </div>
        ))}
      </div>

      {/* RIGHT: Cards with image background */}
      <div className="w-full lg:w-3/4 flex flex-col gap-8">
        {data.map((item, index) => (
          <div
            key={item.id}
            id={item.id}
            ref={(el) => (sectionsRef.current[index] = el)}
            className="relative rounded-lg overflow-hidden shadow-md h-64 md:h-80"
          >
            {/* Image as background */}
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            )}

            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Text on top */}
            <div className="absolute inset-0 flex flex-col justify-end items-start p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
              <p className="text-sm mb-2">Tech: {item.tech}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline text-sm"
              >
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
