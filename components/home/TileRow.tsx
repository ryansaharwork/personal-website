import Link from "next/link";
import type { RefObject } from "react";
import type { Project } from "@/content/site";

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
      onMouseLeave={() => onHover(-1)}
      className="no-scrollbar relative z-10 flex snap-x scroll-px-5 items-end gap-3 overflow-x-auto px-5 pt-8 pb-12 lg:scroll-px-14 lg:gap-4 lg:px-14 lg:pt-10 lg:pb-[clamp(32px,7svh,64px)]"
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
            className="group relative h-[160px] w-[130px] flex-none snap-start overflow-hidden rounded-[18px] shadow-hairline outline-none transition-[translate,scale,box-shadow,opacity] duration-300 ease-soft [transform-origin:50%_100%] data-[active=true]:shadow-ember-ring data-[dim=true]:opacity-55 motion-safe:data-[active=true]:-translate-y-2 motion-safe:data-[active=true]:scale-105 motion-reduce:transition-[box-shadow,opacity] lg:h-[240px] lg:w-[240px] lg:rounded-[22px]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-[scale] duration-[1400ms] ease-soft motion-safe:group-data-[active=true]:scale-110"
              style={{ backgroundImage: p.images.tile ? `url(${p.images.tile})` : p.art }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(11,10,9,.75))]" />
            <div className="absolute right-3 bottom-3 left-3.5 lg:right-4 lg:bottom-4 lg:left-[18px]">
              <div className="hidden text-[11px] font-medium tracking-[.08em] text-cream/70 uppercase lg:block">{p.kicker}</div>
              <div className="font-display text-base leading-[1.05] font-bold tracking-[-.03em] lg:mt-[5px] lg:text-xl">{p.label}</div>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
