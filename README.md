# personal-website

Ryan Sahar's portfolio, a console-style home screen built with Next.js (App Router), TypeScript and Tailwind CSS v4.

## Editing content

Everything on the site lives in **`content/site.ts`**: bio, links, skills, experience, education, and every project with its write-up.

- Text in `[square brackets]` is a placeholder. Replace it before launch.
- Images go in `public/images/`. Set the matching `src` field, for example `photo: { src: "/images/photo.jpg" }`. An empty `src` shows a labelled placeholder box.
  - `photo`: hero photo (3:4) and About avatar
  - `projects[].images.tile`: home-screen tile art (square)
  - `projects[].images.hero`: full-screen background on the home screen and the hero image on the project page (4:3)
  - `projects[].phones[].src`: Valt's three phone screenshots (402×874)
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

- Home opens on the intro with no tile selected. Hovering a tile swaps the hero, and leaving the row returns to the intro.
- ← → make a sticky selection, ↵ opens it and Esc returns to the intro. On project and About pages, Esc goes home.
- On touch screens, the first tap highlights a tile and the second opens it. Tapping a phone or timeline row highlights it.
- With `prefers-reduced-motion`, all movement (lift, zoom, fan, slide-in) is turned off. Only opacity and colour changes remain.
