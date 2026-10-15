import { manifest, type ImageName } from "../data/images";

type Props = {
  name: ImageName;
  alt: string;
  /** The `sizes` attribute; describe the rendered width at each breakpoint. */
  sizes: string;
  className?: string;
  /** Above-the-fold images: eager load + high fetch priority. */
  priority?: boolean;
};

const srcset = (name: string, widths: number[], ext: string) =>
  widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(", ");

export default function ResponsiveImage({ name, alt, sizes, className, priority }: Props) {
  const { width, height, widths } = manifest[name];
  const fallback = widths.find((w) => w >= 768) ?? widths[widths.length - 1];

  return (
    <picture>
      <source type="image/avif" srcSet={srcset(name, widths, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcset(name, widths, "webp")} sizes={sizes} />
      <img
        src={`/img/${name}-${fallback}.jpg`}
        srcSet={srcset(name, widths, "jpg")}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
