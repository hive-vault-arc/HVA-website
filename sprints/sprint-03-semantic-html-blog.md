# Sprint 03 — Semantic HTML for Blog & Article Pages

> **Priority:** HIGH — Semantic HTML directly impacts how Google's article crawlers parse content and affects E-E-A-T signals.
> **Estimated effort:** 2–3 hours
> **Depends on:** Sprint 01 (SITE_URL), Sprint 02 (buildBreadcrumbSchema helper)

---

## What This Sprint Is

The blog post view (`src/views/BlogPost.tsx`) and article detail component render blog content but are missing semantic HTML elements that Google explicitly uses to understand article structure:

- No wrapping `<article>` element — Google's article parser expects this
- No `<time dateTime="...">` element for publish dates — required for article freshness signals
- No visible author byline with structured markup
- No `<nav aria-label="breadcrumb">` element for visual breadcrumbs (separate from JSON-LD)
- The cover image in `ArticleDetailPage.tsx` may be using raw `<img>` instead of `next/image`

---

## Tasks

### Task 3.1 — Wrap blog post content in `<article>` element

**File:** `src/views/BlogPost.tsx` (or whichever component renders the full post layout)

The outermost container of the blog post body should be an `<article>` element:

```tsx
// Before:
<div className="...blog-post-container...">
  {/* post content */}
</div>

// After:
<article
  className="...blog-post-container..."
  itemScope
  itemType="https://schema.org/Article"
>
  {/* post content */}
</article>
```

---

### Task 3.2 — Add `<time>` element for publish date

Inside the blog post header/meta area, wherever the publish date is displayed, wrap it with a `<time>` element:

```tsx
// Before:
<span>{post.publishedAt}</span>

// After:
<time
  dateTime={isoDate}
  className="text-sm text-[#45464d]"
>
  {formattedDate}
</time>
```

Where `isoDate` is the ISO 8601 string (e.g. `"2026-04-15T00:00:00Z"`) and `formattedDate` is the human-readable display (e.g. `"April 15, 2026"`).

Use this to format:
```typescript
const formattedDate = new Date(isoDate).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
```

---

### Task 3.3 — Add author byline with `rel="author"` link

Below the post title and date, add a visible author byline:

```tsx
<address className="not-italic">
  <span>By </span>
  <a
    rel="author"
    href="/whoweare/abouthva"
    className="text-[#2563EB] hover:underline"
  >
    H.V.A Research Team
  </a>
</address>
```

> Note: `<address>` in HTML5 is the correct semantic element for author contact info. `not-italic` removes the browser default italic styling.

---

### Task 3.4 — Add visible breadcrumb navigation

**Applies to:** Blog post detail page, Case Study detail page (and optionally Capabilities, ARC, Industries pages)

Above the page title, add a visual breadcrumb trail:

```tsx
<nav aria-label="Breadcrumb" className="mb-6">
  <ol className="flex items-center gap-2 text-sm text-[#45464d]">
    <li>
      <a href="/" className="hover:text-[#191c1e]">Home</a>
    </li>
    <li aria-hidden="true">/</li>
    <li>
      <a href="/blog" className="hover:text-[#191c1e]">Blog</a>
    </li>
    <li aria-hidden="true">/</li>
    <li aria-current="page" className="text-[#191c1e] font-medium truncate max-w-[200px]">
      {post.title}
    </li>
  </ol>
</nav>
```

For case studies, change `/blog` → `/case-studies` and adjust the title reference.

---

### Task 3.5 — Add `author` meta tag at page level

**File:** `src/app/blog/[slug]/page.tsx`

In the `generateMetadata` function, add an `authors` field:

```typescript
return {
  ...base,
  authors: [{ name: 'H.V.A Research Team', url: absoluteUrl('/whoweare/abouthva') }],
  // ... rest of existing openGraph, twitter
};
```

> This is already partially done with `openGraph.authors` — make sure the top-level `authors` field (for `<meta name="author">`) is also present.

---

### Task 3.6 — Audit `ArticleDetailPage.tsx` for raw `<img>` tags

**File:** `src/components/ArticleDetailPage.tsx`

Search for any `<img` tags in this component. Replace each with Next.js `<Image>`:

```tsx
// Before:
<img src={post.coverImage} alt={post.title} className="w-full h-auto" />

// After:
import Image from 'next/image';

<div className="relative w-full aspect-[16/9]">
  <Image
    src={post.coverImage}
    alt={post.title}
    fill
    className="object-cover"
    priority={true}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
  />
</div>
```

Use `priority={true}` for the cover image since it is above the fold (LCP element).

---

## Acceptance Criteria

- [ ] Blog post page has `<article>` as outermost content wrapper
- [ ] Publish date is wrapped in `<time dateTime="...">` with ISO 8601 `dateTime` attribute
- [ ] Author byline with `rel="author"` link is visible in the post header
- [ ] Visual breadcrumb `<nav aria-label="Breadcrumb">` appears above post title
- [ ] `generateMetadata` includes top-level `authors` field
- [ ] No raw `<img>` tags in `ArticleDetailPage.tsx` — all replaced with `next/image`
- [ ] `npm run build` passes

---

## Exit Criteria

- [ ] Open a blog post in browser DevTools → Elements panel shows `<article>` wrapping content
- [ ] `<time>` element has a valid `dateTime` attribute (check in DevTools)
- [ ] Author name is visible and links to `/whoweare/abouthva`
- [ ] Breadcrumb trail is visible above the post title
- [ ] Google Rich Results Test on a blog post URL shows Article schema valid with `datePublished`, `author`, `headline`
- [ ] Lighthouse accessibility score does not decrease

