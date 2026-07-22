'use client';

import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from '@/components/icons';
import ArticleDetailPage from '../components/ArticleDetailPage';
import type { ContentSection } from '../lib/blog';
import type { ResearchReport } from '../lib/insights';

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
    case 'faq':
      return (
        <section key={index} className="mt-14 border-t border-[#E8EBF0] pt-10">
          <h2
            className="text-2xl md:text-3xl mb-6 text-[#1A2535]"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            Research Questions
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

function ResearchReportSidebar({ report }: { report: ResearchReport }) {
  return (
    <div className="space-y-10">
      {report.sources.length > 0 && (
        <div>
          <h2
            className="text-xs font-bold uppercase tracking-widest text-[var(--section-label-color)] mb-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Sources
          </h2>
          <ul className="space-y-3">
            {report.sources.map((source) => (
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

      {report.keywords.length > 0 && (
        <div>
          <h2
            className="text-xs font-bold uppercase tracking-widest text-[var(--section-label-color)] mb-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Topics
          </h2>
          <div className="flex flex-wrap gap-2">
            {report.keywords.slice(0, 8).map((keyword) => (
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
      )}

      <div className="bg-[#1A2535] p-6">
        <p
          className="text-white text-sm font-semibold mb-3 leading-snug"
          style={{ fontFamily: 'var(--font-headline)', fontStyle: 'italic' }}
        >
          Need the report translated into an operating plan?
        </p>
        <p className="text-white/60 text-xs mb-4 leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
          Hive Vault Arc turns benchmarks, delivery signals, and cloud readiness findings into practical transformation work.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[var(--section-label-color-dark)] hover:gap-3 transition-all"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Discuss the findings
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

export default function ResearchReportView({
  report,
  relatedReports,
}: {
  readonly report: ResearchReport;
  readonly relatedReports: ResearchReport[];
}) {
  const sections =
    report.sections.length > 0 ? report.sections : [{ type: 'paragraph' as const, content: report.summary }];

  return (
    <ArticleDetailPage
      backHref="/insights/research-reports"
      backLabel="All research reports"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Insights', href: '/insights' },
        { label: 'Research Reports', href: '/insights/research-reports' },
        { label: report.title },
      ]}
      eyebrow={report.tag}
      publishedAt={report.publishedAt}
      readTime={report.readTime}
      title={report.title}
      subtitle={report.subtitle ?? report.summary}
      author={report.authors[0]}
      authorHref="/aboutus"
      coverImage={report.coverImage}
      coverAlt={report.coverAlt}
      contentAsArticle
      showAboutStrip
      relatedItems={relatedReports.map((item) => ({
        href: `/insights/research-reports/${item.slug}`,
        title: item.title,
        tag: item.tag,
        coverImage: item.coverImage,
      }))}
      relatedAllHref="/insights/research-reports"
      relatedAllLabel="All Research Reports"
      bottomCta={{
        variant: 'blue',
        headline: 'Turn research into production decisions.',
        subtext:
          'Hive Vault Arc helps teams map research findings into roadmap, architecture, and operating controls.',
        primaryLabel: 'Book a Discovery Call',
        primaryHref: '/contact',
        secondaryLabel: 'Explore capabilities',
        secondaryHref: '/capabilities',
      }}
      sidebar={<ResearchReportSidebar report={report} />}
    >
      {sections.map((section, index) => (
        <RenderSection key={`${section.type}-${index}`} section={section} index={index} />
      ))}
    </ArticleDetailPage>
  );
}
