import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, site, type Project } from "@/content/site";
import { AppLink } from "@/components/AppLink";
import { ImageSlot } from "@/components/ImageSlot";
import { Nav } from "@/components/Nav";
import { ProjectMedia, TitleLockup, hasProjectMedia } from "@/components/project/ProjectMedia";
import { UpNext } from "@/components/project/UpNext";
import { WriteUp } from "@/components/project/WriteUp";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return site.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.title, description: project.desc } : {};
}

const primary = "btn-primary rounded-full px-[1.375rem] py-[0.8125rem] text-[0.9375rem]";
const secondary =
  "glass rounded-full border px-[1.375rem] py-[0.8125rem] text-[0.9375rem] text-cream transition-[border-color] duration-200 ease-soft hover:border-white/35";

export default async function ProjectPage({ params }: Params) {
  const project: Project | undefined = getProject((await params).slug);
  if (!project) notFound();
  const others: Project[] = site.projects.filter((p) => p.slug !== project.slug);

  return (
    <main>
      <section className="relative overflow-x-clip lg:h-[min(47.5rem,max(40rem,calc(100svh-8.75rem)))]">
        <div className="absolute inset-0" style={{ background: project.art }} />
        {project.images.hero && project.phones.length > 0 && (
          <div className="absolute inset-0">
            <ImageSlot src={project.images.hero} alt="" label="" />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_50%,var(--glow-project),transparent_55%),linear-gradient(90deg,color-mix(in_srgb,var(--color-ink)_85%,transparent)_0%,color-mix(in_srgb,var(--color-ink)_50%,transparent)_50%,color-mix(in_srgb,var(--color-ink)_15%,transparent)_100%),linear-gradient(0deg,var(--color-ink),transparent_30%)]" />
        {/* Solid ink at the very top, so the overscroll area continues the page. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 edge-fade-top lg:h-44" />

        <div className="relative z-10 mx-auto max-w-site px-5 pt-5 lg:absolute lg:inset-x-0 lg:top-10 lg:px-14 lg:pt-0">
          <Nav back returnTo={project.slug} />
        </div>

        <div className="relative mx-auto grid max-w-site gap-10 px-5 pt-12 pb-10 lg:absolute lg:inset-x-0 lg:top-[6.875rem] lg:bottom-10 lg:grid-cols-[minmax(0,35rem)_1fr] lg:items-center lg:px-14 lg:py-0">
          <div>
            <div className="text-xs font-medium tracking-[.08em] text-kicker uppercase lg:text-[0.8125rem]">
              {project.kicker} · {project.year}
            </div>
            <TitleLockup project={project} as="h1" className="mt-3 text-[4rem] lg:mt-4 lg:text-[clamp(4.5rem,7.2vw,6.5rem)]" />
            <p className="mt-5 text-[1.0625rem] leading-[1.45] text-pretty text-muted lg:mt-[1.375rem] lg:text-xl">{project.long}</p>
            <div className="mt-[1.875rem] flex flex-wrap items-start gap-3">
              {project.playUrl ? (
                <a href={project.playUrl} className={primary}>
                  Play now ↗
                </a>
              ) : (
                <a href="#write-up" className={primary}>
                  Read the write-up ↓
                </a>
              )}
              {project.appLink && <AppLink link={project.appLink} className={primary} />}
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className={secondary}>
                GitHub ↗
              </a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-2 text-sm text-dim">
              {project.facts.map((f) => (
                <span key={f.value + f.label}>
                  <span className="font-medium text-cream">{f.value}</span> {f.label}
                </span>
              ))}
            </div>
          </div>

          {hasProjectMedia(project) ? (
            <ProjectMedia project={project} />
          ) : (
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[40rem] overflow-hidden rounded-3xl shadow-[0_0_0_1px_var(--frame-ring),0_2.5rem_5rem_-1.875rem_rgba(0,0,0,.8)]">
              <ImageSlot src={project.images.hero} alt={`${project.title} hero art`} label={`${project.title} — hero art 4:3`} sizes="(min-width: 1024px) 640px, 100vw" priority />
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-site px-5 pb-24 lg:px-14">
        <WriteUp project={project} />
        <UpNext projects={others} />
      </div>
    </main>
  );
}
