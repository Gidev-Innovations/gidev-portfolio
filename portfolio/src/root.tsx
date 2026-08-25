import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";
import type { LinksFunction } from "react-router";
import { ArrowUpFromDot } from "lucide-react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import stylesheet from "./index.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
  { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
  { rel: "shortcut icon", href: "/favicon.ico" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="font-OutfitLight">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#18aeb4" />
        <meta name="robots" content="index, follow" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="relative">
      <ScrollToTop />
      <Navbar />

      <Outlet />

      <Footer />

      <button
        type="button"
        aria-label="Scroll back to top"
        className="animate-bounce absolute bottom-4 right-4 cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <div className="h-8 w-8 rounded-full bg-secondary-950 flex items-center justify-center">
          <ArrowUpFromDot color="#18aeb4" aria-hidden="true" />
        </div>
      </button>
    </div>
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
        className="mt-2 bg-gray-900 text-white rounded-full px-8 py-4 font-semibold hover:bg-gray-700 transition-colors duration-200"
      >
        Back to home
      </a>
    </main>
  );
}
