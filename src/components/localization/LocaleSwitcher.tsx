'use client';

import {useEffect, useId, useRef, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {useSearchParams} from 'next/navigation';
import {ChevronDown} from '@/components/icons';
import {Link} from '@/i18n/navigation';
import {APP_LOCALES, type AppLocale} from '@/i18n/config';
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
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const pathname = hydratedPathname ?? '/';
  const isDynamicRoute = DYNAMIC_ROUTE_PATTERNS.some((pattern) => pattern.test(pathname));
  const query = hydratedPathname
    ? Object.fromEntries(searchParams.entries())
    : {};
  const queryString = new URLSearchParams(query).toString();

  const localeOptions = APP_LOCALES.map((targetLocale) => {
    const languageKey = `languages.${targetLocale}`;
    const language = t.has(languageKey) ? t(languageKey) : targetLocale.toUpperCase();
    const explicitTarget = translationRoutes[targetLocale];
    const unavailable =
      targetLocale !== locale && isDynamicRoute && !explicitTarget;
    const href = explicitTarget ?? pathname;
    const localizedHref = localizeHref(href, targetLocale);
    const targetHref = queryString
      ? `${localizedHref}?${queryString}`
      : localizedHref;

    return {
      active: targetLocale === locale,
      href: targetHref,
      language,
      locale: targetLocale,
      unavailable,
    };
  });

  const activeOption =
    localeOptions.find((option) => option.active) ?? localeOptions[0];

  useEffect(() => {
    setDesktopMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!desktopMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setDesktopMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setDesktopMenuOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [desktopMenuOpen]);

  if (mobile) {
    return (
      <div
        data-locale-switcher="mobile"
        className="flex min-h-11 items-center justify-center gap-1 border-y border-[#1A2535]/10 py-2"
        aria-label={t('selectLanguage')}
      >
        {localeOptions.map((option) => {
          if (option.unavailable) {
            return (
              <span
                key={option.locale}
                className="cursor-not-allowed px-2.5 py-2 uppercase text-[#1A2535]/25"
                aria-disabled="true"
                title={t('unavailable', {language: option.language})}
              >
                {option.locale}
              </span>
            );
          }

          return (
            <Link
              key={option.locale}
              href={option.href}
              locale={option.locale}
              hrefLang={option.locale}
              aria-current={option.active ? 'page' : undefined}
              aria-label={
                option.active
                  ? option.language
                  : t('switchTo', {language: option.language})
              }
              className={`px-2.5 py-2 uppercase transition-colors ${
                option.active
                  ? 'bg-[#1A2535] text-white'
                  : 'text-[#1A2535]/55 hover:bg-[#CD9F40]/15 hover:text-[#1A2535]'
              }`}
            >
              {option.locale}
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={dropdownRef}
      data-locale-switcher="desktop"
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setDesktopMenuOpen(false);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={desktopMenuOpen}
        aria-controls={desktopMenuOpen ? menuId : undefined}
        aria-label={t('currentLanguage', {language: activeOption.language})}
        className="group inline-flex min-h-11 min-w-[4.5rem] items-center justify-between gap-2 border border-[#1A2535]/15 bg-white px-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#1A2535] transition-[border-color,background-color,color] duration-150 hover:border-[#CD9F40]/60 hover:bg-[#CD9F40]/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CD9F40]"
        onClick={() => setDesktopMenuOpen((open) => !open)}
        onKeyDown={(event) => {
          if (event.key !== 'ArrowDown') return;
          event.preventDefault();
          setDesktopMenuOpen(true);
          requestAnimationFrame(() => {
            menuRef.current
              ?.querySelector<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])')
              ?.focus();
          });
        }}
      >
        <span>{activeOption.locale}</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-3.5 w-3.5 text-[#1A2535]/50 transition-transform duration-150 ${
            desktopMenuOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {desktopMenuOpen ? (
        <div className="absolute right-0 top-full z-50 pt-2">
          <div
            ref={menuRef}
            id={menuId}
            role="menu"
            aria-label={t('selectLanguage')}
            className="min-w-[12.5rem] border border-[#1A2535]/10 bg-white p-1.5 shadow-[0_16px_40px_rgba(26,37,53,0.16)]"
          >
            <p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#1A2535]/40">
              {t('selectLanguage')}
            </p>
            {localeOptions.map((option) => {
              if (option.unavailable) {
                return (
                  <span
                    key={option.locale}
                    role="menuitem"
                    aria-disabled="true"
                    title={t('unavailable', {language: option.language})}
                    className="flex min-h-11 cursor-not-allowed items-center justify-between gap-4 px-3 text-sm text-[#1A2535]/25"
                  >
                    <span>{option.language}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em]">
                      {option.locale}
                    </span>
                  </span>
                );
              }

              return (
                <Link
                  key={option.locale}
                  role="menuitem"
                  href={option.href}
                  locale={option.locale}
                  hrefLang={option.locale}
                  aria-current={option.active ? 'page' : undefined}
                  aria-label={
                    option.active
                      ? option.language
                      : t('switchTo', {language: option.language})
                  }
                  onClick={() => setDesktopMenuOpen(false)}
                  className={`flex min-h-11 items-center justify-between gap-4 px-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#CD9F40] ${
                    option.active
                      ? 'bg-[#1A2535] text-white'
                      : 'text-[#1A2535]/75 hover:bg-[#CD9F40]/[0.10] hover:text-[#1A2535]'
                  }`}
                >
                  <span>{option.language}</span>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-[0.12em] ${
                      option.active ? 'text-[#E8A838]' : 'text-[#1A2535]/40'
                    }`}
                  >
                    {option.locale}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
