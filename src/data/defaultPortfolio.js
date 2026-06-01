import imgbb from "./imgbb-urls.json";

export const defaultPortfolio = {
  banner: {
    badge: "MERN Developer",
    headline: "Web Developer",
    intro:
      "Hi, I'm Abdullah. A passionate Web Developer building fast, responsive, and modern web apps.",
    image: imgbb["abdullah.png"],
    skillsNote: "High knowledge on softwares",
  },
  about: {
    subtitle: "ABOUT ME",
    title: "Web Developer",
    image: imgbb["abdullah2.png"],
    paragraphs: [
      "I'm a passionate Web Developer, and I am incredibly committed to my work. Over the course of my career, I have gained the required skills and knowledge to help you with your projects.",
      "I am focused on React technologies which bring a lot of benefits to my clients:",
    ],
    benefits: [
      "Technology is supported by Facebook.",
      "A lot of third-party plugins and components.",
      "Very good performance compared to other cross-platform frameworks.",
    ],
    signature: "Abdullah",
  },
  services: {
    label: "SERVICES",
    title: "Full-Cycle MERN Stack Web Development Services",
    description:
      "I'm a MERN Stack Developer specializing in building scalable, high-performance web applications using MongoDB, Express, React, and Node.js. I focus on clean architecture, modern UI, and maintainable code to deliver reliable, business-ready solutions.",
    skills: [
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "React JS", level: 92 },
      { name: "Node.js & Express", level: 88 },
      { name: "MongoDB", level: 87 },
      { name: "TypeScript", level: 85 },
      { name: "MERN Stack", level: 93 },
      { name: "HTML, CSS & Tailwind", level: 90 },
    ],
    features: [
      "Research & Planning",
      "UI / UX Design",
      "MERN Development",
      "Maintenance & Support",
      "Code Quality",
    ],
  },
  experience: {
    label: "EXPERIENCE",
    title: "Experience & Technical Highlights",
    items: [
      {
        icon: "react",
        title: "React & Frontend Engineering",
        description:
          "Developed scalable and maintainable React applications using hooks, reusable components, and modern state management. Focused on performance and clean UI architecture.",
      },
      {
        icon: "laptop",
        title: "Modern UI Development",
        description:
          "Crafted responsive and accessible interfaces using HTML, CSS, Tailwind CSS, and JavaScript, ensuring consistent design across devices and browsers.",
      },
      {
        icon: "server",
        title: "MERN Stack Applications",
        description:
          "Built full-stack applications with MongoDB, Express, React, and Node.js, including REST APIs, authentication, database modeling, and secure server-side logic.",
      },
    ],
  },
  contact: {
    title: "Contact Me",
    items: [
      {
        icon: "email",
        label: "Email",
        value: "abdu95873@gmail.com",
        href: "mailto:abdu95873@gmail.com",
      },
      {
        icon: "github",
        label: "GitHub",
        value: "github.com/abdu95873",
        href: "https://github.com/abdu95873",
      },
      {
        icon: "linkedin",
        label: "LinkedIn",
        value: "linkedin.com/in/abdu95873",
        href: "https://linkedin.com/in/abdu95873",
      },
      {
        icon: "whatsapp",
        label: "WhatsApp",
        value: "+8801581400986",
        href: "https://wa.me/+8801581400986",
      },
    ],
  },
  projects: {
    label: "FEATURED PROJECTS",
    title: "Selected Work & Case Studies",
    description:
      "Real projects focused on clean UI, responsive experience, and production-ready architecture.",
    items: [
      {
        id: "omar-portfolio",
        title: "Personal Portfolio",
        description:
          "A modern personal portfolio website showcasing projects, skills, and experience with a clean and responsive UI.",
        tech: "React, Tailwind CSS, Firebase",
        link: "https://omar-client.web.app/",
        image: imgbb["omar.png"],
      },
      {
        id: "shopping-complex",
        title: "Shopping Complex Web App",
        description:
          "A full-stack MERN application simulating a shopping complex with dynamic UI, product listings, and scalable architecture.",
        tech: "MERN Stack, Node.js, MongoDB",
        link: "https://shopping-complex-8cd2e.web.app/",
        image: imgbb["rohman.png"],
      },
      {
        id: "royal-express",
        title: "Royal Express Web App",
        description:
          "A modern web application for Royal Express, a city courier service that allows users to book deliveries, track parcels, and manage shipments with ease.",
        tech: "React, Tailwind CSS, UI Design",
        link: "https://royal-express-671bc.web.app/",
        image: imgbb["royal.png"],
      },
      {
        id: "profast",
        title: "ProFast Courier Web App",
        description:
          "A practice project simulating a city courier service with instant delivery, parcel tracking, and rider management.",
        tech: "React, Tailwind CSS, UI Design",
        link: "https://zep-shift-a74e9.web.app/",
        image: imgbb["profast.png"],
      },
    ],
  },
};

export const mergePortfolio = (remote) => ({
  banner: { ...defaultPortfolio.banner, ...remote?.banner },
  about: { ...defaultPortfolio.about, ...remote?.about },
  services: {
    ...defaultPortfolio.services,
    ...remote?.services,
    skills: remote?.services?.skills ?? defaultPortfolio.services.skills,
    features: remote?.services?.features ?? defaultPortfolio.services.features,
  },
  experience: {
    ...defaultPortfolio.experience,
    ...remote?.experience,
    items: remote?.experience?.items ?? defaultPortfolio.experience.items,
  },
  contact: {
    ...defaultPortfolio.contact,
    ...remote?.contact,
    items: remote?.contact?.items ?? defaultPortfolio.contact.items,
  },
  projects: {
    ...defaultPortfolio.projects,
    ...remote?.projects,
    items: remote?.projects?.items ?? defaultPortfolio.projects.items,
  },
});

/** Full portfolio with all images pointing to ImgBB */
export const getImgbbPortfolioSnapshot = () => ({
  banner: defaultPortfolio.banner,
  about: defaultPortfolio.about,
  services: defaultPortfolio.services,
  experience: defaultPortfolio.experience,
  contact: defaultPortfolio.contact,
  projects: defaultPortfolio.projects,
});
