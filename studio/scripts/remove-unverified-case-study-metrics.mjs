import {getCliClient} from 'sanity/cli'

const apiVersion = '2026-07-22'
const fieldsToUnset = ['deploymentScale', 'measuredOutcomes', 'reportingNote']
const shouldExecute = process.argv.includes('--execute')
const client = getCliClient({apiVersion})

async function main() {
  const documents = await client.fetch(
    '*[_type == "caseStudy" && (defined(deploymentScale) || defined(measuredOutcomes) || defined(reportingNote))]{_id,_rev,title,deploymentScale,measuredOutcomes,reportingNote}',
  )

  if (documents.length === 0) {
    console.log('No case-study metric fields remain.')
    return
  }

  console.log(
    JSON.stringify(
      {
        mode: shouldExecute ? 'execute' : 'dry-run',
        fieldsToUnset,
        documents,
      },
      null,
      2,
    ),
  )

  if (!shouldExecute) {
    console.log('Dry run only. Re-run with --execute to apply these unsets.')
    return
  }

  let transaction = client.transaction()
  for (const document of documents) {
    transaction = transaction.patch(document._id, (patch) =>
      patch.ifRevisionId(document._rev).unset(fieldsToUnset),
    )
  }

  await transaction.commit()
  console.log(`Removed unverified metric fields from ${documents.length} case-study documents.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
