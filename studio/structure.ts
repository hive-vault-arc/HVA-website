import {CogIcon, DocumentTextIcon, TagIcon, UserIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import {ORGANIZATION_PROFILE_ID} from './schemaTypes/documents/organizationProfile'

const localizedTypes = [
  'post',
  'newsArticle',
  'perspective',
  'researchReport',
  'caseStudy',
  'employeeProfile',
  'capability',
  'industry',
  'pageOptimization',
]

const answerTypes = [
  'post',
  'newsArticle',
  'perspective',
  'researchReport',
  'caseStudy',
  'capability',
  'pageOptimization',
]

const typeArray = (types: string[]) => JSON.stringify(types)

function queue(
  S: StructureBuilder,
  title: string,
  filter: string,
  params: Record<string, unknown> = {},
) {
  return S.listItem()
    .title(title)
    .child(S.documentList().title(title).filter(filter).params(params))
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Organization Profile')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('organizationProfile')
            .documentId(ORGANIZATION_PROFILE_ID)
            .title('Organization Profile'),
        ),
      S.listItem()
        .title('Page Optimization')
        .icon(CogIcon)
        .child(S.documentTypeList('pageOptimization').title('Page Optimization')),
      S.divider(),
      S.listItem()
        .title('Editorial Operations')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Editorial Operations')
            .items([
              queue(
                S,
                'Missing translations',
                '_type == "translation.metadata" && count(translations) < 4',
              ),
              queue(
                S,
                'In review',
                `_type in ${typeArray(localizedTypes)} && translationStatus == "inReview"`,
              ),
              queue(
                S,
                'Approved but unpublished',
                `_id in path("drafts.**") && _type in ${typeArray(localizedTypes)} && translationStatus == "approved"`,
              ),
              queue(
                S,
                'Missing SEO metadata',
                `_type in ${typeArray(localizedTypes)} && translationStatus == "approved" && (!defined(seo.title) || !defined(seo.description))`,
              ),
              queue(
                S,
                'Missing evidence',
                `_type in ${typeArray(answerTypes)} && defined(directAnswer) && (evidenceType in ["external-research", "first-party-research"] || directAnswer match "*[0-9]*") && count(answerEvidence) == 0`,
              ),
              queue(
                S,
                'Stale reviews',
                `_type in ${typeArray(answerTypes)} && defined(lastReviewed) && dateTime(lastReviewed + "T00:00:00Z") < dateTime(now()) - 60*60*24*365`,
              ),
              queue(
                S,
                'Noindexed content',
                `_type in ${typeArray(localizedTypes)} && seo.noIndex == true`,
              ),
            ]),
        ),
      S.listItem()
        .title('Evidence')
        .child(S.documentTypeList('evidenceRecord').title('Evidence Records')),
      S.listItem()
        .title('Contributors')
        .child(S.documentTypeList('editorialContributor').title('Editorial Contributors')),
      S.divider(),
      S.listItem()
        .title('Capabilities')
        .icon(DocumentTextIcon)
        .child(
          S.documentTypeList('capability')
            .title('Capabilities')
            .defaultOrdering([
              {field: 'displayOrder', direction: 'asc'},
              {field: 'title', direction: 'asc'},
            ]),
        ),
      S.listItem()
        .title('Industries')
        .icon(TagIcon)
        .child(
          S.documentTypeList('industry')
            .title('Industries')
            .defaultOrdering([
              {field: 'displayOrder', direction: 'asc'},
              {field: 'title', direction: 'asc'},
            ]),
        ),
      S.listItem()
        .title('People')
        .icon(UserIcon)
        .child(
          S.documentTypeList('employeeProfile')
            .title('People')
            .defaultOrdering([
              {field: 'displayOrder', direction: 'asc'},
              {field: 'name', direction: 'asc'},
            ]),
        ),
      S.listItem()
        .title('Insights')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Insights')
            .items([
              S.documentTypeListItem('post').title('Blogs'),
              S.documentTypeListItem('newsArticle').title('News Articles'),
              S.documentTypeListItem('perspective').title('Perspectives'),
              S.documentTypeListItem('researchReport').title('Research Reports'),
              S.documentTypeListItem('caseStudy').title('Case Studies'),
            ]),
        ),
    ])
