import { Link } from "react-router-dom";
import { Settings2 } from "lucide-react";
import { motion } from "framer-motion";
import { BUSINESS, SITE } from "../data/site";
import { services } from "../data/services";

const CURRENT_YEAR = new Date().getFullYear();

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy policy", href: "/privacy" },
];

const SOCIAL_LABELS: Record<string, string> = {
  "github.com": "GitHub",
  "linkedin.com": "LinkedIn",
  "x.com": "X",
  "instagram.com": "Instagram",
};

const slideUp = { rest: { y: 0 }, hover: { y: "-100%" } };
const slideIn = { rest: { y: "100%" }, hover: { y: 0 } };
const slideTrans = { duration: 0.3, ease: "easeInOut" as const };

const linkClass =
  "inline-flex min-h-11 min-w-11 items-center text-regular-16 text-brand-dark underline-offset-4 decoration-brand-dark decoration-2 hover:underline focus-visible:underline";
const headingClass = "text-lg font-semibold text-gray-950 mb-2";

const Footer = () => {
  return (
    <footer className="mt-12 px-6 pb-8">
      {/* CTA Card */}
      {/*
        Logo teal with ink text (7:1). White text on #18aeb4 is only 2.7:1.
      */}
      <div className="bg-brand rounded-3xl px-6 sm:px-10 md:px-16 py-12 md:py-16 flex flex-col items-center justify-center text-center gap-4 mb-12">
        <div className="flex items-center gap-2 text-ink">
          <Settings2 size={15} strokeWidth={1.5} aria-hidden="true" />
          <span className="text-regular-16">Taking on new projects</span>
        </div>

        <h2 className="text-ink text-heading-5 md:text-heading-4 font-semibold max-w-5xl">
          Got something you need built?
        </h2>

        <p className="text-ink text-regular-18 md:text-regular-20">
          Send us a message or book a free {BUSINESS.callLength} call.
        </p>

        <motion.div
          initial="rest"
          whileHover="hover"
          className="relative overflow-hidden rounded-full mt-2 h-[58px] w-[200px]"
        >
          <Link
            to="/contact"
            className="bg-ink text-white px-8 rounded-full text-heading-6 font-medium block w-full h-full"
          >
            <motion.span
              variants={slideUp}
              transition={slideTrans}
              className="absolute inset-0 flex items-center justify-center text-white"
            >
              Contact us
            </motion.span>
            <motion.span
              aria-hidden="true"
              variants={slideIn}
              transition={slideTrans}
              className="absolute inset-0 flex items-center justify-center text-brand"
            >
              Contact us
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* Link columns + business details (NAP must match Google Business Profile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10">
        <div>
          <p className="text-lg font-semibold text-gray-950 mb-3">{SITE.name}</p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Software development studio building web apps, e-commerce and
            mobile apps for businesses in Kenya and across Africa.
          </p>
          <address className="not-italic text-gray-600 leading-relaxed">
            {BUSINESS.locality}, {BUSINESS.countryName}
          </address>
          {BUSINESS.hours && <p className="text-gray-600 mt-1">{BUSINESS.hours}</p>}
          <p className="text-gray-500 mt-3 text-sm">
            Serving {BUSINESS.areaServed.slice(0, 3).join(", ")} and remote clients.
          </p>
        </div>

        <nav aria-label="Services">
          <p className={headingClass}>Services</p>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className={linkClass}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className={headingClass}>Company</p>
          <ul>
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className={headingClass}>Get in touch</p>
          <ul>
            <li>
              <Link to="/contact#message" className={linkClass}>
                Send a message
              </Link>
            </li>
            <li>
              <Link to="/contact#book" className={linkClass}>
                Book a free {BUSINESS.callLength} call
              </Link>
            </li>
            {BUSINESS.sameAs.map((url) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer me" className={linkClass}>
                  {SOCIAL_LABELS[new URL(url).hostname.replace("www.", "")] ?? url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar — right padding keeps the fixed back-to-top button clear of it. */}
      <div className="border-t border-gray-300 pt-6 pr-16 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
        <p className="text-regular-16 text-gray-500">
          &copy; {CURRENT_YEAR} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
