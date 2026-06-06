import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import ProFastLogo from '../Logo/ProFastLogo';

const Footer = () => {
  return (
    <footer className="mt-12 sm:mt-20 border-t border-blue-100 bg-white/90">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Logo & Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <ProFastLogo />
          <p className="text-gray-700 font-medium text-sm sm:text-base">
            Abdullah - Web Developer
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} All rights reserved ·{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Admin
            </Link>
          </p>
        </div>
        

        {/* Contact Links */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="text-gray-700 font-medium text-sm sm:text-base">Get in touch:</p>
          <div className="flex gap-3 sm:gap-4 mt-2">
            <a
              href="https://github.com/abdu95873"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-blue-100 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:border-blue-300 transition-colors"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/abdu95873"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-blue-100 flex items-center justify-center text-gray-700 hover:text-blue-600 hover:border-blue-300 transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://wa.me/+8801581400986"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-blue-100 flex items-center justify-center text-gray-700 hover:text-sky-500 hover:border-blue-300 transition-colors"
            >
              <FaWhatsapp size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
