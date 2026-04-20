import React from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const contacts = [
    {
      icon: <FaEnvelope size={20} />,
      label: "Email",
      value: "abdu95873@gmail.com",
      href: "mailto:abdu95873@gmail.com",
      color: "text-blue-500",
    },
    {
      icon: <FaGithub size={20} />,
      label: "GitHub",
      value: "github.com/abdu95873",
      href: "https://github.com/abdu95873",
      color: "text-blue-800",
    },
    {
      icon: <FaLinkedin size={20} />,
      label: "LinkedIn",
      value: "linkedin.com/in/abdu95873",
      href: "https://linkedin.com/in/abdu95873",
      color: "text-blue-600",
    },
    {
      icon: <FaWhatsapp size={20} />,
      label: "WhatsApp",
      value: "+8801581400986",
      href: "https://wa.me/+8801581400986",
      color: "text-sky-500",
    },
  ];

  return (
    <section id="contact" className="py-12 sm:py-20 px-4 sm:px-6 bg-blue-50/40">
      <h2 className="text-xl sm:text-3xl font-semibold mb-7 sm:mb-12 text-center text-gray-900">
        Contact Me
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-6xl mx-auto">
        {contacts.map((contact) => (
          <a
            key={contact.label}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 sm:gap-3 p-3.5 sm:p-6 bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 text-center"
          >
            <div className={`${contact.color} mb-1 sm:mb-2 scale-90 sm:scale-100`}>{contact.icon}</div>
            <p className="font-medium text-gray-900 text-sm sm:text-base">{contact.label}</p>
            <p className="text-gray-600 text-[11px] sm:text-sm break-all">{contact.value}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;
