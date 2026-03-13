# H.V.A Website

Marketing website for **H.V.A** built with **Vite + React + TypeScript + Tailwind CSS**.

## Features

- Multi-page SPA with lazy-loaded routes (`Home`, `About`, `Services`, `Portfolio`, `Contact`)
- Motion-rich UI using `framer-motion`, `gsap`, and WebGL-based visuals
- Optimized technology stack and world-map sections with deferred loading
- Contact form flow with optional API endpoint support via `VITE_CONTACT_API_URL`
- Favicon + manifest setup for modern browser/device compatibility

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
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
http://localhost:5173
```

## Available Scripts

- `npm run dev` - Start local development server
- `npm run build` - Production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run test suite

## Environment Variables

- `VITE_CONTACT_API_URL` (optional): if set, contact form submits JSON to this endpoint; otherwise it falls back to `mailto:`.

