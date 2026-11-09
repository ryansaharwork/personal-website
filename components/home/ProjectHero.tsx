import type { Project } from "@/content/site";
import { AppLink } from "@/components/AppLink";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { ProjectMedia, TitleLockup, hasProjectMedia } from "@/components/project/ProjectMedia";

type Props = { project: Project; visible: boolean; onOpen: () => void };

export function ProjectHero({ project, visible, onOpen }: Props) {
  const media = hasProjectMedia(project);
  // Phones stack the hero (media above the title here, below the text on the project page), so a media morph
  // would cross the title's path. There only the title lockup morphs; the media fades with the page.
  const wide = useMediaQuery("(min-width: 1024px)");
  return (
    <section
      aria-hidden={!visible}
      inert={!visible}
      aria-live="polite"
      className="absolute inset-0 flex flex-col justify-end transition-opacity duration-300 ease-soft motion-reduce:transition-none"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div className="flex h-full flex-col justify-end gap-4 lg:flex-row lg:items-end lg:gap-0">
        <div className="lg:max-w-[min(47.5rem,56%)] lg:flex-none lg:tall:self-center">
          <div className="text-xs font-medium tracking-[.08em] text-kicker uppercase lg:text-[0.8125rem]">{project.kicker}</div>
          <TitleLockup
            project={project}
            as="h2"
            named={visible}
            className="mt-2 text-[2.75rem] lg:mt-3.5 lg:text-[clamp(4rem,6.1vw,5.5rem)]"
          />
          <p className="mt-3 text-base leading-[1.4] text-pretty text-muted lg:mt-[1.125rem] lg:text-[1.3125rem]">{project.desc}</p>
          <div className="mt-[1.125rem] flex items-start gap-3 lg:mt-[1.625rem]">
            <button
              type="button"
              onClick={onOpen}
              className="inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-on-accent transition-[background-color] duration-200 ease-soft hover:bg-accent-hover lg:px-[1.125rem] lg:py-[0.6875rem] lg:text-[0.9375rem]"
            >
              {project.playUrl ? "Play now" : "Read the write-up"}
            </button>
            {project.appLink && (
              <AppLink
                link={project.appLink}
                className="inline-flex rounded-full border border-cream/22 bg-ink/35 px-3.5 py-[0.5625rem] text-sm text-cream transition-[border-color] duration-200 ease-soft hover:border-cream/50 lg:px-[1.125rem] lg:py-[0.6875rem] lg:text-[0.9375rem]"
              />
            )}
            <span className="hidden h-10 items-center gap-1.5 text-[0.8125rem] text-dim lg:h-11 [@media(hover:hover)]:flex">
              <span className="kbd">↵</span>open · <span className="kbd">esc</span>back
            </span>
          </div>
        </div>

        {/* The project's phones or art, scaled to the free space: right of the text on desktop, above it on
            phones (hidden on short screens). Decorative duplicate of the button, so clicking it opens too. */}
        {media && (
          <div
            aria-hidden
            onClick={onOpen}
            className="relative order-first min-h-0 flex-1 cursor-pointer [@media(max-height:700px)]:hidden lg:order-none lg:mx-[clamp(1.5rem,3.5vw,3.5rem)] lg:block lg:self-stretch"
          >
            <div data-fit-box className="absolute inset-0 flex items-end justify-start lg:items-center lg:justify-center">
              <ProjectMedia project={project} fit named={visible && wide} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
