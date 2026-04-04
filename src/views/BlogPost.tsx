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
          className="text-2xl md:text-3xl mt-12 mb-5 text-[#191c1e]"
          style={{ fontFamily: 'var(--font-headline)' }}
        >
          {section.content}
        </h2>
      );
    case 'subheading':
      return (
        <h3
          key={index}
          className="text-xl mt-8 mb-3 font-semibold text-[#191c1e]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {section.content}
        </h3>
      );
    case 'paragraph':
      return (
        <p
          key={index}
          className="text-lg leading-relaxed text-[#45464d] mb-6"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {section.content}
        </p>
      );
    case 'pullquote':
      return (
        <div
          key={index}
          className="my-10 px-8 py-8 bg-[#e0e3e5]"
          style={{ borderLeft: '4px solid #2563EB' }}
        >
          <blockquote
            className="text-2xl md:text-3xl text-[#191c1e] mb-4 leading-snug"
            style={{ fontFamily: 'var(--font-headline)', fontStyle: 'italic' }}
          >
            {section.content}
          </blockquote>
          {section.attribution && (
            <cite
              className="text-xs font-bold tracking-widest uppercase not-italic text-[#45464d]"
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
            <div key={si} className="bg-[#f2f4f6] p-6">
              <p
                className="text-3xl font-bold text-[#2563EB] mb-1"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {stat.value}
              </p>
              <p
                className="text-sm text-[#191c1e] mb-2 leading-snug"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {stat.label}
              </p>
              <p
                className="text-[10px] font-bold tracking-widest uppercase text-[#76777d]"
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
              <span className="mt-1.5 w-2 h-2 shrink-0 bg-[#2563EB]" aria-hidden="true" />
              <span className="text-[#45464d] leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
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
            className="text-xs font-bold uppercase tracking-widest text-[#76777d] mb-4"
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
                  className="flex items-start gap-2 text-xs text-[#45464d] hover:text-[#2563EB] transition-colors leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 text-[#2563EB]" />
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
            className="text-xs font-bold uppercase tracking-widest text-[#76777d] mb-4"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Topics
          </h4>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-1 bg-[#e0e3e5] text-[#45464d] font-bold tracking-wide uppercase"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA box */}
      <div className="bg-[#0F172A] p-6">
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
          H.V.A combines technology consulting with engineering delivery to help businesses modernize operations with confidence.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[#2563EB] hover:gap-3 transition-all"
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
      eyebrow={post.category}
      publishedAt={post.publishedAt}
      readTime={post.readTime}
      title={post.title}
      subtitle={post.subtitle}
      author={post.authors[0]}
      coverImage={post.coverImage}
      coverAlt={post.title}
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
        primaryLabel: 'Talk to H.V.A',
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
