import {describe, expect, it} from 'vitest'
import {
  routeForStrategicReleaseDocument,
  validateStrategicReleaseFamily,
  type StrategicReleaseDocument,
} from './strategicRelease'

const localeDocuments = ['en', 'fr', 'es', 'ar'].map((language): StrategicReleaseDocument => ({
  _id: `drafts.capability-${language}`,
  _type: 'capability',
  language,
  translationStatus: 'approved',
  visibility: 'published',
  slug: {current: language === 'ar' ? 'الذكاء-الاصطناعي' : `ai-${language}`},
  seo: {title: `AI ${language}`, description: `Description ${language}`},
  nativeReview:
    language === 'en'
      ? undefined
      : {reviewed: true, reviewedBy: `Reviewer ${language}`, reviewedAt: '2026-09-13'},
}))

describe('strategic release governance', () => {
  it('accepts a complete approved four-language family', () => {
    const validations = validateStrategicReleaseFamily(
      localeDocuments.map((document) => ({
        referenceId: document._id.replace('drafts.', ''),
        document,
      })),
      new Set(),
    )

    expect(validations.every((validation) => validation.status === 'passed')).toBe(true)
  })

  it('blocks incomplete families and unsupported numeric answers', () => {
    const incomplete = localeDocuments.slice(0, 3).map((document, index) => ({
      referenceId: document._id.replace('drafts.', ''),
      document:
        index === 0 ? {...document, directAnswer: 'The measured result was 42 percent.'} : document,
    }))
    const validations = validateStrategicReleaseFamily(incomplete, new Set())

    expect(
      validations.find((validation) => validation.check === 'four-language-family')?.status,
    ).toBe('failed')
    expect(validations.find((validation) => validation.check === 'public-evidence')?.status).toBe(
      'failed',
    )
  })

  it('generates locale-aware routes from the shared route contract', () => {
    expect(routeForStrategicReleaseDocument(localeDocuments[0])).toBe('/capabilities/ai-en')
    expect(routeForStrategicReleaseDocument(localeDocuments[3])).toBe(
      '/ar/القدرات/%D8%A7%D9%84%D8%B0%D9%83%D8%A7%D8%A1-%D8%A7%D9%84%D8%A7%D8%B5%D8%B7%D9%86%D8%A7%D8%B9%D9%8A',
    )
  })
})
