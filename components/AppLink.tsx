import type { Project } from "@/content/site";

type Props = { link: NonNullable<Project["appLink"]>; className: string };

/** External app link (TestFlight beta or App Store) as a button, with an optional small note under it. Opens in a new tab. */
export function AppLink({ link, className }: Props) {
  return (
    <span className="inline-flex flex-col items-start">
      <a href={link.href} target="_blank" rel="noreferrer" className={className}>
        {link.label} ↗
      </a>
      {link.note && <span className="mt-2 text-xs text-dim">{link.note}</span>}
    </span>
  );
}
