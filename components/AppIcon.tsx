import Image from "next/image";

type Props = {
  src: string;
  sizes: string;
  className?: string;
  /** Off when the shadow is drawn separately (e.g. outside a morphing view-transition element). */
  shadow?: boolean;
};

/** Soft shadow with the icon's corner radius. Exported so a separate shadow layer can match it. */
export const ICON_SHADOW = "shadow-[0_0.375rem_1rem_rgba(0,0,0,.35),0_1px_0.1875rem_rgba(0,0,0,.3)]";

/**
 * An app icon. The image carries its own iOS-style rounded corners and transparent background, so it isn't
 * clipped here; the wrapper only adds a soft shadow with a matching corner radius (iOS's 22.37%).
 */
export function AppIcon({ src, sizes, className = "", shadow = true }: Props) {
  return (
    <span
      className={`relative block aspect-square rounded-[22.37%] ${shadow ? ICON_SHADOW : ""} ${className}`}
    >
      <Image src={src} alt="" fill sizes={sizes} className="object-contain" />
    </span>
  );
}
