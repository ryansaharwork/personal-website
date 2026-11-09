"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { site } from "@/content/site";
import { setHomeReturn } from "@/lib/homeReturn";

type Props = {
  /** Home page: the name resets the console to the intro instead of navigating. */
  onNameClick?: () => void;
  /** Subpages: show an "esc Home" link, and make Esc go home. */
  back?: boolean;
  active?: "about";
  /** Project pages: going home (Esc / Home) returns to the homepage with this project selected. */
  returnTo?: string;
};

const pill =
  "glass rounded-full border px-3 py-[0.4375rem] text-cream transition-[border-color] duration-200 ease-soft hover:border-white/35 aria-[current=page]:border-white/45 lg:px-4 lg:py-[0.5625rem]";

export function Nav({ onNameClick, back, active, returnTo }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (!back) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !e.defaultPrevented) {
        if (returnTo) setHomeReturn(returnTo);
        router.push("/");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [back, router, returnTo]);

  return (
    <nav className="relative z-10 flex items-center justify-between gap-4 text-[0.8125rem] lg:text-sm">
      {back ? (
        <Link
          href="/"
          onClick={() => returnTo && setHomeReturn(returnTo)}
          className="flex items-center gap-2.5 text-muted transition-colors hover:text-cream"
        >
          <span className="kbd hidden sm:inline">esc</span>Home
        </Link>
      ) : (
        <Link
          href="/"
          onClick={(e) => {
            if (onNameClick) {
              e.preventDefault();
              onNameClick();
            }
          }}
          className="group flex items-center gap-3.5"
        >
          <span className="sr-only">{site.name}</span>
          <span
            aria-hidden
            className="grid size-9 place-items-center rounded-full glass border font-display text-[0.8125rem] font-extrabold tracking-[-.02em] transition-[border-color] duration-200 ease-soft group-hover:border-white/45 lg:size-10 lg:text-sm"
          >
            {site.monogram}
          </span>
          <span className="hidden items-center gap-[0.4375rem] text-[0.8125rem] text-muted md:flex">
            <span className="glow-dot size-[0.4375rem] rounded-full bg-accent" />
            {site.status}
          </span>
        </Link>
      )}
      <div className="flex gap-2 lg:gap-2.5">
        <Link
          href="/about"
          aria-current={active === "about" ? "page" : undefined}
          className={pill}
        >
          About
        </Link>
        <a href={site.links.resume} className={pill}>
          Résumé<span className="hidden lg:inline"> ↓</span>
        </a>
        <a
          href={`mailto:${site.links.email}`}
          className="btn-primary rounded-full px-3 py-[0.4375rem] lg:px-4 lg:py-[0.5625rem]"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
