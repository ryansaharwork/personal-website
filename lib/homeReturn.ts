/**
 * Which project the homepage should come back to with that project selected (set by Esc / Home on a
 * project page). Selecting it on arrival gives the reverse view-transition morph a visible target.
 * Module state: it only lives for client-side navigations, so a full page load starts on the intro.
 */
let slug: string | null = null;

export function setHomeReturn(next: string) {
  slug = next;
}

/** Read without clearing (safe to call from a useState initializer, which may run twice in dev). */
export function peekHomeReturn() {
  return slug;
}

export function clearHomeReturn() {
  slug = null;
}
