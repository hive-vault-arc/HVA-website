import type {AppLocale} from '@/i18n/config';
import {ROUTE_MANIFEST, localizedPath, type RouteKey} from '@/i18n/route-manifest';
import type {EditorialContentFields} from '@/lib/editorial-taxonomy';
import {sanityFetch, withSanityFallback} from '@/sanity/lib/fetch';
import {urlForImage} from '@/sanity/lib/image';
import {
  noindexedPageOptimizationsQuery,
  pageOptimizationQuery,
  pageOptimizationsForLocaleQuery,
} from '@/sanity/queries/site';
import type {
  NoindexedPageOptimizationsQueryResult,
  PageOptimizationQueryResult,
  PageOptimizationsForLocaleQueryResult,
} from '@/sanity/sanity.types';

export type PageOptimization = EditorialContentFields & {
  title?: string;
  description?: string;
  noIndex: boolean;
  socialImageUrl?: string;
  socialImageAlt?: string;
};

export type RoutedPageOptimization = Pick<
  PageOptimization,
  'answerQuestion' | 'directAnswer' | 'keyTakeaways' | 'answerEvidence' | 'methodology' | 'limitations'
> & {
  pathname: string;
};

function isRouteKey(value: string): value is RouteKey {
  return value in ROUTE_MANIFEST;
}

export async function getPageOptimization(
  routeKey: RouteKey,
  locale: AppLocale,
): Promise<PageOptimization | null> {
  return withSanityFallback(
    async () => {
      const document = await sanityFetch<PageOptimizationQueryResult>({
        query: pageOptimizationQuery,
        params: {routeKey, locale},
        tags: ['pageOptimizations', `pageOptimizations:${locale}`, `pageOptimization:${routeKey}:${locale}`],
      });
      if (!document?.seo) return null;

      const socialImageUrl = document.seo.socialImage?.asset
        ? urlForImage(document.seo.socialImage).width(1200).height(630).fit('crop').format('webp').url()
        : undefined;

      return {
        title: document.seo.title ?? undefined,
        description: document.seo.description ?? undefined,
        noIndex: document.seo.noIndex === true,
        socialImageUrl,
        socialImageAlt: document.seo.socialImageAlt ?? undefined,
      };
    },
    () => null,
    `page optimization ${routeKey}:${locale}`,
  );
}

export async function getPageOptimizationsForLocale(
  locale: AppLocale,
): Promise<RoutedPageOptimization[]> {
  return withSanityFallback(
    async () => {
      const documents = await sanityFetch<PageOptimizationsForLocaleQueryResult>({
        query: pageOptimizationsForLocaleQuery,
        params: {locale},
        tags: ['pageOptimizations', `pageOptimizations:${locale}`],
      });

      return documents.flatMap((document) => {
        if (!isRouteKey(document.routeKey)) return [];

        return [{
          pathname: localizedPath(ROUTE_MANIFEST[document.routeKey].pathname, locale),
          answerQuestion: document.answerQuestion ?? undefined,
          directAnswer: document.directAnswer ?? undefined,
          keyTakeaways: document.keyTakeaways ?? undefined,
          answerEvidence: document.answerEvidence?.flatMap((evidence) =>
            evidence.label && evidence.url
              ? [{
                  label: evidence.label,
                  url: evidence.url,
                  claimIds: evidence.claimIds ?? undefined,
                }]
              : [],
          ),
          methodology: document.methodology ?? undefined,
          limitations: document.limitations ?? undefined,
        }];
      });
    },
    () => [],
    `page optimizations ${locale}`,
  );
}

export async function getNoindexedPageOptimizationKeys(): Promise<Set<string>> {
  return withSanityFallback(
    async () => {
      const rows = await sanityFetch<NoindexedPageOptimizationsQueryResult>({
        query: noindexedPageOptimizationsQuery,
        tags: ['pageOptimizations'],
      });
      return new Set(rows.map((row) => row.key));
    },
    () => new Set<string>(),
    'noindexed page optimizations',
  );
}
