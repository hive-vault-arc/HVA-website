# HVA website improvement sprints

Updated: 30 October 2026. All implementation changes are on remote `dev` and deployed as Vercel Previews. No production merge has been made in this work.

## Current status

- Implemented: duplicate CSS removal; responsive WebP variants; inherited advertising removal; direct homepage routing; cache rules for generated images, fonts and extracted CSS; site-wide duplicate module-preload cleanup; cacheable CSS extraction across 49 pages; decorative gallery placeholders; missing snippet-loader compatibility; email-draft contact handling; inherited language-link cleanup.
- Latest code Preview verified Ready: commit `5199309` at https://hva-website-mphk0xjwx-oubayes-projects.vercel.app/.
- Forms open a draft addressed to contact@hivevaultarc.com. Visitors must send from their own email app. Automatic server delivery and mailing-list signup are not implemented.
- Still open: browser rendering/interaction QA, comparable load measurements, pre-existing hydration warnings, correct testimonial portrait, missing font/optional runtime modules, confirmed production domain and final metadata.
- Execution access resumed on 30 October. The current build passes 150 local HTTP route/asset checks. Rendered browser QA and comparable performance measurements remain pending.

Historical evidence below is retained as a record of earlier stages; its past-tense local-only/access limitations do not describe current remote deployment status.

## Sprint 1: Baseline and duplicate CSS
- [x] Inspect source and establish baseline.
- [x] Create tracker and repeatable audit/optimization script.
- [x] Remove full-page duplicate CSS only after verifying exact trimmed equality.
- [x] Verify all non-style content and unique styles remain identical.
- [x] Production build passes (Next.js 16.4.3 installed in original node_modules).
- [ ] Local HTTP checks: blocked by session socket permissions (WinError 10013).
- [ ] Desktop/mobile visual and hero playback comparison.
- [x] Publish tested changes to remote dev and verify successful Vercel preview builds.
- [ ] Browser visual/interaction QA: preview requires Vercel login. Original OneDrive folder remains unchanged.

Acceptance: smaller HTML, unchanged unique CSS and other markup, no new missing
references, successful build, visual comparison. Live metrics pending deployment URL.

## Sprint 2: Asset integrity and responsive images
- [ ] Audit missing files across HTML, srcset, CSS, runtime modules and CMS data.
- [ ] Recover assets with clear provenance; list replacements where unavailable.
- [x] Generate real image size variants for matched text URLs (binary CMS remains unchanged).
- [x] Generate WebP variants; dimensions/alpha checks pass.
- [ ] Browser visual comparison of image quality and runtime selection.
- [ ] Prioritize visible hero/poster; defer below-fold media.
Acceptance: no unexplained image 404s, real responsive variants, lower image transfer.

## Sprint 3: JavaScript, video and animation
- [ ] Profile actual requests and main-thread work.
- [x] Remove marked inherited Facebook/X advertising snippets on all 49 pages.
- [x] Trace checkout embed: runtime consumers found; preserve until template licensing component is reviewed.
- [x] Remove verified duplicate module preloads across all 49 pages.
- [ ] Defer optional below-fold components after browser profiling.
- [ ] Pause offscreen media; preserve responsive hero playback.
- [ ] Support reduced motion and profile mobile animation.
Acceptance: menus, dialogs, forms and animations work; less initial loading/blocking.

## Sprint 4: Delivery, routing and SEO
- [x] Confirm deployed Brotli and optimized-image caching; verify font/style cache rules by local HTTP checks.
- [ ] Confirm all final asset headers on the latest deployed Preview.
- [ ] Version assets before adding long immutable browser caching.
- [x] Serve the homepage directly at `/` without the former redirect.
- [ ] Fix original-domain hreflang links, canonicals, titles and descriptions.
- [ ] Use absolute social image URLs; add sitemap, robots and useful 404 page.
Acceptance: correct deployed headers, routes, language alternates and status codes.

## Sprint 5: Maintainability and release validation
- [ ] Replace hidden original branding with actual HVA markup.
- [ ] Migrate expensive sections into shared maintainable components.
- [ ] Deduplicate files after updating all references, including runtime strings.
- [ ] Verify real form submissions, keyboard access, labels and dialog focus.
- [ ] Check English/French content and legal/contact information.
- [ ] Record comparable before/after desktop/mobile performance.
Acceptance: working accessible interactions, consistent branding and no broken routes.
Performance targets: LCP <= 2.5 s, CLS <= 0.1, INP <= 200 ms. Field INP needs visitor data.

## Working rules
Keep changes scoped and reversible. Do not blindly delete runtime bundles or media.
Asset inventory size is not page transfer size. Mark browser/deployment verification
complete only after observing it. Record evidence and remaining checks each session.

## Sprint 1 implementation evidence

49 pages updated. Removed 30,750,565 bytes of duplicated inline CSS.
Homepage: 6,847,399 -> 5,719,053 bytes (16.5% smaller before compression).
The retained SSR stylesheet and marker elements remain in place. All unique style
content and all content outside style elements are verified identical per page.
Transformation is idempotent. No assets, runtime bundles or video markup changed.
Production build passed. HTTP checks blocked by socket permissions; browser timed
out reaching loopback. Visual QA, playback QA and deployment remain outstanding.
Missing-image repairs are assigned to Sprint 2; no replacement images were invented.
See sprint-1-results.json for per-page sizes, hashes and direct-reference findings.
This source audit excludes srcset/CSS/runtime references, tracked in Sprint 2.

## Development branch and Sprint 2 progress

Local repository initialized from original export: main baseline d894689.
All optimization work is on dev; Sprint 1 commit 66af055.
No remote is configured, no push has occurred, and production is unchanged.
See DEVELOPMENT.md for the branch workflow and push guard.

Sprint 2: 84 source/size combinations produce 77 distinct WebP files (4,889,148 bytes).
1,244 matched resizing URLs updated across 64 HTML and runtime module files.
Those source/size combinations previously pointed to 26,072,902 bytes of originals;
variants total 5,059,616 bytes across the same combinations (80.6% smaller).
These are asset comparisons, not measured page transfer or loading-time savings.
Original image files, binary CMS and videos are untouched. Alpha/dimensions and
changed JS/MJS syntax checks pass. Only recognized image URLs were changed.
Production build passes with a fresh temporary .next-sprint2 output directory;
the existing .next cache produced an EPERM error. next.config.js was restored.

The broader literal-path scan found 151 missing paths: 84 fonts, 32 modules,
32 raster images, two videos and one SVG. Some may be optional or unreachable;
browser request traces are needed before classifying these as user-visible failures.
Binary CMS files were scanned for literal paths without rewriting their format.
Missing sources are listed in sprint-2-asset-audit.json. No replacement assets were
invented. Dynamic URLs and binary-CMS image resizing remain unfinished.

Sprint 2 implementation committed on dev as 2d73864. Remote push remains blocked
by missing repository URL; production branch settings must be verified before pushing.

Remote provided and configured: https://github.com/hive-vault-arc/HVA-website.git
Integration base requested: develop-nextjs-migration. Remote inspection is blocked
by Git transport/network restrictions. No push attempted; GitHub connection pending.
Existing remote history must be inspected before porting local optimization commits.

## GitHub connection retry

GitHub reads now work. Migration head: bc6b7423aa741d039699e15dd176303c65cd486c.
Remote tree has the same 757 files as the local baseline; only plans/README.md
has a different blob. No remote AGENTS.md, workflow or Vercel config was found.
Repository default branch is main (head 304f39c45c597cda7201babd40fd536f611523ac).
Vercel production-branch settings have not been verified.
Attempting to create remote dev from the migration head returned HTTP 403:
Resource not accessible by integration. No remote branch or commit was created.
Git CLI remains blocked by getaddrinfo networking failure. Connection needs
repository Contents write access before remote integration can proceed.

## Sprint 3: inherited advertising cleanup

Removed both marked advertising blocks from all 49 exported pages (41,199 bytes
of HTML). These blocks referenced three local tracker scripts totaling 924,474
uncompressed bytes. That is avoided referenced script weight, not a measured
network saving; the libraries may also initiate external traffic.

Verified exact scoped transformation against Git HEAD across all 49 pages.
Only the marked tracking blocks changed. Forms/buttons, video/SVG markup and all
remaining scripts are identical. Transformation is idempotent. Production build
passed in a fresh .next-sprint3 output directory; next.config.js was restored.

Checkout tracing found runtime consumers in u14O65Rfz.C5t5Bnqb (three exported
copies), including template license purchase URLs and data-polar-checkout setup.
The checkout embed is therefore retained. These inherited licensing controls need
review in a running browser before removing the owning component and its imports.
No runtime modules or asset files were deleted during this cleanup.

Remote dev creation retried: still HTTP 403 Resource not accessible by integration.
No remote write succeeded. Production deployment and browser checks remain pending.

## Browser GitHub integration (in progress)

Signed-in browser successfully created remote dev from migration commit
bc6b7423aa741d039699e15dd176303c65cd486c. Root workflow files were committed in
d16bc1c2cc6b5f3de8326ed4145ec5270ee179a3. Tested changes are being uploaded in
batches to remote dev. Do not treat earlier connector permission failures as
current browser blockers. Main/migration are not being modified. Remote tree and
Vercel preview checks are still pending until all batches have been committed.

## Remote synchronization complete

All tested source changes, generated images, maintenance scripts and sprint evidence
are committed on remote dev. Verification at 5bf50c5c13d3bab3d688c770f458c6a2ab6a2d42
matched all 846 expected files (UTF-8 CRLF/LF normalization allowed; binaries exact).
Main and develop-nextjs-migration refs remain unchanged. GitHub Production environment
still points to main commit 304f39c45c597cda7201babd40fd536f611523ac.
Both Vercel project status checks reported successful deployments for that commit.

A browser visit to the preview redirects to Vercel login, so visual, playback and
interaction checks remain pending. No production merge or deployment was requested.
See github-sync-verification.json for the recorded evidence and limitations.

The web-created push hook is mode 100644. New clones must make it executable and
configure hooksPath; browser commits are not governed by local hooks. The existing
local copy still has its executable dev-only hook configured. Future normal Git
work should clone remote dev, which preserves the repository's real history.


## First-load follow-up (30 October 2026)

- The homepage now serves at `/` without the previous redirect to `/index.html`; a local production build returned HTTP 200 with the exported homepage. Both Vercel Preview builds passed at commit `1a5eb04`.
- The Vercel build now marks 69 offscreen homepage images `loading="lazy"`; the first 12 images and all hero video elements remain unchanged. The build script is idempotent. Both Vercel Preview builds passed at commit `0358ad4`.
- Measured mobile load timing and rendered hero/video checks remain open because the Preview requires Vercel sign-in in the available browser.
- The 59 homepage module preloads were proven byte-identical to `/assets/animate/*.mjs` imports while pointing to separate `/assets/js/*.js` URLs (4,462,548 bytes of duplicate source). The build now strips only verified duplicate preload tags; the entry script and module imports remain. Local production build passed, deployed visual/network timing remains open. The 5.5 MB homepage HTML is the next first-load target.


## Missing decorative gallery images (30 October 2026)

The build replaces references to 13 absent gallery images with a shared 516-byte HVA geometric placeholder. Both HTML and runtime module URLs are updated so hydration does not restore missing gallery URLs. Local production build passed; source scan leaves one missing homepage image, the testimonial portrait `image-56520568.png`. The portrait requires the correct supplied photo or a separately approved content change. Placeholder appearance remains pending browser QA.


## Font caching follow-up (30 October 2026)

Added immutable browser caching only to the 26 existing fingerprinted WOFF2 filenames (991,976 bytes including duplicate copies). Local production build passed. HTTP HEAD checks confirmed font max-age=31536000 and homepage max-age=0. This improves repeat visits, not first-visit transfer size. Missing font files referenced by exported font-face rules still require investigation before changing typography.


## Cacheable exported styles (30 October 2026)

Build extraction moves 30,750,516 inline CSS bytes from 49 pages into 24 fingerprinted stylesheets. The homepage HTML decreases to about 4.58 MB (approximately 20% smaller). Framer style markers and component metadata remain unchanged, and the stylesheet link retains the original cascade position. All 49 extracted blocks match the source CSS exactly after line-ending normalization. Blocks with relative URLs stay inline. Local production build and HTTP checks passed (CSS 200, text/css, immutable cache). First-visit total transfer is not claimed to decrease by 20%; CSS is fetched separately. Browser visual/interaction QA and measured load timing remain open.


## Site-wide duplicate preload cleanup (30 October 2026)

The build removes 1,916 additional duplicate module preload links across the other 48 pages (1,975 including the homepage). Each removed target matches an animation module by SHA-256 and is not referenced by filename in the animation modules or entry bundle. Script and video tags match the original source across all 49 pages. Local production build passed and a second pass made zero changes. Image lazy loading remains limited to the homepage. Browser interactions and real loading measurements remain pending.


## Missing navigation snippets module (30 October 2026)

Added the omitted snippets module at its expected import path with empty `getSnippets` and `snippetsSorting` exports, matching the runtime loader contract. This intentionally adds no inherited page-specific custom code; existing embedded page scripts remain. Local import-contract check and production build passed. Browser navigation verification is still pending. The missing thank-you route component and optional syntax/font loaders remain unresolved; no substitute modules were added for those.


## Contact form delivery audit (30 October 2026)

The export's contact and newsletter forms referenced two inherited Framer submission endpoints; HVA ownership could not be established. The build now removes those endpoint URLs from HTML/runtime sources and sets forms to open a visitor-reviewed email draft addressed to contact@hivevaultarc.com. Contact buttons and explanatory notes state that the visitor must send from their email app. Newsletter UI requests updates by email rather than confirming a mailing-list signup. Form values are retained; hidden honeypots, password/file inputs, and disabled controls are excluded. The adapter loads on all 49 pages to handle client navigation. Local production build and draft destination/content/validation checks passed without sending an inquiry. Browser validation remains pending. A dedicated HVA form delivery backend is still needed for one-click server submission; the absent thank-you route is not used by this draft flow.


## Template SEO references (30 October 2026)

Build cleanup removes 243 language alternate links to quantumflux.framer.ai from the export, preserving unrelated links. Local production build passed. Replacement hreflang links and canonical URLs still require the confirmed HVA production domain. This is metadata cleanup, not a measured loading improvement.


## Local HTTP release validation (30 October 2026)

A fresh production build and local server passed 150 HEAD checks: 49 exported .html routes, their 49 clean URLs, the root homepage, 24 generated stylesheets, 26 existing font files, and a deliberately unknown path returning 404. Stylesheets and fonts returned expected MIME types and immutable cache headers; redirects were not followed. The checker is restricted to loopback hosts and makes no form submissions. Run the production server on port 3092, then `npm run check:routes`. This verifies routing and delivery only, not rendered layouts, animation, contact email-app launching, or real-world loading metrics.


## DOM observer runtime work (30 October 2026)

Branding/contact observers now deduplicate mutation targets and skip descendant roots already covered by an ancestor. Tech-tile or form mutations share one scoped root. Observers pause during their own synchronous DOM edits and reconnect in a finally block, avoiding self-triggered follow-up scans. Branding/content transformation logic is unchanged. Syntax checks passed; a behavioral fixture reduced seven overlapping records to two scans and verified reconnect-on-error behavior. No actual browser speed gain is claimed until profiling is available.


## Confirmed production domain (30 October 2026)

User confirmed https://hivevaultarc.com. The build generates 49 canonical/og:url entries, absolute social-image URLs, 132 hreflang links for existing English/French counterparts, and a 49-URL sitemap. Preview robots disallow crawling; production robots allow crawling. Template-host anchor links become local paths, and the Framer canonical origin is updated. Local metadata/XML checks and production build passed; DNS/domain assignment was not modified. Browser navigation metadata remains to be verified.
