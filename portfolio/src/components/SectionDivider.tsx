/**
 * Purely decorative geometric section break.
 *
 * A thin band of repeating triangles, drawn with CSS gradients rather than
 * imported artwork. The `tri` variant blocks the band out into three unequal
 * segments of clay, ochre, and teal — deliberate colour blocking rather than a
 * repeating multi-colour print, which is what keeps it from reading as a
 * literal textile motif.
 *
 * Use sparingly — two or three per page at most, or it stops reading as an
 * accent and starts reading as wallpaper.
 */
const SEGMENTS = [
  { width: "46%", className: "gidev-band" },
  { width: "32%", className: "gidev-band gidev-band-ochre" },
  { width: "22%", className: "gidev-band gidev-band-teal" },
];

export default function SectionDivider({
  variant = "tri",
}: {
  variant?: "tri" | "clay";
}) {
  return (
    <div className="bg-white py-12" aria-hidden="true">
      <div className="gidev-stage flex">
        {variant === "clay" ? (
          <div className="gidev-band w-full" style={{ height: "12px" }} />
        ) : (
          SEGMENTS.map((segment) => (
            <div
              key={segment.className}
              className={segment.className}
              style={{ width: segment.width, height: "12px" }}
            />
          ))
        )}
      </div>
    </div>
  );
}
