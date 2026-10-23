# 001 — Restore Origin Hero Video Behavior

- **Status**: DONE
- **Commit**: unavailable (the workspace is not a Git repository)
- **Severity**: HIGH
- **Category**: Performance and interruptibility
- **Estimated scope**: 2 files, remove 1 CSS rule and 1 JavaScript block

## Outcome

The runtime requested `/assets/videos/video-a45b98e3.mp4`, but the export only
provided the same file under `assets/media/`; the companion video
`video-21965e04.mp4` was also missing. Both expected video files are now
available under `assets/videos/`. A browser check confirmed the local videos
advance and play with the original branding runtime enabled.

## Problem

The exported homepage hero markup already has the same video and SVG text-mask
structure as the live origin. The local MP4 was verified byte-for-byte against
the origin MP4. The only differences in the hero markup are the local asset URL
and HTML serialization.

Two later HVA-specific changes alter the hero at runtime:

`assets/css/brand-theme.css:19` — current:

```css
video[src*="video-a45b98e3"][poster*="image-13cec89c"] {
  filter: hue-rotate(32deg) saturate(0.76);
}
```

`assets/js/brand-theme.js:55` — current:

```js
function finishBranding() {
  applyBranding(document.body);

  document.querySelectorAll('video[src*="video-a45b98e3"][poster*="image-13cec89c"]').forEach(video => {
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    if (video.paused) {
      video.play().catch(error => {
        console.warn("The HVA hero video could not start automatically.", error);
      });
    }
  });
}

if (document.readyState === "complete") {
  finishBranding();
} else {
  window.addEventListener("load", finishBranding, { once: true });
}
```

The origin already declares `autoplay`, `loop`, `muted`, and `playsinline` on
the five responsive hero video elements. Calling `play()` again on every
responsive variant is unnecessary and may compete with the page runtime. The
CSS filter changes the original video appearance and adds frame-by-frame
filtering; it does not recolor the SVG text mask.

## Target

Remove the complete hero-video CSS rule from `assets/css/brand-theme.css`.
Remove the hero-video query and playback changes from `finishBranding` in
`assets/js/brand-theme.js`, leaving `finishBranding` responsible only for
`applyBranding(document.body)`:

```js
function finishBranding() {
  applyBranding(document.body);
}

if (document.readyState === "complete") {
  finishBranding();
} else {
  window.addEventListener("load", finishBranding, { once: true });
}
```

Do not change the exported hero `<video>` elements, the following SVG masks,
their poster/video URLs, or the original autoplay/loop/muted attributes.

## Repo conventions to follow

- This is a static HTML export, not a Git repository or component build.
- Shared rebrand behavior is stored in `assets/css/brand-theme.css` and
  `assets/js/brand-theme.js`; the exported HTML pages load these shared files.
- Keep the rollback in those two shared files. Do not duplicate per-page CSS
  or JavaScript.

## Steps

1. In `assets/css/brand-theme.css`, delete only the
   `video[src*="video-a45b98e3"][poster*="image-13cec89c"]` rule.
2. In `assets/js/brand-theme.js`, delete the video query, attribute mutations,
   and `video.play()` call from `finishBranding`. Keep `applyBranding` and the
   existing load/ready-state logic.
3. Increment the shared theme asset cache query values on all 49 exported
   HTML pages so browsers fetch the updated files.

## Boundaries

- Do NOT change the hero markup or SVG mask markup in `index.html` or `fr.html`.
- Do NOT recolor, replace, or regenerate the video.
- Do NOT change logo replacement, HVA text replacement, navigation, or any
  non-hero component.
- Do NOT add dependencies or replace the static export with a framework.
- If the hero markup or the cited CSS/JavaScript has drifted, stop and report
  the drift instead of broadening the rollback.

## Verification

- **Mechanical**:
  - Run `node --check assets/js/brand-theme.js`; expect no syntax errors.
  - Confirm neither hero selector/filter nor hero `video.play()` remains in
    `assets/css/brand-theme.css` and `assets/js/brand-theme.js`.
  - Confirm all 49 HTML pages load the updated cache-busted shared stylesheet
    and script.
  - Request the homepage, updated theme files, and hero MP4 from the local
    server; each should return HTTP 200.
- **Feel check**:
  - Open `http://localhost:3000/` in a fresh tab and compare the hero with
    `https://framer-export-27151.rehosted.page/`.
  - Confirm the video-filled text animates continuously, loops, and the SVG
    white mask/transparent regions match the origin.
  - Confirm the hero video has no CSS filter in DevTools and uses the original
    poster and video asset.
  - Confirm the HVA logo and company name remain in place.
- **Done when**: the local hero's video motion and mask composition match the
  origin while HVA branding remains intact.
