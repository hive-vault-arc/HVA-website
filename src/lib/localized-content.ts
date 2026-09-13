import type {AppLocale} from '@/i18n/config';
import {applyFrenchCmsFallback} from '@/i18n/cms-fallback-fr';

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

export type PublishedCollection<T> = {
  items: T[];
  /**
   * The locale the collection is being rendered under. Links should always
   * use this locale, even when an individual document temporarily falls back
   * to its approved English source.
   */
  sourceLocale: AppLocale;
  hasFallbackContent: boolean;
};

/**
 * Merges approved localized documents into the complete English catalogue.
 *
 * A translated document replaces its English source in place. Any English
 * document without an approved translation remains visible inside the
 * requested locale route. This prevents partially translated catalogues from
 * hiding otherwise published content.
 */
export async function getPublishedCollection<
  T extends LocalizedContentMeta & {slug: string},
>(
  locale: AppLocale,
  fetchByLocale: (targetLocale: AppLocale) => Promise<T[]>,
): Promise<PublishedCollection<T>> {
  if (locale === 'en') {
    return buildPublishedCollection(locale, [], await fetchByLocale('en'));
  }

  if (locale !== 'fr') {
    return {
      items: await fetchByLocale(locale),
      sourceLocale: locale,
      hasFallbackContent: false,
    };
  }

  const [localizedItems, englishItems] = await Promise.all([
    fetchByLocale(locale),
    fetchByLocale('en'),
  ]);

  return buildPublishedCollection(locale, localizedItems, englishItems);
}

export function buildPublishedCollection<
  T extends LocalizedContentMeta & {slug: string},
>(
  locale: AppLocale,
  localizedItems: T[],
  englishItems: T[],
): PublishedCollection<T> {
  if (locale === 'en') {
    return {
      items: englishItems,
      sourceLocale: 'en',
      hasFallbackContent: false,
    };
  }

  const items = mergePublishedItems(localizedItems, englishItems).map((item) =>
    item.language === locale ? item : applyFrenchCmsFallback(item),
  );

  return {
    items,
    sourceLocale: locale,
    hasFallbackContent: items.some((item) => item.language !== locale),
  };
}

export function mergePublishedItems<
  T extends LocalizedContentMeta & {slug: string},
>(localizedItems: T[], englishItems: T[]): T[] {
  const localizedByEnglishSlug = new Map<string, T>();
  const unmatchedLocalizedItems: T[] = [];

  for (const item of localizedItems) {
    const englishSlug = translationSlug(item, 'en');
    if (englishSlug) {
      localizedByEnglishSlug.set(englishSlug, item);
    } else {
      unmatchedLocalizedItems.push(item);
    }
  }

  const merged = englishItems.map(
    (englishItem) =>
      localizedByEnglishSlug.get(englishItem.slug) ??
      localizedItems.find((item) => item.slug === englishItem.slug) ??
      englishItem,
  );
  const representedSlugs = new Set(merged.map((item) => item.slug));

  for (const item of unmatchedLocalizedItems) {
    if (!representedSlugs.has(item.slug)) {
      merged.push(item);
      representedSlugs.add(item.slug);
    }
  }

  for (const item of localizedByEnglishSlug.values()) {
    if (!representedSlugs.has(item.slug)) {
      merged.push(item);
      representedSlugs.add(item.slug);
    }
  }

  return merged;
}

export async function getPublishedDocument<
  T extends LocalizedContentMeta & {slug?: string},
>(
  locale: AppLocale,
  fetchByLocale: (targetLocale: AppLocale) => Promise<T | null>,
): Promise<T | null> {
  const localizedDocument = await fetchByLocale(locale);
  return localizedDocument
    ? withSourceLocale(localizedDocument, locale)
    : null;
}

function withSourceLocale<T extends LocalizedContentMeta>(
  content: T,
  sourceLocale: AppLocale,
): T {
  if (content.language) return content;
  return {
    ...content,
    language: sourceLocale,
    translationStatus: content.translationStatus ?? 'approved',
  };
}

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

  if (content.language) {
    params[content.language] = {[paramName]: currentSlug};
  }

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
  const routes = Object.fromEntries(
    Object.entries(translationParams(content, currentLocale, currentSlug, paramName)).map(
      ([locale, params]) => [
        locale,
        internalTemplate.replace(`[${paramName}]`, params[paramName]),
      ],
    ),
  ) as Partial<Record<AppLocale, string>>;

  return routes;
}
