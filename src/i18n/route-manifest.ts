import {LOCALE_PROFILES, PUBLIC_LOCALES, type AppLocale} from './config';
import {routing, type AppPathname} from './routing';

export type RouteKey =
  | 'home'
  | 'arc'
  | 'capabilities'
  | 'capabilitiesDetail'
  | 'capabilitiesPrograms'
  | 'industries'
  | 'about'
  | 'portfolio'
  | 'insights'
  | 'blog'
  | 'caseStudies'
  | 'news'
  | 'perspectives'
  | 'research'
  | 'contact'
  | 'privacy'
  | 'cookiePolicy'
  | 'legal'
  | 'links'
  | 'aiAgentsTangier'
  | 'aiAgentsMorocco'
  | 'itConsultingTangier'
  | 'customSoftwareMorocco'
  | 'digitalServicesTangier';

export const ROUTE_MANIFEST: Record<
  RouteKey,
  {
    pathname: AppPathname;
    static: boolean;
    indexable: boolean;
  }
> = {
  home: {pathname: '/', static: true, indexable: true},
  arc: {pathname: '/arc', static: true, indexable: true},
  capabilities: {pathname: '/capabilities', static: false, indexable: true},
  capabilitiesDetail: {pathname: '/capabilities/in-detail', static: true, indexable: true},
  capabilitiesPrograms: {
    pathname: '/capabilities/solution-programs',
    static: true,
    indexable: true,
  },
  industries: {pathname: '/industries', static: true, indexable: true},
  about: {pathname: '/aboutus', static: false, indexable: true},
  portfolio: {pathname: '/whoarewe/portfolio', static: true, indexable: true},
  insights: {pathname: '/insights', static: false, indexable: true},
  blog: {pathname: '/blog', static: false, indexable: true},
  caseStudies: {pathname: '/case-studies', static: false, indexable: true},
  news: {pathname: '/insights/news-articles', static: false, indexable: true},
  perspectives: {pathname: '/insights/perspectives', static: false, indexable: true},
  research: {pathname: '/insights/research-reports', static: false, indexable: true},
  contact: {pathname: '/contact', static: true, indexable: true},
  privacy: {pathname: '/privacy-policy', static: true, indexable: true},
  cookiePolicy: {pathname: '/cookie-policy', static: true, indexable: true},
  legal: {pathname: '/mentions-legales', static: true, indexable: true},
  links: {pathname: '/links', static: true, indexable: false},
  aiAgentsTangier: {pathname: '/ai-agents-tangier', static: true, indexable: true},
  aiAgentsMorocco: {pathname: '/ai-agents-morocco', static: true, indexable: true},
  itConsultingTangier: {pathname: '/it-consulting-tangier', static: true, indexable: true},
  customSoftwareMorocco: {
    pathname: '/custom-software-morocco',
    static: true,
    indexable: true,
  },
  digitalServicesTangier: {
    pathname: '/digital-services-tangier',
    static: true,
    indexable: true,
  },
};

export const STATIC_ROUTE_KEYS = Object.entries(ROUTE_MANIFEST)
  .filter(([, route]) => route.static)
  .map(([key]) => key as RouteKey);

export function localePrefix(locale: AppLocale): '' | `/${string}` {
  return LOCALE_PROFILES[locale].prefix;
}

export function localizedPath(
  pathname: AppPathname,
  locale: AppLocale,
  params: Record<string, string | number> = {},
): string {
  const configured = routing.pathnames[pathname];
  const template: string =
    typeof configured === 'string'
      ? configured
      : configured[locale];

  let resolved = template;
  for (const [key, value] of Object.entries(params)) {
    resolved = resolved.replace(`[${key}]`, encodeURIComponent(String(value)));
  }

  return `${localePrefix(locale)}${resolved === '/' ? '' : resolved}` || '/';
}

type MatchedRoute = {
  pathname: AppPathname;
  params: Record<string, string>;
};

const englishRouteMatchers = (Object.keys(routing.pathnames) as AppPathname[])
  .map((pathname) => {
    const configured = routing.pathnames[pathname];
    const template = typeof configured === 'string' ? configured : configured.en;
    const paramNames = [...template.matchAll(/\[([^\]]+)\]/g)].map((match) => match[1]);
    const pattern = new RegExp(
      `^${template.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\[([^\]]+)\\\]/g, '([^/]+)')}$`,
    );

    return {pathname, template, paramNames, pattern};
  })
  .sort((a, b) => b.template.length - a.template.length);

function matchEnglishRoute(path: string): MatchedRoute | undefined {
  for (const route of englishRouteMatchers) {
    const match = route.pattern.exec(path);
    if (!match) continue;

    return {
      pathname: route.pathname,
      params: Object.fromEntries(
        route.paramNames.map((name, index) => [
          name,
          decodeURIComponent(match[index + 1]),
        ]),
      ),
    };
  }

  return undefined;
}

export function localizeHref(href: string, locale: AppLocale): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;

  const suffixIndex = [...['?', '#']]
    .map((token) => href.indexOf(token))
    .filter((index) => index >= 0)
    .reduce((lowest, index) => Math.min(lowest, index), href.length);
  const path = href.slice(0, suffixIndex) || '/';
  const suffix = href.slice(suffixIndex);
  const match = matchEnglishRoute(path);

  return match
    ? `${localizedPath(match.pathname, locale, match.params)}${suffix}`
    : href;
}

/**
 * next-intl preserves encoded dynamic segments when proxy URL normalization is
 * disabled. Decode once before using a segment as a Sanity lookup key so
 * Arabic slugs resolve identically in metadata and the page render.
 */
export function decodeRouteParam(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function localizedAlternates(
  pathname: AppPathname,
  paramsByLocale: Partial<Record<AppLocale, Record<string, string | number>>> = {},
): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of PUBLIC_LOCALES) {
    const params = paramsByLocale[locale];
    if (pathname.includes('[') && !params) continue;
    languages[locale] = localizedPath(pathname, locale, params);
  }

  if (languages.en) languages['x-default'] = languages.en;
  return languages;
}
