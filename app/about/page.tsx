import type { Metadata } from "next";
import { site } from "@/content/site";
import { ImageSlot } from "@/components/ImageSlot";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { Timeline } from "@/components/about/Timeline";

export const metadata: Metadata = {
  title: "About",
  description: site.bio,
};

const label = "text-xs tracking-[.06em] text-dim uppercase";

export default function AboutPage() {
  const edu = site.education;
  return (
    <main className="relative min-h-svh overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_25%,var(--glow-about),transparent_50%),radial-gradient(ellipse_at_95%_95%,var(--glow-about-2),transparent_45%)]"
      />
      {/* Solid ink at the very top and bottom, so the overscroll area continues the page. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 edge-fade-top lg:h-44" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-32 edge-fade-bottom lg:h-44" />
      <div className="relative mx-auto max-w-site px-5 pt-5 lg:px-14 lg:pt-10">
        <Nav back active="about" />
      </div>

      <div className="relative mx-auto grid max-w-site gap-14 px-5 pt-12 pb-20 lg:grid-cols-[23.75rem_1fr] lg:items-start lg:gap-20 lg:px-14 lg:pt-[3.875rem] lg:pb-16">
        <div className="flex flex-col gap-7">
          <div
            className="relative size-[8.75rem] max-h-[var(--photo-cap)] max-w-[var(--photo-cap)] overflow-hidden rounded-full shadow-[0_0_0_0.1875rem_var(--color-ink),0_0_0_0.3125rem_var(--color-accent),0_1.875rem_3.75rem_-1.25rem_rgba(0,0,0,.8)] lg:size-[12.5rem]"
            // The circle shows the photo's full width: cap it at half the image's pixels (sharp at 2x DPR), in px.
            style={{ "--photo-cap": `${site.photo.srcSize[0] / 2}px` } as React.CSSProperties}
          >
            {/* The 3:4 photo is cropped to a circle here; bias it up so the whole head stays in frame. */}
            <ImageSlot src={site.photo.src} alt={site.photo.alt} label="photo" sizes="(min-width: 1921px) 360px, 200px" priority position="50% 15%" />
          </div>
          <div>
            <h1 className="font-display text-[3rem] leading-[.95] font-extrabold tracking-[-.05em] lg:text-[3.75rem]">{site.name}</h1>
            <div className="mt-3.5 flex items-center gap-2 text-[0.9375rem] text-muted">
              <span className="glow-dot size-[0.4375rem] rounded-full bg-accent" />
              {site.location} · open to new-grad SWE roles
            </div>
          </div>
          <p className="text-[1.0625rem] leading-[1.55] text-pretty text-muted">{site.bio}</p>
          <div>
            <h2 className={`${label} mb-3`}>Skills</h2>
            <ul className="flex flex-wrap gap-2 text-sm">
              {site.skills.map((s) => (
                <li key={s} className="rounded-full border border-cream/16 px-[0.8125rem] py-[0.4375rem]">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:pt-2">
          <section>
            <h2 className={`${label} mb-1.5`}>Experience</h2>
            <Timeline items={site.experience} />
          </section>
          <section>
            <h2 className={`${label} mb-1.5`}>Education</h2>
            <Reveal delay={site.experience.length * 110} distance={18}>
              <div className="grid gap-1.5 border-y border-cream/10 py-6 sm:grid-cols-[9.375rem_1fr] sm:gap-8">
                <div className="pt-1 text-sm text-kicker">{edu.when}</div>
                <div>
                  <h3 className="font-display text-2xl leading-[1.1] font-bold tracking-[-.03em]">{edu.school}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-normal text-muted">{edu.detail}</p>
                </div>
              </div>
            </Reveal>
          </section>
        </div>
      </div>
    </main>
  );
}
