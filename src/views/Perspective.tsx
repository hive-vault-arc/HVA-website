'use client';

import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import ArticleDetailPage from '../components/ArticleDetailPage';
import type { Perspective, PerspectiveSection } from '../lib/perspectives';

function RenderSection({ section, index }: { section: PerspectiveSection; index: number }) {
  switch (section.type) {
    case 'heading':
      return (
        <h2
          key={index}
          className="text-2xl md:text-3xl mt-12 mb-5 text-[#1A2535]"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          {section.content}
        </h2>
      );
    case 'subheading':
      return (
        <h3
          key={index}
          className="text-xl mt-8 mb-3 font-semibold text-[#1A2535]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {section.content}
        </h3>
      );
    case 'paragraph':
      return (
        <p
          key={index}
          className="text-lg leading-relaxed text-[#536070] mb-6"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {section.content}
        </p>
      );
    case 'pullquote':
      return (
        <div
          key={index}
          className="my-10 bg-[#E8EBF0] px-6 py-7 sm:px-8 sm:py-8"
          style={{ borderLeft: '4px solid #E8A838' }}
        >
          <blockquote
            className="text-2xl md:text-3xl text-[#1A2535] mb-4 leading-snug"
            style={{ fontFamily: 'var(--font-headline)', fontStyle: 'italic' }}
          >
            {section.content}
          </blockquote>
          {section.attribution && (
            <cite
              className="text-xs font-bold tracking-widest uppercase not-italic text-[var(--section-label-color)]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              - {section.attribution}
            </cite>
          )}
        </div>
      );
    case 'list':
      return (
        <ul key={index} className="my-6 space-y-4">
          {section.items.map((item) => (
            <li key={item} className="flex gap-4 items-start">
              <span className="mt-1.5 w-2 h-2 shrink-0 bg-[#E8A838]" aria-hidden="true" />
              <span className="text-[#536070] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                {item}
              </span>
            </li>
          ))}
        </ul>
      );
    case 'faq':
      return (
        <section key={index} className="mt-14 border-t border-[#E8EBF0] pt-10">
          <h2
            className="text-2xl md:text-3xl mb-6 text-[#1A2535]"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Questions Leaders Ask Before AI
          </h2>
          <div className="space-y-6">
            {section.items.map((item) => (
              <div key={item.question} className="bg-[#F7F8FA] p-6">
                <h3
                  className="text-lg font-semibold text-[#1A2535] mb-3"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {item.question}
                </h3>
                <p className="text-[#536070] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      );
    default:
      return null;
  }
}

function PerspectiveSidebar({ perspective }: { perspective: Perspective }) {
  const relatedLinks =
    perspective.slug === 'consulting-engineering-one-loop'
      ? [
          { href: '/arc', label: 'ARC framework' },
          { href: '/capabilities', label: 'Capabilities' },
          { href: '/whoweare/abouthva', label: 'About Hive Vault Arc' },
          { href: '/case-studies', label: 'Case studies' },
          { href: '/case-studies/top-tier-crm-transformation-program-real-estate-operations', label: 'CRM transformation proof' },
          { href: '/contact', label: 'Book a Discovery Call' },
        ]
      : [
          { href: '/arc', label: 'ARC framework' },
          { href: '/capabilities', label: 'Capabilities' },
          { href: '/case-studies', label: 'Case studies' },
          { href: '/case-studies/multilingual-whatsapp-ai-agent', label: 'WhatsApp AI agent proof' },
          { href: '/contact', label: 'Book a Discovery Call' },
        ];

  return (
    <div className="space-y-10">
      {perspective.sources.length > 0 && (
        <div>
          <h2
            className="text-xs font-bold uppercase tracking-widest text-[var(--section-label-color)] mb-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Sources
          </h2>
          <ul className="space-y-3">
            {perspective.sources.map((source) => (
              <li key={source.url}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-xs text-[#536070] hover:text-[#E8A838] transition-colors leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 text-[#E8A838]" />
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h2
          className="text-xs font-bold uppercase tracking-widest text-[var(--section-label-color)] mb-4"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Related Hive Vault Arc Resources
        </h2>
        <ul className="space-y-3">
          {relatedLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex items-center gap-2 text-xs text-[#536070] hover:text-[#E8A838] transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <ArrowUpRight className="w-3 h-3 text-[#E8A838]" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2
          className="text-xs font-bold uppercase tracking-widest text-[var(--section-label-color)] mb-4"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Topics
        </h2>
        <div className="flex flex-wrap gap-2">
          {perspective.keywords.slice(0, 8).map((keyword) => (
            <span
              key={keyword}
              className="text-[10px] px-2 py-1 bg-[#E8EBF0] text-[#536070] font-bold tracking-wide uppercase"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PerspectiveView({
  perspective,
  relatedPerspectives,
}: {
  readonly perspective: Perspective;
  readonly relatedPerspectives: Perspective[];
}) {
  return (
    <ArticleDetailPage
      backHref="/insights/perspectives"
      backLabel="All perspectives"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insights', href: '/insights' },
        { label: 'Perspectives', href: '/insights/perspectives' },
        { label: perspective.title },
      ]}
      eyebrow={perspective.tag}
      publishedAt={perspective.publishedAt}
      readTime={perspective.readTime}
      title={perspective.title}
      subtitle={perspective.subtitle}
      author={perspective.authors[0]}
      authorHref="/whoweare/abouthva"
      coverImage={perspective.coverImage}
      coverAlt={perspective.coverAlt}
      contentAsArticle
      showAboutStrip
      relatedItems={relatedPerspectives.map((item) => ({
        href: `/insights/perspectives/${item.slug}`,
        title: item.title,
        tag: item.tag,
        coverImage: item.coverImage,
      }))}
      relatedAllHref="/insights/perspectives"
      relatedAllLabel="All Perspectives"
      bottomCta={{
        variant: 'blue',
        headline: 'Diagnose the workflow before you automate it.',
        subtext:
          'Hive Vault Arc helps leadership teams assess operations, re-engineer the system, and command AI-enabled workflows in production.',
        primaryLabel: 'Start a discovery call',
        primaryHref: '/contact',
        secondaryLabel: 'Explore ARC',
        secondaryHref: '/arc',
      }}
      sidebar={<PerspectiveSidebar perspective={perspective} />}
    >
      {perspective.sections.map((section, index) => (
        <RenderSection key={`${section.type}-${index}`} section={section} index={index} />
      ))}
    </ArticleDetailPage>
  );
}
