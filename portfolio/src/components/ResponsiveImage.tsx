import { manifest, remoteImages, type ImageName, type LocalImageName, type RemoteImageName } from "../data/images";

type Props = {
  name: ImageName;
  alt: string;
  /** The `sizes` attribute; describe the rendered width at each breakpoint. */
  sizes: string;
  className?: string;
  /** Above-the-fold images: eager load + high fetch priority. */
  priority?: boolean;
};

const REMOTE_WIDTHS = [480, 768, 1200, 1600];

const srcset = (name: string, widths: number[], ext: string) =>
  widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(", ");

/** Cloudinary resizes and picks AVIF/WebP/JPG per browser (f_auto). */
const cloudinaryUrl = (url: string, width: number) =>
  url.replace("/upload/", `/upload/f_auto,q_auto,w_${width},c_limit/`);

const isRemote = (name: ImageName): name is RemoteImageName => name in remoteImages;

export default function ResponsiveImage({ name, alt, sizes, className, priority }: Props) {
  if (isRemote(name)) {
    const { url, width, height } = remoteImages[name];
    return (
      <img
        src={cloudinaryUrl(url, 768)}
        srcSet={REMOTE_WIDTHS.map((w) => `${cloudinaryUrl(url, w)} ${w}w`).join(", ")}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className={className}
      />
    );
  }

  const { width, height, widths } = manifest[name as LocalImageName];
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