import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import logo from "../assets/gidev-logo-kit/gidev-logo.svg";
import wordmark from "../assets/gidev-logo-kit/gidev-wordmark.svg";
import { serviceGroups, services } from "../data/services";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const linkBase =
  "relative inline-flex min-h-11 items-center px-2 text-[var(--text-medium-16)] font-normal tracking-wide transition-colors duration-200 after:absolute after:inset-x-2 after:bottom-2 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-300 after:ease-out motion-reduce:after:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark";
const linkActive = "text-brand-dark after:scale-x-100";
const linkIdle =
  "text-gray-600 hover:text-brand-dark after:scale-x-0 hover:after:scale-x-100 focus-visible:after:scale-x-100";

const mobileList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};
const mobileItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

function BookCallButton() {
  const reduceMotion = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const [hovered, setHovered] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const magnetic = finePointer && !reduceMotion;

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFinePointer(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={wrapperRef}
      style={magnetic ? { x: springX, y: springY } : undefined}
      onPointerMove={(event) => {
        if (!magnetic || event.pointerType !== "mouse" || !wrapperRef.current) return;
        const rect = wrapperRef.current.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        x.set(Math.max(-8, Math.min(8, dx * 0.2)));
        y.set(Math.max(-6, Math.min(6, dy * 0.25)));
      }}
      onPointerLeave={reset}
    >
      <Link viewTransition
        to="/contact"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="flex min-h-12 items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-dark"
      >
        <span
          className={`flex h-12 items-center overflow-hidden rounded-full px-6 text-[var(--text-medium-16)] text-white transition-colors duration-200 ${hovered ? "bg-brand-dark" : "bg-ink"}`}
        >
          <span className="relative flex h-5 items-center overflow-hidden">
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
              className="absolute left-0 top-full whitespace-nowrap text-white"
            >
              Book a free call
            </motion.span>
          </span>
        </span>
        <span
          className={`relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full text-white transition-colors duration-200 ${hovered ? "bg-brand-dark" : "bg-ink"}`}
        >
          <motion.svg
            animate={{ y: hovered ? "-150%" : "0%", x: hovered ? "150%" : "0%" }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="h-4 w-4"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2 12L12 2M12 2H5M12 2V9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
          <motion.svg
            initial={{ y: "150%", x: "-150%" }}
            animate={{ y: hovered ? "0%" : "150%", x: hovered ? "0%" : "-150%" }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="absolute h-4 w-4"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2 12L12 2M12 2H5M12 2V9" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </span>
      </Link>
    </motion.div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollHidden, setScrollHidden] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const servicesToggleRef = useRef<HTMLButtonElement>(null);
  const servicesItemRef = useRef<HTMLLIElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const focusFirstOnOpen = useRef(false);
  const suppressFocusOpen = useRef(false);
  const lastScroll = useRef(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    const previous = lastScroll.current;
    lastScroll.current = value;
    setScrolled(value > 12);
    if (value < 120 || value < previous) setScrollHidden(false);
    else if (value > previous + 4) setScrollHidden(true);
  });

  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
    setServicesOpen(false);
  }

  const openServices = () => {
    window.clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeServicesSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 160);
  };

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!servicesOpen) return;
    if (focusFirstOnOpen.current) {
      focusFirstOnOpen.current = false;
      dropdownRef.current?.querySelector<HTMLElement>("a")?.focus();
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!servicesItemRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [servicesOpen]);

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

  const hidden = scrollHidden && !menuOpen && !servicesOpen && !focusWithin && !reduceMotion;
  const solid = scrolled || menuOpen;

  const onServicesKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === "Escape" && servicesOpen) {
      setServicesOpen(false);
      suppressFocusOpen.current = true;
      servicesToggleRef.current?.focus();
      suppressFocusOpen.current = false;
    }
  };

  return (
    <>
      <motion.header
        className="site-header pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
        onFocus={() => setFocusWithin(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusWithin(false);
        }}
      >
        <motion.nav
          aria-label="Main"
          animate={{ y: hidden ? "-160%" : "0%" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-auto mx-auto max-w-7xl rounded-full border transition-[background-color,box-shadow,border-color] duration-300 ${
            solid
              ? "border-gray-200/80 bg-white/90 shadow-[0_12px_40px_rgba(20,20,19,0.12)] backdrop-blur-xl"
              : "border-gray-200/60 bg-white/80 shadow-[0_8px_30px_rgba(20,20,19,0.06)] backdrop-blur-md"
          } ${menuOpen ? "!bg-white" : ""}`}
        >
          <div
            className={`relative flex w-full items-center overflow-visible px-5 transition-[height] duration-300 sm:px-8 h-16 ${
              scrolled ? "md:h-16" : "md:h-20"
            }`}
          >
            <Link viewTransition to="/" className="z-10 flex min-h-11 flex-shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark">
              {/* Full logo needs ≥120px width (kit README); mobile gets the wordmark. */}
              <picture>
                <source media="(min-width: 768px)" srcSet={logo} width={146} height={64} />
                <img
                  src={wordmark}
                  alt="Gidev Innovations"
                  width={92}
                  height={40}
                  className={`h-10 w-auto transition-[height] duration-300 ${scrolled ? "md:h-11" : "md:h-14"}`}
                />
              </picture>
            </Link>

            <ul className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 lg:flex lg:gap-3">
              <li>
                <NavLink viewTransition to="/" end className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>
                  Home
                </NavLink>
              </li>
              <li
                ref={servicesItemRef}
                className="relative"
                onPointerEnter={(event) => event.pointerType === "mouse" && openServices()}
                onPointerLeave={(event) => event.pointerType === "mouse" && closeServicesSoon()}
                onKeyDown={onServicesKeyDown}
                onBlurCapture={(event) => {
                  const target = event.relatedTarget;
                  if (!(target instanceof Node) || !event.currentTarget.contains(target)) {
                    setServicesOpen(false);
                  }
                }}
              >
                <button
                  ref={servicesToggleRef}
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-controls="services-dropdown"
                  onClick={openServices}
                  onFocus={(event) => {
                    if (!suppressFocusOpen.current && event.currentTarget.matches(":focus-visible")) openServices();
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      focusFirstOnOpen.current = true;
                      if (servicesOpen) {
                        focusFirstOnOpen.current = false;
                        dropdownRef.current?.querySelector<HTMLElement>("a")?.focus();
                      } else {
                        openServices();
                      }
                    }
                  }}
                  className={`${linkBase} gap-1 ${pathname.startsWith("/services") || servicesOpen ? linkActive : linkIdle}`}
                >
                  Services
                  <ChevronDown size={15} aria-hidden="true" className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                </button>
                {servicesOpen && (
                  <motion.div
                    ref={dropdownRef}
                    id="services-dropdown"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-1/2 top-full z-50 w-[min(48rem,92vw)] -translate-x-1/2 pt-2"
                  >
                    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_18px_50px_rgba(20,20,19,0.12)]">
                      <div className="grid grid-cols-2 gap-6">
                        {serviceGroups.map((group) => (
                          <div key={group}>
                            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">{group}</p>
                            <ul className="space-y-1">
                              {services.filter((service) => service.group === group).map((service) => {
                                const Icon = service.icon;
                                return (
                                  <li key={service.id}>
                                    <Link viewTransition
                                      to={`/services/${service.slug}`}
                                      onClick={() => setServicesOpen(false)}
                                      className="group flex min-h-11 items-start gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-brand-light focus-visible:bg-brand-light focus-visible:outline-2 focus-visible:outline-brand-dark"
                                    >
                                      <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-brand-light text-brand-dark transition-colors group-hover:bg-white">
                                        <Icon size={18} aria-hidden="true" />
                                      </span>
                                      <span className="min-w-0">
                                        <span className="block text-sm font-semibold text-ink">{service.title}</span>
                                        <span className="line-clamp-2 text-xs leading-snug text-gray-600">{service.shortDescription}</span>
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <Link viewTransition
                        to="/services"
                        onClick={() => setServicesOpen(false)}
                        className="mt-3 flex min-h-11 items-center border-t border-gray-100 px-3 pt-2 text-sm font-semibold text-brand-dark hover:text-ink focus-visible:outline-2 focus-visible:outline-brand-dark"
                      >
                        View all services
                      </Link>
                    </div>
                  </motion.div>
                )}
              </li>
              {links.slice(1).map((link) => (
                <li key={link.label}>
                  <NavLink viewTransition to={link.to} className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkIdle}`}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="z-10 ml-auto hidden items-center lg:flex">
              <BookCallButton />
            </div>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="ml-auto flex h-11 w-11 flex-col items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-brand-dark lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-6 origin-center bg-gray-800"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 w-6 bg-gray-800"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-6 origin-center bg-gray-800"
              />
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Full-screen mobile menu. Rendered outside the header so the header's transform can't offset it. */}
      {menuOpen && (
        <motion.div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) setMenuOpen(false);
          }}
          className="fixed inset-0 z-40 overflow-y-auto bg-white pt-24 lg:hidden"
        >
          <motion.ul
            variants={mobileList}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-1 px-8 py-6"
          >
            <motion.li variants={mobileItem}>
              <NavLink viewTransition
                to="/"
                end
                className={({ isActive }) =>
                  `flex min-h-12 items-center border-b border-gray-100 text-2xl font-medium transition-colors duration-200 ${
                    isActive ? "text-brand-dark" : "text-gray-900 hover:text-brand-dark"
                  }`
                }
              >
                Home
              </NavLink>
            </motion.li>
            <motion.li variants={mobileItem} className="border-b border-gray-100 py-4">
              <p className="mb-3 text-2xl font-medium text-gray-900">Services</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {serviceGroups.map((group) => (
                  <div key={group}>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">{group}</p>
                    <ul>
                      {services.filter((service) => service.group === group).map((service) => (
                        <li key={service.id}>
                          <Link viewTransition
                            to={`/services/${service.slug}`}
                            className="flex min-h-11 items-center text-base text-gray-700 hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-brand-dark"
                          >
                            {service.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link viewTransition
                to="/services"
                className="mt-2 inline-flex min-h-11 items-center font-semibold text-brand-dark underline underline-offset-4"
              >
                View all services
              </Link>
            </motion.li>
            {links.slice(1).map((link) => (
              <motion.li key={link.label} variants={mobileItem}>
                <NavLink viewTransition
                  to={link.to}
                  className={({ isActive }) =>
                    `flex min-h-12 items-center border-b border-gray-100 text-2xl font-medium transition-colors duration-200 ${
                      isActive ? "text-brand-dark" : "text-gray-900 hover:text-brand-dark"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </motion.li>
            ))}
            <motion.li variants={mobileItem} className="pt-6">
              <Link viewTransition
                to="/contact"
                className="flex min-h-12 w-full items-center justify-center rounded-full bg-ink px-6 text-lg font-medium text-white transition-colors hover:bg-brand-dark"
              >
                Book a free call
              </Link>
            </motion.li>
            <motion.li variants={mobileItem} className="pt-3 pb-8">
              <Link viewTransition
                to="/contact#message"
                className="flex min-h-12 w-full items-center justify-center rounded-full border border-gray-300 px-6 text-lg font-medium text-gray-900 transition-colors hover:border-brand-dark hover:text-brand-dark"
              >
                Send us a message
              </Link>
            </motion.li>
          </motion.ul>
        </motion.div>
      )}
    </>
  );
}