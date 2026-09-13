import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const sourcePath = path.resolve(scriptDirectory, '../../docs/research/claim-registry.csv')

function parseCsv(source) {
  const rows = []
  let row = []
  let field = ''
  let quoted = false
  for (let index = 0; index < source.length; index += 1) {
    const character = source[index]
    if (character === '"') {
      if (quoted && source[index + 1] === '"') {
        field += '"'
        index += 1
      } else quoted = !quoted
    } else if (character === ',' && !quoted) {
      row.push(field)
      field = ''
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && source[index + 1] === '\n') index += 1
      row.push(field)
      if (row.some(Boolean)) rows.push(row)
      row = []
      field = ''
    } else field += character
  }
  if (field || row.length) {
    row.push(field)
    rows.push(row)
  }
  return rows
}

const [headers, ...rows] = parseCsv(fs.readFileSync(sourcePath, 'utf8'))
const records = rows.map((row) =>
  Object.fromEntries(headers.map((header, index) => [header, row[index] || ''])),
)
const proposed = records.map((record) => ({
  _id: `evidence.${record.claim_id}`,
  _type: 'evidenceRecord',
  claimId: record.claim_id,
  sourceTitle: record.source_title || undefined,
  sourceUrl: record.source_url || undefined,
  publisher: record.publisher_or_owner || undefined,
  publicationDate: record.published_date || undefined,
  verificationStatus: 'unverified',
  publiclyCitable: false,
  methodology: record.method_or_sample || undefined,
  limitations: record.limitations || undefined,
}))

console.log(
  JSON.stringify(
    {
      mode: 'dry-run-only',
      source: sourcePath,
      candidates: proposed.length,
      status: 'unverified',
      publiclyCitable: false,
      sample: proposed.slice(0, 5),
      note: 'This command never connects to Sanity and never mutates a dataset.',
    },
    null,
    2,
  ),
)
