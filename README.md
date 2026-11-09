# personal-website

Ryan Sahar's portfolio, a console-style home screen built with Next.js (App Router), TypeScript and Tailwind CSS v4.

## Editing content

Everything on the site lives in **`content/site.ts`**: bio, links, skills, experience, education, and every project with its write-up.

- Text in `[square brackets]` is a placeholder. Replace it before launch.
- Images go in `public/images/`. Set the matching `src` field, for example `photo: { src: "/images/photo.jpg" }`. An empty `src` shows a labelled placeholder box.
  - `photo`: hero photo (3:4) and About avatar
  - `photo.cutoutPlaceholder`: a ~400-byte inline preview shown until the hero cutout loads. Regenerate it with `npm run placeholder` whenever the cutout changes, and paste the printed data URI.
  - `photo.srcSize` / `photo.cutoutSize`: the files' pixel sizes. The photo is never displayed larger than half its pixels (so it stays sharp on 2x screens); update these if you replace the images. The current files are a 4x upscale of the original (Real-ESRGAN x4plus blended 50/50 with a plain enlargement).
  - `projects[].images.tile`: home-screen tile art (square)
  - `projects[].images.icon`: optional square app icon (transparent PNG/WebP with its own rounded corners), shown on the home tile and next to the project title
  - `projects[].images.hero`: full-screen background on the home screen and the hero image on the project page (4:3)
  - `projects[].phones[].src`: Valt's three phone screenshots, left to right (402×874 aspect; use 804×1748 for sharp 2× display). The frame draws a 9:41 status bar on top, so remove the screenshot's own.
  - `projects[].writeup.whatScreen`: optional phone screenshot under the "What it is" headline (after the text on phones), same size and aspect as `phones`
- `projects[].appLink`: optional external app button (label, link, small note under it) shown next to "Read the write-up" on the project page and the homepage hero. Valt's points to the TestFlight beta; at launch, swap in the App Store link and label.
- `links.resume` is a placeholder (`#`) until the web résumé exists.
- Adding a project to `projects` adds its tile, its page at `/projects/<slug>`, and its "Up next" card.

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (all pages are static)
```

## Deploying

Import the repo in Vercel. It detects Next.js, so no extra configuration is needed.

## Interaction notes

- Selecting a project with phone screens (or hero art) shows them on the right of the homepage hero. Opening it morphs the media and the title lockup (app icon + title) into the project page (View Transitions API; on phones only the title lockup morphs), and Esc / Home morphs back to the homepage with that project still selected. Browsers without View Transitions just navigate; with `prefers-reduced-motion` the swap is instant.
- Home opens on the intro with no tile selected. Hovering a tile swaps the hero. The project stays shown while the pointer is anywhere over the hero or the tiles, so its button is reachable, and fades back to the intro about 300ms after the pointer leaves that area.
- ← → make a sticky selection, ↵ opens it and Esc returns to the intro. On project and About pages, Esc goes home.
- On touch screens, the first tap highlights a tile and the second opens it. Tapping a phone or timeline row highlights it.
- With `prefers-reduced-motion`, all movement (lift, zoom, fan, slide-in) is turned off. Only opacity and colour changes remain.
