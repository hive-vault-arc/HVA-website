import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import {fileURLToPath} from 'node:url'
import ts from 'typescript'
import {getCliClient} from 'sanity/cli'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const taxonomyPath = path.resolve(scriptDirectory, '../../src/lib/editorial-taxonomy.ts')
const source = fs.readFileSync(taxonomyPath, 'utf8')
const compiled = ts.transpileModule(source, {
  compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022},
}).outputText
const module = {exports: {}}
vm.runInNewContext(compiled, {module, exports: module.exports, require: () => undefined})
const legacyMap = module.exports.LEGACY_EDITORIAL_MAP

const evidenceTypes = {
  'External research synthesis': 'external-research',
  'Product and source review': 'external-research',
  'Operating perspective': 'operating-perspective',
  'Market guide': 'operating-perspective',
  'Approved client case': 'approved-client-evidence',
}

const client = getCliClient({apiVersion: '2026-08-10'}).withConfig({perspective: 'raw'})
const slugs = Object.keys(legacyMap)
const documents = await client.fetch(
  `*[
    _type in ["post", "newsArticle", "perspective", "researchReport", "caseStudy", "capability"] &&
    slug.current in $slugs
  ]{
    _id, _type, language, translationStatus, "slug": slug.current,
    editorialFormat, topics, directAnswer, evidenceType, primaryCta
  }`,
  {slugs},
)

const proposals = documents.map((document) => {
  const legacy = legacyMap[document.slug]
  const setIfMissing = {
    ...(!document.editorialFormat ? {editorialFormat: legacy.editorialFormat} : {}),
    ...(!document.topics?.length ? {topics: legacy.topics} : {}),
    ...(!document.directAnswer && legacy.directAnswer ? {directAnswer: legacy.directAnswer} : {}),
    ...(!document.evidenceType && evidenceTypes[legacy.evidenceType]
      ? {evidenceType: evidenceTypes[legacy.evidenceType]}
      : {}),
    ...(!document.primaryCta && legacy.primaryCta ? {primaryCta: legacy.primaryCta} : {}),
  }
  return {
    id: document._id,
    type: document._type,
    language: document.language,
    slug: document.slug,
    setIfMissing,
  }
})

console.log(
  JSON.stringify(
    {
      mode: 'dry-run-only',
      taxonomyRecords: slugs.length,
      matchedDocuments: documents.length,
      unmatchedSlugs: slugs.filter((slug) => !documents.some((document) => document.slug === slug)),
      proposals,
      note: 'Public wording is copied exactly. No mutation is implemented; native review is required for non-English backfills.',
    },
    null,
    2,
  ),
)
