import React from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const contacts = [
    {
      icon: <FaEnvelope size={20} />,
      label: "Email",
      value: "abdu95873@gmail.com",
      href: "mailto:abdu95873@gmail.com",
      color: "text-red-500",
    },
    {
      icon: <FaGithub size={20} />,
      label: "GitHub",
      value: "github.com/yourusername",
      href: "https://github.com/yourusername",
      color: "text-gray-800",
    },
    {
      icon: <FaLinkedin size={20} />,
      label: "LinkedIn",
      value: "linkedin.com/in/yourusername",
      href: "https://linkedin.com/in/yourusername",
      color: "text-blue-600",
    },
    {
      icon: <FaWhatsapp size={20} />,
      label: "WhatsApp",
      value: "+880XXXXXXXXXX",
      href: "https://wa.me/+880XXXXXXXXXX",
      color: "text-green-500",
    },
  ];

  return (
    <section id="contact" className="py-24 px-6 bg-gray-50">
      <h2 className="text-3xl font-semibold mb-12 text-center text-gray-900">
        Contact Me
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {contacts.map((contact) => (
          <a
            key={contact.label}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-3 p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow hover:-translate-y-1 transform text-center"
          >
            <div className={`${contact.color} mb-2`}>{contact.icon}</div>
            <p className="font-medium text-gray-900">{contact.label}</p>
            <p className="text-gray-600 text-sm">{contact.value}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Contact;
