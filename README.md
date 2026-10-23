# HVA Website

This branch adds a Next.js app around the existing Framer export. The exported HTML pages, scripts, styles, fonts, images, and video remain in `public/` and are served as static files so the current visuals, links, and animations continue working during the migration.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The homepage redirects to `/index.html`; the other exported `.html` routes and assets are served from `public/`.

## Build and run

```bash
npm run build
npm run start
```

Vercel can use its standard Next.js framework detection and build command (`npm run build`).

## Migration status

This is a compatibility stage, not a completed React rewrite. It establishes a working Next.js/Vercel preview while keeping the Framer export intact. Migrate individual pages and interactive sections into Next.js components incrementally, verifying their behavior before removing the corresponding exported files.
