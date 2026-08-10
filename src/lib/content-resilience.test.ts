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
  getClientEvidenceShowcase,
  getPublishedHomeCaseStudyProof,
} from './proof'

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
})
