import type { Experience } from "@/content/site";
import { Reveal } from "@/components/Reveal";

const row = "group relative -mx-5 grid gap-1.5 rounded-[14px] px-5 py-6 outline-none sm:grid-cols-[150px_1fr] sm:gap-8";

/** Experience rows: fade up in sequence on scroll; hover (or tap) lightens the row and grows an accent line. */
export function Timeline({ items }: { items: Experience[] }) {
  return (
    <ol className="border-t border-cream/10">
      {items.map((r, i) => (
        <Reveal as="li" key={r.org} delay={i * 110} distance={18} className="border-b border-cream/10">
          {/* tabIndex lets a tap focus the row, which mirrors the hover state on touch screens. */}
          <div tabIndex={0} className={`${row} transition-[background-color] duration-[250ms] ease-soft hover:bg-cream/5 focus:bg-cream/5`}>
            <span
              aria-hidden
              className="absolute top-[18px] bottom-[18px] left-0 w-0.5 origin-top scale-y-0 rounded-sm bg-ember transition-transform duration-[250ms] ease-soft group-hover:scale-y-100 group-focus:scale-y-100 motion-reduce:transition-none"
            />
            <div className="pt-1 text-sm text-ember-date transition-colors duration-[250ms] ease-soft group-hover:text-ember-date-hi group-focus:text-ember-date-hi">
              {r.when}
            </div>
            <div>
              <h3 className="font-display text-2xl leading-[1.1] font-bold tracking-[-.03em]">
                {r.org}
                <span className="font-mono text-sm font-normal tracking-normal text-dim"> {r.role}</span>
              </h3>
              <p className="mt-2 text-[15px] leading-normal text-pretty text-muted">{r.body}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
