import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

export function IntroHero({ visible }: { visible: boolean }) {
  return (
    <section
      aria-hidden={!visible}
      inert={!visible}
      className="absolute inset-0 flex flex-col justify-end transition-opacity duration-300 ease-soft motion-reduce:transition-none"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="flex flex-col gap-2 lg:h-full lg:flex-row lg:items-end lg:gap-0">
        <div className="max-w-[720px] lg:pb-1">
          <h1 className="animate-rise font-display text-[clamp(44px,14.6vw,60px)] leading-[.9] font-extrabold tracking-[-.05em] lg:text-[clamp(72px,min(7.2vw,11.5svh),104px)]">
            Hi, I&apos;m
            <br />
            {site.name}!
          </h1>
          <p className="animate-rise mt-3.5 text-base leading-[1.4] text-pretty text-muted [--rise-delay:60ms] lg:mt-6 lg:text-[22px]">
            {site.introLine}
          </p>
          <div className="animate-rise [--rise-delay:120ms]">
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

        {/* Cutout portrait on a soft ember glow. Above the text on phones; beside it, bleeding up a little, on desktop.
            Desktop: the wrapper fills the space right of the text and centers the photo in it. Equal padding on both
            sides keeps the gaps even (and at least that wide); on phones the wrapper is display:contents. */}
        <div className="contents lg:flex lg:flex-1 lg:items-end lg:justify-center lg:self-stretch lg:px-[clamp(24px,3.5vw,56px)]">
          <div className="animate-rise relative order-first aspect-[581/650] self-start lg:self-auto h-[clamp(150px,calc(100svh-560px),230px)] flex-none [--rise-delay:180ms] [@media(max-height:700px)]:hidden lg:order-none lg:block lg:h-[calc(100%+40px)] lg:max-h-[620px]">
            <div
              aria-hidden
              className="absolute -inset-[20%] bg-[radial-gradient(closest-side_at_50%_42%,oklch(62%_.17_45/.5),oklch(55%_.15_45/.2)_55%,transparent)]"
            />
            {/* Fade out the bottom so the jacket dissolves into the page instead of ending in a hard edge. */}
            <div className="absolute inset-0 [mask-image:linear-gradient(180deg,#000_66%,transparent)]">
              <Image
                src={site.photo.cutout}
                alt={site.photo.alt}
                fill
                sizes="(min-width: 1024px) 560px, 210px"
                priority
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
