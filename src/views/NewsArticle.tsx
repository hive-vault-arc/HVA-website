'use client';

import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from '@/components/icons';
import ArticleDetailPage from '../components/ArticleDetailPage';
import type { ContentSection } from '../lib/blog';
import type { NewsArticle } from '../lib/insights';

function RenderSection({ section, index }: { section: ContentSection; index: number }) {
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
    case 'stat-block':
      return (
        <div key={index} className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {section.stats.map((stat) => (
            <div key={`${stat.value}-${stat.label}`} className="bg-[#F7F8FA] p-6">
              <p
                className="mb-1 text-3xl font-bold text-[var(--section-label-color)]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {stat.value}
              </p>
              <p
                className="text-sm text-[#1A2535] mb-2 leading-snug"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {stat.label}
              </p>
              <p
                className="text-[10px] font-bold tracking-widest uppercase text-[var(--section-label-color)]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {stat.source}
              </p>
            </div>
          ))}
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
    default:
      return null;
  }
}

function NewsSidebar({ sources, tags }: { sources: NewsArticle['sources']; tags: NewsArticle['tags'] }) {
  return (
    <div className="space-y-10">
      {sources.length > 0 && (
        <div>
          <h2
            className="text-xs font-bold uppercase tracking-widest text-[var(--section-label-color)] mb-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Sources
          </h2>
          <ul className="space-y-3">
            {sources.map((src) => (
              <li key={src.url}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-xs text-[#536070] hover:text-[#E8A838] transition-colors leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 text-[#E8A838]" />
                  {src.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tags.length > 0 && (
        <div>
          <h2
            className="text-xs font-bold uppercase tracking-widest text-[var(--section-label-color)] mb-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Topics
          </h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-1 bg-[#E8EBF0] text-[#536070] font-bold tracking-wide uppercase"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-[#1A2535] p-6">
        <p
          className="text-white text-sm font-semibold mb-3 leading-snug"
          style={{ fontFamily: 'var(--font-headline)', fontStyle: 'italic' }}
        >
          Evaluating local AI for your organization?
        </p>
        <p
          className="text-white/60 text-xs mb-4 leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Hive Vault Arc helps teams decide what should run locally, what should remain in the cloud, and how to govern agent access safely.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[var(--section-label-color-dark)] hover:gap-3 transition-all"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Discuss AI architecture
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

export default function NewsArticleView({
  article,
  relatedArticles,
}: {
  readonly article: NewsArticle;
  readonly relatedArticles: NewsArticle[];
}) {
  return (
    <ArticleDetailPage
      backHref="/insights/news-articles"
      backLabel="All news articles"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insights', href: '/insights' },
        { label: 'News Articles', href: '/insights/news-articles' },
        { label: article.title },
      ]}
      eyebrow={`${article.tag} / ${article.category}`}
      publishedAt={article.publishedAt}
      readTime={article.readTime}
      title={article.title}
      subtitle={article.subtitle}
      coverImage={article.coverImage}
      coverAlt={article.coverAlt}
      contentAsArticle
      showAboutStrip
      relatedItems={relatedArticles.map((item) => ({
        href: `/insights/news-articles/${item.slug}`,
        title: item.title,
        tag: item.tag,
        coverImage: item.coverImage,
      }))}
      relatedAllHref="/insights/news-articles"
      relatedAllLabel="All News Articles"
      bottomCta={{
        variant: 'blue',
        headline: 'Build private AI with the right operating model.',
        subtext:
          'We help leadership teams translate AI hardware, model strategy, and privacy requirements into systems that are ready for production.',
        primaryLabel: 'Talk to Hive Vault Arc',
        primaryHref: '/contact',
        secondaryLabel: 'Explore capabilities',
        secondaryHref: '/capabilities',
      }}
      sidebar={<NewsSidebar sources={article.sources} tags={article.tags} />}
    >
      {article.sections.map((section, index) => (
        <RenderSection key={`${section.type}-${index}`} section={section} index={index} />
      ))}
    </ArticleDetailPage>
  );
}
