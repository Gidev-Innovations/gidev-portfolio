/**
 * Mood photography used until we have our own shots of shipped work and
 * the studio. Chosen for East African urban and product-work contexts —
 * city, screens, phones, rooms — not textile motifs, wildlife, or
 * "Africa" clip art.
 *
 * People images under /public/mood are stock — not the Gidev team. Do not
 * write alt text that claims they are. Replace with real photography before
 * launch.
 *
 * Testimonial avatars live in /mood/avatars and must stay out of
 * galleryImages / ShowcaseTicker so faces do not repeat across sections.
 */

export const imagery = {
  // About hero + occasional human beat in the intro mix.
  africanProfessional: {
    src: "/mood/african-woman-portrait.jpg",
    alt: "Young African woman outdoors at dusk",
  },
  nairobiStreet: {
    src: "/mood/city-skyline.jpg",
    alt: "Dense city skyline at dusk",
  },
  urbanDusk: {
    src: "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=900&q=80",
    alt: "African city skyline at dusk",
  },
  // Kept for About service thumbnails / older refs — not a face.
  laptopWork: {
    src: "/mood/laptop-ui.jpg",
    alt: "Product interface on a laptop",
  },
  smartphone: {
    src: "/mood/phone-desk.jpg",
    alt: "Smartphone on a desk",
  },
  codeOnScreen: {
    src: "/mood/code-screen.jpg",
    alt: "Application code on a screen",
  },
  collaboration: {
    src: "/mood/african-man-outdoors.jpg",
    alt: "Young African man outdoors",
  },
  planning: {
    src: "/mood/design-board.jpg",
    alt: "Design sketches and colour samples",
  },
  checkout: {
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80",
    alt: "Card payment at a counter",
  },
  productUi: {
    src: "/mood/laptop-ui.jpg",
    alt: "Product interface on a laptop",
  },
  designBoard: {
    src: "/mood/design-board.jpg",
    alt: "Design sketches and colour samples",
  },
  serverRack: {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80",
    alt: "Server infrastructure",
  },
} as const;

/** Homepage parallax — mostly product/city, one human beat. */
export const galleryImages = [
  imagery.nairobiStreet,
  imagery.productUi,
  imagery.codeOnScreen,
  imagery.africanProfessional,
  imagery.urbanDusk,
  imagery.smartphone,
  imagery.designBoard,
  imagery.checkout,
  imagery.serverRack,
  imagery.collaboration,
];

/** Top ticker — city / product / one face / code for a varied first impression. */
export const showcaseImages = [
  imagery.nairobiStreet,
  imagery.productUi,
  imagery.africanProfessional,
  imagery.codeOnScreen,
  imagery.smartphone,
];
