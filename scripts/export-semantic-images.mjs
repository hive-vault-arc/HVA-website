import path from 'node:path';
import {mkdir} from 'node:fs/promises';
import sharp from 'sharp';

const root = process.cwd();
const quality = 93;

const ratioVariants = [
  ...['assess', 'reengineer', 'command'].flatMap((name) => [
    {
      source: `assets/image-masters/semantic/r5/arc/${name}.png`,
      output: `public/Images/semantic/arc/${name}-r5-desktop.webp`,
      ratio: [2, 1],
    },
    {
      source: `assets/image-masters/semantic/r5/arc/${name}.png`,
      output: `public/Images/semantic/arc/${name}-r5-mobile.webp`,
      ratio: [8, 5],
    },
  ]),
  ...[
    'strategy-business',
    'technology-consulting',
    'ai-data',
    'software-engineering',
    'cloud-infrastructure',
    'operations-managed',
  ].map((name) => ({
    source: `assets/image-masters/semantic/r5/capabilities/${name}.png`,
    output: `public/Images/semantic/capabilities/${name}-r5.webp`,
    ratio: [16, 9],
  })),
  ...['strategy-technology', 'ai-software', 'cloud-operations'].flatMap(
    (name) => [
      {
        source: `assets/image-masters/semantic/r5/home/${name}.png`,
        output: `public/Images/semantic/home/${name}-r5-desktop.webp`,
        ratio: [2, 1],
      },
      {
        source: `assets/image-masters/semantic/r5/home/${name}.png`,
        output: `public/Images/semantic/home/${name}-r5-mobile.webp`,
        ratio: [16, 9],
      },
    ],
  ),
  ...['assess', 'reengineer', 'command'].flatMap((name) => [
    {
      source: `assets/image-masters/semantic/r3/arc/${name}.png`,
      output: `public/Images/semantic/arc/${name}-r3-desktop.webp`,
      ratio: [2, 1],
    },
    {
      source: `assets/image-masters/semantic/r3/arc/${name}.png`,
      output: `public/Images/semantic/arc/${name}-r3-mobile.webp`,
      ratio: [8, 5],
    },
  ]),
  ...[
    'strategy-business',
    'technology-consulting',
    'ai-data',
    'software-engineering',
    'cloud-infrastructure',
    'operations-managed',
  ].map((name) => ({
    source: `assets/image-masters/semantic/r3/capabilities/${name}.png`,
    output: `public/Images/semantic/capabilities/${name}-r3.webp`,
    ratio: [16, 9],
  })),
  ...[
    'strategy-technology',
    'ai-software',
    'cloud-operations',
    'arc-operating-model',
  ].flatMap((name) => [
    {
      source: `assets/image-masters/semantic/r3/home/${name}.png`,
      output: `public/Images/semantic/home/${name}-r3-desktop.webp`,
      ratio: [2, 1],
    },
    {
      source: `assets/image-masters/semantic/r3/home/${name}.png`,
      output: `public/Images/semantic/home/${name}-r3-mobile.webp`,
      ratio: [16, 9],
    },
  ]),
  ...[
    {name: 'healthcare'},
    {name: 'finance'},
    {name: 'government'},
    {name: 'retail'},
    {name: 'energy'},
    {name: 'logistics', mobilePosition: 'west'},
    {name: 'consumer-luxury'},
  ].flatMap(({name, mobilePosition = 'centre'}) => [
    {
      source: `assets/image-masters/semantic/r3/industries/${name}.png`,
      output: `public/Images/semantic/industries/${name}-r3-desktop.webp`,
      ratio: [16, 7],
    },
    {
      source: `assets/image-masters/semantic/r3/industries/${name}.png`,
      output: `public/Images/semantic/industries/${name}-r3-mobile.webp`,
      ratio: [4, 5],
      position: mobilePosition,
    },
  ]),
  {
    source: 'assets/image-masters/semantic/r3/industries/method.png',
    output: 'public/Images/semantic/industries/method-r3-desktop.webp',
    ratio: [2, 1],
  },
  {
    source: 'assets/image-masters/semantic/r3/industries/method.png',
    output: 'public/Images/semantic/industries/method-r3-mobile.webp',
    ratio: [8, 5],
  },
];

const fixedVariants = [
  {
    source: 'assets/image-masters/semantic/programs/cloud-reliability.png',
    output: 'public/Images/semantic/programs/cloud-reliability-card.webp',
    width: 1672,
    height: 941,
  },
  {
    source: 'assets/image-masters/semantic/programs/cloud-reliability.png',
    output: 'public/Images/semantic/programs/cloud-reliability-square.webp',
    width: 941,
    height: 941,
  },
  {
    source: 'assets/image-masters/semantic/programs/cloud-reliability.png',
    output: 'public/Images/semantic/programs/cloud-reliability-mobile.webp',
    width: 1506,
    height: 941,
  },
];

async function sourceMetadata(source) {
  const metadata = await sharp(source).metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error(`Unable to read dimensions for ${source}`);
  }
  return {width: metadata.width, height: metadata.height};
}

function largestIntegerRatioFrame(sourceWidth, sourceHeight, ratioWidth, ratioHeight) {
  const scale = Math.min(
    Math.floor(sourceWidth / ratioWidth),
    Math.floor(sourceHeight / ratioHeight),
  );
  if (scale < 1) {
    throw new Error(
      `Source ${sourceWidth}x${sourceHeight} is too small for ratio ${ratioWidth}:${ratioHeight}`,
    );
  }
  return {width: ratioWidth * scale, height: ratioHeight * scale};
}

async function exportVariant(variant) {
  const source = path.join(root, variant.source);
  const output = path.join(root, variant.output);
  const sourceSize = await sourceMetadata(source);
  const targetSize = variant.ratio
    ? largestIntegerRatioFrame(
        sourceSize.width,
        sourceSize.height,
        variant.ratio[0],
        variant.ratio[1],
      )
    : {width: variant.width, height: variant.height};

  if (
    !targetSize.width ||
    !targetSize.height ||
    targetSize.width > sourceSize.width ||
    targetSize.height > sourceSize.height
  ) {
    throw new Error(
      `Refusing to upscale ${variant.source}: ${sourceSize.width}x${sourceSize.height} -> ${targetSize.width}x${targetSize.height}`,
    );
  }

  await mkdir(path.dirname(output), {recursive: true});
  await sharp(source)
    .resize({
      width: targetSize.width,
      height: targetSize.height,
      fit: 'cover',
      position: variant.position ?? 'centre',
      withoutEnlargement: true,
      kernel: sharp.kernel.lanczos3,
    })
    .webp({quality, effort: 6, smartSubsample: true})
    .toFile(output);

  console.log(
    `Exported ${variant.output} (${targetSize.width}x${targetSize.height})`,
  );
}

for (const variant of [...ratioVariants, ...fixedVariants]) {
  await exportVariant(variant);
}
