import { Fragment } from "react";
import type { Project } from "@/content/site";
import { Reveal } from "@/components/Reveal";

const label = "mb-5 text-xs font-medium tracking-[.08em] text-ember uppercase";
const card = "rounded-[18px] border border-cream/10 bg-panel shadow-card";

export function WriteUp({ project }: { project: Project }) {
  const w = project.writeup;
  return (
    <div id="write-up" className="scroll-mt-6">
      <Reveal className="pt-6 lg:pt-10">
        <h2 className={label}>What it is</h2>
        <div className="grid gap-5 md:grid-cols-2 md:gap-10">
          <p className="font-display text-[30px] leading-[1.02] font-bold tracking-[-.04em] text-pretty lg:text-[40px]">{w.whatHead}</p>
          <p className="text-[17px] leading-normal text-pretty text-muted md:pt-1.5 lg:text-[19px]">{w.what}</p>
        </div>
      </Reveal>

      <Reveal className="pt-14 lg:pt-[72px]">
        <h2 className={label}>Architecture</h2>
        <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center md:gap-3">
          {w.arch.map((n, i) => (
            <Fragment key={n.title + i}>
              {i > 0 && (
                <div aria-hidden className="flex-none self-center text-lg text-ember">
                  <span className="md:hidden">↓</span>
                  <span className="hidden md:inline">→</span>
                </div>
              )}
              <div className={`${card} flex-1 px-6 py-[22px]`}>
                <div className="font-display text-[22px] font-bold tracking-[-.03em]">{n.title}</div>
                <div className="mt-1.5 text-sm leading-[1.45] text-dim">{n.detail}</div>
              </div>
            </Fragment>
          ))}
        </div>
        {w.archNote && <p className="mt-3.5 text-sm text-dim">{w.archNote}</p>}
      </Reveal>

      <Reveal className="pt-14 lg:pt-[72px]">
        <h2 className={label}>Hardest problems</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {w.problems.map((c, i) => (
            <div
              key={c.title + i}
              className={`${card} flex min-h-[200px] flex-col justify-between gap-4 rounded-[22px] p-7`}
            >
              <div className="font-mono text-[13px] text-ember">{String(i + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="font-display text-2xl leading-[1.05] font-bold tracking-[-.03em]">{c.title}</h3>
                <p className="mt-2.5 text-[15px] leading-normal text-pretty text-muted">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="pt-14 lg:pt-[72px]">
        <h2 className={label}>What I&apos;d do next</h2>
        <div className="grid md:grid-cols-2 md:gap-10">
          <p className="text-[17px] leading-normal text-pretty text-muted lg:text-[19px]">{w.next}</p>
        </div>
      </Reveal>
    </div>
  );
}
