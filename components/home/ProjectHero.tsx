import type { Project } from "@/content/site";
import { AppLink } from "@/components/AppLink";

type Props = { project: Project; visible: boolean; onOpen: () => void };

export function ProjectHero({ project, visible, onOpen }: Props) {
  return (
    <section
      aria-hidden={!visible}
      inert={!visible}
      aria-live="polite"
      className="absolute inset-0 flex flex-col justify-end transition-opacity duration-300 ease-soft motion-reduce:transition-none"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="max-w-[760px]">
        <div className="text-xs font-medium tracking-[.08em] text-ember uppercase lg:text-[13px]">{project.kicker}</div>
        <h2 className="mt-2 font-display text-[44px] leading-[.95] font-extrabold tracking-[-.045em] lg:mt-3.5 lg:text-[clamp(64px,6.1vw,88px)] lg:leading-[.92] lg:tracking-[-.05em]">
          {project.title}
        </h2>
        <p className="mt-3 text-base leading-[1.4] text-pretty text-muted lg:mt-[18px] lg:text-[21px]">{project.desc}</p>
        <div className="mt-[18px] flex items-start gap-3 lg:mt-[26px]">
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-ember px-4 py-2.5 text-sm font-medium text-on-ember transition-[background-color] duration-200 ease-soft hover:bg-ember-hi lg:px-[18px] lg:py-[11px] lg:text-[15px]"
          >
            {project.playUrl ? "Play now" : "Read the write-up"}
          </button>
          {project.appLink && (
            <AppLink
              link={project.appLink}
              className="inline-flex rounded-full border border-cream/22 bg-ink/35 px-3.5 py-[9px] text-sm text-cream transition-[border-color] duration-200 ease-soft hover:border-cream/50 lg:px-[18px] lg:py-[11px] lg:text-[15px]"
            />
          )}
          <span className="hidden h-10 items-center gap-1.5 text-[13px] text-dim lg:h-11 [@media(hover:hover)]:flex">
            <span className="kbd">↵</span>open · <span className="kbd">esc</span>back
          </span>
        </div>
      </div>
    </section>
  );
}
