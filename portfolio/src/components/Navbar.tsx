import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/gidev-logo-kit/gidev-logo.svg";
import wordmark from "../assets/gidev-logo-kit/gidev-wordmark.svg";

const links = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { pathname } = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusable = [
        toggleRef.current,
        ...menuRef.current.querySelectorAll<HTMLElement>("a, button"),
      ].filter((el): el is HTMLElement => el !== null);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="relative w-full px-10 h-16 md:h-32 flex items-center overflow-visible">
          {/* Logo — far left */}
          <Link to="/" className="flex flex-shrink-0 items-center min-h-11 z-10">
            {/* Full logo needs ≥120px width (kit README); mobile gets the wordmark. */}
            <picture>
              <source media="(min-width: 768px)" srcSet={logo} width={146} height={64} />
              <img
                src={wordmark}
                alt="Gidev Innovations"
                width={92}
                height={40}
                className="h-10 md:h-16 w-auto"
              />
            </picture>
          </Link>

          {/* Nav Links — truly centered horizontally and vertically */}
          <ul className="hidden lg:flex items-center gap-1 lg:gap-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {links.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `inline-flex min-h-11 items-center px-2 text-[var(--text-medium-16)] font-normal tracking-wide transition-colors duration-200 ${
                      isActive
                        ? "text-brand-dark"
                        : "text-gray-600 hover:text-brand-dark"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA Button — far right: two pills acting as one */}
          <div className="hidden lg:flex items-center ml-auto z-10">
            <Link
              to="/contact"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="flex items-center"
            >
              {/* Text pill */}
              <span className={`flex items-center h-12 px-6 ${hovered ? "bg-brand-dark" : "bg-ink"} text-white rounded-full text-[var(--text-medium-16)] overflow-hidden transition-colors duration-200`}>
                <span className="relative h-5 overflow-hidden flex items-center">
                  <motion.span
                    animate={{ y: hovered ? "-100%" : "0%" }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="block whitespace-nowrap"
                  >
                    Book a free call
                  </motion.span>
                  <motion.span
                    aria-hidden="true"
                    initial={{ y: "100%" }}
                    animate={{ y: hovered ? "-100%" : "100%" }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="absolute top-full left-0 text-white whitespace-nowrap"
                  >
                    Book a free call
                  </motion.span>
                </span>
              </span>

              {/* Arrow pill */}
              <span className={`relative flex items-center justify-center w-12 h-12 ${hovered ? "bg-brand-dark" : "bg-ink"} text-white rounded-full overflow-hidden transition-colors duration-200`}>
                <motion.svg
                  animate={{
                    y: hovered ? "-150%" : "0%",
                    x: hovered ? "150%" : "0%",
                  }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="w-4 h-4"
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
                  initial={{ y: "150%", x: "-150%" }}
                  animate={{
                    y: hovered ? "0%" : "150%",
                    x: hovered ? "0%" : "-150%",
                  }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  className="w-4 h-4 absolute"
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
              </span>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex h-11 w-11 flex-col items-center justify-center gap-1.5 ml-auto"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
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

        {/* Mobile Menu — opaque, full height, no fade so items are readable immediately. */}
        {menuOpen && (
          <div
            id="mobile-menu"
            ref={menuRef}
            className="lg:hidden fixed inset-x-0 top-16 md:top-32 bottom-0 overflow-y-auto bg-white border-t border-gray-100"
          >
            <ul className="flex flex-col px-8 py-6 gap-1">
              {links.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex min-h-12 items-center border-b border-gray-100 text-xl font-medium transition-colors duration-200 ${
                        isActive ? "text-brand-dark" : "text-gray-900 hover:text-brand-dark"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}

              <li className="pt-6">
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-12 w-full items-center justify-center rounded-full bg-ink px-6 text-lg font-medium text-white hover:bg-brand-dark transition-colors"
                >
                  Book a free call
                </Link>
              </li>
              <li className="pt-3">
                <Link
                  to="/contact#message"
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-12 w-full items-center justify-center rounded-full border border-gray-300 px-6 text-lg font-medium text-gray-900 hover:border-brand-dark hover:text-brand-dark transition-colors"
                >
                  Send us a message
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}
