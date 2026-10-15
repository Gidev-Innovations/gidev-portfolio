/**
 * Purely decorative geometric section break: a thin band of repeating teal
 * triangles, drawn with CSS gradients rather than imported artwork.
 *
 * Use sparingly — two or three per page at most, or it stops reading as an
 * accent and starts reading as wallpaper.
 */
export default function SectionDivider() {
  return (
    <div className="bg-white py-12" aria-hidden="true">
      <div className="gidev-stage">
        <div className="gidev-band w-full" style={{ height: "12px" }} />
      </div>
    </div>
  );
}
