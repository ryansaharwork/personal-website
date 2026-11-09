/**
 * App wordmarks drawn in place of a project's text title (TitleLockup). Each path is in font units with its baseline
 * at y = 0 and capitals 735 units tall. It is scaled so its capitals match the title font's (Bricolage Grotesque:
 * 660/1000 em) and placed so its baseline sits where the title text's does: 0.78em down the 0.9em-tall title box
 * (line-height .9 with ascent 930 / descent 270). Negative bottom margin keeps the box exactly 0.9em, so the lockup,
 * the icon beside it and the homepage-to-project morph keep their geometry; the descender hangs below like text.
 * An inline vector (no image request), so it is ready for the morph's first frame and scales without pixel rounding.
 */
const CAP = 735;
const TEXT_CAP = 0.66;
const BASELINE = 0.78;
const BOX = 0.9;

// PolyValt: polyvalt-cc-wordmark.svg (metadata removed). x0/x1 trim the side bearings so the "P" starts at the same
// offset (0.014em) as the title text's first letter did; top/bottom are the file's own vertical bounds.
const WORDMARKS = {
  polyvalt: {
    x0: 74,
    x1: 4060,
    top: -795,
    bottom: 274,
    d: "M232 0L90 0L90-735L342-735Q434-735 498.50-705Q563-675 597-619.50Q631-564 631-488L631-488L631-472Q631-396 597-340.50Q563-285 498.50-254.50Q434-224 342-224L342-224L232-224L232 0ZM354-612L232-612L232-347L354-347Q397-347 426.50-364Q456-381 471.50-411Q487-441 487-480Q487-519 471.50-549Q456-579 426.50-595.50Q397-612 354-612L354-612Z M973 19L973 19Q901 19 846-4Q791-27 753-66.50Q715-106 695.50-156Q676-206 676-260L676-260L676-281Q676-337 696.50-387.50Q717-438 755.50-477.50Q794-517 849-539.50Q904-562 973-562L973-562Q1042-562 1097-539.50Q1152-517 1190.50-477.50Q1229-438 1249-387.50Q1269-337 1269-281L1269-281L1269-260Q1269-206 1249.50-156Q1230-106 1192-66.50Q1154-27 1099-4Q1044 19 973 19ZM973-100L973-100Q1024-100 1059-122.50Q1094-145 1112-183.50Q1130-222 1130-271L1130-271Q1130-321 1111.50-359.50Q1093-398 1057.50-420.50Q1022-443 973-443L973-443Q924-443 888.50-420.50Q853-398 834-359.50Q815-321 815-271L815-271Q815-222 833.50-183.50Q852-145 887-122.50Q922-100 973-100Z M1512 0L1373 0L1373-626L1305-626L1305-730L1512-730L1512 0Z M1719 214L1630 214L1630 95L1732 95Q1761 95 1780.50 87.50Q1800 80 1813 63.50Q1826 47 1833 18L1833 18L1841-12L1752-12L1576-543L1716-543L1848-122L1869-122L1979-543L2112-543L1951 48Q1935 109 1906 145.50Q1877 182 1831.50 198Q1786 214 1719 214L1719 214Z M2592 0L2358 0L2125-730L2272-730L2459-118L2494-118L2666-730L2808-730L2592 0Z M3326 0L3216 0L3216-104Q3209-83 3200-66L3200-66Q3177-27 3137.50-6.50Q3098 14 3041 14L3041 14Q2982 14 2937.50-7Q2893-28 2868.50-67Q2844-106 2844-161L2844-161Q2844-221 2873.50-259Q2903-297 2956.50-316Q3010-335 3082-335L3082-335L3193-335L3193-340Q3193-387 3170-410Q3147-433 3099-433L3099-433Q3074-433 3039-432Q3004-431 2968.50-429.50Q2933-428 2905-426L2905-426L2905-544Q2928-546 2957-548Q2986-550 3016.50-550.50Q3047-551 3074-551L3074-551Q3158-551 3213.50-529Q3269-507 3297.50-460Q3326-413 3326-337L3326-337L3326 0ZM3193-201L3193-252L3080-252Q3032-252 3006.50-228.50Q2981-205 2981-168Q2981-131 3006.50-108Q3032-85 3080-85L3080-85Q3109-85 3133.50-95.50Q3158-106 3174.50-131.50Q3191-157 3193-201L3193-201Z M3596 0L3457 0L3457-626L3389-626L3389-730L3596-730L3596 0Z M4044 7L3966 7Q3891 7 3842.50-12.50Q3794-32 3770-78.50Q3746-125 3746-204L3746-204L3746-441L3660-441L3660-543L3747-543L3747-696L3877-696L3877-543L4044-543L4044-441L3876-441L3876-195Q3876-155 3897.50-133.50Q3919-112 3959-112L3959-112L4044-112L4044 7Z",
  },
} as const;

export type WordmarkName = keyof typeof WORDMARKS;

export function Wordmark({ name }: { name: WordmarkName }) {
  const w = WORDMARKS[name];
  const k = TEXT_CAP / CAP; // em per font unit
  const height = (w.bottom - w.top) * k;
  const marginTop = BASELINE + w.top * k;
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox={`${w.x0} ${w.top} ${w.x1 - w.x0} ${w.bottom - w.top}`}
      fill="currentColor"
      className="block overflow-visible"
      style={{
        width: `${((w.x1 - w.x0) * k).toFixed(5)}em`,
        height: `${height.toFixed(5)}em`,
        marginTop: `${marginTop.toFixed(5)}em`,
        marginBottom: `${(BOX - marginTop - height).toFixed(5)}em`,
      }}
    >
      <path d={w.d} />
    </svg>
  );
}
