# Hiva Website Fix Checklist

Use this list in order (top to bottom) to address the highest-impact issues first.

- [x] **Fix broken navbar route to `/blog`**
  - **Issue:** Navbar links point to `/blog`, but no matching route exists.
  - **Where:** `src/components/Navbar.tsx`, `src/App.tsx`
  - **Fix:** Either add a real `/blog` route/page, or remove/replace the Blog links in desktop and mobile nav with an existing route.

- [x] **Fix malformed CSS block in `FullScreenScrollFX`**
  - **Issue:** The `<style jsx>` CSS appears to miss a closing brace for `.fx`, which can break downstream styles.
  - **Where:** `src/components/ui/full-screen-scroll-fx.tsx`
  - **Fix:** Close the `.fx { ... }` rule before `.fx-fixed-section { ... }` and verify layout rendering on desktop/mobile.

- [x] **Repair ESLint toolchain so `npm run lint` works**
  - **Issue:** Lint command crashes in `@typescript-eslint/no-unused-expressions`.
  - **Where:** `package.json`, `eslint.config.js`
  - **Fix:** Align compatible versions of `eslint`, `typescript-eslint`, and plugins (upgrade all together or pin known-compatible versions), then rerun `npm run lint`.

- [x] **Resolve pricing route/content mismatch**
  - **Issue:** `/pricing` redirects to `/contact` while `Pricing.tsx` still exists.
  - **Where:** `src/App.tsx`, `src/pages/Pricing.tsx`
  - **Fix:** Choose one direction:
    - Keep redirect and remove/archive `Pricing.tsx`, or
    - Restore `/pricing` route and make it part of navigation if still needed.

- [x] **Make contact location details consistent**
  - **Issue:** Page text says Casablanca, but map embed points to Tangier.
  - **Where:** `src/pages/Contact.tsx`
  - **Fix:** Update either the location text or the map embed URL so both refer to the same city.

- [x] **Implement real contact form submission**
  - **Issue:** Form submit currently only logs data to console.
  - **Where:** `src/pages/Contact.tsx`
  - **Fix:** Connect form to a backend/email service (API endpoint, form provider, or serverless function), add success/error UI states, and remove console logging.

- [x] **Replace placeholder CTA links (`href="#"`)**
  - **Issue:** “Book a Call” buttons do not navigate to a real destination.
  - **Where:** `src/components/Navbar.tsx`
  - **Fix:** Point CTA to a valid internal route (e.g. `/contact`) or external booking URL, with accessible link text and expected behavior.

- [x] **Add keyboard interaction for custom button-like divs**
  - **Issue:** Clickable `div` elements with `role="button"` are focusable but missing keyboard handlers.
  - **Where:** `src/components/ui/full-screen-scroll-fx.tsx`
  - **Fix:** Add `onKeyDown` handlers for `Enter` and `Space` (or convert to actual `<button>` elements) for accessible keyboard activation.

- [x] **Fix missing audio assets or remove audio references**
  - **Issue:** Home page references `/sfx/...` files that are not present under `public/`.
  - **Where:** `src/pages/Home.tsx`, `public/`
  - **Fix:** Add the referenced audio files under `public/sfx/` or remove/disable audio config fields if not used.

- [x] **Add basic automated tests (currently none detected)**
  - **Issue:** No test/spec files found, increasing regression risk.
  - **Where:** project-wide
  - **Fix:** Add at least smoke tests for route rendering and key interactions (nav links, contact submit flow, major animated sections mounting).
