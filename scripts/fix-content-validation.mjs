import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-07-01'})

const aiAgentsExcerpt =
  'AI agents are already moving from experiments into production. Companies that delay risk compounding operational disadvantages, while Moroccan businesses still have time to adopt deliberately and build a practical lead.'

const nvidiaClosingParagraph =
  'The practical takeaway is clear: the local AI era is no longer only a hobbyist workstation story. It is moving into everyday PCs. The firms that prepare now, with a local model strategy, data governance, agent permissions, and secure workflow design, will be better positioned when this hardware becomes available in the fall.'

const documentFixes = [
  {
    id: 'IuK2abzZBGOYd51ySRR22p',
    fields: [
      {
        path: 'excerpt',
        from: "The global AI agent market is projected to reach $103.6 billion by 2032, and 52% of executives have already deployed agents in production. Companies that delay are not staying neutral — they are falling behind competitors who are compounding operational advantages every month. This article makes the case for why 2026 is the year to act, and how Morocco's businesses can position themselves as smart followers rather than permanent laggards.",
        to: aiAgentsExcerpt,
      },
      {
        path: 'seo.description',
        from: "The global AI agent market is projected to reach $103.6 billion by 2032, and 52% of executives have already deployed agents in production. Companies that delay are not staying neutral — they are falling behind competitors who are compounding operational advantages every month. This article makes the case for why 2026 is the year to act, and how Morocco's businesses can position themselves as smart followers rather than permanent laggards.",
        to: 'Why 2026 is the moment to adopt AI agents, and how Moroccan companies can move from experimentation to practical, production-ready automation.',
      },
    ],
  },
  {
    id: 'C9kRM0yIrVzAHS6D3Ehr95',
    fields: [
      {
        path: 'seo.description',
        from: 'Generic SaaS tools are fast to start but slow to scale. Industry research from Forrester, McKinsey, Deloitte, and HIMSS shows that custom digital solutions consistently deliver higher ROI, lower long-term cost, and measurable operational improvements across real estate, healthcare, construction, and beyond.',
        to: 'Why custom digital solutions can outperform generic SaaS on fit, long-term cost, integration, and measurable operations across growing businesses.',
      },
    ],
  },
  {
    id: 'IuK2abzZBGOYd51ySRQRhv',
    fields: [
      {
        path: 'seo.title',
        from: 'The Onboarding Tax: Why 50% of Your App Revenue Is Decided Before Users Touch a Single Feature',
        to: 'The Onboarding Tax: How First-Run UX Shapes Revenue',
      },
      {
        path: 'seo.description',
        from: 'Research shows that up to 50% of app conversions are decided during onboarding — before users ever reach the core product. Yet most developers treat onboarding as an afterthought. Here are the four rules that separate apps that triple revenue from apps that leave it on the table.',
        to: 'Why onboarding shapes app conversion, retention, and revenue before users reach the core product, plus four rules for designing a stronger first run.',
      },
    ],
  },
  {
    id: 'gg7RnZRpI6fQeqXVUf0jQW',
    fields: [
      {
        path: 'seo.description',
        from: 'Agentic AI systems that can plan, reason, and act autonomously are the next major shift in enterprise technology. Backed by Gartner, McKinsey, and PwC research, we explore what this means for businesses in Morocco and how to get ahead.',
        to: 'How agentic AI systems plan, reason, and act, what autonomous workflows mean for Moroccan businesses, and how leaders can prepare responsibly.',
      },
    ],
  },
  {
    id: 'gg7RnZRpI6fQeqXVUf10ju',
    fields: [
      {
        path: 'seo.description',
        from: 'WhatsApp handles more customer conversations in Morocco than email, phone, and live chat combined. Yet most businesses still manage it manually — missing leads, delaying responses, losing sales. Here is how WhatsApp AI chatbots work, what they cost, and how to deploy one for your business.',
        to: 'How Moroccan businesses can use WhatsApp AI chatbots to respond faster, qualify leads, reduce missed inquiries, and connect customer operations.',
      },
    ],
  },
  {
    id: 'MbOBprsinTQIhTfttRtdkD',
    fields: [
      {
        path: 'seo.title',
        from: 'Software Engineering & Product Development | Hive Vault Arc Capabilities',
        to: 'Software Engineering & Product | Hive Vault Arc',
      },
    ],
  },
  ...['gg7RnZRpI6fQeqXVUf17Rb', 'drafts.gg7RnZRpI6fQeqXVUf17Rb'].map((id) => ({
    id,
    fields: [
      {
        path: 'seo.title',
        from: 'NVIDIA RTX Spark: The Local AI Superchip That Could Change Private Agents',
        to: 'NVIDIA RTX Spark: Local AI for Private Agents',
      },
      {
        path: 'sections[_key=="section_017"].content',
        from: 'What H.V.A Is Watching',
        to: 'What Hive Vault Arc Is Watching',
      },
      {
        path: 'sections[_key=="section_020"].content',
        from: 'The practical takeaway is clear: the local AI era is no longer only a hobbyist workstation story. It is moving into everyday PCs. The firms that prepare now - with local model strategy, data governance, agent permissions, and secure workflow design - will be better positioned when this hardware becomes available in the fall.',
        to: nvidiaClosingParagraph,
      },
    ],
  })),
]

function getValue(document, path) {
  const sectionMatch = /^sections\[_key=="([^"]+)"\]\.content$/.exec(path)
  if (sectionMatch) {
    return document.sections?.find((section) => section._key === sectionMatch[1])?.content
  }

  return path.split('.').reduce((value, key) => value?.[key], document)
}

async function main() {
  const documents = await Promise.all(
    documentFixes.map(async (fix) => ({fix, document: await client.getDocument(fix.id)})),
  )
  let transaction = client.transaction()
  let changedDocuments = 0

  for (const {fix, document} of documents) {
    if (!document) {
      throw new Error(`Missing document: ${fix.id}`)
    }

    const fieldsToSet = {}

    for (const field of fix.fields) {
      const current = getValue(document, field.path)

      if (current === field.to) {
        continue
      }

      if (current !== field.from) {
        throw new Error(
          `${fix.id} has unexpected content at ${field.path}; refusing to overwrite it.`,
        )
      }

      fieldsToSet[field.path] = field.to
    }

    if (Object.keys(fieldsToSet).length === 0) {
      continue
    }

    transaction = transaction.patch(fix.id, (patch) =>
      patch.ifRevisionId(document._rev).set(fieldsToSet),
    )
    changedDocuments += 1
  }

  if (changedDocuments === 0) {
    console.log('Content already satisfies the validation-length and naming fixes.')
    return
  }

  await transaction.commit()
  console.log(`Updated ${changedDocuments} documents.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
