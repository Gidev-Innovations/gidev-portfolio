import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ShowcaseTicker from "./ShowcaseTicker";
import Process from "./Process";
import HomeServices from "./HomeServices";
import Features from "./Features";
import HomeProjects from "./HomeProjects";
import Testimonials from "./Testimonials";
import HomeFaq from "./HomeFaq";
import SectionDivider from "../components/SectionDivider";

import type { Transition } from "framer-motion";

const spring: Transition = { type: "spring", stiffness: 80, damping: 18 };

export default function Homepage() {
  return (
    <div className="text-black">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 bg-white pt-40 pb-16">
        {/* Slides in from top */}
        <motion.div
          className="flex items-center gap-2.5 mb-8 rounded-full px-4 py-1.5"
          style={{
            backgroundColor: "var(--color-clay-50)",
            border: "1px solid var(--color-clay-200)",
          }}
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...spring, delay: 0 }}
        >
          <span
            className="rounded-full"
            style={{
              width: "7px",
              height: "7px",
              backgroundColor: "var(--color-clay-500)",
            }}
            aria-hidden="true"
          />
          <span
            style={{ fontSize: "15px", color: "var(--color-clay-800)" }}
          >
            Taking on new partners
          </span>
        </motion.div>

        {/* Expands from inside out */}
        <motion.h1
          className="font-black text-black max-w-4xl mx-auto mb-6"
          style={{
            fontSize: "clamp(48px, 7vw, 90px)",
            lineHeight: 0.95,
            fontWeight: 900,
            letterSpacing: "-0.02em",
          }}
          initial={{ scale: 0.6, opacity: 0, filter: "blur(8px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ ...spring, delay: 0.1 }}
        >
          Building{" "}
          <span className="bg-linear-to-r from-clay-600 to-ochre-500 bg-clip-text text-transparent">
            Africa's
          </span>{" "}
          Next
          {/* Hard breaks only once there is room for them; at 375px they
              fight the natural wrap and strand single words on a line. */}
          <br className="hidden md:inline" />
          Generation of Scalable
          <br className="hidden md:inline" />
          Digital Products
        </motion.h1>

        {/* Slides in from bottom */}
        <motion.p
          className="text-gray-500 max-w-xl mx-auto mb-10 px-2"
          style={{ fontSize: "18px", lineHeight: 1.55 }}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...spring, delay: 0.55 }}
        >
          A software studio in Nairobi building web apps, online stores, and
          mobile products for businesses across Africa.
        </motion.p>

        {/* Slides in from bottom, slightly delayed */}
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...spring, delay: 0.7 }}
        >
          <Link
            to="/contact"
            className="bg-gray-900 text-white rounded-full px-8 py-4 font-semibold hover:bg-gray-700 transition-colors duration-200"
            style={{ fontSize: "16px" }}
          >
            Book a free 15-min call
          </Link>
        </motion.div>
      </section>

      <ShowcaseTicker />
      <Process />
      <HomeServices />
      <SectionDivider />
      <Features />
      <HomeProjects />
      <SectionDivider variant="clay" />
      <Testimonials />
      <HomeFaq />
    </div>
  );
}
