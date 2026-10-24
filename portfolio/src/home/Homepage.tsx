import Hero from "./Hero";
import Process from "./Process";
import HomeServices from "./HomeServices";
import Features from "./Features";
import PaymentsBlock from "./PaymentsBlock";
import HomeFaq from "./HomeFaq";
import TechMarquee from "./TechMarquee";
import Testimonials from "./Testimonials";
import SectionDivider from "../components/SectionDivider";

export default function Homepage() {
  return (
    <div className="text-black">
      <Hero />

      <Process />
      <HomeServices />
      <SectionDivider />
      <Features />
      <PaymentsBlock />
      <TechMarquee />
      <Testimonials />
      <HomeFaq />
    </div>
  );
}
