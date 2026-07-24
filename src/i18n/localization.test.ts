import {describe, expect, it} from 'vitest';
import en from '../../messages/en.json';
import fr from '../../messages/fr.json';
import {APP_LOCALES, isAppLocale} from './config';
import {
  ROUTE_MANIFEST,
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
  it('keeps identical English and French key topology', () => {
    expect(leafShape(fr)).toEqual(leafShape(en));
  });

  it('contains no empty localized values', () => {
    expect(stringLeaves(en).filter((value) => value.trim().length === 0)).toEqual([]);
    expect(stringLeaves(fr).filter((value) => value.trim().length === 0)).toEqual([]);
  });

  it('keeps ICU variable names aligned in both locales', () => {
    const english = new Map(stringEntries(en));
    const french = new Map(stringEntries(fr));

    for (const [path, value] of english) {
      expect(variables(french.get(path) ?? ''), path).toEqual(variables(value));
    }
  });
});

describe('localized routes', () => {
  it('accepts only the launched locales', () => {
    expect(APP_LOCALES).toEqual(['en', 'fr']);
    expect(isAppLocale('en')).toBe(true);
    expect(isAppLocale('fr')).toBe(true);
    expect(isAppLocale('ar')).toBe(false);
    expect(isAppLocale('es')).toBe(false);
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

  it('keeps every indexable manifest route out of paused locale prefixes', () => {
    for (const route of Object.values(ROUTE_MANIFEST).filter((item) => item.indexable)) {
      for (const locale of APP_LOCALES) {
        const path = localizedPath(route.pathname, locale);
        expect(/^\/ar(?:\/|$)/.test(path)).toBe(false);
        expect(/^\/es(?:\/|$)/.test(path)).toBe(false);
        expect(/^\/en(?:\/|$)/.test(path)).toBe(false);
      }
    }
  });
});

describe('published localized collections', () => {
  type TestPublication = {
    slug: string;
    title?: string;
    summary?: string;
    seo?: {title?: string; description?: string};
    language: 'en' | 'fr';
    translationTargets?: Array<{
      language: 'en' | 'fr';
      translationStatus: 'approved';
      slug: string;
    }>;
  };

  it('uses published French items when they exist', async () => {
    const fetchByLocale = async (
      locale: 'en' | 'fr',
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
      locale: 'en' | 'fr',
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

  it('replaces translated documents without hiding untranslated siblings', async () => {
    const fetchByLocale = async (
      locale: 'en' | 'fr',
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
      locale: 'en' | 'fr',
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

  it('starts French and English detail lookups together', async () => {
    let englishStarted = false;
    let releaseFrench: (() => void) | undefined;
    const frenchGate = new Promise<void>((resolve) => {
      releaseFrench = resolve;
    });

    const request = getPublishedDocument<TestPublication>('fr', async (locale) => {
      if (locale === 'en') {
        englishStarted = true;
        return {
          slug: 'fix-the-workflow-before-ai',
          language: 'en',
          title: 'Fix the Workflow Before You Add AI',
        };
      }

      await frenchGate;
      return null;
    });

    await Promise.resolve();
    expect(englishStarted).toBe(true);
    releaseFrench?.();

    await expect(request).resolves.toEqual(
      expect.objectContaining({
        title: 'Corrigez le flux de travail avant d’ajouter l’IA',
      }),
    );
  });
});
