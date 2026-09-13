import {describe, expect, it} from 'vitest';
import {
  CONTENT_LOCALES,
  DOCUMENT_ROUTE_TEMPLATES,
  PAGE_ROUTE_TEMPLATES,
  routeForDocument,
  routeForPage,
} from '../../studio/content-route-contract';
import {PUBLIC_LOCALES} from './config';
import {ROUTE_MANIFEST, localizedPath, type RouteKey} from './route-manifest';

const dynamicPathnames = {
  employeeProfile: {pathname: '/aboutus/our-people/[employee]', param: 'employee'},
  caseStudy: {pathname: '/case-studies/[slug]', param: 'slug'},
  capability: {pathname: '/capabilities/[slug]', param: 'slug'},
  post: {pathname: '/blog/[slug]', param: 'slug'},
  newsArticle: {pathname: '/insights/news-articles/[slug]', param: 'slug'},
  perspective: {pathname: '/insights/perspectives/[slug]', param: 'slug'},
  researchReport: {pathname: '/insights/research-reports/[slug]', param: 'slug'},
} as const;

describe('Studio content route contract', () => {
  it('uses the same locale registry as the public frontend', () => {
    expect(CONTENT_LOCALES.map(({id}) => id)).toEqual([...PUBLIC_LOCALES]);
  });

  it('matches every frontend page route', () => {
    for (const routeKey of Object.keys(PAGE_ROUTE_TEMPLATES) as RouteKey[]) {
      for (const locale of PUBLIC_LOCALES) {
        expect(routeForPage(routeKey, locale)).toBe(
          localizedPath(ROUTE_MANIFEST[routeKey].pathname, locale),
        );
      }
    }
  });

  it('matches every localized dynamic route, including Unicode slugs', () => {
    for (const type of Object.keys(DOCUMENT_ROUTE_TEMPLATES) as Array<keyof typeof dynamicPathnames>) {
      const config = dynamicPathnames[type];
      for (const locale of PUBLIC_LOCALES) {
        const slug = locale === 'ar' ? 'اختبار-المسار' : 'route-test';
        expect(routeForDocument(type, locale, slug)).toBe(
          localizedPath(config.pathname, locale, {[config.param]: slug}),
        );
      }
    }
  });
});
