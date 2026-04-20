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

  const scrollToProject = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

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
    <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-20 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-10 text-center">
          <p className="text-blue-600 font-semibold tracking-wide text-xs sm:text-base">FEATURED PROJECTS</p>
          <h2 className="mt-1.5 sm:mt-2 text-xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
            Selected Work & Case Studies
          </h2>
          <p className="mt-2 sm:mt-3 text-slate-600 text-xs sm:text-base max-w-2xl mx-auto">
            Real projects focused on clean UI, responsive experience, and production-ready architecture.
          </p>
        </div>

        <div className="mb-5 sm:mb-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-3">
          {data.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToProject(item.id)}
              className={`rounded-full px-2.5 py-1 sm:px-4 sm:py-2 text-[11px] sm:text-sm font-medium transition ${
                activeId === item.id
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white border border-blue-100 text-slate-700 hover:border-blue-300 hover:text-blue-700"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-6">
          {data.map((item, index) => (
            <article
              key={item.id}
              id={item.id}
              ref={(el) => (sectionsRef.current[index] = el)}
              className="group relative overflow-hidden rounded-2xl border border-blue-100/80 bg-white/90 backdrop-blur shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100/60"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.14),transparent_45%)]"></div>
              <div className="relative">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-40 sm:h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                )}
                <div className="absolute left-2.5 top-2.5 rounded-full bg-slate-900/70 px-2.5 py-1 text-[10px] sm:text-xs font-medium text-white backdrop-blur">
                  {item.tech}
                </div>
                <div className="absolute right-2.5 top-2.5 rounded-full border border-white/50 bg-white/20 px-2 py-1 text-[10px] sm:text-xs font-semibold text-white backdrop-blur">
                  0{index + 1}
                </div>
              </div>

              <div className="relative p-3.5 sm:p-5">
                <h3 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight">{item.title}</h3>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-[15px] leading-relaxed text-slate-600 line-clamp-3 min-h-[56px] sm:min-h-[68px]">
                  {item.description}
                </p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 sm:mt-4 inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
                >
                  View Live Project
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
