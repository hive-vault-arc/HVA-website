export const APP_LOCALES = ['en', 'fr'] as const;

export type AppLocale = (typeof APP_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = 'en';

export function isAppLocale(value: string | null | undefined): value is AppLocale {
  return APP_LOCALES.includes(value as AppLocale);
}

export function assertAppLocale(value: string): asserts value is AppLocale {
  if (!isAppLocale(value)) {
    throw new Error(`Unsupported locale: ${value}`);
  }
}
