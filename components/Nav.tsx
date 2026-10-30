"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { site } from "@/content/site";

type Props = {
  /** Home page: the name resets the console to the intro instead of navigating. */
  onNameClick?: () => void;
  /** Subpages: show an "esc Home" link, and make Esc go home. */
  back?: boolean;
  active?: "about";
};

const pill =
  "rounded-full border border-cream/22 bg-ink/35 px-3 py-[7px] text-cream backdrop-blur-md transition-[border-color] duration-200 ease-soft hover:border-cream/50 lg:px-4 lg:py-[9px]";

export function Nav({ onNameClick, back, active }: Props) {
  const router = useRouter();

  useEffect(() => {
    if (!back) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !e.defaultPrevented) router.push("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [back, router]);

  return (
    <nav className="relative z-10 flex items-center justify-between gap-4 text-[13px] lg:text-sm">
      {back ? (
        <Link href="/" className="flex items-center gap-2.5 text-muted transition-colors hover:text-cream">
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
          className="flex items-center gap-3.5"
        >
          <span className="font-display text-base font-bold lg:text-lg">{site.name}</span>
          <span className="hidden items-center gap-[7px] text-[13px] text-muted md:flex">
            <span className="glow-dot size-[7px] rounded-full bg-ember" />
            {site.status}
          </span>
        </Link>
      )}
      <div className="flex gap-2 lg:gap-2.5">
        <Link
          href="/about"
          aria-current={active === "about" ? "page" : undefined}
          className={`${pill} ${active === "about" ? "border-ember/50" : ""}`}
        >
          About
        </Link>
        <a href={site.links.resume} className={pill}>
          Résumé<span className="hidden lg:inline"> ↓</span>
        </a>
        <a
          href={`mailto:${site.links.email}`}
          className="rounded-full bg-ember px-3 py-[7px] font-medium text-on-ember transition-[background-color] duration-200 ease-soft hover:bg-ember-hi lg:px-4 lg:py-[9px]"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
