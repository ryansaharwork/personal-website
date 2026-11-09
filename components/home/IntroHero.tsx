"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";

export function IntroHero({ visible }: { visible: boolean }) {
  // The full cutout fades in over its tiny inline placeholder once loaded. The ref check covers an image that
  // finished loading before React hydrated (its load event would already have fired).
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const photoRef = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) setPhotoLoaded(true);
  }, []);
  return (
    <section
      aria-hidden={!visible}
      inert={!visible}
      className="absolute inset-0 flex flex-col justify-end transition-opacity duration-300 ease-soft motion-reduce:transition-none"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="flex flex-col gap-2 lg:h-full lg:flex-row lg:items-end lg:gap-0">
        <div className="max-w-[45rem] lg:w-[45rem] lg:pb-1 lg:tall:self-center lg:tall:pb-0">
          {/* Desktop size is 1.25x the original clamp. On tall screens the block is centered, so the extra height (0.9
              line height x 20% of the new size = 0.18em) is taken back with a negative top margin: the block keeps its
              height and the button and hint stay where they were; the name grows upward into the space above. */}
          <h1 className="animate-rise font-display text-[clamp(2.75rem,14.6vw,3.75rem)] leading-[.9] font-extrabold tracking-[-.05em] text-title lg:text-[clamp(5.625rem,min(9vw,14.375svh),8.125rem)] lg:tall:-mt-[0.18em]">
            {site.name}
          </h1>
          <p className="animate-rise mt-3.5 text-base leading-[1.4] text-pretty text-muted [--rise-delay:60ms] lg:mt-6 lg:text-[1.375rem]">
            {site.introLine}
          </p>
          <div className="animate-rise [--rise-delay:120ms]">
            <Link
              href="/about"
              className="mt-4 inline-flex glass rounded-full border px-3.5 py-[0.5625rem] text-sm text-cream transition-[border-color] duration-200 ease-soft hover:border-white/35 lg:mt-[1.625rem] lg:px-[1.125rem] lg:py-[0.6875rem] lg:text-[0.9375rem]"
            >
              More about me →
            </Link>
            <div className="mt-[1.375rem] hidden items-center gap-2 text-[0.8125rem] text-dim [@media(hover:hover)_and_(min-height:820px)]:flex">
              <span className="kbd">← →</span>browse projects
            </div>
          </div>
        </div>

        {/* Cutout portrait in a soft white studio spotlight. Above the text on phones; beside it, bleeding up a little, on desktop.
            Desktop: the wrapper fills the space right of the text and centers the photo in it. Equal padding on both
            sides keeps the gaps even (and at least that wide); on phones the wrapper is display:contents. */}
        <div className="contents lg:flex lg:flex-1 lg:items-end lg:justify-center lg:self-stretch lg:px-[clamp(1.5rem,3.5vw,3.5rem)]">
          <div className="animate-rise relative order-first aspect-[581/650] self-start lg:self-auto h-[clamp(9.375rem,calc(100svh-35rem),14.375rem)] flex-none [--rise-delay:180ms] [@media(max-height:700px)]:hidden lg:order-none lg:block lg:h-[calc(100%+2.5rem)] max-h-[var(--photo-cap)] lg:max-h-[min(38.75rem,var(--photo-cap))]"
            // Never larger than half the image's pixels (sharp at 2x DPR). In px on purpose: it must not grow with
            // the root-size scaling on large screens. Width follows the aspect ratio.
            style={{ "--photo-cap": `${site.photo.cutoutSize[1] / 2}px` } as React.CSSProperties}
          >
            <div
              aria-hidden
              className="absolute -inset-[20%] bg-[radial-gradient(closest-side_at_50%_40%,var(--glow-photo),var(--glow-photo-soft)_55%,transparent)]"
            />
            {/* Fade out the bottom so the jacket dissolves into the page instead of ending in a hard edge. */}
            <div className="absolute inset-0 [mask-image:linear-gradient(180deg,#000_66%,transparent)]">
              {/* Inline ~400-byte placeholder: paints with the page, no request. Blurred so the 24px image reads as a
                  soft silhouette; transparent around the figure, so it sits on the glow. */}
              <img
                data-photo-placeholder
                src={site.photo.cutoutPlaceholder}
                alt=""
                aria-hidden
                className="absolute inset-0 size-full object-contain object-bottom blur-[0.6rem] transition-opacity duration-500 ease-soft"
                style={{ opacity: photoLoaded ? 0 : 1 }}
              />
              {/* Highest-priority image on the page; sizes picks ~828px on a 2x laptop, the full file only at 3840. */}
              <Image
                ref={photoRef}
                data-photo-full
                src={site.photo.cutout}
                alt={site.photo.alt}
                fill
                sizes="(min-width: 1921px) 1100px, (min-width: 1600px) 560px, (min-width: 1024px) 400px, 210px"
                preload
                fetchPriority="high"
                loading="eager"
                // next/image also calls onLoad after a failed load (it awaits decode() and ignores the rejection), so
                // only count it if the image has pixels; on failure the placeholder stays and the broken image stays hidden.
                onLoad={(e) => e.currentTarget.naturalWidth > 0 && setPhotoLoaded(true)}
                className="object-contain object-bottom transition-opacity duration-400 ease-soft"
                style={{ opacity: photoLoaded ? 1 : 0 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
