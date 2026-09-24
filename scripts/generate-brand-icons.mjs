import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const source = path.join(
  root,
  'public',
  'Images',
  'brand',
  'hva-rostex-wordmark-stacked.svg',
);
const publicOutput = path.join(root, 'public', 'Images', 'favico');
const faviconOutput = path.join(root, 'src', 'app', 'favicon.ico');
const white = {r: 255, g: 255, b: 255, alpha: 1};

const trimmedLogo = await sharp(source)
  .ensureAlpha()
  .trim({background: {r: 0, g: 0, b: 0, alpha: 0}})
  .png()
  .toBuffer();

async function renderSquare(size, contentScale, format = 'webp') {
  const contentWidth = Math.max(1, Math.round(size * contentScale));
  const content = await sharp(trimmedLogo)
    .resize({width: contentWidth, withoutEnlargement: false})
    .png()
    .toBuffer();

  const pipeline = sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: white,
    },
  }).composite([{input: content, gravity: 'centre'}]);

  return format === 'png'
    ? pipeline.png({compressionLevel: 9}).toBuffer()
    : pipeline.webp({lossless: true, effort: 6}).toBuffer();
}

function buildIco(entries) {
  const headerSize = 6;
  const directorySize = entries.length * 16;
  let dataOffset = headerSize + directorySize;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  const directory = Buffer.alloc(directorySize);
  entries.forEach(({size, data}, index) => {
    const offset = index * 16;
    directory.writeUInt8(size === 256 ? 0 : size, offset);
    directory.writeUInt8(size === 256 ? 0 : size, offset + 1);
    directory.writeUInt8(0, offset + 2);
    directory.writeUInt8(0, offset + 3);
    directory.writeUInt16LE(1, offset + 4);
    directory.writeUInt16LE(32, offset + 6);
    directory.writeUInt32LE(data.length, offset + 8);
    directory.writeUInt32LE(dataOffset, offset + 12);
    dataOffset += data.length;
  });

  return Buffer.concat([header, directory, ...entries.map(({data}) => data)]);
}

await mkdir(publicOutput, {recursive: true});

const webpTargets = [
  ['favicon-16x16.webp', 16, 0.9],
  ['favicon-32x32.webp', 32, 0.9],
  ['favicon-48x48.webp', 48, 0.9],
  ['favicon-96x96.webp', 96, 0.86],
  ['apple-touch-icon.webp', 180, 0.72],
  ['android-chrome-192x192.webp', 192, 0.72],
  ['android-chrome-512x512.webp', 512, 0.72],
  ['logo.webp', 512, 0.72],
];

for (const [filename, size, scale] of webpTargets) {
  await writeFile(
    path.join(publicOutput, filename),
    await renderSquare(size, scale),
  );
}

const icoEntries = await Promise.all(
  [16, 32, 48].map(async (size) => ({
    size,
    data: await renderSquare(size, 0.9, 'png'),
  })),
);
await writeFile(faviconOutput, buildIco(icoEntries));

console.log('Generated Rostex favicon and app-icon derivatives.');
