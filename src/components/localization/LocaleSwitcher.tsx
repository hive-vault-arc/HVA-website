'use client';

import {useEffect, useId, useRef, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {useSearchParams} from 'next/navigation';
import {ChevronDown, Globe} from '@/components/icons';
import {Link} from '@/i18n/navigation';
import {LOCALE_PROFILES, PUBLIC_LOCALES, type AppLocale} from '@/i18n/config';
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

export default function LocaleSwitcher({
  mobile = false,
  dark = false,
}: {
  mobile?: boolean;
  dark?: boolean;
}) {
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

  const localeOptions = PUBLIC_LOCALES.map((targetLocale) => {
    const languageKey = `languages.${targetLocale}`;
    const language = t.has(languageKey)
      ? t(languageKey)
      : LOCALE_PROFILES[targetLocale].label;
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
        className={`flex min-h-12 items-center justify-center gap-1 border-y py-1 ${
          dark ? 'border-white/15' : 'border-[#1A2535]/10'
        }`}
        aria-label={t('selectLanguage')}
      >
        {localeOptions.map((option) => {
          if (option.unavailable) {
            return (
              <span
                key={option.locale}
                className={`inline-flex min-h-11 items-center px-3 ${
                  dark ? 'cursor-not-allowed text-white/25' : 'cursor-not-allowed text-[#1A2535]/25'
                }`}
                aria-disabled="true"
                title={t('unavailable', {language: option.language})}
              >
                {option.language}
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
              className={`inline-flex min-h-11 items-center px-3 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A838] ${
                option.active
                  ? 'bg-[#E8A838] text-[#1A2535]'
                  : dark
                    ? 'text-white/70 hover:bg-white/[0.08] hover:text-white'
                    : 'text-[#1A2535]/55 hover:bg-[#E8A838]/[0.08] hover:text-[#1A2535]'
              }`}
            >
              {option.language}
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
        className="group inline-flex min-h-12 min-w-[4.25rem] items-center justify-between gap-1.5 rounded-none border border-[#1A2535]/15 bg-white px-2.5 text-[10px] font-semibold text-[#1A2535] transition-[border-color,background-color,color] duration-150 hover:border-[#CD9F40] hover:bg-[#F8E9C8] hover:text-[#1A2535] focus-visible:border-[#CD9F40] focus-visible:bg-[#F8E9C8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CD9F40]"
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
        <span className="flex items-center gap-1.5">
          <Globe className="h-3.5 w-3.5 text-[#E8A838]" aria-hidden="true" />
        <span className="max-w-[8rem] truncate text-start">{activeOption.language}</span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`h-3 w-3 text-[#1A2535]/50 transition-transform duration-150 ${
            desktopMenuOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {desktopMenuOpen ? (
        <div className="absolute end-0 top-full z-30 mt-4">
          <div
            data-navbar-surface="locale-menu"
            className="navbar-mega-panel locale-switcher-menu rounded-none w-[min(42rem,calc(100vw-2rem))] overflow-hidden border border-[#DDE3EA] bg-[#FCFBF8]/[0.99] text-[#1A2535] shadow-[0_24px_60px_rgba(13,24,36,0.18)]"
          >
            <div className="grid min-h-[238px] grid-cols-[minmax(240px,0.78fr)_2.22fr]">
              <div className="flex flex-col justify-between border-s border-[#DDE3EA] px-8 py-7">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#E8A838]">
                    {t('eyebrow')}
                  </p>
                  <div className="mt-5 flex max-w-[250px] items-end justify-between gap-5 font-serif text-[30px] leading-[1.05] text-[#1A2535]">
                    <span>{t('selectLanguage')}</span>
                    <Globe className="mb-1 h-4 w-4 shrink-0 text-[#E8A838]" aria-hidden="true" />
                  </div>
                </div>
                <span aria-hidden="true" className="h-px w-12 bg-[#E8A838]" />
              </div>

              <div
                ref={menuRef}
                id={menuId}
                role="menu"
                aria-label={t('selectLanguage')}
                className="grid grid-cols-2 content-start gap-x-8 gap-y-1 px-8 py-7"
              >
                {localeOptions.map((option, index) => {
                  const itemClassName = `group relative flex min-h-[54px] items-center justify-between gap-4 border-b px-1 py-3 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A838] ${
                    option.active
                      ? 'border-[#E8A838]'
                      : 'border-[#DDE3EA] hover:border-[#E8A838]/70'
                  }`;

                  if (option.unavailable) {
                    return (
                      <span
                        key={option.locale}
                        role="menuitem"
                        aria-disabled="true"
                        title={t('unavailable', {language: option.language})}
                        className={`${itemClassName} cursor-not-allowed text-[#1A2535]/25`}
                      >
                        <span className="flex min-w-0 items-start gap-3">
                          <span aria-hidden="true" className="pt-0.5 text-[9px] font-semibold tabular-nums text-[#E8A838]">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[13px] font-semibold leading-5">{option.language}</span>
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
                      className={`${itemClassName} ${
                        option.active
                          ? 'text-[#1A2535]'
                          : 'text-[#1A2535]/80 hover:text-[#1A2535]'
                      }`}
                    >
                      <span className="flex min-w-0 items-start gap-3">
                        <span aria-hidden="true" className="pt-0.5 text-[9px] font-semibold tabular-nums text-[#E8A838]">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[13px] font-semibold leading-5">{option.language}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
