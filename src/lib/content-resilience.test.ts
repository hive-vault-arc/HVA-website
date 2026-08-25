import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest'

const sanityMocks = vi.hoisted(() => ({
  getAllSanityPosts: vi.fn(async () => {
    throw new TypeError('fetch failed')
  }),
  getSanityPostBySlug: vi.fn(async () => {
    throw new TypeError('fetch failed')
  }),
  getAllSanityCaseStudies: vi.fn(async () => {
    throw new TypeError('fetch failed')
  }),
  getSanityClientEvidenceShowcase: vi.fn(async () => {
    throw new TypeError('fetch failed')
  }),
  getSanityHomeCaseStudyProof: vi.fn(async () => {
    throw new TypeError('fetch failed')
  }),
  getSanityCaseStudyBySlug: vi.fn(async () => {
    throw new TypeError('fetch failed')
  }),
}))

vi.mock('./sanity-content', () => sanityMocks)

import {POSTS, getAllPosts} from './blog'
import {
  CASE_STUDIES,
  getAllCaseStudies,
  getCaseStudyBySlug,
  getClientEvidenceShowcase,
  getPublishedHomeCaseStudyProof,
} from './proof'
import type {CaseStudy, ClientEvidenceSummary} from './proof'

describe('local content resilience', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('keeps the English homepage populated when Sanity is unreachable', async () => {
    const [posts, caseStudies, evidence] = await Promise.all([
      getAllPosts('en'),
      getAllCaseStudies('en'),
      getClientEvidenceShowcase('en'),
    ])

    expect(posts).toEqual(POSTS)
    expect(caseStudies).toEqual(CASE_STUDIES)
    expect(evidence).toEqual([])
  })

  it('leaves localized collections empty so the English fallback can be merged', async () => {
    await expect(getAllPosts('fr')).resolves.toEqual([])
    await expect(getAllCaseStudies('fr')).resolves.toEqual([])
    await expect(getClientEvidenceShowcase('fr')).resolves.toEqual([])
  })

  it('returns the complete homepage proof fallback from one resilient boundary', async () => {
    await expect(getPublishedHomeCaseStudyProof('en')).resolves.toEqual({
      caseStudies: {
        items: CASE_STUDIES,
        sourceLocale: 'en',
        hasFallbackContent: false,
      },
      clientEvidence: [],
    })
  })

  it.each(['es', 'ar'] as const)(
    'keeps an original signed proof on %s home while linking to its localized case study',
    async (locale) => {
      const englishStudy = CASE_STUDIES[0]
      const localizedStudy: CaseStudy = {
        ...englishStudy,
        language: locale,
        slug: `${locale}-localized-case-study`,
        title: locale === 'es' ? 'Estudio de caso localizado' : 'دراسة حالة مترجمة',
        clientName: locale === 'es' ? 'Cliente localizado' : 'عميل مترجم',
        industry: locale === 'es' ? 'Sector localizado' : 'قطاع مترجم',
        translationTargets: [
          {
            language: 'en',
            translationStatus: 'approved',
            slug: englishStudy.slug,
          },
        ],
      }
      const sourceEvidence: ClientEvidenceSummary = {
        slug: englishStudy.slug,
        caseStudyTitle: englishStudy.title,
        clientName: englishStudy.clientName,
        industry: englishStudy.industry,
        documentTitle: 'Client reference letter',
        documentLanguage: 'fr',
        quoteExcerpt: 'Original signed French evidence.',
        clientLogoAlt: 'Client logo',
      }

      sanityMocks.getSanityHomeCaseStudyProof.mockImplementation(async (targetLocale) =>
        targetLocale === 'en'
          ? {caseStudies: [englishStudy], clientEvidence: [sourceEvidence]}
          : {caseStudies: [localizedStudy], clientEvidence: []},
      )

      await expect(getPublishedHomeCaseStudyProof(locale)).resolves.toEqual({
        caseStudies: {
          items: [localizedStudy],
          sourceLocale: locale,
          hasFallbackContent: false,
        },
        clientEvidence: [
          expect.objectContaining({
            slug: localizedStudy.slug,
            caseStudyTitle: localizedStudy.title,
            clientName: localizedStudy.clientName,
            industry: localizedStudy.industry,
            documentLanguage: 'fr',
            quoteExcerpt: 'Original signed French evidence.',
          }),
        ],
      })
    },
  )

  it.each(['es', 'ar'] as const)(
    'does not return an English local case study on %s detail routes',
    async (locale) => {
      sanityMocks.getSanityCaseStudyBySlug.mockResolvedValue(null)
      await expect(getCaseStudyBySlug(CASE_STUDIES[0].slug, locale)).rejects.toThrow(
        'Case study not found',
      )
    },
  )
})
