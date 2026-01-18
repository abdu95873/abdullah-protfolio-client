import { useEffect, useState, useRef } from "react";

const data = [
  { id: "worldpackers", title: "Worldpackers", content: "A world of ways to travel the world" },
  { id: "bookify", title: "Bookify", content: "Hotel booking made simple" },
  { id: "n26", title: "N26", content: "Modern digital banking experience" },
];

export default function ScrollSpySection() {
  const [activeId, setActiveId] = useState("worldpackers");
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
      {/* LEFT: Titles (hidden on mobile & tablet) */}
      <div className="hidden lg:flex lg:flex-col gap-4 sticky top-20 w-1/4">
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

      {/* RIGHT: Cards */}
      <div className="w-full lg:w-3/4 flex flex-col gap-8">
        {data.map((item, index) => (
          <div
            key={item.id}
            id={item.id}
            ref={(el) => (sectionsRef.current[index] = el)}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-bold mb-2">{item.title}</h2>
            <p className="text-gray-700">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
