/** Aurora blobs + grain (pure CSS, see index.css). */
export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="hero-aurora hero-aurora-a" />
      <div className="hero-aurora hero-aurora-b" />
      <div className="hero-aurora hero-aurora-c" />
      <div className="hero-grain absolute inset-0" />
    </div>
  );
}
