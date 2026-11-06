import { ViewTransition } from "react";
import type { Project } from "@/content/site";
import { ImageSlot } from "@/components/ImageSlot";
import { PhoneFan } from "./PhoneFan";

/** Shared-element names: the same name on the homepage hero and the project page makes them morph. */
const mediaName = (slug: string) => `project-media-${slug}`;
const titleName = (slug: string) => `project-title-${slug}`;

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
  let media: React.ReactNode = null;
  if (project.phones.length > 0) {
    media = <PhoneFan screens={project.phones} appName={project.title} fit={fit} interactive={!fit} />;
  } else if (project.images.hero) {
    media = (
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_0_0_1px_oklch(76%_.16_45/.35),0_40px_80px_-30px_rgba(0,0,0,.8)] ${fit ? "h-full max-h-[480px] max-w-full" : "mx-auto w-full max-w-[640px]"}`}
      >
        <ImageSlot
          src={project.images.hero}
          alt={`${project.title} hero art`}
          label=""
          sizes={fit ? "480px" : "(min-width: 1024px) 640px, 100vw"}
          priority={!fit}
        />
      </div>
    );
  }
  if (!media) return null;
  return (
    // default="none": only the cross-page morph (share) animates, not every unrelated transition.
    <ViewTransition name={named ? mediaName(project.slug) : undefined} share="morph" default="none">
      {media}
    </ViewTransition>
  );
}

/** Wraps a project's title element so it morphs between the homepage hero and the project page. */
export function ProjectTitle({ slug, named = true, children }: { slug: string; named?: boolean; children: React.ReactNode }) {
  return (
    <ViewTransition name={named ? titleName(slug) : undefined} share="morph" default="none">
      {children}
    </ViewTransition>
  );
}
