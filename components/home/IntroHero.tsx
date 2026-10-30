import Link from "next/link";
import { site } from "@/content/site";
import { ImageSlot } from "@/components/ImageSlot";

export function IntroHero({ visible }: { visible: boolean }) {
  return (
    <section
      aria-hidden={!visible}
      inert={!visible}
      className="absolute inset-0 flex flex-col justify-end transition-opacity duration-300 ease-soft motion-reduce:transition-none"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <div className="relative h-[168px] w-[132px] flex-none overflow-hidden rounded-[18px] shadow-[0_0_0_1px_oklch(76%_.16_45/.35)] [@media(max-height:700px)]:hidden lg:order-2 lg:block lg:aspect-[3/4] lg:h-[clamp(220px,calc(100svh-520px),380px)] lg:w-auto lg:rounded-3xl lg:shadow-[0_0_0_1px_oklch(76%_.16_45/.35),0_40px_80px_-30px_rgba(0,0,0,.8)]">
          <ImageSlot src={site.photo.src} alt={site.photo.alt} label="photo of Ryan — 3:4" sizes="300px" priority />
        </div>
        <div className="max-w-[720px]">
          <h1 className="font-display text-[60px] leading-[.9] font-extrabold tracking-[-.05em] lg:text-[clamp(72px,min(7.2vw,11.5svh),104px)]">
            Hi, I&apos;m
            <br />
            {site.firstName}.
          </h1>
          <p className="mt-3.5 text-base leading-[1.4] text-pretty text-muted lg:mt-6 lg:text-[22px]">{site.introLine}</p>
          <Link
            href="/about"
            className="mt-4 inline-flex rounded-full border border-cream/22 bg-ink/35 px-3.5 py-[9px] text-sm text-cream transition-[border-color] duration-200 ease-soft hover:border-cream/50 lg:mt-[26px] lg:px-[18px] lg:py-[11px] lg:text-[15px]"
          >
            More about me →
          </Link>
          <div className="mt-[22px] hidden items-center gap-2 text-[13px] text-dim [@media(hover:hover)_and_(min-height:820px)]:flex">
            <span className="kbd">← →</span>browse projects
          </div>
        </div>
      </div>
    </section>
  );
}
