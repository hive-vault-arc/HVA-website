import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import sharp from 'sharp'

const apply = process.argv.includes('--apply')
const __filename = fileURLToPath(import.meta.url)
const studioRoot = path.resolve(path.dirname(__filename), '..')
const workspaceRoot = path.resolve(studioRoot, '..')
const caseStudiesRoot = path.join(workspaceRoot, 'case studies')
const roots = [
  path.join(workspaceRoot, 'Hva-website-front', 'public'),
  path.join(studioRoot, 'assets'),
  caseStudiesRoot,
]
const legacyIcons = [
  path.join(workspaceRoot, 'Hva-website-front', 'public', 'favicon.ico'),
  path.join(workspaceRoot, 'Hva-website-front', 'public', 'Images', 'favico', 'favicon.ico'),
]
const converterTemporaryFiles = [
  path.join(workspaceRoot, 'Hva-website-front', 'public', 'HVAANIMATEDGIF.webp.tmp'),
]
const rasterExtensions = new Set([
  '.avif',
  '.bmp',
  '.gif',
  '.heic',
  '.heif',
  '.jpeg',
  '.jpg',
  '.png',
  '.tif',
  '.tiff',
])

function walk(directory, files = []) {
  if (!fs.existsSync(directory)) return files

  for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
    const filePath = path.join(directory, entry.name)
    if (entry.isDirectory()) walk(filePath, files)
    else files.push(filePath)
  }

  return files
}

function workspaceRelative(filePath) {
  return path.relative(workspaceRoot, filePath).replaceAll('\\', '/')
}

function assertAllowedFile(filePath) {
  const absolute = path.resolve(filePath)
  const isAllowed = roots.some((root) => {
    const relative = path.relative(root, absolute)
    return relative && !relative.startsWith('..') && !path.isAbsolute(relative)
  })

  if (!isAllowed) throw new Error(`Refusing to mutate file outside approved roots: ${absolute}`)
}

function targetFor(sourcePath) {
  const relativeToCases = path.relative(caseStudiesRoot, sourcePath)
  const parts = relativeToCases.split(path.sep)
  const pngDirectoryIndex = parts.findIndex(
    (part, index) => part === 'png' && parts[index - 1] === 'assets',
  )

  if (
    pngDirectoryIndex >= 0 &&
    !relativeToCases.startsWith('..') &&
    !path.isAbsolute(relativeToCases)
  ) {
    parts[pngDirectoryIndex] = 'webp'
    return path.join(caseStudiesRoot, ...parts).replace(/\.[^.]+$/, '.webp')
  }

  return sourcePath.replace(/\.[^.]+$/, '.webp')
}

function encodingOptions(sourcePath, metadata) {
  const normalized = workspaceRelative(sourcePath).toLowerCase()
  const isBrandAsset = /(?:^|[/_-])(?:favicon|favico|icon|logo)(?:[/_.-]|$)/.test(normalized)
  const isUiCapture =
    normalized.includes('/case studies/') ||
    normalized.includes('/raw-screens/') ||
    normalized.includes('/proof-gallery')

  if (metadata.pages && metadata.pages > 1) {
    return {
      quality: 88,
      alphaQuality: 100,
      effort: 6,
      smartSubsample: true,
      minSize: true,
      mixed: true,
      exact: true,
    }
  }

  if (isBrandAsset) {
    return {
      lossless: true,
      effort: 6,
      exact: true,
    }
  }

  if (isUiCapture) {
    return {
      quality: 90,
      alphaQuality: 100,
      effort: 6,
      smartSubsample: true,
      exact: Boolean(metadata.hasAlpha),
      preset: 'text',
    }
  }

  return {
    quality: 84,
    alphaQuality: 100,
    effort: 6,
    smartSubsample: true,
    exact: Boolean(metadata.hasAlpha),
    preset: metadata.hasAlpha ? 'picture' : 'photo',
  }
}

async function metadataFor(filePath) {
  return sharp(fs.readFileSync(filePath), {animated: true}).metadata()
}

async function validateOutput(sourcePath, output, sourceMetadata) {
  const targetMetadata = await sharp(output, {animated: true}).metadata()
  const sourceHeight = sourceMetadata.pageHeight || sourceMetadata.height
  const targetHeight = targetMetadata.pageHeight || targetMetadata.height
  const sourceDuration = sourceMetadata.delay?.reduce((total, delay) => total + delay, 0)
  const targetDuration = targetMetadata.delay?.reduce((total, delay) => total + delay, 0)
  const sourceIsAnimated = Boolean(sourceMetadata.pages && sourceMetadata.pages > 1)
  const animationChanged =
    sourceIsAnimated &&
    (!(targetMetadata.pages && targetMetadata.pages > 1) ||
      sourceDuration !== targetDuration ||
      sourceMetadata.loop !== targetMetadata.loop)

  if (
    targetMetadata.format !== 'webp' ||
    targetMetadata.width !== sourceMetadata.width ||
    targetHeight !== sourceHeight ||
    animationChanged
  ) {
    throw new Error(
      `Converted output does not preserve source geometry/animation: ${workspaceRelative(sourcePath)}`,
    )
  }
}

async function validateTarget(sourcePath, targetPath, sourceMetadata) {
  const targetMetadata = await metadataFor(targetPath)
  const sourceHeight = sourceMetadata.pageHeight || sourceMetadata.height
  const targetHeight = targetMetadata.pageHeight || targetMetadata.height
  const sourceDuration = sourceMetadata.delay?.reduce((total, delay) => total + delay, 0)
  const targetDuration = targetMetadata.delay?.reduce((total, delay) => total + delay, 0)
  const sourceIsAnimated = Boolean(sourceMetadata.pages && sourceMetadata.pages > 1)
  const animationChanged =
    sourceIsAnimated &&
    (!(targetMetadata.pages && targetMetadata.pages > 1) ||
      sourceDuration !== targetDuration ||
      sourceMetadata.loop !== targetMetadata.loop)

  if (
    targetMetadata.format !== 'webp' ||
    targetMetadata.width !== sourceMetadata.width ||
    targetHeight !== sourceHeight ||
    animationChanged
  ) {
    throw new Error(
      `Existing target does not preserve source geometry/animation: ${workspaceRelative(targetPath)}`,
    )
  }
}

async function convertFile(sourcePath) {
  assertAllowedFile(sourcePath)
  const targetPath = targetFor(sourcePath)
  const sourceMetadata = await metadataFor(sourcePath)

  if (fs.existsSync(targetPath)) {
    await validateTarget(sourcePath, targetPath, sourceMetadata)
    if (apply) fs.unlinkSync(sourcePath)
    return {action: apply ? 'deduplicated' : 'would deduplicate', sourcePath, targetPath}
  }

  if (!apply) return {action: 'would convert', sourcePath, targetPath}

  fs.mkdirSync(path.dirname(targetPath), {recursive: true})
  const input = fs.readFileSync(sourcePath)
  const pipeline = sharp(input, {
    animated: Boolean(sourceMetadata.pages && sourceMetadata.pages > 1),
    autoOrient: true,
  }).webp(encodingOptions(sourcePath, sourceMetadata))

  const output = await pipeline.toBuffer()
  await validateOutput(sourcePath, output, sourceMetadata)
  fs.writeFileSync(targetPath, output)
  fs.unlinkSync(sourcePath)

  return {action: 'converted', sourcePath, targetPath}
}

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex').toUpperCase()
}

function rewriteRasterReference(value) {
  return value
    .replaceAll('assets/png/', 'assets/webp/')
    .replaceAll('assets\\png\\', 'assets\\webp\\')
    .replace(/\.(?:avif|bmp|gif|heic|heif|jpe?g|png|tiff?)\b/gi, '.webp')
}

function rewriteCaseStudyDocumentation() {
  const documentationExtensions = new Set(['.html', '.md'])

  for (const filePath of walk(caseStudiesRoot)) {
    if (!documentationExtensions.has(path.extname(filePath).toLowerCase())) continue
    const current = fs.readFileSync(filePath, 'utf8')
    const next = rewriteRasterReference(current)
    if (next !== current) fs.writeFileSync(filePath, next)
  }
}

function updateCaseStudyManifests() {
  for (const directory of fs.readdirSync(caseStudiesRoot, {withFileTypes: true})) {
    if (!directory.isDirectory()) continue
    const manifestPath = path.join(caseStudiesRoot, directory.name, 'manifest.json')
    if (!fs.existsSync(manifestPath)) continue

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    for (const asset of manifest.assets ?? []) {
      delete asset.png
      if (asset.rawScreen) asset.rawScreen = asset.rawScreen.replace(/\.[^.]+$/, '.webp')

      const primaryPath = path.join(path.dirname(manifestPath), asset.webp)
      if (!fs.existsSync(primaryPath)) {
        throw new Error(`Manifest WebP is missing: ${workspaceRelative(primaryPath)}`)
      }
      asset.sha256 = sha256(primaryPath)

      const rawPath = asset.rawScreen
        ? path.join(path.dirname(manifestPath), asset.rawScreen)
        : null
      const hashes = asset.sha256Files ?? asset.hashes
      if (hashes) {
        delete hashes.png
        hashes.webp = sha256(primaryPath)
        if (rawPath) {
          if (!fs.existsSync(rawPath)) {
            throw new Error(`Manifest raw WebP is missing: ${workspaceRelative(rawPath)}`)
          }
          hashes.rawScreen = sha256(rawPath)
        }
      }
    }

    fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  }
}

function refreshChecksumFiles() {
  const checksumFiles = walk(caseStudiesRoot).filter(
    (filePath) => path.basename(filePath).toUpperCase() === 'SHA256SUMS.TXT',
  )

  for (const checksumPath of checksumFiles) {
    const directory = path.dirname(checksumPath)
    const paths = fs
      .readFileSync(checksumPath, 'utf8')
      .split(/\r?\n/)
      .flatMap((line) => {
        const match = line.match(/^[A-Fa-f0-9]{64}\s+\*?(.+)$/)
        return match ? [rewriteRasterReference(match[1].trim())] : []
      })

    const uniquePaths = Array.from(new Set(paths))
    const refreshed = uniquePaths.flatMap((relativePath) => {
      const absolutePath = path.resolve(directory, relativePath)
      const remainsInsideCaseStudies = !path
        .relative(caseStudiesRoot, absolutePath)
        .startsWith('..')
      if (!remainsInsideCaseStudies || !fs.existsSync(absolutePath)) return []
      return [`${sha256(absolutePath)}  ${relativePath.replaceAll('\\', '/')}`]
    })

    fs.writeFileSync(checksumPath, `${refreshed.join('\n')}\n`)
  }
}

async function main() {
  for (const temporaryPath of converterTemporaryFiles.filter((filePath) =>
    fs.existsSync(filePath),
  )) {
    assertAllowedFile(temporaryPath)
    console.log(
      `${apply ? 'removed' : 'would remove'} converter temporary file: ${workspaceRelative(temporaryPath)}`,
    )
    if (apply) fs.unlinkSync(temporaryPath)
  }

  const sources = roots
    .flatMap((root) => walk(root))
    .filter((filePath) => rasterExtensions.has(path.extname(filePath).toLowerCase()))
    .sort()

  console.log(`${apply ? 'Applying' : 'Dry run:'} ${sources.length} raster conversion(s)`)
  for (const sourcePath of sources) {
    const result = await convertFile(sourcePath)
    console.log(
      `${result.action}: ${workspaceRelative(result.sourcePath)} -> ${workspaceRelative(result.targetPath)}`,
    )
  }

  for (const iconPath of legacyIcons.filter((filePath) => fs.existsSync(filePath))) {
    assertAllowedFile(iconPath)
    console.log(`${apply ? 'removed' : 'would remove'} legacy icon: ${workspaceRelative(iconPath)}`)
    if (apply) fs.unlinkSync(iconPath)
  }

  if (apply) {
    rewriteCaseStudyDocumentation()
    updateCaseStudyManifests()
    refreshChecksumFiles()
  }
  console.log(apply ? 'Local WebP migration complete.' : 'Dry run complete; no files changed.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
