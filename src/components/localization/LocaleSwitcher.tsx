'use client';

import {useLocale, useTranslations} from 'next-intl';
import {useSearchParams} from 'next/navigation';
import {Link} from '@/i18n/navigation';
import type {AppLocale} from '@/i18n/config';
import {localizeHref} from '@/i18n/route-manifest';
import {useTranslationRoutes} from './TranslationAvailability';
import {useHydratedPathname} from './useHydratedPathname';

const DYNAMIC_ROUTE_PATTERNS = [
  /^\/blog\/[^/]+$/,
  /^\/case-studies\/[^/]+$/,
  /^\/capabilities\/(?!in-detail$|solution-programs$)[^/]+$/,
  /^\/aboutus\/our-people\/[^/]+$/,
  /^\/insights\/news-articles\/[^/]+$/,
  /^\/insights\/perspectives\/[^/]+$/,
  /^\/insights\/research-reports\/[^/]+$/,
];

export default function LocaleSwitcher({mobile = false}: {mobile?: boolean}) {
  const locale = useLocale() as AppLocale;
  const hydratedPathname = useHydratedPathname();
  const searchParams = useSearchParams();
  const translationRoutes = useTranslationRoutes();
  const t = useTranslations('Locale');
  const pathname = hydratedPathname ?? '/';
  const isDynamicRoute = DYNAMIC_ROUTE_PATTERNS.some((pattern) => pattern.test(pathname));
  const query = hydratedPathname
    ? Object.fromEntries(searchParams.entries())
    : {};

  return (
    <div
      className={
        mobile
          ? 'flex min-h-11 items-center justify-center gap-1 border-y border-[#1A2535]/10 py-2'
          : 'ml-2 mr-3 hidden items-center gap-0.5 text-[11px] font-semibold lg:flex'
      }
      aria-label={locale === 'en' ? 'Language' : 'Langue'}
    >
      {(['en', 'fr'] as const).map((targetLocale) => {
        const language = targetLocale === 'en' ? t('english') : t('french');
        const explicitTarget = translationRoutes[targetLocale];
        const unavailable =
          targetLocale !== locale && isDynamicRoute && !explicitTarget;
        const href = explicitTarget ?? pathname;
        const localizedHref = localizeHref(href, targetLocale);
        const queryString = new URLSearchParams(query).toString();
        const targetHref = queryString
          ? `${localizedHref}?${queryString}`
          : localizedHref;
        const active = targetLocale === locale;

        if (unavailable) {
          return (
            <span
              key={targetLocale}
              className="cursor-not-allowed px-2.5 py-2 uppercase text-[#1A2535]/25"
              aria-disabled="true"
              title={t('unavailable', {language})}
            >
              {targetLocale}
            </span>
          );
        }

        return (
          <Link
            key={targetLocale}
            href={targetHref}
            locale={targetLocale}
            hrefLang={targetLocale}
            aria-current={active ? 'page' : undefined}
            aria-label={active ? language : t('switchTo', {language})}
            className={`px-2.5 py-2 uppercase transition-colors ${
              active
                ? 'bg-[#1A2535] text-white'
                : 'text-[#1A2535]/55 hover:bg-[#CD9F40]/15 hover:text-[#1A2535]'
            }`}
          >
            {targetLocale}
          </Link>
        );
      })}
    </div>
  );
}
