import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, site, type Project } from "@/content/site";
import { ImageSlot } from "@/components/ImageSlot";
import { Nav } from "@/components/Nav";
import { PhoneFan } from "@/components/project/PhoneFan";
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

const primary =
  "rounded-full bg-ember px-[22px] py-[13px] text-[15px] font-medium text-on-ember transition-[background-color] duration-200 ease-soft hover:bg-ember-hi";
const secondary =
  "rounded-full border border-cream/22 bg-ink/35 px-[22px] py-[13px] text-[15px] text-cream transition-[border-color] duration-200 ease-soft hover:border-cream/50";

export default async function ProjectPage({ params }: Params) {
  const project: Project | undefined = getProject((await params).slug);
  if (!project) notFound();
  const others: Project[] = site.projects.filter((p) => p.slug !== project.slug);

  return (
    <main>
      <section className="relative overflow-x-clip lg:h-[min(760px,max(640px,calc(100svh-140px)))]">
        <div className="absolute inset-0" style={{ background: project.art }} />
        {project.images.hero && project.phones.length > 0 && (
          <div className="absolute inset-0">
            <ImageSlot src={project.images.hero} alt="" label="" />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_50%,oklch(55%_.16_45/.22),transparent_55%),linear-gradient(90deg,rgba(11,10,9,.85)_0%,rgba(11,10,9,.5)_50%,rgba(11,10,9,.15)_100%),linear-gradient(0deg,#0b0a09,transparent_30%)]" />

        <div className="relative z-10 px-5 pt-5 lg:absolute lg:inset-x-14 lg:top-10 lg:px-0 lg:pt-0">
          <Nav back />
        </div>

        <div className="relative grid gap-10 px-5 pt-12 pb-10 lg:absolute lg:inset-x-14 lg:top-[110px] lg:bottom-10 lg:grid-cols-[minmax(0,560px)_1fr] lg:items-center lg:p-0">
          <div>
            <div className="text-xs font-medium tracking-[.08em] text-ember uppercase lg:text-[13px]">
              {project.kicker} · {project.year}
            </div>
            <h1 className="mt-3 font-display text-[64px] leading-[.9] font-extrabold tracking-[-.05em] lg:mt-4 lg:text-[clamp(72px,7.2vw,104px)]">
              {project.title}
            </h1>
            <p className="mt-5 text-[17px] leading-[1.45] text-pretty text-muted lg:mt-[22px] lg:text-xl">{project.long}</p>
            <div className="mt-[30px] flex flex-wrap gap-3">
              {project.playUrl ? (
                <a href={project.playUrl} className={primary}>
                  Play now ↗
                </a>
              ) : (
                <a href="#write-up" className={primary}>
                  Read the write-up ↓
                </a>
              )}
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

          {project.phones.length > 0 ? (
            <PhoneFan screens={project.phones} appName={project.title} />
          ) : (
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[640px] overflow-hidden rounded-3xl shadow-[0_0_0_1px_oklch(76%_.16_45/.35),0_40px_80px_-30px_rgba(0,0,0,.8)]">
              <ImageSlot src={project.images.hero} alt={`${project.title} hero art`} label={`${project.title} — hero art 4:3`} sizes="(min-width: 1024px) 640px, 100vw" priority />
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-5 pb-24 lg:px-14">
        <WriteUp project={project} />
        <UpNext projects={others} />
      </div>
    </main>
  );
}
