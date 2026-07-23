import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-01'})

const fixes = [
  {
    id: 'C9kRM0yIrVzAHS6D3EimQS',
    from: "H.V.A's perspective on why businesses should diagnose workflows, data, ownership, and success metrics before deploying AI agents or automation.",
    to: "Hive Vault Arc's perspective on why businesses should diagnose workflows, data, ownership, and success metrics before deploying AI agents or automation.",
  },
  {
    id: 'IuK2abzZBGOYd51ySRR4tL',
    from: "H.V.A's perspective on why modern transformation needs consulting, engineering, and operations connected from diagnosis to production.",
    to: "Hive Vault Arc's perspective on why modern transformation needs consulting, engineering, and operations connected from diagnosis to production.",
  },
]

async function main() {
  const documents = await Promise.all(fixes.map((fix) => client.getDocument(fix.id)))
  const byId = new Map(documents.filter(Boolean).map((document) => [document._id, document]))
  let transaction = client.transaction()
  let changed = 0

  for (const fix of fixes) {
    const document = byId.get(fix.id)

    if (!document) {
      throw new Error(`Missing perspective document: ${fix.id}`)
    }

    const fieldsToSet = {}

    for (const [path, current] of [
      ['summary', document.summary],
      ['seo.description', document.seo?.description],
    ]) {
      if (current === fix.to) {
        continue
      }

      if (current !== fix.from) {
        throw new Error(
          `Perspective ${fix.id} has unexpected copy at ${path}; refusing to overwrite it.`,
        )
      }

      fieldsToSet[path] = fix.to
    }

    if (Object.keys(fieldsToSet).length === 0) {
      continue
    }

    transaction = transaction.patch(fix.id, (patch) =>
      patch.ifRevisionId(document._rev).set(fieldsToSet),
    )
    changed += 1
  }

  if (changed === 0) {
    console.log('Perspective summaries and SEO descriptions already use the preferred name.')
    return
  }

  await transaction.commit()
  console.log(`Updated ${changed} perspective documents.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
