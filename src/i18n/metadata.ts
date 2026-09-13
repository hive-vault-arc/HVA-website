import {getTranslations} from 'next-intl/server';
import type {AppLocale} from './config';
import {ROUTE_MANIFEST, type RouteKey} from './route-manifest';
import {buildLocalizedPageMetadata} from '@/lib/seo';
import {getPageOptimization} from '@/lib/page-optimization';

export async function buildStaticRouteMetadata(
  locale: AppLocale,
  routeKey: RouteKey,
  keywords?: string[],
) {
  const [t, optimization] = await Promise.all([
    getTranslations({locale, namespace: `Metadata.pages.${routeKey}`}),
    getPageOptimization(routeKey, locale),
  ]);
  const route = ROUTE_MANIFEST[routeKey];

  return buildLocalizedPageMetadata({
    locale,
    pathname: route.pathname,
    title: optimization?.title || t('title'),
    description: optimization?.description || t('description'),
    keywords,
    noIndex: optimization?.noIndex,
    socialImageUrl: optimization?.socialImageUrl,
    socialImageAlt: optimization?.socialImageAlt,
  });
}
