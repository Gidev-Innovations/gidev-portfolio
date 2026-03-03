import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./home/Homepage";
import Services from "./services/Services";
import About from "./about/About";
import Projects from "./projects/Projects";
import Blog from "./blog/Blog";
import BlogPost from "./blog/Blogpost";
import ProjectDetails from "./projects/ProjectDetails";
import NotFound from "./not-found/NotFound";
import { ArrowUpFromDot } from "lucide-react";
import Contact from "./contact/Contact";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <div className="relative">
        <ScrollToTop />
        <Navbar />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <div
          className="animate-bounce absolute bottom-4 right-4 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="h-8 w-8 rounded-full bg-secondary-950 flex items-center justify-center">
            <ArrowUpFromDot color="#18aeb4" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
