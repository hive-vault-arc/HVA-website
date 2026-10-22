# Simple v1 homepage design handoff

**Status:** paused at the owner's request on October 22, 2026. This is a record of the work and intent, not approval of the current design.

**Implementation snapshot:** commit `4f9eba5` on `site/simple-v1`, pushed to `origin/site/simple-v1`. The deployed full website remains on `main`; `site/enterprise-maintained` preserves that version. Do not merge the simpler site into `main` until the owner asks for its release.

## Goal we were pursuing

Make Hive Vault Arc's simpler homepage feel distinctive, clear and credible to small and medium businesses with disconnected tools, manual workflows or operational chaos. The page should explain the offer, show real client work and guide a visitor toward a free 30-minute discovery call. The owner wanted a **bolder, more digital and dynamic** visual personality, especially a more dramatic opening, without generic agency styling or invented trust claims. The owner asked us to perfect the homepage before taking on further page design.

The intended reading order is: offer and selected-client proof → recognizable business problems → Plan / Build / Run services → published case studies → ARC process → founders → Insights → FAQ → enquiry. Preserve the HVA wordmark, Manrope/Newsreader typography, navy/white/amber palette, shared navigation, four locales, Sanity content and existing route destinations.

## Reference cues from the owner

- The supplied **Hive Vault Arc service studio showcase** and **service studio homepage** images establish the Plan / Build / Run story and restrained HVA palette.
- The supplied Flowout hero screenshot suggested a moving, low-contrast background. The implemented HVA system graphic is original and uses the brand palette.
- [Solvestack](https://solvestack.framer.website/) informed the sequence of the explanation; [QuantumFlux](https://quantumflux.framer.ai/) informed the desire for stronger components and motion. They are references, not source content or claims.
- The owner's case-study screenshot suggested an image-first horizontal project gallery. The three published HVA projects use their real client interface images.
- The [requirements brief](simple-v1-requirements.md) records the other supplied component references, page scope, content and SEO requirements.

## What we tried and where the code stands

1. **Opening and trust.** Several hero compositions were tried. The latest has a white offer panel beside a navy Plan / Build / Run system graphic. Dotted amber signals, route packets and lane highlights move while visible, with Pause and reduced-motion behavior. Verified service and co-founder counts sit beside the graphic; selected client logos remain grayscale until hover or keyboard focus; real project screens follow immediately. The owner called an earlier version “closer” but wanted more drama. Main files: `src/components/studio/StudioHero*.tsx` and `src/components/studio/studio.module.css`.
2. **Problems and process.** Three business problems lead to matching service anchors through a small interrupted-route diagram. The later ARC chapter uses a large A / R / C letter route beside the existing Assess / Re-engineer / Command explanations. These are explanatory graphics, not client work. Main files: `src/views/Home.tsx`, `StudioChallengeVisual.tsx`, `StudioArcVisual.tsx` and `StudioScrollExperience.tsx`.
3. **Services.** We moved from separate pale cards to long navy service rows, then tried a shorter asymmetric composition after the owner picked Services and Case Studies for the next rewrite. On wide screens, Plan is the image-led foundation on the left; Build and Run form two shorter chapters on the right. Smaller screens retain a readable sequence. The three cohesive images are labelled illustrative, and all six service links remain. Main files: `src/views/Home.tsx`, `src/components/studio/studio.module.css`, and `public/Images/semantic/home/*operating-model-v1.webp`.
4. **Case studies.** We first made the published projects a horizontal rail with a larger lead card and problem-to-delivery captions. The latest wide-screen layout shows all three projects together as equal image-led columns; phone and tablet retain the scrollable rail. Each links to the real case study. The last code edit shortened card previews to word-limited excerpts while retaining the full CMS story on the detail page. Main files: `src/components/studio/StudioCaseStudies.tsx`, `StudioCaseStudyRail.tsx` and `studio.module.css`.

The chronological [homepage implementation log](simple-v1-homepage.md) has more detail about earlier iterations. Some of its “latest” descriptions and the Services/Work rules near the top of `DESIGN.md` predate the final wide-screen composition above; check the rendered code before treating those older layout descriptions as current.

## Verification and unresolved work

- The committed snapshot passed ESLint, the responsive source audit, `git diff --check`, and **256 tests**. The brand audit passed in report mode with **448 inherited findings**, which were not introduced by this pass.
- The last production build compiled and passed TypeScript, but **static export failed after Sanity requests timed out**. Earlier builds passed. The latest card-excerpt edit therefore has no completed production build or final browser screenshot.
- Prior visual reviews covered hero and several section states at 390, 820, 1440 and 1920 pixels, Arabic RTL, enlarged text, keyboard controls and reduced motion. The final Services/Work layout was viewed at 1440px before the last excerpt edit. **Do not treat the final iteration as visually signed off.**
- The owner's broader goal remains open: the current visual personality and opening impact still need their review. On resumption, check the latest Services and Work at 390, 820, 1440 and 1920px in all four locales, including 200% text, focus and reduced motion. Then reconcile the older layout guidance in `DESIGN.md` and `simple-v1-homepage.md` with whichever direction the owner accepts.

The design work is paused. No local Node or Python port was listening when the implementation snapshot was pushed.
