import path from 'node:path';
import sharp from 'sharp';

const projectRoot = process.cwd();
const assetRoot = path.resolve(
  projectRoot,
  '..',
  '..',
  '..',
  '..',
  'Documents',
  'the vault',
  'Company',
  'Presence',
  'website-assets',
  'project-showcases',
  'healthcare-ai-receptionist-demo',
  'renders',
);

const desktop = path.join(
  assetRoot,
  'review',
  '2026-08-13-dark-appointments-table',
  'ai-receptionist-appointments-dark-table-review.png',
);
const phone = path.join(assetRoot, 'healthcare-ai-receptionist-whatsapp-iphone.png');
const output = path.join(
  projectRoot,
  'public',
  'Images',
  'case-studies',
  'healthcare-ai-receptionist-crm.webp',
);

const width = 1600;
const height = 900;
const phoneHeight = 820;
const phoneWidth = Math.round((1200 / 2240) * phoneHeight);
const phoneLeft = width - phoneWidth - 44;
const phoneTop = 40;

const backdrop = Buffer.from(
  `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" fill="#050d16" opacity="0.08"/>
  </svg>`,
);

await sharp(desktop)
  .resize(width, height, {fit: 'cover'})
  .composite([
    {input: backdrop, blend: 'over'},
    {
      input: await sharp(phone).resize({height: phoneHeight}).png().toBuffer(),
      left: phoneLeft,
      top: phoneTop,
      blend: 'over',
    },
  ])
  .webp({quality: 88, effort: 6})
  .toFile(output);

console.log(`Wrote ${output}`);
