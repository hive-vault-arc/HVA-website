import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-24'}).withConfig({perspective: 'raw'})
const types = [
  'post',
  'newsArticle',
  'perspective',
  'researchReport',
  'caseStudy',
  'employeeProfile',
  'capability',
]

const documents = await client.fetch(
  `*[
    _type in $types &&
    _id in path("drafts.**") &&
    language == "fr"
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
    category,
    tag,
    readTime,
    briefLine,
    position,
    responsibilityTag
  }`,
  {types},
)

const result = documents.map((document) => ({
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
      'category',
      'tag',
      'readTime',
      'briefLine',
      'position',
      'responsibilityTag',
    ]
      .filter((field) => typeof document[field] === 'string' && document[field].trim().length > 0)
      .map((field) => [field, document[field]]),
  ),
}))

console.log(JSON.stringify(result, null, 2))
