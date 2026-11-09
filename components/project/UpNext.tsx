import Link from "next/link";
import type { Project } from "@/content/site";
import { Reveal } from "@/components/Reveal";

export function UpNext({ projects }: { projects: Project[] }) {
  return (
    <Reveal className="mt-20 border-t border-cream/10 pt-10 lg:mt-24">
      <div className="mb-5 flex items-baseline justify-between">
        <h2 className="font-display text-[1.75rem] font-bold tracking-[-.03em]">Up next</h2>
        <Link href="/" className="text-sm text-dim transition-colors hover:text-cream">
          All projects →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-cover bg-center shadow-hairline transition-[translate,box-shadow] duration-300 ease-soft hover:shadow-accent-ring focus-visible:shadow-accent-ring focus-visible:outline-none motion-safe:hover:-translate-y-1.5"
            style={{ backgroundImage: p.images.tile ? `url(${p.images.tile})` : p.art }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,color-mix(in_srgb,var(--color-ink)_75%,transparent))]" />
            <div className="absolute right-4 bottom-4 left-[1.125rem]">
              <div className="text-[0.6875rem] font-medium tracking-[.08em] text-cream/70 uppercase">{p.kicker}</div>
              <div className="mt-[0.3125rem] font-display text-lg leading-[1.05] font-bold tracking-[-.03em] lg:text-xl">{p.label}</div>
            </div>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
