import {beforeEach, describe, expect, it, vi} from 'vitest';

const fetchMock = vi.hoisted(() => vi.fn());
vi.mock('../sanity/lib/fetch', () => ({sanityFetch: fetchMock, withSanityFallback: vi.fn()}));

import {getAllSanityCaseStudies, getSanityCaseStudyBySlug, getSanityPortfolioCaseStudies} from './sanity-content';

const localizedCase = {
  slug: 'multilingual-whatsapp-ai-agent',
  language: 'fr',
  title: 'Titre publié en français',
  summary: 'Résumé publié en français.',
  deploymentStatus: 'En production',
  seo: {title: 'Titre SEO publié', description: 'Description SEO publiée', noIndex: false},
  clientName: 'Atlas Property Group',
  industry: 'Immobilier',
  engagementType: 'customSoftware',
  problem: 'Problème publié',
  systemArchitecture: 'Architecture publiée',
  operationalModules: [],
  integrations: [],
  headlineMetrics: [],
  publishedOutcomes: [],
  projectMedia: [],
  assets: {coverAlt: 'Description française du visuel'},
};

describe('localized case-study content with a local cover fallback', () => {
  beforeEach(() => fetchMock.mockReset());

  it('keeps CMS detail copy and SEO fields when the cover image falls back locally', async () => {
    fetchMock.mockResolvedValue(localizedCase);
    const study = await getSanityCaseStudyBySlug(localizedCase.slug, 'fr');
    expect(study).toMatchObject({
      title: localizedCase.title,
      summary: localizedCase.summary,
      deploymentStatus: localizedCase.deploymentStatus,
      coverDisclosure: 'Reconstitution illustrative du flux de travail.',
      seo: localizedCase.seo,
      assets: {coverAlt: localizedCase.assets.coverAlt},
    });
    expect(study?.assets.coverImage).toContain('immoworld-whatsapp-ai-french-dutch-phone-pair.webp');
  });

  it('keeps CMS copy on collection and portfolio summaries too', async () => {
    fetchMock.mockResolvedValueOnce([localizedCase]).mockResolvedValueOnce([localizedCase]);
    const [collection, portfolio] = await Promise.all([
      getAllSanityCaseStudies('fr'),
      getSanityPortfolioCaseStudies('fr'),
    ]);
    for (const study of [collection[0], portfolio[0]]) {
      expect(study.title).toBe(localizedCase.title);
      expect(study.summary).toBe(localizedCase.summary);
    }
  });
});
