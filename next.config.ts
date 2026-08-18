import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

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
  skipProxyUrlNormalize: true,
  experimental: {
    globalNotFound: true,
  },
  images: {
    formats: ['image/webp'],
    qualities: [75, 88, 90],
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
        source: '/en',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/services-digitaux-tanger',
        destination: '/fr/services-digitaux-tanger',
        permanent: true,
      },
      {
        source: '/fr/capabilities',
        destination: '/fr/expertises',
        permanent: true,
      },
      {
        source: '/fr/capabilities/in-detail',
        destination: '/fr/expertises/en-detail',
        permanent: true,
      },
      {
        source: '/fr/capabilities/solution-programs',
        destination: '/fr/expertises/programmes-solutions',
        permanent: true,
      },
      {
        source: '/fr/capabilities/:slug',
        destination: '/fr/expertises/:slug',
        permanent: true,
      },
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
        source: '/fr/whoweare/abouthva',
        destination: '/fr/qui-sommes-nous',
        permanent: true,
      },
      {
        source: '/fr/abouthva/people/:employee',
        destination: '/fr/qui-sommes-nous/equipe/:employee',
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
        source: '/fr/services',
        destination: '/fr/expertises',
        permanent: true,
      },
      {
        source: '/fr/services/in-detail',
        destination: '/fr/expertises/en-detail',
        permanent: true,
      },
      {
        source: '/fr/services/solution-programs',
        destination: '/fr/expertises/programmes-solutions',
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

export default withNextIntl(nextConfig);
