import path from 'node:path';
import {mkdir} from 'node:fs/promises';
import sharp from 'sharp';

const root = process.cwd();

const editorialImages = [
  {
    source: 'assets/image-masters/home/arc-operating-model-session.png',
    output: 'public/Images/home/arc-operating-model-session.webp',
  },
  {
    source: 'assets/image-masters/home/strategy-technology-consulting.png',
    output: 'public/Images/home/capabilities/strategy-technology-consulting.webp',
  },
  {
    source: 'assets/image-masters/home/ai-software-engineering.png',
    output: 'public/Images/home/capabilities/ai-software-engineering.webp',
  },
  {
    source: 'assets/image-masters/home/cloud-managed-operations.png',
    output: 'public/Images/home/capabilities/cloud-managed-operations.webp',
  },
];

for (const image of editorialImages) {
  const source = path.join(root, image.source);
  const output = path.join(root, image.output);

  await mkdir(path.dirname(output), {recursive: true});
  await sharp(source)
    .webp({quality: 94, effort: 6, smartSubsample: true})
    .toFile(output);

  console.log(`Exported ${image.output}`);
}
