// ─────────────────────────────────────────────────────────────
// All site content lives here. Edit this file to update the site.
//
// • Anything in [square brackets] is a placeholder — replace it.
// • Images: drop files into /public/images and set the matching
//   `src` (e.g. "/images/photo.jpg"). An empty src shows a labelled
//   placeholder box instead.
// • Gradients (`art`) are the fallback tile/background art for a
//   project when no image is set.
// ─────────────────────────────────────────────────────────────

export type Fact = { value: string; label: string };
export type ArchNode = { title: string; detail: string };
export type Problem = { title: string; body: string };
export type PhoneScreen = { title: string; hint: string; src: string };

export type Project = {
  slug: string;
  /** Short name on the home-screen tile. */
  label: string;
  /** Large title on the hero and project page. */
  title: string;
  kicker: string;
  year: string;
  /** One line under the title on the homepage. */
  desc: string;
  /** Slightly longer intro on the project page. */
  long: string;
  art: string;
  images: {
    tile: string;
    hero: string;
    /** Square app icon with its own rounded corners and transparent background; shown on the tile and by the title. */
    icon?: string;
  };
  /** If set, the primary button says "Play now" and links here. */
  playUrl?: string;
  /** Optional app link (beta or store), shown as a secondary button next to the primary one. Swap for the App Store link at launch. */
  appLink?: { label: string; href: string; note?: string };
  githubUrl: string;
  facts: Fact[];
  /** Phone screenshots for the fanned hero. Leave empty to show the hero image instead. */
  phones: PhoneScreen[];
  writeup: {
    whatHead: string;
    what: string;
    arch: ArchNode[];
    archNote: string;
    problems: Problem[];
    next: string;
    /** Optional phone screenshot in "What it is", under the headline (after the text on phones). `hint` is the caption. */
    whatScreen?: PhoneScreen;
  };
};

export type Experience = {
  when: string;
  org: string;
  role: string;
  body: string;
};

const placeholderProblems = (): Problem[] => [
  { title: "[Problem 1]", body: "[What broke or was hard, how you found the cause, and how you fixed it.]" },
  { title: "[Problem 2]", body: "[What broke or was hard, how you found the cause, and how you fixed it.]" },
  { title: "[Problem 3]", body: "[What broke or was hard, how you found the cause, and how you fixed it.]" },
];

export const site = {
  name: "Ryan Sahar",
  status: "Open to new-grad SWE roles · CA",
  location: "Davis, CA",
  introLine: "I build iOS apps, game engines and the backends under them. USC CS '26, Davis, CA.",
  bio: "I'm a software engineer who graduated from USC with a B.S. in Computer Science in May 2026. I like owning the whole stack — Valt is a SwiftUI app, a TypeScript API and a Postgres database, and I built all three. Most recently I've been leading an engineering team and making slow dashboards fast.",
  /** Initials shown as the home link in the top-left nav. */
  monogram: "RS",
  /**
   * `src`: framed 3:4 headshot (About avatar). `cutout`: transparent background, homepage hero.
   * `srcSize` / `cutoutSize`: the files' pixel sizes [width, height]; they cap how large each photo is
   * displayed (half its pixels, so it stays sharp on 2x screens). Update them if you swap the images.
   * Both are a 4x upscale of the 581px original (Real-ESRGAN x4plus blended 50/50 with a plain enlargement).
   */
  photo: {
    src: "/images/photo-hd.webp",
    srcSize: [1744, 2326],
    cutout: "/images/photo-cutout-hd.webp",
    cutoutSize: [2324, 2600],
    /** Tiny blurred stand-in shown until the cutout loads (keeps transparency). Regenerate: npm run placeholder */
    cutoutPlaceholder:
      "data:image/webp;base64,UklGRpIBAABXRUJQVlA4WAoAAAAQAAAAFwAAGgAAQUxQSKAAAAARf6C4bRs3ln/vyV1EBBS3JkcK/8QhuKm2bVle3HV0AlgNNirQABrobLPTABr8G4eVBL672zO87/dRIaL/E0B/p7r5sCI1/8EwSwsAaJqFK9tbWPArmIU3W5K4ZYY0ZRVpzJJSmXml4BswLBLdgAIpp0BO1QEmqg0Ah9T4ASix4AxihIh2kJc2orcCIwpCM13UaY91Riud9lmnctNpP7UAVlA4IMwAAACwBQCdASoYABsAPrVInkmnJCKhMBgMAOAWiWIAzB2MO1ossw/h7YEuxf/2AiKQcWqUFA2apQAA/vtn99+FYZ7ta5T89ccjbMbUFu8ajIRANyS6gF4be/7BXg2iNFqhYr2EU2Tx2dq2p6LIhJoZcI09ChB5wsW8IpExYdR2smgeQEnneu7Iy5CuBIei7c7y48meRUhQ7z9iE4pbalZ/m2Ki2hjr4i7BbkHmuyFphKkt8Xf8uuddOhnv+lhIZPXfwARe+xIpQBxmHioAAAA=",
    alt: "Ryan Sahar",
  },

  links: {
    email: "ryansaharwork@gmail.com",
    // TODO: point this at the web version of the résumé once it exists.
    resume: "#",
    github: "https://github.com/ryansaharwork",
    linkedin: "https://linkedin.com/in/ryansahar",
  },

  skills: [
    "Swift / SwiftUI",
    "TypeScript",
    "C / C++",
    "Python",
    "Node / Express",
    "React",
    "PostgreSQL",
    "AWS",
  ],

  experience: [
    {
      when: "May 2026 – now",
      org: "Surgery Art and Science Institute",
      role: "Engineering lead",
      body: "Managing the engineering team building the company website.",
    },
    {
      when: "Jan – May 2026",
      org: "LA Zhongshan Society",
      role: "Capstone",
      body: "Secured an exposed WeCom webhook with signature-verification middleware; built chat-driven CMS updates. TypeScript, Express, Vitest.",
    },
    {
      when: "Jun – Aug 2025",
      org: "California Department of Water Resources",
      role: "SWE intern",
      body: "Software engineering intern. Built an LRU caching pipeline that cut dashboard loads ~85% (2s → 0.3s); profiled Dash callbacks down to 70ms.",
    },
  ] satisfies Experience[],

  education: {
    when: "2022 – 2026",
    school: "University of Southern California",
    detail: "B.S. Computer Science · Dean's List",
  },

  projects: [
    {
      slug: "valt",
      label: "Valt",
      title: "Valt",
      kicker: "iOS app",
      year: "2026",
      desc: "A SwiftUI app, a 26-endpoint TypeScript API and a Postgres database on AWS — built solo in three months.",
      long: "A SwiftUI client with zero third-party libraries, a 26-endpoint TypeScript API and a Postgres database on AWS — 11.5K lines in three months, from auth to search.",
      art: "linear-gradient(135deg,oklch(42% .15 40),oklch(22% .06 35) 60%,#120e0b)",
      images: { tile: "", hero: "", icon: "/images/valt-icon.webp" },
      // At launch, swap for the App Store link, e.g. { label: "Download on the App Store", href: "https://apps.apple.com/…" }.
      appLink: { label: "Join the beta", href: "https://testflight.apple.com/join/tWpaDD8r", note: "iPhone only · via TestFlight" },
      githubUrl: "https://github.com/ryansaharwork",
      facts: [
        { value: "11.5K", label: "lines" },
        { value: "146ms", label: "search" },
        { value: "26", label: "endpoints" },
      ],
      // Left to right; the middle one sits in front. Screenshots are 804×1748 (2× the 402×874 frame).
      phones: [
        { title: "Game page", hint: "Ratings, your review and who played it", src: "/images/valt-game.webp" },
        { title: "Feed", hint: "Reviews from people you follow", src: "/images/valt-feed.webp" },
        { title: "Review", hint: "A review with comments and likes", src: "/images/valt-review.webp" },
      ],
      writeup: {
        whatHead: "One place for every gamer's opinion.",
        what: "Film fans have Letterboxd. Gamers are split across PlayStation, Xbox, Nintendo and PC, with no shared place to talk about what they play. Valt brings them together: log the games you play, rate and review them, and follow friends to see what they think. Players get a voice, and hear from each other instead of only from critics.",
        arch: [
          { title: "SwiftUI app", detail: "No third-party libraries · Keychain token storage" },
          { title: "TypeScript API", detail: "Express · Prisma · 26 endpoints · JWT auth" },
          { title: "Postgres on AWS RDS", detail: "IGDB data proxied and cached server-side" },
        ],
        archNote: "The app only talks to the API — it never calls a third-party service directly.",
        problems: [
          {
            title: "Auth from scratch",
            body: "Instead of using an auth service, I built the whole flow myself: argon2id password hashing, JWTs issued by the API, tokens stored in the iOS Keychain, and validated every time the app launches.",
          },
          {
            title: "Search: 2s → 146ms",
            body: "Game search took about two seconds. Profiling the endpoint showed users were waiting on a 20-row database write they didn't need. I moved that write off the response path, and search dropped to 146ms.",
          },
          {
            title: "The duplicate feed page",
            body: "Editing a review mid-scroll could make the feed serve an entire page twice. I reproduced the bug on purpose to prove the cause, fixed it, then reran the same test to confirm the fix.",
          },
        ],
        next: "Launch on the App Store, then build smart search: tell Valt what you're in the mood for, and it finds games that match your taste and helps you learn more about the games you love.",
        whatScreen: { title: "Profile", hint: "Favorites, reviews and thoughts in one place", src: "/images/valt-profile.webp" },
      },
    },
    {
      slug: "games",
      label: "Games",
      title: "Games",
      kicker: "Game dev class",
      year: "[year]",
      desc: "Playable projects from my game development class at USC.",
      long: "[One or two lines on the games: how many, what they are, and where they run.]",
      art: "linear-gradient(135deg,oklch(38% .14 20),oklch(20% .05 15) 60%,#120b0b)",
      images: { tile: "", hero: "" },
      // TODO: link to where the games can be played.
      playUrl: "#",
      githubUrl: "https://github.com/ryansaharwork",
      facts: [{ value: "[n]", label: "games" }],
      phones: [],
      writeup: {
        whatHead: "[One-line headline for the games.]",
        what: "[Two sentences: what the class asked for and what you made.]",
        arch: [
          { title: "[Part 1]", detail: "[Short detail]" },
          { title: "[Part 2]", detail: "[Short detail]" },
          { title: "[Part 3]", detail: "[Short detail]" },
        ],
        archNote: "",
        problems: placeholderProblems(),
        next: "[A few lines on what you'd build or improve next.]",
      },
    },
    {
      slug: "engine",
      label: "Game Engine",
      title: "Game engine",
      kicker: "Custom engine",
      year: "[year]",
      desc: "[One line on what the engine does.]",
      long: "[One or two lines on the engine: language, subsystems and why you built it.]",
      art: "linear-gradient(135deg,oklch(36% .05 250),oklch(20% .03 250) 60%,#0d0e12)",
      images: { tile: "", hero: "" },
      githubUrl: "https://github.com/ryansaharwork",
      facts: [{ value: "[language]", label: "" }],
      phones: [],
      writeup: {
        whatHead: "[One-line headline for the engine.]",
        what: "[Two sentences: what the engine is and why you built it.]",
        arch: [
          { title: "[Subsystem 1]", detail: "[Short detail]" },
          { title: "[Subsystem 2]", detail: "[Short detail]" },
          { title: "[Subsystem 3]", detail: "[Short detail]" },
        ],
        archNote: "",
        problems: placeholderProblems(),
        next: "[A few lines on what you'd build or improve next.]",
      },
    },
    {
      slug: "arduino",
      label: "Arduino Monitors",
      title: "Arduino monitors",
      kicker: "Embedded C",
      year: "[year]",
      desc: "Temperature monitors in bare-metal C, with the 1-Wire protocol written from scratch.",
      long: "Bare-metal C on an ATmega328P. The Dallas 1-Wire protocol bit-banged from scratch, five interrupt sources synchronized to one main loop.",
      art: "linear-gradient(135deg,oklch(38% .10 140),oklch(20% .04 140) 60%,#0b100d)",
      images: { tile: "", hero: "" },
      githubUrl: "https://github.com/ryansaharwork",
      facts: [
        { value: "5", label: "interrupt sources" },
        { value: "1-Wire", label: "from scratch" },
      ],
      phones: [],
      writeup: {
        whatHead: "[One-line headline for the monitors.]",
        what: "[Two sentences: what the monitors do and why you built them.]",
        arch: [
          { title: "DS18B20 sensor", detail: "1-Wire protocol, bit-banged GPIO" },
          { title: "ATmega328P", detail: "Bare-metal C · 5 interrupt sources" },
          { title: "LCD", detail: "Critical sections prevent mid-write corruption" },
        ],
        archNote: "",
        problems: placeholderProblems(),
        next: "[A few lines on what you'd build or improve next.]",
      },
    },
    {
      slug: "capstone",
      label: "Capstone",
      title: "LA Zhongshan Society",
      kicker: "TypeScript capstone",
      year: "2026",
      desc: "Secured a WeCom webhook and built chat-driven CMS updates for non-technical staff.",
      long: "Signature-verification middleware for an exposed WeCom webhook, and a chat-driven flow so staff can update the CMS from WeCom. TypeScript, Express, Vitest.",
      art: "linear-gradient(135deg,oklch(40% .10 300),oklch(20% .04 300) 60%,#0f0c12)",
      images: { tile: "", hero: "" },
      githubUrl: "https://github.com/ryansaharwork",
      facts: [
        { value: "49", label: "tests" },
        { value: "SHA-1", label: "signature verification" },
      ],
      phones: [],
      writeup: {
        whatHead: "Letting non-technical staff update a website from chat.",
        what: "[Two sentences: the problem the society had and who the tool is for.]",
        arch: [
          { title: "WeCom webhook", detail: "SHA-1 signature verification · 403 on invalid requests" },
          { title: "Express API", detail: "TypeScript · session-managed, paginated chat flow" },
          { title: "CMS", detail: "Content PATCH workflows" },
        ],
        archNote: "Test suite grown from 33 to 49 Vitest tests.",
        problems: placeholderProblems(),
        next: "[A few lines on what you'd build or improve next.]",
      },
    },
  ] satisfies Project[],

  /** Background behind the homepage intro (no tile selected). */
  introArt:
    "radial-gradient(ellipse at 80% 30%,var(--glow-intro),transparent 50%),linear-gradient(180deg,var(--intro-base),var(--color-ink))",
};

export function getProject(slug: string) {
  return site.projects.find((p) => p.slug === slug);
}
