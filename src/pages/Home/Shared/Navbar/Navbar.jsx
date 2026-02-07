import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = ["About", "Experience", "Services","Projects", "Contact"]; // all menu items
const staggerItems = ["About", "Contact"]; // items to show first

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  // Animation variants for menu container
  const menuVariants = {
    hidden: { x: "100%" },
    visible: { 
      x: 0, 
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 50,
        mass: 0.5,
        staggerChildren: 0.1
      } 
    },
    exit: { 
      x: "100%", 
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 50,
        mass: 0.5,
        staggerChildren: -0.1
      } 
    }
  };

  // Animation variants for individual menu items
  const itemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 },
  };

  return (
    <nav className="w-full flex items-center py-6 px-10 bg-white shadow-sm fixed top-0 z-50">
      {/* Logo */}
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

      {/* Menu Container */}
      <div className="grow flex justify-end items-center relative">
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-full w-3/4 bg-white shadow-lg flex flex-col items-end gap-6 pt-24 px-8 z-50
                         lg:flex lg:flex-row lg:relative lg:top-auto lg:right-0 lg:h-auto lg:w-auto lg:pt-0 lg:px-0 lg:shadow-none lg:bg-transparent lg:gap-8"
            >
              {/* First show Portfolio + Contact */}
              {staggerItems.map((item) => (
                <motion.li key={item} variants={itemVariants}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={toggleMenu}
                    className="hover:text-orange-500 transition"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}

              {/* Then show the remaining items */}
              {menuItems
                .filter((item) => !staggerItems.includes(item))
                .map((item) => (
                  <motion.li key={item} variants={itemVariants}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      onClick={toggleMenu}
                      className="hover:text-orange-500 transition"
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Hamburger / X button with smooth 3-line animation */}
        <button
          onClick={toggleMenu}
          className="flex flex-col justify-center items-center w-10 h-10 relative z-50 ml-4"
        >
          {/* Top line */}
          <motion.span
            className="block w-8 h-1 bg-gray-900 rounded"
            animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          {/* Middle line */}
          <motion.span
            className="block w-8 h-1 bg-gray-900 rounded my-1"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          {/* Bottom line */}
          <motion.span
            className="block w-8 h-1 bg-gray-900 rounded"
            animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
