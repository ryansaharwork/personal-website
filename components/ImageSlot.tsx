import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** Shown in the placeholder box until `src` is set. */
  label: string;
  sizes?: string;
  priority?: boolean;
  /** CSS object-position, e.g. "50% 15%" to keep a face in frame when the crop is tighter than the image. */
  position?: string;
};

/** Fills its (relatively positioned) parent with an image, or a labelled placeholder. */
export function ImageSlot({ src, alt, label, sizes = "100vw", priority, position }: Props) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={position ? { objectPosition: position } : undefined}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className="absolute inset-0 flex items-center justify-center bg-[repeating-linear-gradient(135deg,#1f1a14_0_10px,#26201a_10px_20px)] p-3 text-center font-mono text-[11px] text-dim"
    >
      {label}
    </div>
  );
}
