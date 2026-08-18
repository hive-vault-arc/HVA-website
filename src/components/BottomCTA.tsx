'use client';

import {motion} from 'framer-motion';
import {useTranslations} from 'next-intl';
import {ArrowRight} from '@/components/icons';
import {Link} from '@/i18n/navigation';

interface BottomCTAProps {
  headline: string;
  subtext: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: 'dark' | 'blue' | 'light';
  revealImmediately?: boolean;
  compact?: boolean;
}

const panelClasses = {
  dark: 'bg-[#1A2535] text-[#FFFFFF]',
  blue: 'border border-[#DDE3EA] bg-[#F8E9C8] text-[#1A2535]',
  light: 'border border-[#DDE3EA] bg-[#F1F3F6] text-[#1A2535]',
} as const;

export default function BottomCTA({
  headline,
  subtext,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  variant = 'dark',
  revealImmediately = false,
  compact = false,
}: BottomCTAProps) {
  const t = useTranslations('Common');
  const isDark = variant === 'dark';

  return (
    <section className={`cta-banner ${compact ? 'py-6 md:py-8 lg:py-10' : 'py-10 md:py-14 lg:py-16'}`}>
      <motion.div
        initial={revealImmediately ? false : {opacity: 0, y: 16}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.25}}
        transition={{duration: 0.45}}
        className={`site-frame grid gap-7 px-6 sm:px-9 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)] lg:items-center lg:gap-12 lg:px-12 ${compact ? 'py-8 md:py-9 lg:py-10' : 'py-10 md:py-12 lg:px-14 lg:py-14'} ${panelClasses[variant]}`}
      >
        <div className="max-w-[52rem]">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-[#E8A838]" aria-hidden="true" />
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[#E8A838]">
              {t('nextStep')}
            </p>
          </div>
          <h2 className={`${compact ? 'max-w-[18ch] lg:text-[2.65rem]' : 'max-w-[18ch] lg:text-[3.25rem]'} font-headline text-[2rem] font-normal leading-[1.02] sm:text-[2.35rem]`}>
            {headline}
          </h2>
          <p
            className={`${compact ? 'mt-3 max-w-[58ch] text-[0.95rem]' : 'mt-4 max-w-2xl text-base md:text-[1.05rem]'} leading-relaxed ${
              isDark ? 'text-[#DDE3EA]' : 'text-[#536174]'
            }`}
          >
            {subtext}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:justify-end">
          <Link
            href={primaryHref}
            className={`inline-flex min-h-11 items-center justify-center gap-2 px-7 py-3 text-sm font-bold transition-[background-color,color,transform] duration-200 active:scale-[0.98] ${
              isDark
                ? 'bg-[#E8A838] text-[#1A2535] hover:bg-[#E8A838]'
                : 'bg-[#1A2535] text-[#FFFFFF] hover:bg-[#0D1824]'
            }`}
          >
            {primaryLabel}
            <ArrowRight className="h-4 w-4" motion="nudge" aria-hidden="true" />
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className={`inline-flex min-h-11 items-center justify-center border px-7 py-3 text-sm font-bold transition-colors duration-200 ${
                isDark
                  ? 'border-[#536174] text-[#FFFFFF] hover:border-[#E8A838] hover:text-[#E8A838]'
                  : 'border-[#1A2535] text-[#1A2535] hover:bg-[#1A2535] hover:text-[#FFFFFF]'
              }`}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  );
}
