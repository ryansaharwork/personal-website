"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { site, type Project } from "@/content/site";
import { Nav } from "@/components/Nav";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { IntroHero } from "./IntroHero";
import { ProjectHero } from "./ProjectHero";
import { TileRow } from "./TileRow";

const projects: Project[] = site.projects;

export function ConsoleHome() {
  const router = useRouter();
  const reduced = useReducedMotion();
  /** Sticky selection (arrow keys, tap, focus). */
  const [sel, setSel] = useState(-1);
  /** Mouse hover over the row; overrides `sel` while set. */
  const [hover, setHover] = useState(-1);
  const act = hover >= 0 ? hover : sel;

  // The project shown in the hero lags `act` so project → project can dip out,
  // swap text while invisible, and fade back in.
  const [shown, setShown] = useState(0);
  const [dip, setDip] = useState(false);
  const prevAct = useRef(-1);
  const tileRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const was = prevAct.current;
    prevAct.current = act;
    if (act < 0) {
      setDip(false);
      return;
    }
    // Coming from the intro: swap content immediately so the old project never flashes.
    if (was < 0 || reduced) {
      setShown(act);
      setDip(false);
      return;
    }
    setDip(true);
    const t = setTimeout(() => {
      setShown(act);
      setDip(false);
    }, 150);
    return () => clearTimeout(t);
  }, [act, reduced]);

  const open = useCallback((i: number) => router.push(`/projects/${projects[i].slug}`), [router]);

  const goIntro = useCallback(() => {
    setSel(-1);
    setHover(-1);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  }, []);

  const select = useCallback((i: number) => {
    setSel(i);
    tileRefs.current[i]?.focus({ preventScroll: false });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      const n = projects.length;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        setHover(-1);
        const d = e.key === "ArrowRight" ? 1 : -1;
        select(sel < 0 ? (d > 0 ? 0 : n - 1) : (sel + d + n) % n);
      } else if (e.key === "Enter" && sel >= 0) {
        // A focused tile link handles Enter itself.
        if (t?.dataset.tile === undefined) {
          e.preventDefault();
          open(sel);
        }
      } else if (e.key === "Escape") {
        goIntro();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sel, select, open, goIntro]);

  const heroOn = act >= 0;

  return (
    <main className="relative flex h-svh min-h-[600px] flex-col overflow-hidden lg:min-h-[760px]">
      {/* Full-screen art: one layer per state, crossfaded. */}
      <div aria-hidden className="absolute inset-0">
        <BgLayer art={site.introArt} on={!heroOn} />
        {projects.map((p, i) => (
          <BgLayer key={p.slug} art={p.art} image={p.images.hero} on={act === i} />
        ))}
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,10,9,.3),rgba(11,10,9,.6)_45%,rgba(11,10,9,.96)_70%)] lg:bg-[radial-gradient(ellipse_at_50%_120%,rgba(11,10,9,.95),rgba(11,10,9,.55)_45%,transparent_75%)]"
      />

      <div className="relative z-10 px-5 pt-5 lg:px-14 lg:pt-10">
        <Nav onNameClick={goIntro} />
      </div>

      <div className="relative mx-5 mt-6 min-h-0 flex-1 lg:mx-14 lg:mt-[clamp(24px,8svh,70px)] lg:mb-2">
        <IntroHero visible={!heroOn} />
        <ProjectHero project={projects[shown]} visible={heroOn && !dip} onOpen={() => open(shown)} />
      </div>

      <TileRow
        projects={projects}
        active={act}
        tileRefs={tileRefs}
        onHover={setHover}
        onFocusTile={setSel}
        onSelect={setSel}
      />
    </main>
  );
}

function BgLayer({ art, image, on }: { art: string; image?: string; on: boolean }) {
  return (
    <div
      className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-soft motion-reduce:transition-none"
      style={{
        opacity: on ? 1 : 0,
        backgroundImage: image ? `linear-gradient(rgba(11,10,9,.35),rgba(11,10,9,.35)),url(${image})` : art,
      }}
    />
  );
}
