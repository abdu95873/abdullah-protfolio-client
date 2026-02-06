import React from 'react';
import ProFastLogo from '../Logo/ProFastLogo';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white rounded-3xl p-10 shadow-md mt-24">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo & Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <div className="flex justify-center items-center  bg-white">
      <div className="relative">
        {/* Yellow Circle */}
        <div className="absolute left-[45px] -top-3 w-10 h-10 bg-yellow-400 rounded-full z-0"></div>

        {/* Text */}
        <h1 className="relative z-10 text-3xl font-extrabold text-black tracking-tight">
          Abdullah
        </h1>
      </div>
    </div>          
    <p className="text-gray-700 font-medium">
            Abdullah - Web Developer
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
        

        {/* Contact Links */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="text-gray-700 font-medium">Get in touch:</p>
          <div className="flex gap-4 mt-2">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://wa.me/+880XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-green-500 transition-colors"
            >
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
