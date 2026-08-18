# H.V.A Website

Marketing website for **H.V.A** built with **Next.js 16 + React + TypeScript + Tailwind CSS**.

## Market Identity

H.V.A is positioned as a **technology consulting and digital transformation firm** with end-to-end ownership from strategy to long-term maintenance.

For copy governance rules, see [Brand Copy Lint Checklist](docs/brand-copy-checklist.md).

## Features

- App Router routes for `Home`, `About`, `Services`, `Portfolio`, and `Contact`
- Motion-rich UI using `framer-motion`, `gsap`, and WebGL-based visuals
- Optimized technology stack and world-map sections with deferred loading
- Contact form flow with optional API endpoint support via `NEXT_PUBLIC_CONTACT_API_URL`
- Favicon + manifest setup for modern browser/device compatibility

## Tech Stack

- React 19
- TypeScript
- Next.js 16
- Tailwind CSS
- Vitest + Testing Library

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## Available Scripts

- `npm run dev` - Start local development server
- `npm run build` - Production build
- `npm run start` - Run production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run test suite
- `npm run check:webp` - Verify that public raster assets use WebP

## Deployment

Production builds run `npm run build`, which verifies WebP assets before compiling the Next.js application. Pushes to `main` trigger the production deployment.

## Environment Variables

- `NEXT_PUBLIC_CONTACT_API_URL` (optional): if set, contact form submits JSON to this endpoint; otherwise it falls back to `mailto:`.

