import { Link } from "react-router-dom";
import { Github, Instagram, Linkedin, Twitter, type LucideIcon } from "lucide-react";
import { BUSINESS, SITE } from "../data/site";
import { serviceGroups, services } from "../data/services";
import ClosingCta from "./ClosingCta";
import Reveal from "./Reveal";

const CURRENT_YEAR = new Date().getFullYear();

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
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

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  "github.com": Github,
  "linkedin.com": Linkedin,
  "x.com": Twitter,
  "instagram.com": Instagram,
};

const socialHost = (url: string) => new URL(url).hostname.replace("www.", "");

const linkClass =
  "inline-flex min-h-11 min-w-11 items-center text-regular-16 text-white/75 underline-offset-4 decoration-brand decoration-2 transition-colors hover:text-white hover:underline focus-visible:text-white focus-visible:underline";
const headingClass = "text-lg font-semibold text-white mb-2";

const Footer = () => {
  return (
    <footer className="mt-12 overflow-hidden bg-ink px-6 pb-8 pt-8 text-white md:px-10 md:pt-10">
      <ClosingCta />

      {/* Link columns and company details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-10">
        <div>
          <p className="text-lg font-semibold text-white mb-3">{SITE.name}</p>
          <p className="text-white/75 leading-relaxed mb-4">
            Digital products, brand experiences and practical AI solutions for
            ambitious businesses worldwide.
          </p>
          {BUSINESS.hours && <p className="text-white/75 mt-1">{BUSINESS.hours}</p>}
          <p className="text-white/55 mt-3 text-sm">
            Working remotely with teams worldwide.
          </p>
        </div>

        {serviceGroups.map((group) => (
          <nav key={group} aria-label={`${group} services`}>
            <p className={headingClass}>{group}</p>
            <ul>
              {services.filter((service) => service.group === group).map((service) => (
                <li key={service.id}>
                  <Link viewTransition to={`/services/${service.slug}`} className={linkClass}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <nav aria-label="Company">
          <p className={headingClass}>Company</p>
          <ul>
            {COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link viewTransition to={link.href} className={linkClass}>
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
              <Link viewTransition to="/contact#message" className={linkClass}>
                Send a message
              </Link>
            </li>
            <li>
              <Link viewTransition to="/contact#book" className={linkClass}>
                Book a free {BUSINESS.callLength} call
              </Link>
            </li>
          </ul>
          {BUSINESS.sameAs.length > 0 && (
            <ul className="mt-3 flex gap-2" aria-label="Social media">
              {BUSINESS.sameAs.map((url) => {
                const host = socialHost(url);
                const Icon = SOCIAL_ICONS[host];
                return (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer me"
                      aria-label={`${SOCIAL_LABELS[host] ?? host} (opens in a new tab)`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-brand hover:text-brand focus-visible:border-brand focus-visible:text-brand"
                    >
                      {Icon ? <Icon size={18} aria-hidden="true" /> : <span aria-hidden="true">{host[0]}</span>}
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <Reveal className="select-none overflow-hidden" aria-hidden="true">
        <p
          aria-hidden="true"
          className="bg-gradient-to-b from-white/25 to-white/0 bg-clip-text text-center text-[27vw] font-semibold leading-[0.8] tracking-[-0.06em] text-transparent md:text-[21vw]"
        >
          Gidev
        </p>
      </Reveal>

      <div className="flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center">
        <p className="text-regular-16 text-white/55">
          &copy; {CURRENT_YEAR} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
