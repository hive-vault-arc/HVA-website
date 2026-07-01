import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'
import {getCliClient} from 'sanity/cli'
import ts from 'typescript'

const apiVersion = '2026-07-01'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const studioRoot = path.resolve(__dirname, '..')
const frontendRoot = path.resolve(studioRoot, '..', 'Hva-website-front')
const frontendPublicRoot = path.join(frontendRoot, 'public')
const cacheDir = path.join(studioRoot, '.sanity-import-cache')
const client = getCliClient({apiVersion})

function slugRef(slug) {
  return {_type: 'slug', current: slug}
}

function arrayKey(prefix, index) {
  return `${prefix}_${String(index).padStart(3, '0')}`
}

function withKeys(items, prefix) {
  return (items || []).map((item, index) => ({
    _key: arrayKey(prefix, index),
    ...item,
  }))
}

async function loadFrontendConstants(relativePath, exportNames) {
  await fs.promises.mkdir(cacheDir, {recursive: true})

  const sourcePath = path.join(frontendRoot, relativePath)
  const source = await fs.promises.readFile(sourcePath, 'utf8')
  const sourceFile = ts.createSourceFile(sourcePath, source, ts.ScriptTarget.Latest, true)
  const printer = ts.createPrinter({newLine: ts.NewLineKind.LineFeed})
  const selectedStatements = []

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue

    const declarations = statement.declarationList.declarations.filter(
      (declaration) =>
        ts.isIdentifier(declaration.name) && exportNames.includes(declaration.name.text),
    )

    if (declarations.length === 0) continue

    selectedStatements.push(
      ts.factory.updateVariableStatement(
        statement,
        [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        ts.factory.updateVariableDeclarationList(statement.declarationList, declarations),
      ),
    )
  }

  if (selectedStatements.length === 0) {
    throw new Error(`No matching constants found in ${relativePath}: ${exportNames.join(', ')}`)
  }

  const extractedSource = selectedStatements
    .map((statement) => printer.printNode(ts.EmitHint.Unspecified, statement, sourceFile))
    .join('\n\n')

  const transpiled = ts.transpileModule(extractedSource, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
      skipLibCheck: true,
    },
  })
  const outputPath = path.join(cacheDir, `${path.basename(relativePath, '.ts')}-constants.mjs`)

  await fs.promises.writeFile(outputPath, transpiled.outputText)

  return import(`${pathToFileURL(outputPath).href}?v=${Date.now()}`)
}

function staticImagePathToFilePath(staticPath) {
  if (!staticPath || !staticPath.startsWith('/')) {
    throw new Error(`Expected a local public image path, received: ${staticPath}`)
  }

  return path.join(frontendPublicRoot, staticPath.slice(1))
}

async function sanityImageFromStaticPath(staticPath) {
  const filePath = staticImagePathToFilePath(staticPath)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing local image file for ${staticPath}: ${filePath}`)
  }

  const sourceId = `hva-static:${staticPath}`
  const existing = await client.fetch(
    '*[_type == "sanity.imageAsset" && source.id == $sourceId][0]{_id}',
    {sourceId},
  )

  const asset =
    existing ||
    (await client.assets.upload('image', fs.createReadStream(filePath), {
      filename: path.basename(filePath),
      source: {
        id: sourceId,
        name: 'hva-static-import',
        url: staticPath,
      },
    }))

  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  }
}

function toSection(section, index) {
  const base = {_key: arrayKey('section', index)}

  switch (section.type) {
    case 'paragraph':
      return {...base, _type: 'paragraphSection', content: section.content}
    case 'heading':
      return {...base, _type: 'headingSection', content: section.content}
    case 'subheading':
      return {...base, _type: 'subheadingSection', content: section.content}
    case 'pullquote':
      return {
        ...base,
        _type: 'pullquoteSection',
        content: section.content,
        ...(section.attribution ? {attribution: section.attribution} : {}),
      }
    case 'stat-block':
      return {
        ...base,
        _type: 'statBlockSection',
        stats: withKeys(section.stats, `section_${index}_stat`),
      }
    case 'list':
      return {...base, _type: 'listSection', items: section.items}
    case 'faq':
      return {
        ...base,
        _type: 'faqSection',
        items: withKeys(section.items, `section_${index}_faq`),
      }
    default:
      throw new Error(`Unsupported section type: ${section.type}`)
  }
}

function toSections(sections) {
  return (sections || []).map(toSection)
}

function toSeo({title, description, keywords}) {
  return {
    _type: 'seo',
    title,
    description,
    keywords: keywords || [],
    noIndex: false,
  }
}

async function upsertBySlug(doc) {
  const existing = await client.fetch('*[_type == $type && slug.current == $slug][0]{_id}', {
    type: doc._type,
    slug: doc.slug.current,
  })

  if (existing?._id) {
    const {_type, ...fields} = doc
    await client.patch(existing._id).set(fields).commit()
    return {action: 'updated', id: existing._id}
  }

  const created = await client.create(doc)
  return {action: 'created', id: created._id}
}

async function toPostDocument(post) {
  return {
    _type: 'post',
    title: post.title,
    slug: slugRef(post.slug),
    subtitle: post.subtitle,
    excerpt: post.excerpt,
    category: post.category,
    readTime: post.readTime,
    publishedAt: post.publishedAt,
    authors: withKeys(post.authors, 'author'),
    coverImage: await sanityImageFromStaticPath(post.coverImage),
    coverAlt: post.coverAlt || post.title,
    tags: post.tags,
    faqs: withKeys(post.faqs, 'faq'),
    sources: withKeys(post.sources, 'source'),
    sections: toSections(post.sections),
    seo: toSeo({
      title: post.title,
      description: post.excerpt,
      keywords: post.tags,
    }),
  }
}

async function toNewsArticleDocument(article) {
  return {
    _type: 'newsArticle',
    title: article.title,
    slug: slugRef(article.slug),
    subtitle: article.subtitle,
    summary: article.summary,
    category: article.category,
    tag: article.tag,
    publishedAt: article.publishedAt,
    readTime: article.readTime,
    coverImage: await sanityImageFromStaticPath(article.coverImage),
    coverAlt: article.coverAlt || article.title,
    tags: article.tags,
    sources: withKeys(article.sources, 'source'),
    sections: toSections(article.sections),
    seo: toSeo({
      title: article.title,
      description: article.summary,
      keywords: article.tags,
    }),
  }
}

async function toPerspectiveDocument(perspective) {
  return {
    _type: 'perspective',
    title: perspective.title,
    slug: slugRef(perspective.slug),
    subtitle: perspective.subtitle,
    summary: perspective.summary,
    tag: perspective.tag,
    publishedAt: perspective.publishedAt,
    readTime: perspective.readTime,
    authors: withKeys(perspective.authors, 'author'),
    keywords: perspective.keywords,
    sources: withKeys(perspective.sources, 'source'),
    coverImage: await sanityImageFromStaticPath(perspective.coverImage),
    coverAlt: perspective.coverAlt || perspective.title,
    sections: toSections(perspective.sections),
    seo: toSeo({
      title: perspective.title,
      description: perspective.summary,
      keywords: perspective.keywords,
    }),
  }
}

async function toCaseStudyDocument(study) {
  return {
    _type: 'caseStudy',
    title: study.title,
    slug: slugRef(study.slug),
    clientName: study.clientName,
    industry: study.industry,
    summary: study.summary,
    problem: study.problem,
    systemArchitecture: study.systemArchitecture,
    operationalModules: study.operationalModules,
    integrations: study.integrations,
    deploymentScale: study.deploymentScale,
    deploymentStatus: study.deploymentStatus,
    measuredOutcomes: withKeys(study.measuredOutcomes, 'metric'),
    testimonial: {
      _type: 'testimonial',
      ...study.testimonial,
    },
    assets: {
      _type: 'object',
      coverImage: await sanityImageFromStaticPath(study.assets.coverImage),
      coverAlt: study.assets.coverAlt || study.title,
      logoLabel: study.assets.logoLabel,
    },
    lastUpdated: study.lastUpdated,
    seo: toSeo({
      title: study.title,
      description: study.summary,
      keywords: [study.industry, study.clientName, 'case study'],
    }),
  }
}

async function toResearchReportDocument(report) {
  const fallbackImage = '/Images/insights/hva-research-reports-ai-technology-morocco.webp'

  return {
    _type: 'researchReport',
    title: report.title,
    slug: slugRef(report.slug),
    summary: report.summary,
    tag: report.tag,
    publishedAt: report.publishedAt,
    coverImage: await sanityImageFromStaticPath(report.coverImage || fallbackImage),
    coverAlt: report.coverAlt || report.title,
    sections: [
      {
        _key: 'section_000',
        _type: 'paragraphSection',
        content: report.summary,
      },
    ],
    seo: toSeo({
      title: report.title,
      description: report.summary,
      keywords: [report.tag],
    }),
  }
}

async function importDocuments(label, items, mapper) {
  for (const item of items) {
    const doc = await mapper(item)
    const result = await upsertBySlug(doc)
    console.log(`${label}: ${result.action} ${doc.slug.current}`)
  }
}

async function importStaticImages(label, staticPaths) {
  for (const staticPath of staticPaths) {
    await sanityImageFromStaticPath(staticPath)
    console.log(`${label}: asset ready ${staticPath}`)
  }
}

async function main() {
  const [{POSTS}, {NEWS_ARTICLES, RESEARCH_REPORTS}, {PERSPECTIVES}, {CASE_STUDIES}] =
    await Promise.all([
      loadFrontendConstants(path.join('src', 'lib', 'blog.ts'), ['POSTS']),
      loadFrontendConstants(path.join('src', 'lib', 'insights.ts'), [
        'NEWS_ARTICLES',
        'RESEARCH_REPORTS',
      ]),
      loadFrontendConstants(path.join('src', 'lib', 'perspectives.ts'), ['PERSPECTIVES']),
      loadFrontendConstants(path.join('src', 'lib', 'proof.ts'), ['CASE_STUDIES']),
    ])

  await importStaticImages('insightCategoryImage', [
    '/Images/insights/hva-insights-blog-articles-tangier-morocco.webp',
    '/Images/insights/hva-case-studies-ai-transformation-morocco.webp',
    '/Images/insights/hva-news-articles-ai-industry-updates.webp',
    '/Images/insights/hva-perspectives-strategic-ai-insights.webp',
    '/Images/insights/hva-research-reports-ai-technology-morocco.webp',
  ])

  await importDocuments('post', POSTS, toPostDocument)
  await importDocuments('newsArticle', NEWS_ARTICLES, toNewsArticleDocument)
  await importDocuments('perspective', PERSPECTIVES, toPerspectiveDocument)
  await importDocuments('caseStudy', CASE_STUDIES, toCaseStudyDocument)
  await importDocuments('researchReport', RESEARCH_REPORTS, toResearchReportDocument)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
