import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ShowcaseTicker from "./ShowcaseTicker";
import Process from "./Process";
import HomeServices from "./HomeServices";
import Features from "./Features";
import HomeProjects from "./HomeProjects";
import Testimonials from "./Testimonials";
import HomeFaq from "./HomeFaq";

import type { Transition } from "framer-motion";

const spring: Transition = { type: "spring", stiffness: 80, damping: 18 };

export default function Homepage() {
  return (
    <div className="text-black">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 bg-white pt-40 pb-16">
        {/* Slides in from top */}
        <motion.div
          className="flex items-center gap-2 text-gray-500 mb-8"
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...spring, delay: 0 }}
        >
          <Settings size={14} strokeWidth={1.5} />
          <span style={{ fontSize: "16px" }}>Taking New Partners</span>
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
          Building Africa's Next
          <br />
          Generation of Scalable
          <br />
          Digital Products
        </motion.h1>

        {/* Slides in from bottom */}
        <motion.p
          className="text-gray-500 max-w-md mx-auto mb-10"
          style={{ fontSize: "18px", lineHeight: 1.5 }}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...spring, delay: 0.55 }}
        >
          A technology studio building world-class software for ambitious teams.
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
            Book A Call
          </Link>
        </motion.div>
      </section>

      <ShowcaseTicker />
      <Process />
      <HomeServices />
      <Features />
      <HomeProjects />
      <Testimonials />
      <HomeFaq />
    </div>
  );
}
