import Image from "next/image";

type Props = { src: string; sizes: string; className?: string };

/**
 * An app icon. The image carries its own iOS-style rounded corners and transparent background, so it isn't
 * clipped here; the wrapper only adds a soft shadow with a matching corner radius (iOS's 22.37%).
 */
export function AppIcon({ src, sizes, className = "" }: Props) {
  return (
    <span
      className={`relative block aspect-square rounded-[22.37%] shadow-[0_6px_16px_rgba(0,0,0,.35),0_1px_3px_rgba(0,0,0,.3)] ${className}`}
    >
      <Image src={src} alt="" fill sizes={sizes} className="object-contain" />
    </span>
  );
}
