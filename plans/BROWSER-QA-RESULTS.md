# Preview browser QA results — 31 October 2026

Release hold: keep PR #3 in draft. Do not merge, promote production, or change hivevaultarc.com or DNS.

## Snapshot and access

Tested deployment: https://hva-website-2r6nvyztl-oubayes-projects.vercel.app/
Source commit: 8c4dd41d6b88614ee110a233341eecac3d0560b1.
The user authorized temporary share access for this dev snapshot. The token is intentionally omitted here. A share cookie can allow subsequent tokenless navigation; this does not establish that deployment protection was disabled.

## Evidence and limits

Three bounded TinyFish browser sessions completed:
- fcfc462d-0bae-4b99-b3c5-f42ac3bb3eb0: reported smooth continuous desktop scrolling, HVA footer logos and visible email-draft instructions. No forms were submitted.
- 5faddc06-250e-4fa9-8ee7-ca27bf5c4d4d: reported observable animated hero dots and no simultaneously visible duplicated hero text. Could not capture the technology-icon section.
- ec642a3b-0d5e-433e-9ab8-24b56facc2a8: reported legible desktop hero text at 1280×800, but could not locate the specified technology group and claimed no video element. Mobile viewport controls were unavailable; navigation open/close was not exercised.

The provider reports conflict about video/icon presence and template branding. Screenshot files were not retrievable; image asset URLs returned by the provider are not screenshots. Do not convert these reports into a blanket visual pass, or remove animation layers based on repeated DOM text.

## Direct deployed-source cross-check

Authenticated preview fetches returned HTTP 200 for index.html and assets/js/brand-theme.js. The served HTML contains seven video elements, including muted autoplay looping inline hero video, 23 data-framer-name="Icon" slots, the technology section wrapper, and the deferred brand-theme.js reference. The served branding script contains the technology SVG artwork and targets animated slideshow cells. It matches dev source after the existing build-time Oslo-to-Tangier address replacement.

These checks establish delivered source presence only. They do not establish post-hydration visibility, successful video playback or icon animation.

## Still open

- Visually capture the actual technology tiles and their animation.
- Test real mobile/tablet layouts and mobile menu.
- Verify keyboard navigation, dialogs, focus and Escape behavior.
- Exercise contact email-draft opening/validation without sending.
- Verify French/client navigation and metadata.
- Measure loading under recorded viewport/network/cache conditions; no LCP, CLS or INP pass is claimed.
- Resolve contradictory branding/video reports with retrievable visual evidence.

No runtime changes were made for this QA record. Preserve the hero video and approved Lenis duration 2.4 / wheel multiplier 0.85.
