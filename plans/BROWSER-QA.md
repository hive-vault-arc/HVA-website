# Browser QA before release

Keep PR #3 in draft. Keep hivevaultarc.com and its existing live site unchanged. Use the latest Ready deployment for the dev branch from Vercel, not an older pinned Preview URL.

## Required checks

- [ ] At desktop, tablet and mobile widths, confirm hero text is legible and unclipped, with no duplicated heading. Confirm restored hero video plays muted.
- [ ] Scroll through the full page; check spacing, image sizes, HVA logo placements, technology tiles and their animation. Review the intentional HVA gallery placeholders.
- [ ] Open and close navigation/dialogs using mouse and keyboard. Check visible focus, Escape, focus return and absence of keyboard traps.
- [ ] Visit About, Cases, Blog and Contacts through site navigation; refresh each clean URL, then test Back/Forward and the home logo.
- [ ] Repeat navigation on French pages and verify that language links reach the corresponding existing page.
- [ ] After client navigation, verify the document title and canonical path match the page. Confirm the canonical origin is https://hivevaultarc.com even on a protected Preview.
- [ ] Fill a contact form with disposable example values. Submit to open an email draft addressed to contact@hivevaultarc.com; inspect included fields and close without sending. Confirm no website success message claims delivery and form entries remain.
- [ ] Check invalid email/required-field validation. With no email application configured, the visible contact email should remain usable as a fallback.
- [ ] Verify the newsletter control requests updates by email draft; it must not claim that a mailing-list subscription was created.
- [ ] Inspect console/network errors. Distinguish pre-existing hydration warnings, missing font/optional-module requests and the known missing portrait from newly introduced failures.
- [ ] Confirm generated CSS requests return 200 with CSS content type, and styling appears without a permanent unstyled state.
- [ ] Record mobile/desktop loading metrics and repeat-visit behavior. Capture viewport, browser, cache/network conditions, LCP and CLS; INP requires real interactions/field data.

## Verified separately

Production builds and Vercel Preview builds passed. 150 local HEAD checks covered exported pages, clean routes, generated CSS/fonts and 404 behavior. Static metadata checks covered 49 unique titles, canonical URLs, matching social titles and valid sitemap XML.

A fresh direct HTML src/href scan found one absent image filename (image-56520568.png) referenced on two pages. This check does not cover CSS URLs, module imports, all CMS data or rendered srcset selection. Missing fonts, optional modules and the missing thank-you component remain tracked in SPRINTS.md.

## Record failures

For each failure, capture the latest Preview URL/commit, page, viewport, action, expected behavior, observed behavior and screenshot or browser annotation. Re-run affected checks after a fix. Do not treat source preservation or a successful deployment as visual verification.
