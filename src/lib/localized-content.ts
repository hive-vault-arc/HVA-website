import type {AppLocale} from '@/i18n/config';

export type TranslationStatus = 'draft' | 'inReview' | 'approved';

export type PublishedTranslationTarget = {
  language: AppLocale;
  translationStatus: 'approved';
  slug: string;
};

export type LocalizedContentMeta = {
  _id?: string;
  language?: AppLocale;
  translationStatus?: TranslationStatus;
  translationTargets?: PublishedTranslationTarget[];
};

export function localeTag(base: string, locale: AppLocale): string {
  return `${base}:${locale}`;
}

export function translationSlug(
  content: LocalizedContentMeta,
  locale: AppLocale,
): string | undefined {
  return content.translationTargets?.find(
    (target) =>
      target &&
      target.language === locale &&
      target.translationStatus === 'approved',
  )?.slug;
}

export function translationParams(
  content: LocalizedContentMeta,
  currentLocale: AppLocale,
  currentSlug: string,
  paramName = 'slug',
): Partial<Record<AppLocale, Record<string, string>>> {
  const params: Partial<Record<AppLocale, Record<string, string>>> = {
    [currentLocale]: {[paramName]: currentSlug},
  };

  for (const target of content.translationTargets ?? []) {
    if (
      target &&
      target.translationStatus === 'approved' &&
      target.language &&
      target.slug
    ) {
      params[target.language] = {[paramName]: target.slug};
    }
  }

  return params;
}

export function translationRoutes(
  content: LocalizedContentMeta,
  currentLocale: AppLocale,
  currentSlug: string,
  internalTemplate: string,
  paramName = 'slug',
): Partial<Record<AppLocale, string>> {
  return Object.fromEntries(
    Object.entries(translationParams(content, currentLocale, currentSlug, paramName)).map(
      ([locale, params]) => [
        locale,
        internalTemplate.replace(`[${paramName}]`, params[paramName]),
      ],
    ),
  ) as Partial<Record<AppLocale, string>>;
}
