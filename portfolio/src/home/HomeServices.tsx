import { Settings } from "lucide-react";
import ParallaxGallery from "../components/ParallaxGallery";

export default function HomeServices() {
  return (
    <>
      {/* Header */}
      <section className="bg-white text-center px-6 pt-20 pb-10">
        <div className="flex items-center justify-center gap-2 text-gray-500 mb-4">
          <Settings size={13} strokeWidth={1.5} />
          <span style={{ fontSize: "13px" }}>Services</span>
        </div>

        <h2
          className="font-black text-black mx-auto mb-4"
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: "600px",
          }}
        >
          Apps, websites,
          <br />
          logos and more
        </h2>

        <p
          className="text-gray-400 mx-auto"
          style={{ fontSize: "15px", lineHeight: 1.6, maxWidth: "380px" }}
        >
          Discover all your essentials in one convenient location.
        </p>
      </section>

      <ParallaxGallery />
    </>
  );
}
