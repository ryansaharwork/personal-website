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
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_25%,oklch(45%_.14_45/.4),transparent_50%),radial-gradient(ellipse_at_95%_95%,oklch(32%_.06_60/.5),transparent_45%)]"
      />
      <div className="relative px-5 pt-5 lg:px-14 lg:pt-10">
        <Nav back active="about" />
      </div>

      <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 pt-12 pb-20 lg:grid-cols-[380px_1fr] lg:items-start lg:gap-20 lg:px-14 lg:pt-[62px] lg:pb-16">
        <div className="flex flex-col gap-7">
          <div className="relative size-[140px] overflow-hidden rounded-full shadow-[0_0_0_3px_#0b0a09,0_0_0_5px_oklch(76%_.16_45),0_30px_60px_-20px_rgba(0,0,0,.8)] lg:size-[200px]">
            <ImageSlot src={site.photo.src} alt={site.photo.alt} label="photo" sizes="200px" priority />
          </div>
          <div>
            <h1 className="font-display text-[48px] leading-[.95] font-extrabold tracking-[-.05em] lg:text-[60px]">{site.name}</h1>
            <div className="mt-3.5 flex items-center gap-2 text-[15px] text-muted">
              <span className="glow-dot size-[7px] rounded-full bg-ember" />
              {site.location} · open to new-grad SWE roles
            </div>
          </div>
          <p className="text-[17px] leading-[1.55] text-pretty text-muted">{site.bio}</p>
          <div>
            <h2 className={`${label} mb-3`}>Skills</h2>
            <ul className="flex flex-wrap gap-2 text-sm">
              {site.skills.map((s) => (
                <li key={s} className="rounded-full border border-cream/16 px-[13px] py-[7px]">
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
              <div className="grid gap-1.5 border-y border-cream/10 py-6 sm:grid-cols-[150px_1fr] sm:gap-8">
                <div className="pt-1 text-sm text-ember">{edu.when}</div>
                <div>
                  <h3 className="font-display text-2xl leading-[1.1] font-bold tracking-[-.03em]">{edu.school}</h3>
                  <p className="mt-2 text-[15px] leading-normal text-muted">{edu.detail}</p>
                </div>
              </div>
            </Reveal>
          </section>
        </div>
      </div>
    </main>
  );
}
