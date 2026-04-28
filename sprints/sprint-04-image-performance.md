# Sprint 04 — Image & Media Performance

> **Priority:** HIGH — Core Web Vitals (LCP, CLS) directly impact Google rankings. The 8MB video and unoptimized PNGs are the biggest performance liability on the site.
> **Estimated effort:** 3–4 hours
> **Depends on:** Nothing (can run in parallel with other sprints)

---

## What This Sprint Is

Performance analysis found the following issues:

1. **`public/Images/media/scrollanimaion.mp4`** — 8MB video file loaded somewhere in the UI. This single file likely causes the worst LCP and TTI scores.
2. **Large PNGs in `public/Images/`** — Multiple hero/OG images in raw PNG format (e.g., `ai-agency-hero-tangier-morocco.png`, `strategic-technology-consulting-tangier-morocco.png`, `saas-platform-development-morocco.png`, `web-application-development-morocco.png`). These are likely several hundred KB to several MB each.
3. **Raw `<img>` tags** in multiple component files instead of Next.js `<Image>` — means no automatic lazy loading, no WebP conversion, no responsive srcset.

Files confirmed to use raw `<img>`:
- `src/components/EngineeringExcellence.tsx`
- `src/components/LogoItem.tsx`
- `src/components/ui/full-screen-scroll-fx.tsx`
- `src/components/ui/hero-parallax.tsx`
- `src/components/ui/HeroSlider.tsx`
- `src/components/ui/ResponsiveImage.tsx`
- `src/views/About.tsx`
- `src/views/Arc.tsx`
- `src/views/Contact.tsx`
- `src/views/Industries.tsx`

---

## Tasks

### Task 4.1 — Optimize the 8MB video (`scrollanimaion.mp4`)

**Option A — Compress the video (preferred):**

Use ffmpeg to compress the video before deploying:
```bash
ffmpeg -i public/Images/media/scrollanimaion.mp4 \
  -vcodec libx264 -crf 28 -preset slow \
  -acodec aac -b:a 128k \
  -movflags +faststart \
  public/Images/media/scrollanimaion-compressed.mp4
```

Target size: under 2MB. After compressing, replace the original file or update the import path.

**Option B — Lazy-load the video:**

Find where the video is rendered and ensure it uses `preload="none"` and is only loaded when in viewport:

```tsx
// Instead of autoplay on mount, use IntersectionObserver:
'use client';
import { useRef, useEffect } from 'react';

function LazyVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.src = src;
          videoRef.current.load();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      className="w-full h-full object-cover"
    />
  );
}
```

**Do both** — compress the file AND lazy-load it.

---

### Task 4.2 — Convert large PNGs to WebP

For each large PNG in `public/Images/`:

```bash
# Install cwebp (one-time):
# Windows: download from https://developers.google.com/speed/webp/download
# Or use sharp in a Node script:

node -e "
const sharp = require('sharp');
const files = [
  'ai-agency-hero-tangier-morocco',
  'strategic-technology-consulting-tangier-morocco',
  'saas-platform-development-morocco',
  'web-application-development-morocco',
];
files.forEach(f => {
  sharp(\`public/Images/\${f}.png\`)
    .webp({ quality: 85 })
    .toFile(\`public/Images/\${f}.webp\`);
});
"
```

Or convert manually using Squoosh (https://squoosh.app) — aim for WebP at 85% quality.

After conversion, update any hardcoded `<img src="...png">` references to `.webp` in the codebase. When using `next/image`, Next.js handles conversion automatically — so the priority is replacing raw `<img>` tags (Task 4.3).

---

### Task 4.3 — Replace raw `<img>` with `next/image` (by file)

For each file listed above, follow this pattern:

**Import:**
```typescript
import Image from 'next/image';
```

**Replacement patterns:**

**Fixed dimensions (logos, icons, known-size images):**
```tsx
// Before:
<img src="/Images/logo.png" alt="H.V.A Logo" className="h-8 w-auto" />

// After:
<Image
  src="/Images/logo.png"
  alt="H.V.A Logo"
  width={120}
  height={32}
  className="h-8 w-auto"
/>
```

**Full-width responsive images (heroes, covers):**
```tsx
// Before:
<img src="/Images/hero.png" alt="..." className="w-full h-auto" />

// After:
<div className="relative w-full aspect-[16/9]">
  <Image
    src="/Images/hero.png"
    alt="..."
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 1200px"
    priority={isAboveFold}  // true for hero images, false for others
  />
</div>
```

**In `ResponsiveImage.tsx`** — this component wraps images. If it currently wraps an `<img>`, replace the internal img with `next/image` so all consumers get optimization automatically.

**`LogoItem.tsx`** — likely partner/client logos. Use fixed dimensions with `width` and `height`.

**Priority rules:**
- `priority={true}`: only the single LCP image per page (typically the above-fold hero image)
- All other images: omit `priority` (defaults to `false`, enabling lazy loading)

---

### Task 4.4 — Add `next.config` image domains if needed

**File:** `next.config.ts` (or `next.config.js`)

If any images are served from external URLs (e.g., a CMS, CDN, or S3), they must be whitelisted:

```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      // Add external image domains here if needed
      // { protocol: 'https', hostname: 'your-cdn.com' },
    ],
  },
};
```

For images in the `public/` folder, no configuration is needed.

---

## Acceptance Criteria

- [ ] `scrollanimaion.mp4` is under 2MB after compression, OR is lazy-loaded with `IntersectionObserver`
- [ ] Large PNGs have WebP equivalents (or are served via `next/image` which handles conversion)
- [ ] No raw `<img>` tags remain in: `EngineeringExcellence.tsx`, `LogoItem.tsx`, `About.tsx`, `Arc.tsx`, `Contact.tsx`, `Industries.tsx`
- [ ] `ResponsiveImage.tsx` internally uses `next/image`
- [ ] Hero images above the fold have `priority={true}`
- [ ] `npm run build` passes

---

## Exit Criteria

- [ ] Run `grep -rn "<img " src/` — returns only results you've intentionally left (e.g., CMS-rendered HTML content inside `dangerouslySetInnerHTML`)
- [ ] Lighthouse Performance score improves (run before and after)
- [ ] LCP score improves — target under 2.5s
- [ ] No CLS (Cumulative Layout Shift) from images loading without explicit dimensions
- [ ] Build passes without `<img>` ESLint warnings (if `@next/eslint-plugin-next` is configured)

