# Hive Vault Arc Website Design System

Status: active
Owner: Hive Vault Arc
Applies to: every public website route and shared component
Canonical brand package: `C:\Users\aliam\Documents\the vault\.branding`

## 1. Creative Direction

The website should feel like one precise technology-transformation company: calm, structured, credible, and operational.

The reference direction is the light editorial system already visible in the strongest homepage sections: generous white space, navy structure, restrained amber detail, clear proof, square geometry, and limited imagery.

The website is not:

- a collection of unrelated landing-page templates;
- a dark cinematic agency site;
- an electric-blue AI product site;
- a gallery of generated technology images;
- a poster translated directly into a webpage;
- a place to repeat the company logo in every section.

## 2. Approved Palette

No visual website color may be added outside this table without explicit approval.

| Token | Value | Approved use |
| --- | --- | --- |
| `canvas` | `#FFFFFF` | Default page and card surface |
| `canvas-warm` | `#FCFBF8` | Editorial alternative to pure white |
| `canvas-alt` | `#F1F3F6` | Alternate section and proof background |
| `ink` | `#1A2535` | Primary headings, controls, and filled buttons |
| `ink-dark` | `#0D1824` | Inset dark emphasis modules and footer |
| `body` | `#536174` | Body and secondary copy on light surfaces |
| `line` | `#DDE3EA` | Borders, dividers, rules, and inactive controls |
| `amber` | `#E8A838` | Canonical brand accent |
| `amber-muted` | `#DBAA4D` | Muted gold in approved illustrations and dark modules |
| `amber-display` | `#CD9F40` | Large display emphasis only |
| `amber-bright` | `#F0C15A` | Hover, focus, and dark-surface accent |
| `amber-soft` | `#F8E9C8` | Soft paths, washes, and low-emphasis fields |

### Palette Rules

- A component uses one dominant gold role at a time. Do not mix several gold values for decoration.
- `#E8A838` is the default accent. The other golds are semantic variants, not free alternatives.
- Never darken the gold for text. On light surfaces, small labels and eyebrows use navy or body gray; reserve gold for rules, icons, borders, sequence markers, and focus or hover detail.
- Gold text is appropriate on dark navy surfaces. A major editorial section may use one large gold phrase, but nearby labels and supporting copy remain navy or body gray.
- Use `#F0C15A` for gold text or fine details on dark navy when additional contrast is needed.
- Use `#536174` for secondary copy. Do not invent another gray.
- Do not use pure black.
- Do not use electric blue, cyan, teal, purple, green, red, orange, beige, or brown as website UI colors.
- Client/product colors are allowed only inside a clearly framed screenshot, device, browser window, chart, client logo, video, or other proof surface.
- Photographs and generated raster images may contain natural colors. Their overlays, captions, controls, frames, and surrounding section remain inside the approved palette.
- Technical mask channels and transparent alpha values are not rendered colors, but they must not leak into visible UI.

### Color Proportion

Use this as a composition target, not as generated analytics:

- `70-85%` light canvas;
- `10-20%` navy structure and typography;
- `5-8%` amber emphasis;
- dark page surfaces only for a meaningful emphasis module or footer.

## 3. Typography

### Website Type Roles

| Role | Typeface | Rule |
| --- | --- | --- |
| Utility display and strong hero statements | Manrope | Semibold or bold, compact but not oversized |
| Editorial statements and selected section headings | Newsreader | Regular; italics only for short emphasis |
| Body, navigation, labels, buttons, metadata | Manrope | Sentence case; weight creates hierarchy |
| Official logo typography | Supplied lockup asset | Never reconstruct with live text |

Satoshi is not part of the final website system. Audex and Syne remain valid inside supplied brand assets; they are not additional general-purpose website fonts.

### Type Scale

| Role | Desktop | Mobile | Maximum behavior |
| --- | --- | --- | --- |
| Page H1 | `clamp(3rem, 5cqw, 4.75rem)` | `clamp(2.5rem, 12cqw, 3.5rem)` | 2 desktop lines, 3 mobile lines |
| Section H2 | `clamp(2.25rem, 3.6cqw, 3.5rem)` | `clamp(2rem, 9cqw, 2.75rem)` | 2-3 lines |
| Card H3 | `clamp(1.4rem, 2cqw, 2rem)` | `1.4-1.75rem` | No fixed-height crop |
| Body | `1rem` | `1rem` | Approximately `65ch` maximum |
| Label | `0.72-0.8rem` | `0.72-0.8rem` | Short, tracked, uppercase only when useful |

Fluid type inside a capped page or section frame follows that frame with container units (`cqw`). It must not keep growing with `vw` after the frame reaches its maximum width. Full-viewport visual effects may use viewport units only when their text is not constrained by a capped content shell.

### Headline Rules

- Prefer 3-8 words for page and section titles.
- State one idea per headline.
- Do not stack three manifesto sentences into one H1.
- Do not use giant typography as decoration.
- Do not color complete paragraphs gold.
- Gold emphasis should normally be one short phrase or line.
- Use `text-wrap: balance` for headings and `text-wrap: pretty` for body copy.
- Avoid manual line breaks unless the content is stable in every locale and the break is tested responsively.

### Copy Style

- Use short, active sentences and familiar words.
- Sound technical, capable, and inviting without sounding academic or vague.
- Prefer one idea per sentence and a working range of 6-14 words for supporting copy.
- Use a precise technical term when it adds meaning; explain it with plain language instead of stacking more jargon.
- Cut filler such as "in order to," "leveraging," "comprehensive," and repeated transformation claims.

## 4. Logo System

Use approved assets from `.branding/logos/`. Copy selected files into the website asset directory without altering their geometry or colors.

| Context | Preferred asset |
| --- | --- |
| Light desktop/tablet navbar | `hva-icon-lockup-micro-navy.svg` |
| Dark ARC desktop/tablet navbar | `hva-icon-lockup-micro-dark.svg` |
| Mobile navbar and mobile menu | `hva-icon-static-light-surface.svg` or its dark-surface counterpart |
| Light hero, footer introduction, company identity block | `hva-icon-lockup-wide-navy.svg` or `hva-wordmark-wide-navy.svg` |
| Dark footer or dark identity block | `hva-icon-lockup-wide-dark.svg` or `hva-wordmark-wide-dark.svg` |
| Favicon/app identity | `hva-favicon.svg` or `hva-app-icon.svg` |

### Logo Frequency

- Navbar: one logo placement.
- Navbar lockups omit the positioning line: use the compact stacked lockup on tablet/desktop and the standalone circular mark on mobile.
- Footer: one full lockup placement.
- Normal content section: no logo by default.
- Long page: at most one additional intentional brand moment when it adds identity, not decoration.
- Do not place the standalone mark beside every eyebrow or title.
- Do not show two Hive Vault Arc logos in the same viewport unless one is part of a client proof screenshot.
- Do not combine a standalone mark with a separately typed company name when a supplied lockup exists.
- Do not use `hva-logo-number-3.webp` or `hva-logo-number-4.webp` in new work. Migrate existing placements to canonical SVG assets.

### Section Identity Without A Logo

Use one of these patterns:

- short eyebrow label plus an amber rule;
- section number plus concise label;
- small linear icon with a functional meaning;
- no eyebrow when the heading already provides enough context.

## 5. Layout And Edge Spacing

### Shared Frame

- Maximum standard content width: `1600px`.
- Maximum visual frame width: `1760px` for media grids, maps, proof rails, and capability systems.
- Dedicated reading frame: `820px`. This is separate from the existing `1200px` narrow frame used by compact multi-column layouts.
- Reading width inside any frame: approximately `55-70ch`, with `65ch` as the default.
- Page gutter: `16px` at 320-430px, `24px` at tablet, `32-48px` at desktop.
- Section vertical rhythm: `64-88px` mobile, `96-144px` desktop.
- Use one shared shell across Home, ARC, Capabilities, Industries, About, Portfolio, Insights, Contact, geo pages, legal pages, and detail pages.
- Keep text measures narrow inside wide compositions. Do not center a small card grid inside a large empty canvas.
- Let image-led and system-led sections use the visual frame. Text-only sections may use the standard or narrow frame.

### Wide Composition, Narrow Reading

- Use the `1760px` visual frame for heroes, media grids, capability matrices, maps, evidence sections, publication indexes, and visual navigation.
- Use full-width page bands with responsive internal gutters for immersive systems such as the Capabilities matrix and ARC.
- Use the `820px` reading frame for article prose, legal copy, methodology, limitations, FAQs, and other continuous reading.
- Forms and text-heavy detail layouts must remain constrained even when the surrounding page uses a wide frame.
- A wide section does not permit wide paragraphs. Keep copy columns at `55-70ch` and let media or structured data use the remaining canvas.
- Do not use a single centered `1200px` container for every page section. Choose the frame by content job.

### Inset Surface Rule

Dark or highly contrasted modules must not collide with viewport edges.

- Place dark modules inside the shared page gutter.
- Keep `16px` minimum exterior space on phones and `24-48px` on larger screens.
- Use square corners or a maximum `8px` radius.
- Give the module clear breathing room above and below.
- Do not insert abrupt full-bleed dark bands between otherwise light sections.
- The global footer is the normal full-bleed exception.

### Sticky Editorial Rails

- Use a sticky left rail only when the right side is a real ordered sequence, such as capability chapters, industry programs, or ARC phases.
- Desktop uses a `4 / 8` split. The left rail stays within the viewport while the right chapters scroll in one uninterrupted column.
- The active step must be visibly different through type scale, ink color, and one restrained brand-gold marker. Do not use pills, progress cards, or decorative schemas.
- Keep rail headings and index labels concise. The right-side chapter owns the detailed explanation.
- Disable sticky positioning below the desktop breakpoint. Tablet and phone layouts place the introduction and index above the content in normal document flow.
- Never add `overflow`, transforms, or containment to an ancestor when it would break `position: sticky`; preserve the document scrollport and keep horizontal clipping at the body level.

### Page Rhythm

- Default page background is light.
- Alternate between `canvas`, `canvas-warm`, and `canvas-alt` only when the content job changes.
- Do not switch background merely to create novelty.
- Use borders and rules sparingly to explain grouping.
- Cards are for repeated items, proof, modals, or genuinely framed tools. Do not wrap every section in a card.
- Avoid cards inside cards.
- Favor aligned bands, proof frames, and whitespace over decorative floating panels.

## 6. Page And Section Patterns

### Primary Hero

- One eyebrow, one H1, one supporting paragraph, and one primary action.
- A secondary action is optional.
- One dominant media object maximum.
- Desktop may use an asymmetric text/media split.
- Mobile puts the title and explanation before media unless a page-specific test proves another order is better.
- Hero media should not exceed approximately `52%` of desktop width or `42dvh` on phones.

### Editorial Section

- One concise heading and one explanation block.
- Optional supporting proof or diagram.
- No logo by default.
- No decorative image when typography and spacing already communicate the point.

### Proof Section

- Prefer real client-safe product screens and project evidence.
- Make one proof object dominant and readable.
- Keep client colors inside the proof frame.
- Add only the metadata needed to understand context, responsibility, and result.

### CTA

- One clear action.
- Prefer an inset navy module on light pages.
- Do not use glowing shapes, blurred color orbs, or unrelated background photography.
- Keep copy short enough to understand without scrolling inside the module.

### Section Transitions

- Do not place a divider between every homepage section.
- Use spacing and canvas changes as the default transition.
- Keep rules only at meaningful boundaries: compact proof strips, editorial surface changes, FAQ entry, and the footer.
- Repeated borders make the page read as stacked modules and must be removed.

### Navigation

- Use a subtle active state: amber rule, text shift, or compact indicator.
- Do not use a large filled amber rectangle around ordinary active navigation links.
- Keep the header treatment consistent between routes.
- Switch logo tone only when the actual navbar surface changes.

## 7. Image Policy

Every image must perform at least one job:

1. show real delivery proof;
2. show a real founder or team member;
3. establish a specific industry or location context;
4. explain one architectural or operational concept;
5. identify a publication or project.

If an image does none of these, remove it.

### Density Limits

| Page family | Recommended meaningful media |
| --- | --- |
| Homepage | Hero sequence plus 2-4 major proof/editorial media groups |
| ARC | 1 hero concept plus real process/proof media |
| Capabilities index | 1 hero treatment plus selected capability media; not one decorative image per paragraph |
| Capability detail | 1 hero image plus 1-3 proof/context objects |
| Industries | Context media only where sectors differ meaningfully |
| About | Real team photography and selected proof |
| Insights index | Publication covers/thumbnails only |
| Article | Cover plus diagrams or proof required by the content |
| Case study | Real project proof; quantity follows the evidence |
| Contact/legal | Zero or one supporting image |

### Generated Image Direction

- Bright or warm-white editorial environments.
- Navy structural planes and realistic materials.
- Restrained amber details.
- Consistent soft daylight or controlled studio lighting.
- Specific operational subjects: system architecture, delivery planning, workflow, infrastructure, and real work contexts.
- No robots, glowing brains, neon networks, blue particle waves, generic boardrooms, anonymous handshakes, or sci-fi dashboards.
- Do not generate the Hive Vault Arc logo inside imagery.
- Generate a coordinated family, not unrelated one-off images.

### Human And System Image Mix

- Do not make a page feel like a sequence of meetings. People appear only when leadership, collaboration, or delivery practice is the actual subject.
- Balance human scenes with systems, architecture, infrastructure, product proof, diagrams, and close operational details.
- Within a sequence of three major editorial images, normally use no more than one people-led scene. Hands or process details may be used when they keep the work, rather than the people, dominant.
- Do not place people-led images in consecutive sections unless the content requires a specific team or founder story.
- Prefer close, inspectable subjects over distant rooms, tiny people, generic offices, or lifestyle imagery.
- Proof imagery must match the named system or industry context. Do not use luxury lifestyle photography as a substitute for operational evidence.

### Generated Image Framing Contract

- Generate for the final frame, never generate a generic canvas and crop it later without review.
- Approved website ratios are `16:9`, `3:2`, `4:3`, `2:1`, and `1:1`. A component must declare its ratio before an image is generated.
- Keep the primary subject close enough to inspect. Prefer medium-close, close-up, macro, or tightly framed still-life compositions over distant rooms, skylines, or tiny people.
- Use one dominant focal subject. Secondary objects must support that subject rather than compete with it.
- Reserve deliberate negative space on the side where interface text or controls may sit, but do not generate text inside the image.
- Compose with an explicit safe zone of at least `10%` around faces, hands, products, and meaningful system details.
- Match the website frame orientation exactly. Do not stretch an image or rely on extreme `object-position` values to rescue a poor crop.
- Keep original PNG/TIFF masters outside `public/`; only optimized delivery assets belong in `public/Images`.
- Generate hero masters at `2400-3000px` on the long edge and section/editorial masters at `1800-2200px`.
- Export major editorial WebPs at quality `90-94`, normally targeting `250-600 KB` before Next.js optimization.
- Prominent `next/image` instances use an approved quality of `88-90`; routine thumbnails may retain the default quality.
- Preserve natural photographic color. Do not apply `grayscale`, `saturate`, `contrast`, or `brightness` filters to normal photography.
- Sanity hero/detail images must request at least `2000px` on the long edge; card/listing images must request at least `1400px` when their rendered frame can exceed `700px` on high-DPI displays.
- Do not upscale an already-compressed delivery file. Recover or regenerate a genuine master instead.
- Use `object-fit: cover` only when the focal subject remains intact at phone, tablet, and desktop crops.
- Mobile may use a separate crop of the same source concept when one crop cannot preserve the focal subject cleanly.
- Reject images that look soft, distant, overfilled, artificially sharpened, or visibly generated in faces, hands, screens, architecture, or repeated objects.
- Official supplied logo SVGs may retain their intrinsic brand colors. Those asset colors are not website UI tokens and must not be extracted for surrounding interface use.

## 8. Components And Interaction

- Buttons are square or use no more than `4px` radius.
- Controls are at least `44px` high/tall for touch.
- Primary button: navy surface, white text, amber focus treatment.
- Secondary button: light surface, navy text, border token.
- Tertiary action: text plus a familiar icon.
- Hover may shift approved color and translate by `1-2px`.
- Active state may use `scale(0.98)` or `translateY(1px)`.
- Focus indicators must be visible and use approved amber/navy tokens.
- Motion uses `transform` and `opacity`, respects reduced motion, and does not compete with reading.
- Do not add continuous decorative animation merely to make the page feel active.
- Icon families must use a consistent visual weight within a component or section.
- Framed icon tiles always use a solid `#FFFFFF` background, including hover and active states. Use navy or brand gold for the glyph and `#DDE3EA` or brand gold for the border; never fill icon tiles with amber, ivory, navy, transparency, or gradients.
- Client and technology partner logos retain their supplied colors at rest and on interaction. Do not grayscale, recolor, fade, or swap them; hover emphasis must be restrained and slow (`1-1.2s`) without obscuring the original identity.

## 9. Responsive Acceptance

At `320`, `375`, `390`, `430`, `768`, `820`, `1024`, `1280`, `1440`, and `1920` pixels:

- no horizontal overflow;
- no cropped title or long word;
- no text/media overlap;
- no image taller than its content job requires;
- no dark module touching the viewport edge except the footer;
- no duplicated logos in the same viewport;
- no unreachable carousel content;
- no control below `44px` touch size;
- no desktop-only absolute composition left active on phone;
- consistent reading order and spacing.

## 10. Prohibited Patterns

- unapproved colors in UI code;
- electric-blue corporate accents;
- near-black full-page themes;
- repeated logo badges beside headings;
- legacy numbered logo WebPs;
- oversized multiline manifesto titles;
- gold paragraphs or excessive italic gold copy;
- generic AI artwork and neon data imagery;
- image-per-card decoration;
- full-bleed dark sections on light pages;
- gradients, glows, bokeh, blurred color orbs, and glass effects used as decoration;
- nested cards;
- arbitrary grid overlays;
- multiple competing type systems;
- page-specific visual systems that bypass shared tokens and primitives.

## 11. Implementation Gate

A migrated page is complete only when:

- it uses only approved visual tokens;
- it uses canonical SVG logo assets;
- its logo count follows the frequency rules;
- its title fits the line limits;
- its media passes the image-job test;
- dark modules are inset;
- shared components replace local duplicates;
- responsive screenshots pass;
- `npm run audit:brand`, `npm run audit:responsive`, lint, tests, build, and `git diff --check` pass at the required stage.

## 12. Related Files

- `AGENTS.md`
- `docs/AGENT_LESSONS.md`
- `docs/design-system/page-family-migration.md`
- `docs/brand-copy-checklist.md`
- `sprints/website-consistency/README.md`
- `C:\Users\aliam\Documents\the vault\.branding\README.md`
- `C:\Users\aliam\Documents\the vault\.branding\brand-tokens.json`
