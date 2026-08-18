'use client';

import {Link} from '@/i18n/navigation';
import { ArrowUpRight, ExternalLink } from '@/components/icons';
import ArticleDetailPage from '../components/ArticleDetailPage';
import type { Perspective, PerspectiveSection } from '../lib/perspectives';
import {useLocale, useTranslations} from 'next-intl';

function RenderSection({ section, index }: { section: PerspectiveSection; index: number }) {
  const t = useTranslations('DynamicContent');
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
              className="text-xs font-bold tracking-widest uppercase not-italic text-[#1A2535]"
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
            {t('perspectiveFaq')}
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
  const t = useTranslations('DynamicContent');
  const locale = useLocale();
  const relatedLinks =
    perspective.slug === 'consulting-engineering-one-loop'
      ? [
          { href: '/arc', label: t('resourceLinks.arc') },
          { href: '/capabilities', label: t('resourceLinks.capabilities') },
          { href: '/aboutus', label: t('resourceLinks.about') },
          { href: '/case-studies', label: t('resourceLinks.caseStudies') },
          { href: locale === 'fr' ? '/case-studies' : '/case-studies/top-tier-crm-transformation-program-real-estate-operations', label: t('resourceLinks.crmProof') },
          { href: '/contact', label: t('resourceLinks.book') },
        ]
      : [
          { href: '/arc', label: t('resourceLinks.arc') },
          { href: '/capabilities', label: t('resourceLinks.capabilities') },
          { href: '/case-studies', label: t('resourceLinks.caseStudies') },
          { href: locale === 'fr' ? '/case-studies' : '/case-studies/multilingual-whatsapp-ai-agent', label: t('resourceLinks.aiProof') },
          { href: '/contact', label: t('resourceLinks.book') },
        ];

  return (
    <div className="space-y-10">
      {perspective.sources.length > 0 && (
        <div>
          <h2
            className="mb-4 text-xs font-bold uppercase tracking-widest text-[#1A2535]"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('sources')}
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
          className="mb-4 text-xs font-bold uppercase tracking-widest text-[#1A2535]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {t('relatedResources')}
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
          className="mb-4 text-xs font-bold uppercase tracking-widest text-[#1A2535]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {t('topics')}
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
  const t = useTranslations('DynamicContent');
  return (
    <ArticleDetailPage
      backHref="/insights/perspectives"
      backLabel={t('allPerspectives')}
      breadcrumbs={[
        { label: t('home'), href: '/' },
        { label: t('insights'), href: '/insights' },
        { label: t('perspectives'), href: '/insights/perspectives' },
        { label: perspective.title },
      ]}
      eyebrow={perspective.tag}
      publishedAt={perspective.publishedAt}
      readTime={perspective.readTime}
      title={perspective.title}
      subtitle={perspective.subtitle}
      author={perspective.authors[0]}
      authorHref="/aboutus"
      coverImage={perspective.coverImage}
      coverAlt={perspective.coverAlt}
      editorial={perspective}
      contentAsArticle
      showAboutStrip
      relatedItems={relatedPerspectives.map((item) => ({
        href: `/insights/perspectives/${item.slug}`,
        title: item.title,
        tag: item.tag,
        coverImage: item.coverImage,
        editorialFormat: item.editorialFormat,
        topics: item.topics,
      }))}
      relatedAllHref="/insights/perspectives"
      relatedAllLabel={t('allPerspectives')}
      bottomCta={{
        variant: 'blue',
        headline: t('perspectiveCta.title'),
        subtext: t('perspectiveCta.description'),
        primaryLabel: t('perspectiveCta.primary'),
        primaryHref: '/contact',
        secondaryLabel: t('perspectiveCta.secondary'),
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
