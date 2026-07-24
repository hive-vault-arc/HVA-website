'use client';

import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export default function Error({ reset }: { reset: () => void }) {
  const t = useTranslations('Errors');
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#1A2535] px-6 text-center text-white">
      <div className="max-w-md">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--section-label-color)]">Hive Vault Arc</p>
        <h1 className="mt-4 font-headline text-4xl leading-tight">{t('temporaryTitle')}</h1>
        <p className="mt-4 text-sm leading-relaxed text-white/70">
          {t('temporaryDescription')}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="min-h-11 bg-[#E8A838] px-5 text-sm font-semibold text-[#1A2535] transition-colors hover:bg-white"
          >
            {t('retry')}
          </button>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center border border-white/20 px-5 text-sm font-semibold text-white transition-colors hover:border-[#E8A838] hover:text-[#E8A838]"
          >
            {t('returnHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
