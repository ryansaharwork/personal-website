"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import type { PhoneScreen } from "@/content/site";
import { IPhoneFrame } from "./IPhoneFrame";

// Fan positions at the design's 0.65 scale; x offsets scale with --s.
const FAN = [
  { r: -9, x: 60, s: 0.9, z: 1 },
  { r: 0, x: 0, s: 1, z: 2 },
  { r: 9, x: -60, s: 0.9, z: 1 },
];

/** The fan's footprint at --s = 1 (in CSS px at the default 16px root), including rotation and hover lift. */
const FOOTPRINT = { w: 1000, h: 920 };
const MAX_S = 0.65;
/** Below this the phones are too small to read, so a fitted fan hides instead. */
const MIN_S = 0.14;

type Props = {
  screens: PhoneScreen[];
  appName: string;
  /** Scale to fill the nearest `[data-fit-box]` ancestor (which must not size itself from the fan). */
  fit?: boolean;
  /** Hover/tap lifts a phone and dims the others. Off for decorative copies. */
  interactive?: boolean;
};

/**
 * Three phones, fanned with the middle one forward. The hovered (or tapped)
 * phone lifts in place, grows slightly and straightens; the others dim and ease back.
 */
export function PhoneFan({ screens, appName, fit = false, interactive = true }: Props) {
  const [hot, setHot] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const box = el?.closest<HTMLElement>("[data-fit-box]");
    if (!fit || !el || !box) return;
    const apply = () => {
      const { width, height } = box.getBoundingClientRect();
      // Phones are sized in rem, so on large screens (root font > 16px) their footprint grows with it.
      const root = parseFloat(getComputedStyle(document.documentElement).fontSize) / 16 || 1;
      const s = Math.min(height / (FOOTPRINT.h * root), width / (FOOTPRINT.w * root), MAX_S);
      el.style.setProperty("--s", String(Math.max(s, MIN_S)));
      el.style.visibility = s < MIN_S ? "hidden" : "";
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(box);
    return () => ro.disconnect();
  }, [fit]);

  return (
    <div
      ref={ref}
      className={`flex items-end justify-center ${fit ? "" : "[--s:.36] sm:[--s:.5] lg:[--s:.42] xl:[--s:.55] min-[1360px]:[--s:.65]"}`}
      onPointerLeave={interactive ? (e) => e.pointerType === "mouse" && setHot(-1) : undefined}
    >
      {screens.slice(0, 3).map((screen, i) => {
        const b = FAN[i];
        const h = hot === i;
        const other = hot >= 0 && !h;
        const scale = h ? b.s + 0.06 : other ? b.s - 0.03 : b.s;
        return (
          <div
            key={screen.title}
            onPointerEnter={interactive ? (e) => e.pointerType === "mouse" && setHot(i) : undefined}
            onClick={interactive ? () => setHot((v) => (v === i ? -1 : i)) : undefined}
            className={`relative flex-none transition-[transform,opacity] duration-[350ms] ease-soft [transform-origin:50%_100%] motion-reduce:transform-none! motion-reduce:transition-[opacity] ${interactive ? "cursor-pointer" : ""}`}
            style={{
              // rem (402×874 at the 16px root) so the fan scales with the root size on large screens.
              width: "calc(25.125rem * var(--s))",
              height: "calc(54.625rem * var(--s))",
              margin: "0 calc(-2.875rem * var(--s))",
              transform: `translateX(calc(${b.x / 0.65 / 16}rem * var(--s))) translateY(calc(${h ? -1 / 0.65 : 0}rem * var(--s))) scale(${scale}) rotate(${h ? 0 : b.r}deg)`,
              opacity: other ? 0.55 : 1,
              zIndex: h ? 3 : b.z,
            }}
          >
            <div className="w-[25.125rem] origin-top-left" style={{ transform: "scale(var(--s))" }}>
              <IPhoneFrame>
                {screen.src ? (
                  <div className="relative h-full">
                    {/* Eager and decoded up front, so the page is ready when a view transition snapshots it.
                        Same `sizes` on both pages, so the homepage copy warms the cache for the project page. */}
                    <Image
                      src={screen.src}
                      alt={`${appName} — ${screen.title} screen`}
                      fill
                      sizes="(min-width: 1921px) 470px, 262px"
                      loading="eager"
                      decoding="sync"
                      preload={!fit}
                      // On the homepage (fit) the fan is hidden until a project is selected: load it, but after the headshot.
                      fetchPriority={fit ? "low" : undefined}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <PlaceholderScreen screen={screen} appName={appName} />
                )}
                {/* Side phones sit slightly darker, for depth without a blurred shadow. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-[55] bg-black/20 transition-opacity duration-[350ms] ease-soft"
                  style={{ opacity: i !== 1 && !h ? 1 : 0 }}
                />
              </IPhoneFrame>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PlaceholderScreen({ screen, appName }: { screen: PhoneScreen; appName: string }) {
  const tile = "aspect-[3/4] rounded-[0.625rem] bg-[repeating-linear-gradient(135deg,#1f1a14_0_0.5rem,#26201a_0.5rem_1rem)]";
  return (
    <div className="h-full bg-[#0f0d0b] px-5 pt-[4.375rem] text-cream" aria-label={`${screen.title} screenshot placeholder`}>
      <div className="flex items-baseline justify-between">
        <span className="text-[2.125rem] font-semibold tracking-[-.02em]">{screen.title}</span>
        <span className="text-[0.9375rem] text-ember">{appName}</span>
      </div>
      <div className="mt-[1.125rem] flex h-10 items-center rounded-xl bg-[#1c1813] px-3.5 text-[0.9375rem] text-[#7a7067]">{screen.hint}</div>
      <div className="mt-[1.625rem] grid grid-cols-3 gap-3">
        <div className={tile} />
        <div className={tile} />
        <div className={tile} />
      </div>
      <div className="mt-[1.375rem] flex flex-col gap-3">
        <div className="h-[3.625rem] rounded-[0.625rem] bg-[#1c1813]" />
        <div className="h-[3.625rem] rounded-[0.625rem] bg-[#1c1813]" />
        <div className="h-[3.625rem] rounded-[0.625rem] bg-[#1c1813]" />
      </div>
    </div>
  );
}
