import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-10'}).withConfig({perspective: 'published'})
const types = [
  'post',
  'newsArticle',
  'perspective',
  'researchReport',
  'caseStudy',
  'employeeProfile',
  'capability',
  'industry',
]

const documents = await client.fetch(
  `*[
    _type in $types &&
    language == "fr" &&
    translationStatus == "approved"
  ] | order(_type asc, title asc) {
    _id,
    _type,
    title,
    name,
    "slug": slug.current,
    translationStatus,
    summary,
    excerpt,
    subtitle,
    description,
    category,
    tag,
    readTime,
    briefLine,
    position,
    responsibilityTag
  }`,
  {types},
)

console.log(
  JSON.stringify(
    documents.map((document) => ({
      id: document._id,
      type: document._type,
      title: document.title ?? document.name,
      slug: document.slug,
      translationStatus: document.translationStatus,
      displayFields: Object.fromEntries(
        [
          'subtitle',
          'summary',
          'excerpt',
          'description',
          'category',
          'tag',
          'readTime',
          'briefLine',
          'position',
          'responsibilityTag',
        ]
          .filter(
            (field) => typeof document[field] === 'string' && document[field].trim().length > 0,
          )
          .map((field) => [field, document[field]]),
      ),
    })),
    null,
    2,
  ),
)
