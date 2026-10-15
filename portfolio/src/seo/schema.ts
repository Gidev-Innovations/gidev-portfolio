import { BUSINESS, SITE, absoluteUrl } from "../data/site";
import type { Faq } from "../data/faqs";

/**
 * JSON-LD builders. Every node that refers to the business uses the same
 * @id, so Google merges them into one entity across pages.
 */
const ORG_ID = `${SITE.url}/#organization`;

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: SITE.name,
    legalName: BUSINESS.legalName,
    url: absoluteUrl("/"),
    logo: "https://gidevtech.com/icon-512.png",
    image: `${SITE.url}${SITE.ogImage}`,
    description:
      "Software development studio in Nairobi, Kenya building web applications, e-commerce platforms with M-Pesa, Android and iOS apps, and business websites.",
    founder: { "@type": "Person", name: BUSINESS.founder },
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.locality,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.country,
    },
    areaServed: BUSINESS.areaServed.map((name) => ({ "@type": "Place", name })),
    knowsAbout: [
      "Web application development",
      "E-commerce development",
      "M-Pesa integration",
      "Mobile app development",
      "React Native",
      "UI/UX design",
    ],
    ...(BUSINESS.sameAs.length > 0 && { sameAs: BUSINESS.sameAs }),
    // TODO(human): add telephone, email, openingHoursSpecification, geo and
    // priceRange once they are published on the site. Do not add them here first.
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: absoluteUrl("/"),
    name: SITE.name,
    inLanguage: "en-KE",
    publisher: { "@id": ORG_ID },
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(service: {
  name: string;
  slug: string;
  metaDescription: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": ORG_ID },
    areaServed: BUSINESS.areaServed.map((name) => ({ "@type": "Place", name })),
  };
}

export function articleSchema(post: {
  slug: string;
  title: string;
  excerpt: string;
  isoDate: string;
  image: string;
}) {
  const image = post.image.startsWith("http") ? post.image : `${SITE.url}${post.image}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image,
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    inLanguage: "en-KE",
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE.name,
      url: absoluteUrl("/about"),
    },
    publisher: { "@id": ORG_ID },
  };
}
