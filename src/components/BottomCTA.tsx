'use client';

import {Link} from '@/i18n/navigation';
import {useTranslations} from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from '@/components/icons';
import SectionBrandMark from './SectionBrandMark';

interface BottomCTAProps {
  headline: string;
  subtext: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: 'dark' | 'blue' | 'light';
  revealImmediately?: boolean;
}

export default function BottomCTA({
  headline,
  subtext,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  variant = 'dark',
  revealImmediately = false,
}: BottomCTAProps) {
  const t = useTranslations('Common');
  if (variant === 'blue') {
    return (
      <section className="cta-banner bg-[#E8A838] py-20 px-6 md:px-8">
        <motion.div
          initial={revealImmediately ? false : {opacity: 0, y: 20}}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <SectionBrandMark surface="dark" size="sm" className="mx-auto mb-5" />
          <h2
            className="text-3xl md:text-4xl text-white mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-headline)' }}
          >
            {headline}
          </h2>
          <p
            className="text-white/80 text-lg mb-8 max-w-xl mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {subtext}
          </p>
          <Link
            href={primaryHref}
            className="sharp-edge inline-flex min-h-11 items-center justify-center gap-2 bg-white px-8 py-3 text-sm font-bold uppercase tracking-widest text-[#E8A838] transition-colors duration-200 hover:bg-[#1A2535] hover:text-white w-full sm:w-auto"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {primaryLabel}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    );
  }

  if (variant === 'light') {
    return (
      <section className="cta-banner soft-grid-cta px-6 py-20 text-center md:px-12 md:py-24">
        <motion.div
          initial={revealImmediately ? false : {opacity: 0, y: 20}}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl"
        >
          <SectionBrandMark size="sm" className="mx-auto mb-6" />
          <h2 className="mx-auto max-w-2xl font-headline text-4xl font-medium leading-tight text-[#1A2535] md:text-5xl">
            {headline}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#536070] md:text-lg">
            {subtext}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href={primaryHref} className="sharp-edge btn-primary w-full sm:w-auto">
              {primaryLabel}
            </Link>
            {secondaryLabel && secondaryHref && (
              <Link href={secondaryHref} className="sharp-edge btn-outlined w-full sm:w-auto">
                {secondaryLabel}
              </Link>
            )}
          </div>
        </motion.div>
      </section>
    );
  }

  // dark variant (default)
  return (
    <section className="cta-banner py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-14">
        <motion.div
          initial={revealImmediately ? false : {opacity: 0, y: 20}}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden bg-[#1A2535] text-[#FFFFFF] px-6 py-10 sm:px-10 sm:py-16 md:px-20 md:py-24"
        >
          {/* Glow orbs */}
          <div className="pointer-events-none absolute -right-24 -top-20 h-64 w-64 rounded-full bg-[#E8A838]/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-[8%] h-56 w-56 rounded-full bg-[#F0C15A]/20 blur-3xl" />
          {/* Blueprint grid */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <SectionBrandMark surface="dark" size="sm" />
                <p className="text-[var(--section-label-color-dark)] text-[10px] font-bold tracking-[0.22em] uppercase">
                  {t('nextStep')}
                </p>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-6xl leading-tight mb-6">
                {headline}
              </h2>
              <p className="text-[#FFFFFF]/[0.65] text-lg font-light leading-relaxed max-w-xl">
                {subtext}
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:items-end">
              <Link
                href={primaryHref}
                className="sharp-edge inline-flex min-h-11 items-center justify-center gap-2 bg-[#E8A838] px-10 py-5 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-200 hover:bg-[#C8891C] active:scale-95 w-full sm:w-auto"
              >
                {primaryLabel}
                <ArrowRight className="h-4 w-4" motion="nudge" aria-hidden="true" />
              </Link>
              {secondaryLabel && secondaryHref && (
                <Link
                  href={secondaryHref}
                  className="sharp-edge inline-flex min-h-11 items-center justify-center gap-2 border border-[#FFFFFF]/20 px-10 py-5 text-sm font-bold uppercase tracking-wide text-[#FFFFFF] transition-colors duration-200 hover:bg-[#FFFFFF]/10 w-full sm:w-auto"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
