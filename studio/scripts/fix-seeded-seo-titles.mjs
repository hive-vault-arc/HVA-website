import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-01'})

const fixes = [
  {
    id: '2I2YrLIfyTxQVbMSBXliQo',
    from: 'Strategy & Business Consulting | Hive Vault Arc Capabilities',
    to: 'Strategy & Business Consulting',
  },
  {
    id: '2I2YrLIfyTxQVbMSBXlkll',
    from: 'Technology Consulting | Hive Vault Arc Capabilities',
    to: 'Technology Consulting',
  },
  {
    id: '7lVqob7L36YKeQX06MZMYN',
    from: 'AI, Data & Analytics | Hive Vault Arc Capabilities',
    to: 'AI, Data & Analytics',
  },
  {
    id: 'MbOBprsinTQIhTfttRtdkD',
    from: 'Software Engineering & Product | Hive Vault Arc',
    to: 'Software Engineering & Product Development',
  },
  {
    id: 'MbOBprsinTQIhTfttRtlxd',
    from: 'Cloud & Infrastructure | Hive Vault Arc Capabilities',
    to: 'Cloud & Infrastructure',
  },
  {
    id: 'MbOBprsinTQIhTfttRtv7z',
    from: 'Operations & Managed Services | Hive Vault Arc Capabilities',
    to: 'Operations & Managed Services',
  },
  {
    id: '2I2YrLIfyTxQVbMSBXlQAA',
    from: 'Khalid Chalhi | Co-Founder & CEO at Hive Vault Arc',
    to: 'Khalid Chalhi | Co-Founder & CEO',
  },
  {
    id: 'MbOBprsinTQIhTfttRtUmj',
    from: 'Ali Amrani | Co-Founder & CEO at Hive Vault Arc',
    to: 'Ali Amrani | Co-Founder & CEO',
  },
  {
    id: 'MbOBprsinTQIhTfttRtXOd',
    from: 'Oubay Ghamat | Co-Founder & CEO at Hive Vault Arc',
    to: 'Oubay Ghamat | Co-Founder & CEO',
  },
]

async function main() {
  const documents = await Promise.all(
    fixes.map(async (fix) => ({fix, document: await client.getDocument(fix.id)})),
  )
  let transaction = client.transaction()
  let changed = 0

  for (const {fix, document} of documents) {
    if (!document) {
      throw new Error(`Missing document: ${fix.id}`)
    }

    const current = document.seo?.title
    if (current === fix.to) {
      continue
    }

    if (current !== fix.from) {
      throw new Error(`${fix.id} has an unexpected SEO title; refusing to overwrite it.`)
    }

    transaction = transaction.patch(fix.id, (patch) =>
      patch.ifRevisionId(document._rev).set({'seo.title': fix.to}),
    )
    changed += 1
  }

  if (changed === 0) {
    console.log('Seeded SEO titles already omit the global site-name suffix.')
    return
  }

  await transaction.commit()
  console.log(`Updated ${changed} seeded SEO titles.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
