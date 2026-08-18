import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import sharp from 'sharp';
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

const sourceDirectory = resolve(
  'C:/Users/aliam/Documents/the vault/Company/Presence/website-assets/project-showcases/hva-partner-proof-pack/cover-screen-assets',
);

const covers = {
  'multilingual-whatsapp-ai-agent': {
    source: 'immoworld-whatsapp-ai-screen.png',
    filename: 'hva-case-cover-multilingual-whatsapp-ai-agent-wide.webp',
    resize: {width: 1672, height: 941, fit: 'cover', position: 'top'},
    alt: {
      en: 'WhatsApp AI lead operations interface with multilingual conversations and workflow controls',
      fr: 'Interface d’operations de leads par WhatsApp avec conversations multilingues et controles de workflow',
    },
  },
  'top-tier-crm-transformation-program-real-estate-operations': {
    source: 'immoworld-projects-screen.png',
    filename: 'hva-case-cover-immoworld-crm-operations.webp',
    alt: {
      en: 'ImmoWorld real estate projects and operations dashboard',
      fr: 'Tableau de bord des projets et des operations immobilieres d’ImmoWorld',
    },
  },
  'premium-advice-training-keepzen-digital-academy': {
    source: 'premium-advice-courses-desktop-screen.png',
    filename: 'hva-case-cover-premium-advice-keepzen-academy.webp',
    alt: {
      en: 'Premium Advice and KeepZen digital academy course platform',
      fr: 'Plateforme de cours de l’academie numerique Premium Advice et KeepZen',
    },
  },
  'tarik-rami-immobilier': {
    source: 'tarik-rami-properties-screen.png',
    filename: 'hva-case-cover-tarik-rami-immobilier.webp',
    alt: {
      en: 'Tarik Rami Immobilier property projects dashboard',
      fr: 'Tableau de bord des projets immobiliers de Tarik Rami Immobilier',
    },
  },
};

const slugs = Object.keys(covers);
const records = await client.fetch(
  `*[_type == "caseStudy" && slug.current in $slugs && language in ["en", "fr"]]{
    _id,
    _rev,
    language,
    "slug": slug.current,
    title,
    "draftExists": defined(*[_id == ("drafts." + ^._id)][0]._id)
  }`,
  {slugs},
);

const recordKeys = new Set(records.map((record) => `${record.slug}:${record.language}`));
for (const slug of slugs) {
  for (const language of ['en', 'fr']) {
    if (!recordKeys.has(`${slug}:${language}`)) {
      throw new Error(`Missing Sanity case-study document for ${slug} (${language}).`);
    }
  }
}

const assets = new Map();
const assetResults = [];
for (const [slug, cover] of Object.entries(covers)) {
  const sourcePath = resolve(sourceDirectory, cover.source);
  const existing = await client.fetch(
    '*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id, originalFilename}',
    {filename: cover.filename},
  );

  if (existing) {
    assets.set(slug, existing);
    assetResults.push({slug, filename: cover.filename, assetId: existing._id, action: 'reused'});
    continue;
  }

  const image = cover.resize ? sharp(sourcePath).resize(cover.resize) : sharp(sourcePath);
  const buffer = await image.webp({quality: 92, effort: 4}).toBuffer();
  const uploaded = await client.assets.upload('image', buffer, {
    filename: cover.filename,
    contentType: 'image/webp',
  });
  assets.set(slug, uploaded);
  assetResults.push({slug, filename: cover.filename, assetId: uploaded._id, action: 'uploaded'});
}

const updates = [];
for (const record of records) {
  const cover = covers[record.slug];
  const asset = assets.get(record.slug);
  const alt = cover.alt[record.language] ?? cover.alt.en;
  const coverImage = {
    _type: 'image',
    asset: {_type: 'reference', _ref: asset._id},
  };

  await client
    .patch(record._id)
    .ifRevisionId(record._rev)
    .set({
      'assets.coverImage': coverImage,
      'assets.coverAlt': alt,
    })
    .commit();

  updates.push({
    documentId: record._id,
    slug: record.slug,
    language: record.language,
    title: record.title,
    assetId: asset._id,
    alt,
    draftExists: record.draftExists,
    publication: 'published-document-patched',
  });
}

console.log(
  JSON.stringify(
    {
      dataset: env.NEXT_PUBLIC_SANITY_DATASET,
      covers: assetResults,
      updatedDocuments: updates,
      note: 'Only assets.coverImage and assets.coverAlt were changed. Project detail media and copy were not changed.',
    },
    null,
    2,
  ),
);
