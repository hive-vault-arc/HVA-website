import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Bot, Cloud, Layers } from 'lucide-react';
import Home from '../views/Home';
import JsonLd from '../components/JsonLd';
import type { InsightsCarouselItem } from '../components/InsightsCarousel';
import FaqSection from '../components/FaqSection';
import { HOME_FAQS } from '../data/faqs';
import { getAllPosts } from '../lib/blog';
import { getAllCaseStudies } from '../lib/proof';
import { GLOBAL_KEYWORDS, SITE_URL, buildPageMetadata, mergeKeywords } from '../lib/seo';
import { CANONICAL_MARKET_IDENTITY } from '../lib/positioning';

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Technology Consulting and Digital Transformation Firm',
    description: CANONICAL_MARKET_IDENTITY.longDescriptor,
    path: '/',
    keywords: mergeKeywords(GLOBAL_KEYWORDS, [
      'technology consulting firm Tangier',
      'digital transformation partner Morocco',
      'digital services Tangier',
      'digital services Morocco',
      'digital agency Tangier',
      'services digitaux Tanger',
      'agence digitale Tanger',
      'end-to-end consulting and technical execution',
      'AI automation consulting Morocco',
      'custom software and IT modernization',
      'long-term technology partner',
      'agence pour creer application sur mesure au Maroc',
      'entreprise pour developper application mobile Tanger',
      "besoin d'une equipe pour application web sur mesure Maroc",
      'شركة لتطوير تطبيق مخصص في المغرب',
      'شركة لبناء تطبيق موبايل للشركات طنجة',
      'agencia para crear app personalizada en marruecos',
      'empresa para desarrollar app movil a medida en tanger',
    ]),
    alternates: {
      en: '/',
      fr: '/fr',
      ar: '/ar',
      es: '/es',
      'x-default': '/',
    },
  }),
  title: {
    absolute: 'Hive Vault Arc (H.V.A) | AI & Digital Transformation · Technology Consulting · Tangier',
  },
};

function buildInsightsCarouselItems(limit = 9): InsightsCarouselItem[] {
  const posts = getAllPosts()
    .filter((post) => Boolean(post.coverImage))
    .slice(0, 10)
    .map((post) => ({
      id: `blog-${post.slug}`,
      type: 'blog' as const,
      tag: post.category,
      title: post.title,
      excerpt: post.excerpt,
      image: post.coverImage,
      href: `/blog/${post.slug}`,
      date: post.publishedAt,
    }));

  const studies = getAllCaseStudies()
    .filter((study) => Boolean(study.assets.coverImage))
    .slice(0, 8)
    .map((study) => ({
      id: `case-${study.slug}`,
      type: 'case-study' as const,
      tag: study.industry,
      title: study.title,
      excerpt: study.summary,
      image: study.assets.coverImage,
      href: `/case-studies/${study.slug}`,
      date: study.lastUpdated,
    }));

  // Interleave 2 blogs then 1 case-study for variety while keeping payload small.
  const result: InsightsCarouselItem[] = [];
  let blogIndex = 0;
  let studyIndex = 0;
  while (result.length < limit && (blogIndex < posts.length || studyIndex < studies.length)) {
    if (blogIndex < posts.length) result.push(posts[blogIndex++]);
    if (result.length >= limit) break;
    if (blogIndex < posts.length) result.push(posts[blogIndex++]);
    if (result.length >= limit) break;
    if (studyIndex < studies.length) result.push(studies[studyIndex++]);
  }

  return result.slice(0, limit);
}

export default function Page() {
  const insightsCarouselItems = buildInsightsCarouselItems();
  const capabilitySchema = {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'Service'],
    name: 'H.V.A Technology Consulting and Digital Transformation Capabilities',
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    description:
      'Consulting-led transformation programs combining strategy, architecture, engineering delivery, and ongoing operations support.',
    serviceType: [
      'Technology Consulting',
      'Digital Transformation',
      'IT Advisory and Architecture',
      'AI Agent Development',
      'AI Automation',
      'CRM and Systems Engineering',
      'Custom Software Development',
      'Mobile App Development',
      'Cloud Infrastructure',
      'Data Capabilities',
    ],
    areaServed: ['Morocco', 'Remote'],
    availableLanguage: ['en', 'fr', 'ar', 'es'],
    url: `${SITE_URL}/capabilities`,
  };

  return (
    <>
      <JsonLd data={capabilitySchema} />
      <Home insightsCarouselItems={insightsCarouselItems} />
      <section className="relative overflow-hidden bg-[#0F172A] py-20 md:py-28">
        {/* Subtle grid overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #2563EB 1px, transparent 1px), linear-gradient(to bottom, #2563EB 1px, transparent 1px)',
            backgroundSize: '42px 42px',
          }}
        />
        {/* Radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 h-[36rem] w-[36rem] rounded-full bg-[#2563EB]/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">

            {/* Left — editorial column */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#2563EB]">
                Service Landing Pages
              </p>
              <h2 className="font-headline text-4xl leading-[1.04] tracking-tight text-white md:text-5xl">
                Explore Local and National Service Guides
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-white/50">
                In-depth guides for businesses in Morocco seeking specific AI, consulting,
                and software capabilities in their market.
              </p>
              <div className="mt-8 h-px bg-[#2563EB]/25" />
              <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.22em] text-white/25">
                Morocco · Tangier · Remote
              </p>
            </div>

            {/* Right — card grid */}
            <div className="lg:col-span-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { href: '/digital-services-tangier', label: 'Digital Services in Tangier', tag: 'Tangier', Icon: Layers },
                { href: '/services-digitaux-tanger', label: 'Services Digitaux à Tanger', tag: 'Tanger', Icon: Layers },
                { href: '/ai-agents-tangier',     label: 'AI Agents in Tangier',         tag: 'Tangier', Icon: Bot    },
                { href: '/ai-agents-morocco',      label: 'AI Agents in Morocco',          tag: 'Morocco', Icon: Bot    },
                { href: '/it-consulting-tangier',  label: 'IT Consulting in Tangier',      tag: 'Tangier', Icon: Layers },
                { href: '/custom-software-morocco',label: 'Custom Software in Morocco',    tag: 'Morocco', Icon: Cloud  },
              ].map(({ href, label, tag, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group relative overflow-hidden border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:border-[#2563EB]/50 hover:bg-white/[0.08]"
                >
                  {/* Top row: tag + arrow */}
                  <div className="mb-8 flex items-start justify-between">
                    <span className="border border-[#2563EB]/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.24em] text-[#2563EB]/70">
                      {tag}
                    </span>
                    <ArrowRight className="h-4 w-4 translate-x-0 text-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#2563EB]" />
                  </div>

                  {/* Bottom row: title + icon */}
                  <div className="flex items-end justify-between">
                    <h3 className="font-headline pr-4 text-xl leading-tight text-white">
                      {label}
                    </h3>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#2563EB]/10 text-[#2563EB]/50 transition-all duration-300 group-hover:bg-[#2563EB]/20 group-hover:text-[#2563EB]">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Animated bottom bar */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#2563EB] transition-all duration-500 ease-spring group-hover:w-full" />
                </Link>
              ))}
            </div>

          </div>
        </div>
      </section>
      <FaqSection faqs={HOME_FAQS} />
    </>
  );
}
