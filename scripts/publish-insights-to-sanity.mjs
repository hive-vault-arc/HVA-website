import {readFileSync} from 'node:fs';
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
  perspective: 'raw',
});

const filenames = [
  'ai-operational-systems-2400x1350.webp',
  'custom-software-automation-2400x1350.webp',
  'real-estate-construction-2400x1350.webp',
  'morocco-north-africa-transformation-2400x1350.webp',
  'data-cloud-reliability-2400x1350.webp',
];

const assets = await client.fetch(
  '*[_type == "sanity.imageAsset" && originalFilename in $filenames]{_id, originalFilename}',
  {filenames},
);
const assetIds = assets.map((asset) => asset._id);

const draftRecords = await client.fetch(
  '*[_type in ["post", "newsArticle", "perspective", "researchReport"] && defined(coverImage.asset._ref) && coverImage.asset._ref in $assetIds]{_id, _type, language, "slug": slug.current, "coverRef": coverImage.asset._ref}',
  {assetIds},
);

const draftIds = draftRecords
  .map((record) => record._id)
  .filter((id) => id.startsWith('drafts.'));

for (const draftId of draftIds) {
  const publishedId = draftId.replace(/^drafts\./, '');
  await client.action({
    actionType: 'sanity.action.document.publish',
    publishedId,
    draftId,
  });
}

console.log(
  JSON.stringify(
    {
      dataset: env.NEXT_PUBLIC_SANITY_DATASET,
      assetCount: assets.length,
      publishedCount: draftIds.length,
      publishedDocuments: draftRecords
        .filter((record) => draftIds.includes(record._id))
        .map(({_id, _type, language, slug, coverRef}) => ({
          documentId: _id.replace(/^drafts\./, ''),
          type: _type,
          language,
          slug,
          coverRef,
        })),
    },
    null,
    2,
  ),
);
