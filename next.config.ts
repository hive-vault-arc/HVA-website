import type { NextConfig } from 'next';

const securityHeaders = [
  // Prevent MIME-type sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Clickjacking protection — allow framing only from same origin
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  // Reduce referrer leakage
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Restrict browser feature APIs that the site doesn't use
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  // Force HTTPS for 2 years; include subdomains and submit to preload list
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Content Security Policy
  // Notes:
  //   script-src 'unsafe-inline'  — required by Next.js hydration & inline JSON-LD script tags
  //   script-src 'unsafe-eval'    — required by GSAP and Framer Motion internals
  //   style-src  'unsafe-inline'  — required by Framer Motion / Tailwind inline style props
  //   connect-src https:          — covers Spline CDN (prod.spline.design) + dynamic contact API URL
  //   font-src 'self'             — next/font self-hosts Google Fonts at build time; no external font requests
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https:",
      "frame-src 'none'",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https:",
    ].join('; '),
  },
];

// Vercel preview/deployment URL — set VERCEL_URL in environment or override with NEXT_PUBLIC_SITE_URL
// This redirect consolidates all traffic to www.hiva.ma so Google sees one canonical domain.
// To activate: set NEXT_PUBLIC_VERCEL_HOST to your Vercel deployment hostname (e.g. hiva-nine.vercel.app)
const vercelHost = process.env.NEXT_PUBLIC_VERCEL_HOST ?? '';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    if (!vercelHost) return [];
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: vercelHost }],
        destination: `https://www.hiva.ma/:path*`,
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
