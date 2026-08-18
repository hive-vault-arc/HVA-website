import {createReadStream, readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {createClient} from 'next-sanity';

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8')
    .split(/\r?\n/)
    .flatMap((line) => {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)\s*$/);
      return match ? [[match[1], match[2]]] : [];
    }),
);

const token = env.SANITY_API_WRITE_TOKEN;
if (!token || token === 'PASTE_NEW_TOKEN_HERE') {
  throw new Error('Missing SANITY_API_WRITE_TOKEN in .env.local.');
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-07-01',
  token,
  useCdn: false,
});

const imageDirectory = resolve('public/Images/insights/editorial');
const topicFiles = {
  'ai-operational-systems': 'ai-operational-systems-2400x1350.webp',
  'custom-software-automation': 'custom-software-automation-2400x1350.webp',
  'real-estate-construction': 'real-estate-construction-2400x1350.webp',
  'morocco-north-africa-transformation':
    'morocco-north-africa-transformation-2400x1350.webp',
  'data-cloud-reliability': 'data-cloud-reliability-2400x1350.webp',
};

// This follows the frontend's legacy taxonomy until the Studio schema has
// editorial topics. Case studies are intentionally excluded from this map.
const slugTopics = {
  'agentic-ai-autonomous-revolution': 'ai-operational-systems',
  'custom-digital-solutions-business-transformation': 'custom-software-automation',
  'app-onboarding-conversion-revenue': 'custom-software-automation',
  'whatsapp-ai-chatbot-morocco-business-guide':
    'morocco-north-africa-transformation',
  'why-companies-must-integrate-ai-agents-2025': 'ai-operational-systems',
  'nvidia-rtx-spark-local-ai-superchip-private-agents':
    'ai-operational-systems',
  'consulting-engineering-one-loop': 'custom-software-automation',
  'fix-the-workflow-before-ai': 'ai-operational-systems',
  'ai-operations-benchmark-response-conversion': 'ai-operational-systems',
  'digital-transformation-execution-patterns-mid-market':
    'morocco-north-africa-transformation',
  'cloud-reliability-readiness-index-2026': 'data-cloud-reliability',
};

const assetNames = Object.values(topicFiles);
const existingAssets = await client.fetch(
  '*[_type == "sanity.imageAsset" && originalFilename in $assetNames]{_id, originalFilename}',
  {assetNames},
);
const assetsByFilename = new Map(
  existingAssets.map((asset) => [asset.originalFilename, asset]),
);

const assetResults = [];
for (const [topic, filename] of Object.entries(topicFiles)) {
  let asset = assetsByFilename.get(filename);
  if (asset) {
    assetResults.push({topic, filename, assetId: asset._id, action: 'reused'});
    continue;
  }

  asset = await client.assets.upload(
    'image',
    createReadStream(resolve(imageDirectory, filename)),
    {filename, contentType: 'image/webp'},
  );
  assetsByFilename.set(filename, asset);
  assetResults.push({topic, filename, assetId: asset._id, action: 'uploaded'});
}

const records = await client.fetch(
  '*[_type in ["post", "newsArticle", "perspective", "researchReport"]]{_id, _type, language, title, "slug": slug.current}',
);

const draftUpdates = [];
for (const record of records) {
  const topic = slugTopics[record.slug];
  if (!topic) continue;

  const asset = assetsByFilename.get(topicFiles[topic]);
  const draftId = record._id.startsWith('drafts.')
    ? record._id
    : `drafts.${record._id}`;

  const published = await client.getDocument(record._id);
  if (!published) {
    throw new Error(`Published document not found: ${record._id}`);
  }

  const {
    _id: publishedId,
    _rev,
    _createdAt,
    _updatedAt,
    ...draftBody
  } = published;
  const coverImage = {
    _type: 'image',
    asset: {_type: 'reference', _ref: asset._id},
  };

  await client
    .transaction()
    .createIfNotExists({...draftBody, _id: draftId, coverImage})
    .patch(draftId, (patch) => patch.set({coverImage}))
    .commit();

  draftUpdates.push({
    documentId: record._id,
    draftId,
    type: record._type,
    language: record.language,
    slug: record.slug,
    topic,
    assetId: asset._id,
  });
}

console.log(
  JSON.stringify(
    {
      dataset: env.NEXT_PUBLIC_SANITY_DATASET,
      assets: assetResults,
      draftUpdates,
      caseStudiesChanged: 0,
      publishedDocumentsChanged: 0,
    },
    null,
    2,
  ),
);
