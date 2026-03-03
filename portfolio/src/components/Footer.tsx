import { Link } from "react-router-dom";
import { Settings2 } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="px-6 pb-8">
      {/* CTA Card */}
      <div className="bg-primary-400 rounded-3xl px-16 py-16 flex flex-col items-center justify-center text-center gap-4 mb-8">
        <div className="flex items-center gap-2 text-secondary-950">
          <Settings2 size={15} strokeWidth={1.5} />
          <span className="text-regular-16">Available now</span>
        </div>

        <h2 className="text-white text-heading-4 font-OutfitSemiBold max-w-5xl">
          Are you ready to embark on this journey?
        </h2>

        <p className="text-white text-regular-20">
          This could be the beginning of something great.
        </p>

        {/* CTA Button with slide animation */}
        <motion.div
          initial="rest"
          whileHover="hover"
          className="relative overflow-hidden rounded-full mt-2 h-[50px] w-[180px]"
        >
          <Link
            to="/contact"
            className="bg-secondary-950 text-white px-8 rounded-full text-heading-6 font-OutfitMedium block w-full h-full"
          >
            <motion.span
              variants={{ rest: { y: 0 }, hover: { y: "-100%" } }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center text-white"
            >
              Contact Us
            </motion.span>
            <motion.span
              variants={{ rest: { y: "100%" }, hover: { y: 0 } }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center text-primary-400"
            >
              Contact Us
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-regular-18 text-gray-400 font-OutfitRegular">
          © {currentYear} Gidev Innovations. All rights reserved.
        </p>

        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.div
              key={link.label}
              className="relative overflow-hidden"
              initial="rest"
              whileHover="hover"
            >
              <motion.div
                variants={{ rest: { y: 0 }, hover: { y: "-100%" } }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Link
                  to={link.href}
                  className="text-regular-16 text-gray-400 font-OutfitLight block"
                >
                  {link.label}
                </Link>
              </motion.div>

              <motion.div
                className="absolute inset-0"
                variants={{ rest: { y: "100%" }, hover: { y: 0 } }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Link
                  to={link.href}
                  className="text-regular-16 text-primary-400 font-OutfitLight block"
                >
                  {link.label}
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
