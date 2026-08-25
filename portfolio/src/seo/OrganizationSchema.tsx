import { SITE, absoluteUrl } from "../data/site";

/**
 * Organization JSON-LD for the homepage.
 *
 * Rendered as a literal <script> rather than relying on React 19's metadata
 * hoisting: React only hoists <title>, <meta>, <link> and async <script src>,
 * so an inline ld+json block stays where it is placed. That's fine — search
 * engines accept JSON-LD anywhere in the document.
 *
 * Deliberately Organization and not LocalBusiness: LocalBusiness requires a
 * verifiable street address and opening hours. Add those fields (and switch
 * @type) only once there is a real published address to back them up.
 */
const schema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: absoluteUrl("/"),
  logo: `${SITE.url}/android-chrome-512x512.png`,
  description:
    "Software development studio building web applications, e-commerce platforms, mobile apps, and business systems for teams across Africa.",
  founder: {
    "@type": "Person",
    name: "Joseph Macharia",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  areaServed: {
    "@type": "Place",
    name: "Africa",
  },
  knowsAbout: [
    "Web application development",
    "E-commerce development",
    "Mobile app development",
    "Business systems",
    "UI/UX design",
  ],
  // TODO [NEEDS REAL CONTENT]: add `sameAs` with real social profile URLs
  // (LinkedIn, GitHub, X) and `contactPoint` with a real business email or
  // phone number. Both strengthen the knowledge panel; neither should be
  // guessed.
};

export default function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
