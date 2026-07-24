'use client';

import React from 'react';
import {Link} from '@/i18n/navigation';
import Image from 'next/image';
import { MotionConfig, motion, useScroll, useTransform } from 'framer-motion';
import {useLocale, useTranslations} from 'next-intl';
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  CloudCog,
  ShieldCheck,
  Sparkles,
  Workflow,
} from '@/components/icons';
import { useAnimationQuality } from '../lib/animationQuality';
import PageAmbientBackground from '../components/PageAmbientBackground';
import BottomCTA from '../components/BottomCTA';
import SectionBrandMark from '../components/SectionBrandMark';

/* ── Blueprint grid background (reused in hero + CTA) ── */
const blueprintGrid: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(to right,  rgba(232,168,56,0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(232,168,56,0.05) 1px, transparent 1px)
  `,
  backgroundSize: '40px 40px',
};

/* ── Data ─────────────────────────────────────────────────────────────────── */

const proofIcons = [Bot, BarChart3, Workflow, CloudCog, ShieldCheck, Sparkles] as const;

/* ── Component ────────────────────────────────────────────────────────────── */

const Portfolio: React.FC = () => {
  const t = useTranslations('Portfolio');
  const locale = useLocale();
  const { motionReduced } = useAnimationQuality();
  const { scrollYProgress } = useScroll();
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const proofCopy = t.raw('signature.items') as Array<{title: string; detail: string}>;
  const proofBlocks = proofCopy.map((copy, index) => {
    const Icon = proofIcons[index] ?? Bot;
    return {...copy, icon: <Icon className="h-5 w-5" />};
  });
  const firstTags = t.raw('projects.ai.tags') as string[];
  const firstBullets = t.raw('projects.ai.bullets') as string[];
  const secondTags = t.raw('projects.crm.tags') as string[];

  return (
    <MotionConfig reducedMotion={motionReduced ? 'always' : 'never'}>
      <div className="relative isolate min-h-[100dvh] overflow-x-hidden bg-[#FFFFFF] text-[#1A2535]">

        {/* Scroll progress bar */}
        <motion.div
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-[#E8A838]"
          style={{ scaleX: progressScale }}
        />
        <PageAmbientBackground className="-z-10" />

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative flex min-h-[650px] items-end overflow-hidden bg-[#F7F8FA] md:min-h-[680px] lg:items-center">
          <Image
            src="/Images/blog/custom-crm-system-morocco.webp"
            alt={t('hero.imageAlt')}
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="object-cover object-[62%_center]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,248,250,0.42)_0%,rgba(247,248,250,0.98)_58%,#F7F8FA_100%)] md:bg-[linear-gradient(90deg,#F7F8FA_0%,rgba(247,248,250,0.97)_38%,rgba(247,248,250,0.52)_64%,rgba(247,248,250,0.12)_100%)]" />
          <div className="absolute inset-0 opacity-25" style={blueprintGrid} />

          <div className="relative mx-auto w-full max-w-7xl px-6 pb-12 pt-28 sm:px-8 md:py-28">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="mb-5 flex items-center gap-3">
                <SectionBrandMark size="sm" />
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--section-label-color)]">
                  {t('hero.eyebrow')}
                </span>
              </div>
              <h1 className="mb-6 max-w-[13ch] font-serif text-[clamp(2.65rem,12vw,4.5rem)] leading-[0.98] text-[#1A2535] md:text-7xl lg:max-w-3xl lg:text-7xl">
                <span className="block">{t('hero.titleLineOne')}</span>{' '}
                <span className="block">{t('hero.titleLineTwo')}</span>
              </h1>
              <p className="max-w-lg text-lg font-medium leading-relaxed text-[#3D4858] md:text-xl">
                {t('hero.description')}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#portfolio-projects" className="sharp-edge inline-flex min-h-12 items-center justify-center bg-[#1A2535] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#E8A838]">
                  {t('hero.primaryCta')}
                </Link>
                <Link href="/contact" className="sharp-edge inline-flex min-h-12 items-center justify-center border border-[#1A2535]/[0.24] bg-white/[0.88] px-7 py-3 text-sm font-bold text-[#1A2535] transition-colors hover:border-[#E8A838] hover:text-[var(--section-label-color)]">
                  {t('hero.secondaryCta')}
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Projects ──────────────────────────────────────────────────────── */}
        <section id="portfolio-projects" className="scroll-mt-24 space-y-24 pb-20 pt-12 md:space-y-32 md:py-24">

          {/* Project 1 — AI Assistant (image left, content right) */}
          <motion.div
            className="mx-auto max-w-7xl px-6 sm:px-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid lg:grid-cols-12 gap-12 items-center">

              {/* Image */}
              <div className="relative pb-8 sm:pr-8 lg:col-span-7 group lg:pb-10">
                <div className="absolute -inset-4 bg-[#E8A838]/5 transition-all duration-300 group-hover:bg-[#E8A838]/10" />
                <div className="relative w-full h-[260px] sm:h-[380px] md:h-[500px] shadow-lg">
                  <Image
                    alt={t('projects.ai.imageAlt')}
                    src="/Images/blog/custom-ai-agent-morocco.webp"
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="relative w-full h-full object-cover"
                  />
                </div>
                {/* Floating info card */}
                <div className="absolute -bottom-4 -right-4 hidden w-52 bg-white p-6 shadow-xl lg:block">
                  <Bot className="mb-3 h-8 w-8 text-[var(--section-label-color)]" />
                  <p className="text-[10px] font-bold text-[#566274] uppercase tracking-wider leading-relaxed">
                    {t('projects.ai.stream')}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-5 space-y-5">
                <h2 className="font-serif text-4xl text-[#1A2535] leading-tight">
                  {t('projects.ai.title')}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {firstTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#DDE3EA] text-[#566274] text-[10px] font-bold uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-[#566274] leading-relaxed font-light">
                  {t('projects.ai.description')}
                </p>
                <div className="border border-[#DDE3EA] bg-[#FFFFFF] p-4 text-sm text-[#3D4858]">
                  <p><span className="font-semibold">{t('projects.deploymentLabel')}</span> {t('projects.ai.deployment')}</p>
                  <p className="mt-1"><span className="font-semibold">{t('projects.stackLabel')}</span> {t('projects.ai.stack')}</p>
                </div>
                <ul className="space-y-3 text-sm text-[#566274]">
                  {firstBullets.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--section-label-color)]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-3">
                  <Link
                    href={locale === 'fr' ? '/case-studies' : '/case-studies/multilingual-whatsapp-ai-agent'}
                    className="group inline-flex min-h-11 items-center gap-2 border-b-2 border-[#E8A838] pb-1 font-bold text-[var(--section-label-color)] transition-colors hover:border-[#1A2535] hover:text-[#1A2535]"
                  >
                    {t('projects.caseStudyCta')}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Project 2 — CRM Operating System (content left, image right) */}
          <div className="bg-[#F7F8FA] py-24">
            <motion.div
              className="mx-auto max-w-7xl px-6 sm:px-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid lg:grid-cols-12 gap-12 items-center">

                {/* Content */}
                <div className="lg:col-span-5 space-y-5 order-2 lg:order-1">
                  <h2 className="font-serif text-4xl text-[#1A2535] leading-tight">
                    {t('projects.crm.title')}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {secondTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-[#E8EBF0] text-[#566274] text-[10px] font-bold uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                <p className="text-[#566274] leading-relaxed font-light">
                  {t('projects.crm.description')}
                </p>
                <div className="border border-[#DDE3EA] bg-white p-4 text-sm text-[#3D4858]">
                  <p><span className="font-semibold">{t('projects.deploymentLabel')}</span> {t('projects.crm.deployment')}</p>
                  <p className="mt-1"><span className="font-semibold">{t('projects.stackLabel')}</span> {t('projects.crm.stack')}</p>
                </div>
                <div className="border-l-4 border-[#E8A838] bg-[#FFFFFF] px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--section-label-color)]">{t('projects.crm.status')}</p>
                  <p className="mt-0.5 text-[9px] text-[#566274]">{t('projects.crm.statusDetail')}</p>
                </div>
                <div className="pt-3">
                  <Link
                    href={locale === 'fr' ? '/case-studies' : '/case-studies/top-tier-crm-transformation-program-real-estate-operations'}
                    className="group inline-flex min-h-11 items-center gap-2 border-b-2 border-[#E8A838] pb-1 font-bold text-[var(--section-label-color)] transition-colors hover:border-[#1A2535] hover:text-[#1A2535]"
                  >
                    {t('projects.caseStudyCta')}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Image */}
                <div className="relative order-1 pt-8 sm:pl-8 lg:order-2 lg:col-span-7 lg:pt-10">
                  <div className="relative w-full h-[260px] sm:h-[380px] md:h-[500px] shadow-2xl">
                    <Image
                      alt={t('projects.crm.imageAlt')}
                      src="/Images/blog/custom-crm-system-morocco.webp"
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Floating header card — blue */}
                  <div className="absolute -top-4 -left-4 hidden bg-[#E8A838] p-8 text-white lg:block">
                    <h3 className="font-serif text-2xl mb-2">{t('projects.crm.cardTitle')}</h3>
                    <p className="text-[10px] font-bold opacity-80 uppercase tracking-[0.2em]">
                      {t('projects.crm.cardCaption')}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

        </section>

        {/* ── Delivery Signature — DO NOT CHANGE ─────────────────────────────── */}
        <section className="relative py-14 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <h2 className="mx-auto max-w-5xl font-serif text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-semibold leading-[0.96] text-[#1A2535]">
                {t('signature.titleLineOne')}
                <br />
                {t('signature.titleLineTwo')}
              </h2>
              <div className="mt-10 flex items-center justify-center gap-3">
                <SectionBrandMark size="sm" />
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--section-label-color)]">{t('signature.eyebrow')}</p>
              </div>
              <h3 className="mt-3 font-serif text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold leading-[1.02] text-[#1A2535]">{t('signature.subtitle')}</h3>
              <p className="mx-auto mt-3 max-w-4xl text-base leading-relaxed text-[#1A2535]/[0.72] md:text-[1.55rem]">
                {t('signature.description')}
              </p>
            </motion.div>

            <div className="mt-10 overflow-hidden border border-[#1A2535]/[0.12] bg-white/[0.84]">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {proofBlocks.map((block, index) => (
                  <motion.article
                    key={block.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className={[
                      'relative border border-[#1A2535]/10 p-5 md:p-6 py-6',
                      'bg-[linear-gradient(rgba(30,39,46,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(30,39,46,0.055)_1px,transparent_1px)] bg-[size:26px_26px]',
                      index % 2 === 0 ? 'bg-[#FFFFFF]' : 'bg-[#F7F8FA]',
                    ].join(' ')}
                  >
                    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_28%_24%,rgba(232,168,56,0.09),transparent_52%)]" />
                    <div className="relative z-10">
                      <div className="inline-flex text-[var(--section-label-color)]">{block.icon}</div>
                      <h4 className="mt-3 text-3xl font-semibold tracking-tight text-[#1A2535] md:text-[2.1rem]">
                        {block.title}
                      </h4>
                      <p className="mt-2 max-w-md text-base leading-relaxed text-[#1A2535]/[0.82] md:text-xl">
                        {block.detail}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <BottomCTA
          variant="dark"
          headline={t('bottomCta.title')}
          subtext={t('bottomCta.description')}
          primaryLabel={t('bottomCta.primary')}
          primaryHref="/contact"
          secondaryLabel={t('bottomCta.secondary')}
          secondaryHref="/case-studies"
        />

      </div>
    </MotionConfig>
  );
};

export default Portfolio;
