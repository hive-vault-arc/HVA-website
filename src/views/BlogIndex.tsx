'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { getAllPosts } from '../lib/blog';

const CATEGORIES = ['All', 'AI & Automation', 'Strategy & Execution'];

export default function BlogIndex() {
  const allPosts = getAllPosts();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All' ? allPosts : allPosts.filter((p) => p.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <main className="bg-[#f7f9fb] min-h-screen">
      {/* Hero */}
      <section className="bg-[#f2f4f6] pt-36 pb-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <span
              className="block text-xs font-bold tracking-[0.2em] uppercase mb-6"
              style={{ color: '#2563EB', fontFamily: 'var(--font-body)' }}
            >
              Strategy + Execution Journal
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight text-[#0F172A]"
              style={{ fontFamily: 'var(--font-headline)' }}
            >
              The H.V.A <br />
              <span className="italic">Consulting Briefing</span>
            </h1>
          </div>
          <div className="lg:col-span-4 pb-2">
            <p
              className="text-lg leading-relaxed pl-6 text-[#45464d]"
              style={{
                fontFamily: 'var(--font-body)',
                borderLeft: '2px solid #c6c6cd',
              }}
            >
              An editorial collection of insights on AI agents, custom software, and the
              architecture of modern business operations — written for CEOs, COOs, and leadership teams in Morocco and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pt-12 pb-8">
        <div className="flex flex-wrap items-center gap-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="text-sm font-bold tracking-[0.15em] uppercase pb-2 transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-body)',
                color: activeCategory === cat ? '#0F172A' : '#76777d',
                borderBottom: activeCategory === cat ? '2px solid #0F172A' : '2px solid transparent',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Thin rule */}
        <div className="mt-4 h-px bg-[#e0e3e5]" />
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="max-w-7xl mx-auto px-6 md:px-8 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="flex flex-col lg:flex-row items-stretch">
                {/* Image — 60% width on desktop */}
                <div className="w-full lg:w-[60%] shrink-0 relative">
                  <div className="aspect-[4/3] relative overflow-hidden bg-[#e0e3e5]">
                    <Image
                      src={featured.coverImage}
                      alt={featured.title}
                      fill
                      className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                  </div>
                </div>
                {/* Content card — overlaps image by pulling left on desktop */}
                <div className="w-full lg:w-[46%] lg:-ml-[6%] z-10 flex items-center relative">
                  <div
                    className="bg-white p-10 lg:p-14"
                    style={{ boxShadow: '0 10px 40px rgba(25,28,30,0.08)' }}
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <span
                        className="text-xs font-bold tracking-widest uppercase px-3 py-1"
                        style={{
                          color: '#2563EB',
                          background: 'rgba(37,99,235,0.08)',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {featured.category}
                      </span>
                      <span
                        className="text-xs font-medium text-[#76777d]"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {new Date(featured.publishedAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <h2
                      className="text-3xl md:text-4xl mb-5 leading-tight text-[#191c1e] group-hover:text-[#2563EB] transition-colors"
                      style={{ fontFamily: 'var(--font-headline)' }}
                    >
                      {featured.title}
                    </h2>
                    <p
                      className="text-[#45464d] mb-8 leading-relaxed line-clamp-3"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#e0e3e5] flex items-center justify-center text-xs font-bold text-[#0F172A]">
                          {featured.authors[0]?.initials}
                        </div>
                        <div>
                          <p
                            className="text-sm font-semibold text-[#191c1e]"
                            style={{ fontFamily: 'var(--font-body)' }}
                          >
                            {featured.authors[0]?.name}
                          </p>
                          <p
                            className="text-xs text-[#76777d]"
                            style={{ fontFamily: 'var(--font-body)' }}
                          >
                            {featured.readTime}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight
                        className="w-5 h-5 text-[#0F172A] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </section>
      )}

      {/* Articles Grid */}
      {rest.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-8 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
            {rest.map((post, i) => (
              <motion.article
                key={post.slug}
                className="group"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  {/* Image */}
                  <div className="aspect-square bg-[#f2f4f6] mb-7 overflow-hidden relative">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  {/* Meta */}
                  <div className="space-y-3">
                    <div
                      className="flex justify-between items-center text-[10px] font-bold tracking-[0.2em] uppercase text-[#45464d]"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      <span className="text-[#2563EB]">{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3
                      className="text-xl leading-snug text-[#191c1e] group-hover:text-[#2563EB] transition-colors"
                      style={{ fontFamily: 'var(--font-headline)' }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="text-[#45464d] text-sm leading-relaxed line-clamp-2"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {post.excerpt}
                    </p>
                    <div
                      className="pt-4 flex items-center justify-between"
                      style={{ borderTop: '1px solid rgba(198,198,205,0.3)' }}
                    >
                      <span
                        className="text-xs text-[#76777d] italic"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {post.authors[0]?.name} &bull;{' '}
                        {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#0F172A] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-8 py-24 text-center">
          <p className="text-[#45464d]" style={{ fontFamily: 'var(--font-body)' }}>
            No articles in this category yet.
          </p>
        </section>
      )}
    </main>
  );
}
