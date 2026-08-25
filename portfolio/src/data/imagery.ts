/**
 * Mood photography used until we have our own shots of shipped work and
 * the studio. Chosen for East African urban and product-work contexts —
 * city, screens, phones, rooms — not textile motifs, wildlife, or
 * "Africa" clip art.
 *
 * People images are self-hosted under /public/mood so we never ship stale
 * Unsplash preloads from an old prerender. These are not photographs of
 * the Gidev team. Do not write alt text that claims they are. Replace with
 * real photography before launch.
 */

export const imagery = {
  // Warm, people-first lead image for the homepage ticker and About hero.
  africanProfessional: {
    src: "/mood/african-woman-portrait.jpg",
    alt: "Young African woman outdoors at dusk",
  },
  nairobiStreet: {
    src: "https://images.unsplash.com/photo-1523805009345-7448845a9b2e?w=900&q=80",
    alt: "Street in Nairobi, Kenya",
  },
  urbanDusk: {
    src: "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=900&q=80",
    alt: "African city skyline at dusk",
  },
  laptopWork: {
    src: "/mood/african-woman-smile.jpg",
    alt: "African woman smiling in a bright workspace",
  },
  smartphone: {
    src: "/mood/african-man-portrait.jpg",
    alt: "African man smiling at the camera",
  },
  codeOnScreen: {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80",
    alt: "Application code on a screen",
  },
  collaboration: {
    src: "/mood/african-man-outdoors.jpg",
    alt: "Young African man outdoors",
  },
  planning: {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80",
    alt: "Planning session around a table",
  },
  checkout: {
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80",
    alt: "Card payment at a counter",
  },
  productUi: {
    src: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&q=80",
    alt: "Product interface on a laptop",
  },
  designBoard: {
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=80",
    alt: "Design sketches and colour samples",
  },
  serverRack: {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80",
    alt: "Server infrastructure",
  },
} as const;

export const galleryImages = [
  imagery.africanProfessional,
  imagery.nairobiStreet,
  imagery.urbanDusk,
  imagery.laptopWork,
  imagery.smartphone,
  imagery.codeOnScreen,
  imagery.collaboration,
  imagery.planning,
  imagery.checkout,
  imagery.productUi,
  imagery.designBoard,
  imagery.serverRack,
];
