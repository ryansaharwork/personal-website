"use client";

import Image from "next/image";
import { useState } from "react";
import type { PhoneScreen } from "@/content/site";
import { IPhoneFrame } from "./IPhoneFrame";

// Fan positions at the design's 0.65 scale; x offsets scale with --s.
const FAN = [
  { r: -9, x: 60, s: 0.9, z: 1 },
  { r: 0, x: 0, s: 1, z: 2 },
  { r: 9, x: -60, s: 0.9, z: 1 },
];

/**
 * Three phones, fanned with the middle one forward. The hovered (or tapped)
 * phone lifts in place, grows slightly and straightens; the others dim and ease back.
 */
export function PhoneFan({ screens, appName }: { screens: PhoneScreen[]; appName: string }) {
  const [hot, setHot] = useState(-1);

  return (
    <div
      className="flex items-end justify-center [--s:.36] sm:[--s:.5] lg:[--s:.42] xl:[--s:.55] min-[1360px]:[--s:.65]"
      onPointerLeave={(e) => e.pointerType === "mouse" && setHot(-1)}
    >
      {screens.slice(0, 3).map((screen, i) => {
        const b = FAN[i];
        const h = hot === i;
        const other = hot >= 0 && !h;
        const scale = h ? b.s + 0.06 : other ? b.s - 0.03 : b.s;
        return (
          <div
            key={screen.title}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHot(i)}
            onClick={() => setHot((v) => (v === i ? -1 : i))}
            className="relative flex-none cursor-pointer transition-[transform,opacity] duration-[350ms] ease-soft [transform-origin:50%_100%] [filter:drop-shadow(0_40px_60px_rgba(0,0,0,.7))] motion-reduce:transform-none! motion-reduce:transition-[opacity]"
            style={{
              width: "calc(402px * var(--s))",
              height: "calc(874px * var(--s))",
              margin: "0 calc(-46px * var(--s))",
              transform: `translateX(calc(${b.x / 0.65}px * var(--s))) translateY(calc(${h ? -16 / 0.65 : 0}px * var(--s))) scale(${scale}) rotate(${h ? 0 : b.r}deg)`,
              opacity: other ? 0.55 : 1,
              zIndex: h ? 3 : b.z,
            }}
          >
            <div className="w-[402px] origin-top-left" style={{ transform: "scale(var(--s))" }}>
              <IPhoneFrame>
                {screen.src ? (
                  <div className="relative h-full">
                    <Image src={screen.src} alt={`${appName} — ${screen.title} screen`} fill sizes="262px" className="object-cover" />
                  </div>
                ) : (
                  <PlaceholderScreen screen={screen} appName={appName} />
                )}
              </IPhoneFrame>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PlaceholderScreen({ screen, appName }: { screen: PhoneScreen; appName: string }) {
  const tile = "aspect-[3/4] rounded-[10px] bg-[repeating-linear-gradient(135deg,#1f1a14_0_8px,#26201a_8px_16px)]";
  return (
    <div className="h-full bg-[#0f0d0b] px-5 pt-[70px] text-cream" aria-label={`${screen.title} screenshot placeholder`}>
      <div className="flex items-baseline justify-between">
        <span className="text-[34px] font-semibold tracking-[-.02em]">{screen.title}</span>
        <span className="text-[15px] text-ember">{appName}</span>
      </div>
      <div className="mt-[18px] flex h-10 items-center rounded-xl bg-[#1c1813] px-3.5 text-[15px] text-[#7a7067]">{screen.hint}</div>
      <div className="mt-[26px] grid grid-cols-3 gap-3">
        <div className={tile} />
        <div className={tile} />
        <div className={tile} />
      </div>
      <div className="mt-[22px] flex flex-col gap-3">
        <div className="h-[58px] rounded-[10px] bg-[#1c1813]" />
        <div className="h-[58px] rounded-[10px] bg-[#1c1813]" />
        <div className="h-[58px] rounded-[10px] bg-[#1c1813]" />
      </div>
    </div>
  );
}
