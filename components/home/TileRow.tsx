import Link from "next/link";
import type { RefObject } from "react";
import type { Project } from "@/content/site";
import { AppIcon } from "@/components/AppIcon";

type Props = {
  projects: Project[];
  /** Index of the highlighted tile, or -1 at rest. */
  active: number;
  tileRefs: RefObject<(HTMLAnchorElement | null)[]>;
  onHover: (i: number) => void;
  onFocusTile: (i: number) => void;
  onSelect: (i: number) => void;
};

export function TileRow({ projects, active, tileRefs, onHover, onFocusTile, onSelect }: Props) {
  const any = active >= 0;
  return (
    <nav
      aria-label="Projects"
      className="no-scrollbar relative z-10 flex snap-x scroll-px-5 items-end gap-3 overflow-x-auto px-5 pt-8 pb-12 lg:scroll-px-14 lg:gap-4 lg:px-14 lg:pt-10 lg:pb-[clamp(2rem,7svh,4rem)]"
    >
      {projects.map((p, i) => {
        const on = i === active;
        return (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            ref={(el) => {
              tileRefs.current[i] = el;
            }}
            data-tile
            data-active={on}
            data-dim={any && !on}
            aria-current={on ? "true" : undefined}
            // Page-load stagger, after the intro text and photo.
            style={{ "--rise-delay": `${240 + i * 40}ms` } as React.CSSProperties}
            onPointerEnter={(e) => e.pointerType === "mouse" && onHover(i)}
            // Only keyboard focus selects; a tap's focus must not count as the first tap.
            onFocus={(e) => e.currentTarget.matches(":focus-visible") && onFocusTile(i)}
            onClick={(e) => {
              // Touch: the first tap highlights the tile, the second opens it.
              if (!on) {
                e.preventDefault();
                onSelect(i);
              }
            }}
            className="animate-rise group @container relative h-[10rem] w-[8.125rem] flex-none snap-start overflow-hidden rounded-[1.125rem] shadow-hairline outline-none transition-[translate,scale,box-shadow,opacity] duration-300 ease-soft [transform-origin:50%_100%] data-[active=true]:shadow-accent-ring data-[dim=true]:opacity-55 motion-safe:data-[active=true]:-translate-y-2 motion-safe:data-[active=true]:scale-105 motion-reduce:transition-[box-shadow,opacity] lg:aspect-square lg:h-auto lg:max-h-[15rem] lg:w-auto lg:min-w-[10rem] lg:flex-1 lg:basis-0 lg:rounded-[1.375rem]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-[scale] duration-[1400ms] ease-soft motion-safe:group-data-[active=true]:scale-110"
              style={{ backgroundImage: p.images.tile ? `url(${p.images.tile})` : p.art }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,color-mix(in_srgb,var(--color-ink)_75%,transparent))]" />
            {/* App icon, centered in the space above the label. No percentage heights/offsets (Safari resolves
                those against an aspect-ratio height inconsistently): a flex container centers it, the bottom padding
                keeps the label clear, and the size is explicit. On desktop the tile is square up to 240px tall, so
                min(40cqw, 96px) is 40% of the tile's height; phone tiles are a fixed 160px tall. */}
            {p.images.icon && (
              <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center pb-7 lg:pb-12">
                <AppIcon src={p.images.icon} sizes="(min-width: 1921px) 200px, 110px" className="size-16 flex-none lg:size-[min(40cqw,6rem)]" />
              </div>
            )}
            <div className="absolute right-3 bottom-3 left-3.5 lg:right-4 lg:bottom-4 lg:left-[1.125rem]">
              <div className="hidden text-[0.6875rem] font-medium tracking-[.08em] text-cream/70 uppercase lg:block">{p.kicker}</div>
              <div className="font-display text-base leading-[1.05] font-bold tracking-[-.03em] lg:mt-[0.3125rem] lg:text-xl">{p.label}</div>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
