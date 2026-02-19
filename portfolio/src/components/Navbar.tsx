import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const links = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 ">
      <div className="relative w-full px-10 h-20 flex items-center overflow-visible">
        {/* Logo — far left */}
        <Link to="/" className="flex-shrink-0 z-10">
          <img
            src={logo}
            alt="Gidev Innovations"
            className="h-24 md:h-40 w-auto object-contain"
          />
        </Link>

        {/* Nav Links — truly centered horizontally and vertically */}
        <ul className="hidden md:flex items-center gap-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {links.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `text-base tracking-wide transition-colors duration-200 ${
                    isActive
                      ? "text-[#2EC4C7]"
                      : "text-gray-600 hover:text-[#2EC4C7]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA Button — far right */}
        <div className="hidden md:flex items-center ml-auto z-10">
          <Link
            to="/contact"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative flex items-center gap-2 bg-[#0A1F2E] text-white rounded-full pl-5 pr-2 py-2 text-sm font-medium overflow-hidden"
          >
            <span className="relative h-5 overflow-hidden flex items-center">
              <motion.span
                animate={{ y: hovered ? "-100%" : "0%" }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="block whitespace-nowrap"
              >
                Book A Call
              </motion.span>
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: hovered ? "-100%" : "100%" }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="absolute top-full left-0 text-[#2EC4C7] whitespace-nowrap"
              >
                Book A Call
              </motion.span>
            </span>

            <span className="relative ml-1 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
              <motion.svg
                animate={{
                  y: hovered ? "-120%" : "0%",
                  x: hovered ? "120%" : "0%",
                }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="w-3.5 h-3.5"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M2 12L12 2M12 2H5M12 2V9"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
              <motion.svg
                initial={{ y: "120%", x: "-120%" }}
                animate={{
                  y: hovered ? "0%" : "120%",
                  x: hovered ? "0%" : "-120%",
                }}
                transition={{ duration: 0.28, ease: "easeInOut" }}
                className="w-3.5 h-3.5 absolute"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M2 12L12 2M12 2H5M12 2V9"
                  stroke="#2EC4C7"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 ml-auto"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-gray-800 origin-center"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-gray-800"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-gray-800 origin-center"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <ul className="flex flex-col px-8 py-5 gap-5">
              {links.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `font-medium text-base transition-colors duration-200 ${
                        isActive
                          ? "text-[#2EC4C7]"
                          : "text-gray-700 hover:text-[#2EC4C7]"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}

              <motion.li
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: links.length * 0.05, duration: 0.25 }}
                className="pt-1"
              >
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 bg-[#0A1F2E] text-white rounded-full pl-5 pr-2 py-2 text-sm font-medium"
                >
                  Book A Call
                  <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M2 12L12 2M12 2H5M12 2V9"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
