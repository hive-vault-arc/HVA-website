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
  //   font-src Fontshare          - Satoshi is delivered from Fontshare's official webfont CDN
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://cdn.fontshare.com",
      "connect-src 'self' https:",
      "frame-src 'none'",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https:",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    globalNotFound: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.hivevaultarc.com',
          },
        ],
        destination: 'https://hivevaultarc.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'hiva-nine.vercel.app',
          },
        ],
        destination: 'https://hivevaultarc.com/:path*',
        permanent: true,
      },
      {
        source: '/insights/blogs',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/insights/case-studies',
        destination: '/case-studies',
        permanent: true,
      },
      {
        source: '/whoweare/abouthva',
        destination: '/aboutus',
        permanent: true,
      },
      {
        source: '/abouthva/people/:employee',
        destination: '/aboutus/our-people/:employee',
        permanent: true,
      },
      {
        source: '/:locale(en|fr|ar|es)/whoweare/abouthva',
        destination: '/aboutus',
        permanent: true,
      },
      {
        source: '/:locale(en|fr|ar|es)/abouthva/people/:employee',
        destination: '/aboutus/our-people/:employee',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/capabilities',
        permanent: true,
      },
      {
        source: '/services/in-detail',
        destination: '/capabilities/in-detail',
        permanent: true,
      },
      {
        source: '/services/solution-programs',
        destination: '/capabilities/solution-programs',
        permanent: true,
      },
      {
        source: '/products-systems',
        destination: '/capabilities/solution-programs',
        permanent: true,
      },
      {
        source: '/:locale(en|fr|ar|es)/services',
        destination: '/:locale/capabilities',
        permanent: true,
      },
      {
        source: '/:locale(en|fr|ar|es)/services/in-detail',
        destination: '/capabilities/in-detail',
        permanent: true,
      },
      {
        source: '/:locale(en|fr|ar|es)/services/solution-programs',
        destination: '/capabilities/solution-programs',
        permanent: true,
      },
      {
        source: '/:locale(en|fr|ar|es)/capabilities/in-detail',
        destination: '/capabilities/in-detail',
        permanent: true,
      },
      {
        source: '/:locale(en|fr|ar|es)/capabilities/solution-programs',
        destination: '/capabilities/solution-programs',
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
