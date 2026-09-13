import {describe, expect, it} from 'vitest';
import en from '../../messages/en.json';
import fr from '../../messages/fr.json';
import es from '../../messages/es.json';
import ar from '../../messages/ar.json';
import {
  APP_LOCALES,
  LOCALE_PROFILES,
  PUBLIC_LOCALES,
  isAppLocale,
  isPublicLocale,
  type AppLocale,
} from './config';
import {applyFrenchCmsFallback} from './cms-fallback-fr';
import {
  ROUTE_MANIFEST,
  decodeRouteParam,
  localizedAlternates,
  localizedPath,
  localizeHref,
} from './route-manifest';
import {routing, type AppPathname} from './routing';
import {
  getPublishedCollection,
  getPublishedDocument,
  translationParams,
  translationRoutes,
} from '@/lib/localized-content';

function leafShape(value: unknown, path = ''): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => leafShape(item, `${path}[${index}]`));
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) =>
      leafShape(child, path ? `${path}.${key}` : key),
    );
  }
  return [`${path}:${typeof value}`];
}

function stringLeaves(value: unknown): string[] {
  if (Array.isArray(value)) return value.flatMap(stringLeaves);
  if (value && typeof value === 'object') {
    return Object.values(value).flatMap(stringLeaves);
  }
  return typeof value === 'string' ? [value] : [];
}

function variables(value: string): string[] {
  return [...value.matchAll(/\{([A-Za-z][A-Za-z0-9_]*)\}/g)]
    .map((match) => match[1])
    .sort();
}

function stringEntries(value: unknown, path = ''): Array<[string, string]> {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => stringEntries(item, `${path}[${index}]`));
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) =>
      stringEntries(child, path ? `${path}.${key}` : key),
    );
  }
  return typeof value === 'string' ? [[path, value]] : [];
}

describe('localization catalogs', () => {
  it('uses complete native locale labels in every catalog', () => {
    const expected = {
      en: 'English',
      fr: 'Français',
      es: 'Español',
      ar: 'العربية',
    };

    for (const catalog of [en, fr, es, ar]) {
      expect(catalog.Locale.languages).toEqual(expected);
      expect(catalog.Locale.eyebrow).toBeTruthy();
    }
  });

  it('does not carry the French fallback notice into Spanish or Arabic', () => {
    expect(JSON.stringify(es)).not.toContain('ediciones francesas');
    expect(JSON.stringify(ar)).not.toContain('الطبعات الفرنسية');
  });

  it.each([
    ['French', fr],
    ['Spanish', es],
    ['Arabic', ar],
  ] as const)('keeps identical English and %s key topology', (_name, catalog) => {
    expect(leafShape(catalog)).toEqual(leafShape(en));
  });

  it('contains no empty localized values', () => {
    expect(stringLeaves(en).filter((value) => value.trim().length === 0)).toEqual([]);
    expect(stringLeaves(fr).filter((value) => value.trim().length === 0)).toEqual([]);
    expect(stringLeaves(es).filter((value) => value.trim().length === 0)).toEqual([]);
    expect(stringLeaves(ar).filter((value) => value.trim().length === 0)).toEqual([]);
  });

  it.each([
    ['French', fr],
    ['Spanish', es],
    ['Arabic', ar],
  ] as const)('keeps ICU variable names aligned in %s', (_name, catalog) => {
    const english = new Map(stringEntries(en));

    for (const [path, value] of english) {
      expect(variables(new Map(stringEntries(catalog)).get(path) ?? ''), path).toEqual(variables(value));
    }
  });
});

describe('French CMS presentation fallback', () => {
  it('localizes approved outcome copy while preserving the CMS-owned value', () => {
    const result = applyFrenchCmsFallback({
      slug: 'top-tier-crm-transformation-program-real-estate-operations',
      publishedOutcomes: [
        {
          _key: 'lead-response',
          value: '41%',
          label: 'English label',
          context: 'English context',
        },
      ],
    });

    expect(result.publishedOutcomes).toEqual([
      {
        _key: 'lead-response',
        value: '41%',
        label: 'Réponse aux leads plus rapide',
        context:
          'Le délai de réponse s’est amélioré après la centralisation de la réception et du suivi des leads.',
      },
    ]);
  });
});

describe('localized routes', () => {
  it('publishes every supported reviewed locale', () => {
    expect(APP_LOCALES).toEqual(['en', 'fr', 'es', 'ar']);
    expect(PUBLIC_LOCALES).toEqual(['en', 'fr', 'es', 'ar']);
    expect(isAppLocale('en')).toBe(true);
    expect(isAppLocale('fr')).toBe(true);
    expect(isAppLocale('ar')).toBe(true);
    expect(isAppLocale('es')).toBe(true);
    expect(isPublicLocale('ar')).toBe(true);
    expect(isPublicLocale('es')).toBe(true);
  });

  it('defines ES and AR route and direction profiles', () => {
    expect(LOCALE_PROFILES.es).toMatchObject({prefix: '/es', direction: 'ltr'});
    expect(LOCALE_PROFILES.ar).toMatchObject({prefix: '/ar', direction: 'rtl'});
  });

  it.each(APP_LOCALES)('has no route collisions for %s', (locale) => {
    const paths = (Object.keys(routing.pathnames) as AppPathname[]).map((pathname) =>
      localizedPath(pathname, locale),
    );
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('preserves English URLs and translates French static URLs', () => {
    expect(localizedPath('/', 'en')).toBe('/');
    expect(localizedPath('/capabilities', 'en')).toBe('/capabilities');
    expect(localizedPath('/capabilities', 'fr')).toBe('/fr/expertises');
    expect(localizedPath('/insights/research-reports', 'fr')).toBe(
      '/fr/publications/rapports-de-recherche',
    );
    expect(localizedPath('/capabilities', 'es')).toBe('/es/capacidades');
    expect(localizedPath('/capabilities', 'ar')).toBe('/ar/القدرات');
  });

  it('localizes string links, dynamic parameters, queries, and fragments', () => {
    expect(localizeHref('/capabilities/technology-consulting', 'fr')).toBe(
      '/fr/expertises/technology-consulting',
    );
    expect(localizeHref('/capabilities/in-detail#pillar-x', 'fr')).toBe(
      '/fr/expertises/en-detail#pillar-x',
    );
    expect(localizeHref('/industries#real-estate', 'fr')).toBe(
      '/fr/secteurs#real-estate',
    );
    expect(
      localizeHref('/aboutus/our-people/jane?source=x#bio', 'fr'),
    ).toBe('/fr/qui-sommes-nous/equipe/jane?source=x#bio');
    expect(localizeHref('/capabilities?source=x', 'en')).toBe(
      '/capabilities?source=x',
    );
    expect(localizeHref('https://example.com', 'fr')).toBe(
      'https://example.com',
    );
  });

  it('emits reciprocal static alternates with English x-default', () => {
    expect(localizedAlternates('/industries')).toEqual({
      en: '/industries',
      fr: '/fr/secteurs',
      es: '/es/sectores',
      ar: '/ar/القطاعات',
      'x-default': '/industries',
    });
  });

  it('does not advertise a missing dynamic translation', () => {
    const content = {translationTargets: []};
    expect(translationParams(content, 'en', 'english-slug')).toEqual({
      en: {slug: 'english-slug'},
    });
    expect(translationRoutes(content, 'en', 'english-slug', '/blog/[slug]')).toEqual({
      en: '/blog/english-slug',
    });
  });

  it('advertises only approved dynamic translation targets', () => {
    const content = {
      translationTargets: [
        {language: 'fr' as const, translationStatus: 'approved' as const, slug: 'titre-francais'},
      ],
    };
    expect(translationParams(content, 'en', 'english-title')).toEqual({
      en: {slug: 'english-title'},
      fr: {slug: 'titre-francais'},
    });
  });

  it('keeps English unprefixed and publishes localized indexable routes', () => {
    for (const route of Object.values(ROUTE_MANIFEST).filter((item) => item.indexable)) {
      for (const locale of PUBLIC_LOCALES) {
        const path = localizedPath(route.pathname, locale);
        if (locale === 'en') expect(/^\/en(?:\/|$)/.test(path)).toBe(false);
        if (locale === 'es') expect(/^\/es(?:\/|$)/.test(path)).toBe(true);
        if (locale === 'ar') expect(/^\/ar(?:\/|$)/.test(path)).toBe(true);
      }
    }
  });

  it('decodes encoded non-Latin dynamic parameters before content lookup', () => {
    const arabicSlug = 'لماذا-يجب-على-الشركات-دمج-وكلاء-الذكاء-الاصطناعي-2025';
    expect(decodeRouteParam(encodeURIComponent(arabicSlug))).toBe(arabicSlug);
    expect(decodeRouteParam('%E0%A4%A')).toBe('%E0%A4%A');
  });

  it('includes every public locale in static alternate links', () => {
    expect(localizedAlternates('/capabilities')).toEqual({
      en: '/capabilities',
      fr: '/fr/expertises',
      es: '/es/capacidades',
      ar: '/ar/القدرات',
      'x-default': '/capabilities',
    });
  });
});

describe('published localized collections', () => {
  type TestPublication = {
    slug: string;
    title?: string;
    summary?: string;
    seo?: {title?: string; description?: string};
    language: AppLocale;
    translationTargets?: Array<{
      language: AppLocale;
      translationStatus: 'approved';
      slug: string;
    }>;
  };

  it('uses published French items when they exist', async () => {
    const fetchByLocale = async (
      locale: AppLocale,
    ): Promise<TestPublication[]> =>
      locale === 'fr'
        ? [
            {
              slug: 'publication-francaise',
              language: 'fr' as const,
              translationTargets: [
                {
                  language: 'en' as const,
                  translationStatus: 'approved' as const,
                  slug: 'english-publication',
                },
              ],
            },
          ]
        : [{slug: 'english-publication', language: 'en' as const}];

    await expect(getPublishedCollection('fr', fetchByLocale)).resolves.toEqual({
      items: [
        {
          slug: 'publication-francaise',
          language: 'fr',
          translationTargets: [
            {
              language: 'en',
              translationStatus: 'approved',
              slug: 'english-publication',
            },
          ],
        },
      ],
      sourceLocale: 'fr',
      hasFallbackContent: false,
    });
  });

  it('keeps English items inside the French route when translations are pending', async () => {
    const fetchByLocale = async (
      locale: AppLocale,
    ): Promise<TestPublication[]> =>
      locale === 'en'
        ? [{slug: 'english-publication', language: 'en' as const}]
        : [];

    await expect(getPublishedCollection('fr', fetchByLocale)).resolves.toEqual({
      items: [{slug: 'english-publication', language: 'en'}],
      sourceLocale: 'fr',
      hasFallbackContent: true,
    });
  });

  it.each(['es', 'ar'] as const)('never falls back to English content for paused %s', async (locale) => {
    const fetchByLocale = async (requestedLocale: AppLocale): Promise<TestPublication[]> =>
      requestedLocale === 'en'
        ? [{slug: 'english-only', language: 'en'}]
        : [];

    await expect(getPublishedCollection(locale, fetchByLocale)).resolves.toEqual({
      items: [],
      sourceLocale: locale,
      hasFallbackContent: false,
    });

    await expect(
      getPublishedDocument(locale, async (requestedLocale) =>
        requestedLocale === 'en' ? {slug: 'english-only', language: 'en'} : null,
      ),
    ).resolves.toBeNull();
  });

  it('replaces translated documents without hiding untranslated siblings', async () => {
    const fetchByLocale = async (
      locale: AppLocale,
    ): Promise<TestPublication[]> =>
      locale === 'fr'
        ? [
            {
              slug: 'premiere-publication',
              language: 'fr' as const,
              translationTargets: [
                {
                  language: 'en' as const,
                  translationStatus: 'approved' as const,
                  slug: 'first-publication',
                },
              ],
            },
          ]
        : [
            {slug: 'first-publication', language: 'en' as const},
            {slug: 'second-publication', language: 'en' as const},
          ];

    await expect(getPublishedCollection('fr', fetchByLocale)).resolves.toEqual({
      items: [
        expect.objectContaining({slug: 'premiere-publication', language: 'fr'}),
        {slug: 'second-publication', language: 'en'},
      ],
      sourceLocale: 'fr',
      hasFallbackContent: true,
    });
  });

  it('presents pending CMS titles in French without changing their source language', async () => {
    const fetchByLocale = async (
      locale: AppLocale,
    ): Promise<TestPublication[]> =>
      locale === 'en'
        ? [
            {
              slug: 'fix-the-workflow-before-ai',
              language: 'en',
              title: 'Fix the Workflow Before You Add AI',
              summary: 'English summary',
              seo: {
                title: 'Fix the Workflow Before You Add AI',
                description: 'English metadata description',
              },
            },
          ]
        : [];

    const collection = await getPublishedCollection('fr', fetchByLocale);

    expect(collection.items[0]).toEqual(
      expect.objectContaining({
        language: 'en',
        title: 'Corrigez le flux de travail avant d’ajouter l’IA',
        summary:
          'Le point de vue de Hive Vault Arc sur les raisons de diagnostiquer les processus, les données, les responsabilités et les indicateurs avant de déployer des agents IA.',
        seo: {
          title: 'Corrigez le flux de travail avant d’ajouter l’IA',
          description:
            'Le point de vue de Hive Vault Arc sur les raisons de diagnostiquer les processus, les données, les responsabilités et les indicateurs avant de déployer des agents IA.',
        },
      }),
    );
  });

  it('never publishes an English document at a French detail URL', async () => {
    const requestedLocales: AppLocale[] = [];

    await expect(
      getPublishedDocument<TestPublication>('fr', async (locale) => {
        requestedLocales.push(locale);
        return locale === 'en'
          ? {
              slug: 'fix-the-workflow-before-ai',
              language: 'en',
              title: 'Fix the Workflow Before You Add AI',
            }
          : null;
      }),
    ).resolves.toBeNull();

    expect(requestedLocales).toEqual(['fr']);
  });
});
