import Image from "next/image";
import { Fragment } from "react";
import type { PhoneScreen, Project } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { IPhoneFrame } from "./IPhoneFrame";

const label = "mb-5 text-xs font-medium tracking-[.08em] text-kicker uppercase";
const card = "rounded-[1.125rem] border border-cream/10 bg-panel shadow-card";

export function WriteUp({ project }: { project: Project }) {
  const w = project.writeup;
  return (
    <div id="write-up" className="scroll-mt-6">
      <Reveal className="pt-6 lg:pt-10">
        <h2 className={label}>What it is</h2>
        <div className="grid gap-5 md:grid-cols-2 md:gap-10">
          <p className="font-display text-[1.875rem] leading-[1.02] font-bold tracking-[-.04em] text-pretty lg:text-[2.5rem]">{w.whatHead}</p>
          {/* Phones: headline, text, phone. Wider: text spans the right column; the phone sits under the headline. */}
          <p className="text-[1.0625rem] leading-normal text-pretty text-muted md:col-start-2 md:row-span-2 md:row-start-1 md:self-start md:pt-1.5 lg:text-[1.1875rem]">
            {w.what}
          </p>
          {w.whatScreen && <WhatScreen screen={w.whatScreen} appName={project.title} />}
        </div>
      </Reveal>

      <Reveal className="pt-14 lg:pt-[4.5rem]">
        <h2 className={label}>Architecture</h2>
        <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center md:gap-3">
          {w.arch.map((n, i) => (
            <Fragment key={n.title + i}>
              {i > 0 && (
                <div aria-hidden className="flex-none self-center text-lg text-kicker">
                  <span className="md:hidden">↓</span>
                  <span className="hidden md:inline">→</span>
                </div>
              )}
              <div className={`${card} flex-1 px-6 py-[1.375rem]`}>
                <div className="font-display text-[1.375rem] font-bold tracking-[-.03em]">{n.title}</div>
                <div className="mt-1.5 text-sm leading-[1.45] text-dim">{n.detail}</div>
              </div>
            </Fragment>
          ))}
        </div>
        {w.archNote && <p className="mt-3.5 text-sm text-dim">{w.archNote}</p>}
      </Reveal>

      <Reveal className="pt-14 lg:pt-[4.5rem]">
        <h2 className={label}>Hardest problems</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {w.problems.map((c, i) => (
            <div
              key={c.title + i}
              className={`${card} flex min-h-[12.5rem] flex-col justify-between gap-4 rounded-[1.375rem] p-7`}
            >
              <div className="font-mono text-[0.8125rem] text-kicker">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="font-display text-2xl leading-[1.05] font-bold tracking-[-.03em]">{c.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-normal text-pretty text-muted">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="pt-14 lg:pt-[4.5rem]">
        <h2 className={label}>What I&apos;d do next</h2>
        <div className="grid md:grid-cols-2 md:gap-10">
          <p className="text-[1.0625rem] leading-normal text-pretty text-muted lg:text-[1.1875rem]">{w.next}</p>
        </div>
      </Reveal>
    </div>
  );
}

/** A small framed phone under the "What it is" headline, matching the fan in the hero. */
function WhatScreen({ screen, appName }: { screen: PhoneScreen; appName: string }) {
  return (
    <figure className="mt-3 [--s:.42] md:col-start-1 md:row-start-2 md:mt-0 lg:[--s:.5]">
      <div
        className="[filter:drop-shadow(0_1.875rem_2.8125rem_rgba(0,0,0,.6))]"
        style={{ width: "calc(25.125rem * var(--s))", height: "calc(54.625rem * var(--s))" }}
      >
        <div className="w-[25.125rem] origin-top-left" style={{ transform: "scale(var(--s))" }}>
          <IPhoneFrame>
            <div className="relative h-full">
              <Image src={screen.src} alt={`${appName} — ${screen.title} screen`} fill sizes="(min-width: 1921px) 380px, 210px" className="object-cover" />
            </div>
          </IPhoneFrame>
        </div>
      </div>
      <figcaption className="mt-4 max-w-[calc(25.125rem*var(--s))] text-sm leading-[1.45]">
        <span className="font-medium text-cream">{screen.title}</span>
        <span className="block text-dim">{screen.hint}</span>
      </figcaption>
    </figure>
  );
}
