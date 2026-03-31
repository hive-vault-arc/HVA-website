# FR-12 — Blog Post Page (French)

**Route:** `/fr/blog/[slug]`
**View file:** `src/views/BlogPost.tsx`
**App page:** `src/app/blog/[slug]/page.tsx`
**Data source:** `src/lib/blog.ts` — all post content is TypeScript objects here
**Depends on:** FR-00, FR-11

---

## Goal

Translate the Blog post page shell (UI chrome), and decide on a strategy for the post content itself. Post content is authored directly in `src/lib/blog.ts` as TypeScript objects — not from a CMS.

---

## Two-part scope

### Part A — Post page UI shell (`BlogPost.tsx`)
These are UI labels that wrap every post:

- Back link text (e.g. `"← Back to Blog"`)
- Published date label (e.g. `"Published"`, `"Last updated"`)
- Reading time label (e.g. `"min read"`)
- Author label / byline
- Tags section label (e.g. `"Topics"`)
- Share section label (if present)
- Sources section label (e.g. `"Sources"`)
- FAQ section label (e.g. `"Frequently Asked Questions"`)
- Related posts section label
- `"Read next"` / `"Related articles"` heading
- Social share button labels

### Part B — Post content strategy (`src/lib/blog.ts`)
Post bodies are `ContentSection[]` arrays of typed objects (paragraph, heading, pullquote, stat-block, list). Options:

**Option 1 — Duplicate posts as FR objects** (simplest, current approach)
Add a `locale` field to `BlogPost` type and duplicate each post as a French object in `blog.ts`. No extra infrastructure needed.

**Option 2 — Separate `blog.fr.ts` file**
Keep EN posts in `blog.ts`, add `blog.fr.ts` with French versions. Use locale to select the right file.

**Option 3 — next-intl rich text** (most scalable, most work)
Move post bodies into the `messages/fr.json` using next-intl's rich text support.

**Recommended:** Option 1 for now — matches existing architecture (TypeScript objects, no CMS). Revisit when post count exceeds 20.

---

## messages/fr.json target keys

```json
"blogPost": {
  "backLink": "",
  "publishedLabel": "",
  "updatedLabel": "",
  "minRead": "",
  "byLabel": "",
  "topicsLabel": "",
  "shareLabel": "",
  "sourcesLabel": "",
  "faqLabel": "",
  "relatedLabel": ""
}
```

---

## Metadata to translate

In `src/app/blog/[slug]/page.tsx`, the metadata is generated dynamically from the post object. When a French post exists:
- `title` — pulled from French post object
- `description` — pulled from French post object
- `hreflang` alternate links — ensure `/en/blog/[slug]` ↔ `/fr/blog/[slug]` are linked

---

## Notes
- The `faqs`, `sources`, and `tags` fields on `BlogPost` all need French equivalents if Option 1 or 2 is chosen.
- Slugs should stay the same across locales for simplicity (e.g. `/en/blog/ai-automation` and `/fr/blog/ai-automation`) — this avoids complex slug mapping.
- `stat-block` content sections contain numbers — do NOT localize numeric values, only labels.

---

## Acceptance criteria
- [ ] All UI chrome strings in `BlogPost.tsx` extracted and translated
- [ ] Post content strategy decision documented and implemented for at least one test post
- [ ] `messages/fr.json` `"blogPost"` section fully translated
- [ ] `/fr/blog/[slug]` renders correctly with French UI labels
- [ ] hreflang alternates between EN and FR post pages are correct
- [ ] No TypeScript errors
