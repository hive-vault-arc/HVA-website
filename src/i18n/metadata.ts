import {getTranslations} from 'next-intl/server';
import type {AppLocale} from './config';
import {ROUTE_MANIFEST, type RouteKey} from './route-manifest';
import {buildLocalizedPageMetadata} from '@/lib/seo';

export async function buildStaticRouteMetadata(
  locale: AppLocale,
  routeKey: RouteKey,
  keywords?: string[],
) {
  const t = await getTranslations({locale, namespace: `Metadata.pages.${routeKey}`});
  const route = ROUTE_MANIFEST[routeKey];

  return buildLocalizedPageMetadata({
    locale,
    pathname: route.pathname,
    title: t('title'),
    description: t('description'),
    keywords,
  });
}
