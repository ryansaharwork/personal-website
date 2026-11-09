import { ViewTransition } from "react";
import type { Project } from "@/content/site";
import { AppIcon, ICON_SHADOW } from "@/components/AppIcon";
import { ImageSlot } from "@/components/ImageSlot";
import { PhoneFan } from "./PhoneFan";

/** Shared-element names: the same name on the homepage hero and the project page makes them morph. */
const mediaName = (slug: string) => `project-media-${slug}`;
const lockupName = (slug: string) => `project-lockup-${slug}`;

export function hasProjectMedia(project: Project) {
  return project.phones.length > 0 || Boolean(project.images.hero);
}

type MediaProps = {
  project: Project;
  /** Homepage: scale to fill the parent's box, decorative (no hover state). */
  fit?: boolean;
  /** Only a visible copy should be a morph source/target. */
  named?: boolean;
};

/**
 * A project's visual: the phone fan, or else its framed hero art. Returns null when it has neither.
 * Wrapped in a named ViewTransition so it morphs between the homepage hero and the project page.
 */
export function ProjectMedia({ project, fit = false, named = true }: MediaProps) {
  // The named element (inside <ViewTransition>) holds only the phones or the art itself. Shadows sit on a
  // plain wrapper outside it, so the morphing snapshot stays small and cheap and the shadow just fades.
  let media: React.ReactNode = null;
  let shadow: React.ReactNode = null;
  let frame = "relative";
  if (project.phones.length > 0) {
    media = <PhoneFan screens={project.phones} appName={project.title} fit={fit} interactive={!fit} />;
    shadow = (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[4%] -bottom-[7%] h-[34%] bg-[radial-gradient(closest-side,rgba(0,0,0,.6),rgba(0,0,0,.25)_55%,transparent)]"
      />
    );
  } else if (project.images.hero) {
    frame = `relative aspect-[4/3] rounded-3xl shadow-[0_0_0_1px_oklch(76%_.16_45/.35),0_2.5rem_5rem_-1.875rem_rgba(0,0,0,.8)] ${fit ? "h-full max-h-[30rem] max-w-full" : "mx-auto w-full max-w-[40rem]"}`;
    media = (
      <div className="relative h-full w-full overflow-hidden rounded-3xl">
        <ImageSlot
          src={project.images.hero}
          alt={`${project.title} hero art`}
          label=""
          sizes={fit ? "(min-width: 1921px) 860px, 480px" : "(min-width: 1921px) 1150px, (min-width: 1024px) 640px, 100vw"}
          priority={!fit}
        />
      </div>
    );
  }
  if (!media) return null;
  return (
    <div className={frame}>
      {shadow}
      {/* default="none": only the cross-page morph (share) animates, not every unrelated transition. */}
      <ViewTransition name={named ? mediaName(project.slug) : undefined} share="morph-media" default="none">
        {media}
      </ViewTransition>
    </div>
  );
}

/**
 * A project's title lockup: its app icon (if any) and title, sized entirely in em from one font size. The
 * homepage hero and the project page render it at different font sizes, so the two are exact scaled copies
 * with the same aspect ratio, and the whole lockup morphs as one shared element. The icon's shadow is drawn
 * by a separate layer outside the named element (so the morphing snapshot stays shadow-free), hidden while a
 * view transition runs and faded back in once the lockup has landed (see .lockup-shadow in globals.css).
 */
export function TitleLockup({
  project,
  as: Heading,
  className = "",
  named = true,
}: {
  project: Project;
  as: "h1" | "h2";
  /** Font size (which scales everything) and outer margins. */
  className?: string;
  named?: boolean;
}) {
  const icon = project.images.icon;
  return (
    <div className={`relative w-fit ${className}`}>
      {icon && (
        <span
          aria-hidden
          className={`lockup-shadow pointer-events-none absolute top-1/2 left-0 size-[0.62em] -translate-y-1/2 rounded-[22.37%] ${ICON_SHADOW}`}
        />
      )}
      {/* default="none": only the cross-page morph (share) animates, not every unrelated transition. */}
      <ViewTransition name={named ? lockupName(project.slug) : undefined} share="morph-lockup" default="none">
        {/* Explicit em height: WebKit rounds text line boxes to whole pixels, which would skew the
            aspect ratio between the two sizes. */}
        <div className="relative flex h-[0.9em] w-fit items-center gap-[0.2em]">
          {icon && <AppIcon src={icon} sizes="(min-width: 1921px) 140px, 80px" shadow={false} className="size-[0.62em] flex-none" />}
          <Heading className="font-display text-[1em] leading-[.9] font-extrabold tracking-[-.05em]">{project.title}</Heading>
        </div>
      </ViewTransition>
    </div>
  );
}
