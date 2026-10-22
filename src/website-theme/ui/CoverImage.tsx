import Image from "next/image";

export function CoverImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 720px",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const uploaded = src.startsWith("/media/") || src.startsWith("http");
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      unoptimized={uploaded}
      sizes={sizes}
      className={className ? `object-cover ${className}` : "object-cover"}
    />
  );
}
