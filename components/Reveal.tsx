"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms, applied when the element enters the viewport. */
  delay?: number;
  /** Slide distance in px. */
  distance?: number;
  as?: "div" | "section" | "li";
  id?: string;
};

/** Fades and slides its content up the first time it scrolls into view. */
export function Reveal({ children, className = "", delay = 0, distance = 22, as: Tag = "div", id }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      id={id}
      data-reveal
      className={`transition-[opacity,transform] duration-[350ms] ease-soft motion-reduce:transform-none! motion-reduce:transition-none ${className}`}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "none" : `translateY(${distance}px)`,
        transitionDelay: seen ? `${delay}ms` : "0ms",
      }}
    >
      {children}
    </Tag>
  );
}
