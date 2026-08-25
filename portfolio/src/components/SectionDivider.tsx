/**
 * Purely decorative geometric section break.
 *
 * A thin band of repeating triangles in clay, ochre, and teal, drawn with CSS
 * gradients rather than imported artwork. Deliberately restrained: it marks a
 * transition between sections, it is not a background treatment.
 *
 * Use sparingly — two or three per page at most, or it stops reading as an
 * accent and starts reading as wallpaper.
 */
export default function SectionDivider({
  variant = "tri",
}: {
  variant?: "tri" | "clay";
}) {
  return (
    <div className="bg-white px-8 py-10" aria-hidden="true">
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        <div
          className={variant === "tri" ? "gidev-band-tri" : "gidev-band"}
          style={{ height: "10px" }}
        />
      </div>
    </div>
  );
}
