import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

import { sanityDataset, sanityProjectId } from '../env';

const imageUrlBuilder = createImageUrlBuilder({
  projectId: sanityProjectId,
  dataset: sanityDataset,
});

export function urlForImage(source: SanityImageSource) {
  return imageUrlBuilder.image(source);
}

