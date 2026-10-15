import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLocation,
  useRouteError,
} from "react-router";
import type { LinksFunction } from "react-router";
import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { ArrowUp } from "lucide-react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { scanReveals } from "./lib/reveal";
import stylesheet from "./index.css?url";
import outfitLight from "./assets/fonts/OUTFITLIGHT.woff2?url";
import outfitSemibold from "./assets/fonts/OUTFITSEMIBOLD.woff2?url";
import outfitBold from "./assets/fonts/OUTFITBOLD.woff2?url";

export const links: LinksFunction = () => [
  { rel: "preload", href: outfitLight, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
  { rel: "preload", href: outfitSemibold, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
  { rel: "preload", href: outfitBold, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
  { rel: "author", href: "/humans.txt" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-KE" className="font-Outfit font-light">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#18aeb4" />
        <meta name="robots" content="index, follow" />
        <Meta />
        <Links />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-100 focus:bg-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-ink shadow-lg transition-opacity duration-200 cursor-pointer ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp size={20} className="text-brand" aria-hidden="true" />
    </button>
  );
}

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    scanReveals();
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative">
        <ScrollToTop />
        <Navbar />

        <main id="main">
          <Outlet />
        </main>

        <Footer />
        <BackToTop />
      </div>
    </MotionConfig>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  const title = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : "Something went wrong";

  const message = isRouteErrorResponse(error)
    ? error.status === 404
      ? "We couldn't find the page you were looking for."
      : error.data
    : "An unexpected error occurred. Please try again.";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-950">{title}</h1>
      <p className="text-gray-500 max-w-md">{message}</p>
      <a
        href="/"
        className="mt-2 bg-gray-900 text-white rounded-full px-8 py-4 font-semibold hover:bg-brand-dark transition-colors duration-200"
      >
        Back to home
      </a>
    </main>
  );
}
