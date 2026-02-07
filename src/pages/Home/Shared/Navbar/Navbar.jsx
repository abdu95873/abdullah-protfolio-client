import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = ["About", "Experience", "Services", "Projects", "Contact"];
const staggerItems = ["About", "Contact"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  // Menu container animation
  const menuVariants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 50,
        mass: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 50,
        mass: 0.5,
        staggerChildren: -0.1,
      },
    },
  };

  // Individual item animation
  const itemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 },
  };

  // Scroll to section smoothly
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false); // close menu after click
  };

  return (
    <nav className="w-full flex items-center py-6 px-10 bg-white shadow-sm fixed top-0 z-50">
      {/* Logo */}
      <div className="flex justify-center items-center bg-white">
        <div className="relative">
          <div className="absolute left-[45px] -top-3 w-10 h-10 bg-yellow-400 rounded-full z-0"></div>
          <h1 className="relative z-10 text-3xl font-extrabold text-black tracking-tight">
            Abdullah
          </h1>
        </div>
      </div>

      {/* Menu Container */}
      {/* <div className="grow flex justify-end items-center relative">
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-full w-3/4 bg-white shadow-lg flex flex-col items-end gap-6 pt-24 px-8 z-50
                         lg:flex lg:flex-row lg:relative lg:top-auto lg:right-0 lg:h-auto lg:w-auto lg:pt-0 lg:px-0 lg:shadow-none lg:bg-transparent lg:gap-8"
            > */}
              {/* First show staggered items */}
              {/* {staggerItems.map((item) => (
                <motion.li key={item} variants={itemVariants}>
                  <button
                    onClick={() => handleScroll(item.toLowerCase())}
                    className="hover:text-orange-500 transition"
                  >
                    {item}
                  </button>
                </motion.li>
              ))} */}

              {/* Then the remaining items */}
              {/* {menuItems
                .filter((item) => !staggerItems.includes(item))
                .map((item) => (
                  <motion.li key={item} variants={itemVariants}>
                    <button
                      onClick={() => handleScroll(item.toLowerCase())}
                      className="hover:text-orange-500 transition"
                    >
                      {item}
                    </button>
                  </motion.li>
                ))}
            </motion.ul>
          )}
        </AnimatePresence> */}

        {/* Hamburger / X button */}
        {/* <button
          onClick={toggleMenu}
          className="flex flex-col justify-center items-center w-10 h-10 relative z-50 ml-4"
        >
          <motion.span
            className="block w-8 h-1 bg-gray-900 rounded"
            animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-8 h-1 bg-gray-900 rounded my-1"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-8 h-1 bg-gray-900 rounded"
            animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button> */}
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
