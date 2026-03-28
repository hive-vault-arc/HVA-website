'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ExternalLink } from 'lucide-react';
import type { BlogPost, ContentSection } from '../lib/blog';
import { getRelatedPosts } from '../lib/blog';
import BottomCTA from '../components/BottomCTA';

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
              <span
                className="mt-1.5 w-2 h-2 shrink-0 bg-[#2563EB]"
                aria-hidden="true"
              />
              <span
                className="text-[#45464d] leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}
              >
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

type Props = { post: BlogPost };

export default function BlogPostView({ post }: Props) {
  const related = getRelatedPosts(post.slug);

  return (
    <main className="bg-[#f7f9fb]">
      {/* Hero */}
      <section className="bg-[#f2f4f6] pt-36 pb-16 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#76777d] hover:text-[#0F172A] transition-colors mb-8 text-sm"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            All articles
          </Link>

          {/* Meta row */}
          <div
            className="flex flex-wrap items-center gap-4 mb-7 text-xs font-bold tracking-widest uppercase"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            <span style={{ color: '#2563EB' }}>{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-[#c6c6cd]" />
            <span className="text-[#76777d]">
              {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#c6c6cd]" />
            <span className="text-[#76777d]">{post.readTime}</span>
          </div>

          {/* Title */}
          <h1
            className="text-4xl md:text-6xl leading-tight tracking-tight text-[#0F172A] mb-6"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            {post.title}
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg text-[#45464d] leading-relaxed max-w-2xl mb-10"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {post.subtitle}
          </p>

          {/* Author row */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#0F172A] flex items-center justify-center text-white text-xs font-bold">
              {post.authors[0]?.initials}
            </div>
            <div>
              <p
                className="text-sm font-semibold text-[#191c1e]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {post.authors[0]?.name}
              </p>
              <p
                className="text-xs text-[#76777d]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {post.authors[0]?.role}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 -mt-1">
        <div className="relative w-full aspect-[21/9] overflow-hidden bg-[#e0e3e5]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 896px) 100vw, 896px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f7f9fb] via-transparent to-transparent" />
        </div>
      </div>

      {/* Article Body + Sidebar */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Sticky Sidebar */}
          <aside className="md:col-span-3 order-2 md:order-1">
            <div className="sticky top-28 space-y-10">
              {/* Sources */}
              <div>
                <h4
                  className="text-xs font-bold uppercase tracking-widest text-[#76777d] mb-4"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Sources
                </h4>
                <ul className="space-y-3">
                  {post.sources.map((src, i) => (
                    <li key={i}>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2 text-xs text-[#45464d] hover:text-[#2563EB] transition-colors leading-relaxed group"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        <ExternalLink className="w-3 h-3 mt-0.5 shrink-0 text-[#2563EB]" />
                        {src.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div>
                <h4
                  className="text-xs font-bold uppercase tracking-widest text-[#76777d] mb-4"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Topics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
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

              {/* CTA */}
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
          </aside>

          {/* Main Article Content */}
          <div className="md:col-span-9 order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {post.sections.map((section, i) => (
                <RenderSection key={i} section={section} index={i} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About H.V.A strip */}
      <section className="bg-[#f2f4f6] py-16 px-6 md:px-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="w-16 h-16 bg-[#0F172A] flex items-center justify-center text-white text-sm font-bold shrink-0">
            HV
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3
              className="text-2xl mb-3 text-[#191c1e]"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              About Hive Vault Arc
            </h3>
            <p
              className="text-[#45464d] leading-relaxed mb-6 max-w-xl"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              H.V.A is a technology consulting and digital transformation firm based in Tangier, Morocco. We advise, engineer, build, ship, and maintain intelligent systems across AI, automation, custom software, IT modernization, cloud infrastructure, and data services.
            </p>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-[#2563EB] hover:gap-4 transition-all"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Explore case studies
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-20 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-widest text-[#76777d] mb-3"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Continue Reading
                </p>
                <h2
                  className="text-4xl text-[#191c1e]"
                  style={{ fontFamily: 'var(--font-headline)' }}
                >
                  Related Insights
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden md:inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#0F172A] hover:text-[#2563EB] transition-colors pb-1"
                style={{
                  fontFamily: 'var(--font-body)',
                  borderBottom: '2px solid #0F172A',
                }}
              >
                All Articles
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {related.map((p, i) => (
                <motion.div
                  key={p.slug}
                  className="group"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                >
                  <Link href={`/blog/${p.slug}`} className="block">
                    <div className="aspect-[4/3] mb-5 overflow-hidden bg-[#e0e3e5] relative">
                      <Image
                        src={p.coverImage}
                        alt={p.title}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-3"
                      style={{ color: '#2563EB', fontFamily: 'var(--font-body)' }}
                    >
                      {p.category}
                    </p>
                    <h3
                      className="text-xl text-[#191c1e] group-hover:text-[#2563EB] transition-colors leading-snug"
                      style={{ fontFamily: 'var(--font-headline)' }}
                    >
                      {p.title}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <BottomCTA
        variant="blue"
        headline="Ready to turn strategy into execution?"
        subtext="Let us scope the consulting and engineering plan that fits your goals, constraints, and operating model."
        primaryLabel="Talk to H.V.A"
        primaryHref="/contact"
      />
    </main>
  );
}
