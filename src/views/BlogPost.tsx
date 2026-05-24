'use client';

import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import type { BlogPost, ContentSection } from '../lib/blog';
import { getRelatedPosts } from '../lib/blog';
import ArticleDetailPage from '../components/ArticleDetailPage';

/* ── Content renderer ────────────────────────────────────────────────────── */

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
              className="text-xs font-bold tracking-widest uppercase not-italic text-[#536070]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              — {section.attribution}
            </cite>
          )}
        </div>
      );
    case 'stat-block':
      return (
        <div key={index} className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {section.stats.map((stat, si) => (
            <div key={si} className="bg-[#F7F8FA] p-6">
              <p
                className="text-3xl font-bold text-[#E8A838] mb-1"
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
                className="text-[10px] font-bold tracking-widest uppercase text-[#6B7280]"
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
          {section.items.map((item, li) => (
            <li key={li} className="flex gap-4 items-start">
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

/* ── Sidebar ─────────────────────────────────────────────────────────────── */

function BlogSidebar({ sources, tags }: { sources: BlogPost['sources']; tags: BlogPost['tags'] }) {
  return (
    <div className="space-y-10">
      {/* Sources */}
      {sources.length > 0 && (
        <div>
          <h4
            className="text-xs font-bold uppercase tracking-widest text-[#6B7280] mb-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Sources
          </h4>
          <ul className="space-y-3">
            {sources.map((src, i) => (
              <li key={i}>
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

      {/* Tags */}
      {tags.length > 0 && (
        <div>
          <h4
            className="text-xs font-bold uppercase tracking-widest text-[#6B7280] mb-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Topics
          </h4>
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

      {/* CTA box */}
      <div className="bg-[#1A2535] p-6">
        <p
          className="text-white text-sm font-semibold mb-3 leading-snug"
          style={{ fontFamily: 'var(--font-headline)', fontStyle: 'italic' }}
        >
          Ready to put this into practice?
        </p>
        <p
          className="text-white/60 text-xs mb-4 leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Hive Vault Arc combines technology consulting with engineering delivery to help businesses modernize operations with confidence.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[#E8A838] hover:gap-3 transition-all"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Talk to us
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

/* ── Main view ───────────────────────────────────────────────────────────── */

export default function BlogPostView({ post }: { post: BlogPost }) {
  const related = getRelatedPosts(post.slug);

  return (
    <ArticleDetailPage
      backHref="/blog"
      backLabel="All articles"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: post.title },
      ]}
      eyebrow={post.category}
      publishedAt={post.publishedAt}
      readTime={post.readTime}
      title={post.title}
      subtitle={post.subtitle}
      author={post.authors[0]}
      authorHref="/whoweare/abouthva"
      coverImage={post.coverImage}
      coverAlt={post.title}
      contentAsArticle
      showAboutStrip
      relatedItems={related.map((p) => ({
        href: `/blog/${p.slug}`,
        title: p.title,
        tag: p.category,
        coverImage: p.coverImage,
      }))}
      relatedAllHref="/blog"
      relatedAllLabel="All Articles"
      bottomCta={{
        variant: 'blue',
        headline: 'Ready to turn strategy into execution?',
        subtext: "Let us scope the consulting and engineering plan that fits your goals, constraints, and operating model.",
        primaryLabel: 'Talk to Hive Vault Arc',
        primaryHref: '/contact',
      }}
      sidebar={<BlogSidebar sources={post.sources} tags={post.tags} />}
    >
      {post.sections.map((section, i) => (
        <RenderSection key={i} section={section} index={i} />
      ))}
    </ArticleDetailPage>
  );
}
