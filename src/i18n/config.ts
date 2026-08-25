/** Every locale the application understands, including locales awaiting launch. */
export const APP_LOCALES = ['en', 'fr', 'es', 'ar'] as const;

export type AppLocale = (typeof APP_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = 'en';

export type LocaleDirection = 'ltr' | 'rtl';

export type LocaleProfile = {
  direction: LocaleDirection;
  formattingLocale: string;
  openGraphLocale: string;
  label: string;
  prefix: '' | `/${string}`;
};

/**
 * Central locale contract. Public release is deliberately separate from
 * application support so incomplete editorial locales can never leak through
 * navigation, metadata, or fallback content.
 */
export const LOCALE_PROFILES: Record<AppLocale, LocaleProfile> = {
  en: {
    direction: 'ltr',
    formattingLocale: 'en-GB',
    openGraphLocale: 'en_US',
    label: 'English',
    prefix: '',
  },
  fr: {
    direction: 'ltr',
    formattingLocale: 'fr-FR',
    openGraphLocale: 'fr_FR',
    label: 'Français',
    prefix: '/fr',
  },
  es: {
    direction: 'ltr',
    formattingLocale: 'es-ES',
    openGraphLocale: 'es_ES',
    label: 'Español',
    prefix: '/es',
  },
  ar: {
    direction: 'rtl',
    formattingLocale: 'ar-MA',
    openGraphLocale: 'ar_MA',
    label: 'العربية',
    prefix: '/ar',
  },
};

/** Locales cleared for public navigation, metadata, and indexing. */
export const PUBLIC_LOCALES = ['en', 'fr', 'es', 'ar'] as const satisfies readonly AppLocale[];
export type PublicLocale = (typeof PUBLIC_LOCALES)[number];

export function isPublicLocale(value: string | null | undefined): value is PublicLocale {
  return PUBLIC_LOCALES.includes(value as PublicLocale);
}

export function localeProfile(locale: AppLocale): LocaleProfile {
  return LOCALE_PROFILES[locale];
}

export function isAppLocale(value: string | null | undefined): value is AppLocale {
  return APP_LOCALES.includes(value as AppLocale);
}

export function assertAppLocale(value: string): asserts value is AppLocale {
  if (!isAppLocale(value)) {
    throw new Error(`Unsupported locale: ${value}`);
  }
}
