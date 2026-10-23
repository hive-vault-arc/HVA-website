# 002 — Isolate Homepage Branding Script

- **Status**: DONE — diagnostic complete; script restored
- **Commit**: unavailable (the workspace is not a Git repository)
- **Severity**: HIGH
- **Category**: Performance and interruptibility
- **Estimated scope**: 1 HTML file, 1 script reference

## Outcome

Disabling the homepage branding script did not restore playback. The actual
cause was missing video files at the paths requested by the Framer runtime.
The branding script reference has been restored after the video assets were
fixed, and playback was verified with HVA branding enabled.

## Problem

The local homepage hero still appears frozen even after removing all
hero-specific CSS and JavaScript changes. The local hero video file is
byte-identical to the origin, and the exported hero video/SVG mask structure
matches the source. The remaining rebrand-specific runtime code walks and
modifies Framer-rendered page content.

The script reference to disable is in `index.html`:

```html
<script defer src="./assets/js/brand-theme.js?v=7"></script>
```

The exact current cache key may have advanced; locate the single script
reference by its `assets/js/brand-theme.js` path before editing.

## Target

Temporarily remove only the HVA `brand-theme.js` script reference from
`index.html`. Keep the HVA stylesheet reference, the hero markup, the hero
video and poster URLs, and all other scripts unchanged.

The homepage will temporarily show its original Framer wordmark and any
unreplaced company-name text. Other exported pages retain HVA branding.

## Repo conventions to follow

- This workspace is a static HTML export, not a Git repository or component
  build.
- Shared brand behavior is loaded from `assets/js/brand-theme.js` by the
  exported HTML pages.
- The English homepage is `index.html`; the French homepage and other pages
  must remain unchanged during this diagnostic.

## Steps

1. In `index.html`, remove only the single deferred script element whose `src`
   ends in `assets/js/brand-theme.js` (including its cache query).
2. Leave `assets/css/brand-theme.css` and `assets/js/brand-theme.js` unchanged.
3. Do not edit any other HTML page.

## Boundaries

- Do NOT change the hero `<video>` tags, SVG masks, CSS, or any media files.
- Do NOT edit `fr.html` or any non-homepage page.
- Do NOT remove or reorder Framer runtime scripts.
- Do NOT change the HVA logo asset or other branding.
- If `index.html` does not contain exactly one brand-theme script reference,
  stop and report rather than editing a different element.

## Verification

- **Mechanical**:
  - Confirm `index.html` contains no `assets/js/brand-theme.js` script
    reference.
  - Confirm `index.html` still contains the HVA `brand-theme.css` reference.
  - Confirm `fr.html` and the other HTML pages still reference the brand
    script.
  - Confirm the video tags and SVG mask markup remain unchanged.
  - Request `/` from the local server and confirm it serves the updated
    homepage successfully.
- **Feel check**:
  - Open `http://localhost:3000/` in a fresh tab.
  - Compare hero motion and the video-filled heading with the original site.
  - If motion returns, report that the HVA runtime branding script was the
    cause; if it remains frozen, report that the script is not sufficient to
    explain the issue.
- **Done when**: the homepage branding script is disabled and the user can
  compare the hero with and without the script.
