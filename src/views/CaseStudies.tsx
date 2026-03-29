'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageAmbientBackground from '../components/PageAmbientBackground';
import BottomCTA from '../components/BottomCTA';
import { getAllCaseStudies } from '../lib/proof';

const CaseStudies: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const studies = getAllCaseStudies();
  const totalOutcomes = studies.reduce((sum, s) => sum + s.measuredOutcomes.length, 0);

  return (
    <div className="relative isolate overflow-hidden bg-[#F5F6FA] text-[#1E272E]">
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#0984E3] via-[#4CA6EC] to-[#00CEC9]"
        style={{ scaleX: progressScale }}
      />

      <PageAmbientBackground className="-z-10" />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 px-6 lg:px-14">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left: copy */}
            <motion.div
              className="lg:col-span-7 z-10"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <span className="inline-block text-[#0984E3] font-bold tracking-[0.22em] text-[10px] uppercase mb-6">
                Transformation Proof
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-[4.5rem] xl:text-[5rem] font-medium leading-[1.04] tracking-tight text-[#1E272E] mb-8">
                Consulting-Led Delivery<br />
                <em className="italic">With Measured Outcomes.</em>
              </h1>
              <p className="text-xl text-[#1E272E]/60 max-w-xl mb-10 font-light leading-relaxed">
                Each case documents the business challenge, consulting strategy, execution architecture, deployment reality, and measurable operating impact.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/services/solution-programs"
                  className="sharp-edge bg-[#1E272E] text-[#F5F6FA] px-8 py-4 text-sm font-bold hover:bg-[#0984E3] transition-colors duration-300"
                >
                  View Solution Programs
                </Link>
                <Link
                  href="/services"
                  className="sharp-edge inline-flex items-center gap-2 bg-white/90 px-8 py-4 text-sm font-bold text-[#1E272E] shadow-[0_10px_25px_rgba(9,132,227,0.08)] hover:bg-[#ECF5FD] transition-colors duration-300"
                >
                  Consulting Services <ArrowRight className="h-4 w-4 text-[#0984E3]" />
                </Link>
              </div>
            </motion.div>

            {/* Right: expert insight card */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
              <div className="bg-white shadow-xl p-8 md:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-4">
                  Expert Insight
                </p>
                <blockquote className="font-serif text-xl md:text-2xl text-[#0F172A] leading-[1.44] mb-8 italic">
                  "Mature consulting shows up when strategy survives production pressure with measurable outcomes."
                </blockquote>
                <div className="flex flex-wrap gap-8 pt-6 border-t border-slate-100">
                  <div>
                    <p className="font-serif text-3xl font-medium text-[#0F172A]">{studies.length}</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#475569] mt-1">
                      Published cases
                    </p>
                  </div>
                  <div>
                    <p className="font-serif text-3xl font-medium text-[#0F172A]">{totalOutcomes}</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#475569] mt-1">
                      Verified outcomes
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Case studies grid ─────────────────────────────────────────────── */}
      <section className="case-grid-zone">
        <div className="editorial-shell case-grid">
          {studies.map((study, index) => (
            <motion.article
              key={study.slug}
              className={`case-card ${index % 2 === 1 ? 'case-card--alt' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.4, delay: (index % 2) * 0.08 }}
            >
              <div className="case-card__media">
                <Image
                  src={study.assets.coverImage}
                  alt={study.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="case-card__body">
                <p className="case-card__industry">{study.industry}</p>
                <h2 className="case-card__title">{study.title}</h2>
                <p className="case-card__summary">{study.summary}</p>
                <p className="case-card__status">{study.deploymentStatus}</p>
                <ul className="case-card__metrics">
                  {study.measuredOutcomes.slice(0, 2).map((metric) => (
                    <li key={metric.label}>
                      <span>{metric.value}</span>
                      <small>{metric.label}</small>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="editorial-link editorial-link--strong"
                >
                  Read Full Case Study &rarr;
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <BottomCTA
        headline="Ready to See How Transformation Looks in Production?"
        subtext="Start with a discovery call. We will show you exactly how strategy, architecture, and delivery are aligned in real environments."
        primaryLabel="Start Discovery"
        primaryHref="/contact"
        secondaryLabel="View Solution Programs"
        secondaryHref="/services/solution-programs"
      />
    </div>
  );
};

export default CaseStudies;
