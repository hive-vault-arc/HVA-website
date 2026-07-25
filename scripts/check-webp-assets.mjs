import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const frontendRoot = path.resolve(path.dirname(__filename), '..')
const publicRoot = path.join(frontendRoot, 'public')
const sourceRoots = [
  path.join(frontendRoot, 'src'),
  path.join(frontendRoot, 'messages'),
  publicRoot,
]
const forbiddenRasterExtensions =
  /\.(?:avif|bmp|gif|heic|heif|ico|jpe?g|png|tiff?)(?=$|[?#\s"'`()<>)}\],;:])/gi
const textExtensions = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.jsx',
  '.mjs',
  '.ts',
  '.tsx',
  '.webmanifest',
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

function relative(filePath) {
  return path.relative(frontendRoot, filePath).replaceAll('\\', '/')
}

function isWebpFile(filePath) {
  const descriptor = fs.openSync(filePath, 'r')
  const header = Buffer.alloc(12)

  try {
    return fs.readSync(descriptor, header, 0, header.length, 0) === 12 &&
      header.subarray(0, 4).toString('ascii') === 'RIFF' &&
      header.subarray(8, 12).toString('ascii') === 'WEBP'
  } finally {
    fs.closeSync(descriptor)
  }
}

const errors = []
const publicFiles = walk(publicRoot)

for (const filePath of publicFiles) {
  if (forbiddenRasterExtensions.test(path.basename(filePath))) {
    errors.push(`${relative(filePath)} is a non-WebP raster asset.`)
  }
  forbiddenRasterExtensions.lastIndex = 0

  if (path.extname(filePath).toLowerCase() === '.webp' && !isWebpFile(filePath)) {
    errors.push(`${relative(filePath)} has a .webp extension but is not WebP data.`)
  }
}

for (const sourceRoot of sourceRoots) {
  for (const filePath of walk(sourceRoot)) {
    if (!textExtensions.has(path.extname(filePath).toLowerCase())) continue

    const source = fs.readFileSync(filePath, 'utf8')
    const lines = source.split(/\r?\n/)

    lines.forEach((line, index) => {
      const matches = line.match(forbiddenRasterExtensions)
      if (matches) {
        errors.push(
          `${relative(filePath)}:${index + 1} references ${Array.from(new Set(matches)).join(', ')}.`,
        )
      }

      if (/images\.unsplash\.com/i.test(line) && !/[?&]fm=webp(?:[&#"']|$)/i.test(line)) {
        errors.push(`${relative(filePath)}:${index + 1} uses Unsplash without fm=webp.`)
      }

      if (/\.auto\(\s*['"]format['"]\s*\)/.test(line) || /[?&]auto=format\b/i.test(line)) {
        errors.push(`${relative(filePath)}:${index + 1} negotiates a non-deterministic format.`)
      }

      if (/\.(?:test|spec)\.[^.]+$/i.test(filePath)) return

      for (const match of line.matchAll(
        /(?<![/:])(\/(?!\/)[^"'`()<>?#\s]+\.webp)(?=$|[?#\s"'`()<>)}\],;:])/gi,
      )) {
        let publicReference = match[1]

        try {
          publicReference = decodeURIComponent(publicReference)
        } catch {
          errors.push(`${relative(filePath)}:${index + 1} has an invalid encoded WebP path.`)
          continue
        }

        const publicFile = path.resolve(
          publicRoot,
          publicReference.slice(1).replaceAll('/', path.sep),
        )
        const isInsidePublic =
          publicFile === publicRoot || publicFile.startsWith(`${publicRoot}${path.sep}`)

        if (!isInsidePublic || !fs.existsSync(publicFile)) {
          errors.push(
            `${relative(filePath)}:${index + 1} references missing public asset ${publicReference}.`,
          )
        }
      }
    })
  }
}

const nextConfig = fs.readFileSync(path.join(frontendRoot, 'next.config.ts'), 'utf8')
if (!/formats:\s*\[\s*['"]image\/webp['"]\s*\]/.test(nextConfig)) {
  errors.push('next.config.ts must pin images.formats to image/webp.')
}

if (errors.length > 0) {
  console.error(`WebP-only asset check failed with ${errors.length} issue(s):`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exitCode = 1
} else {
  console.log(`WebP-only asset check passed (${publicFiles.length} public files inspected).`)
}
