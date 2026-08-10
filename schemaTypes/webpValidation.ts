type ImageValue = {
  asset?: {
    _ref?: string
  }
}

export function requireWebpImage(value: ImageValue | null | undefined) {
  const assetReference = value?.asset?._ref
  if (!assetReference) return true

  return (
    assetReference.endsWith('-webp') ||
    'Only WebP images are allowed. Convert the source to WebP before selecting it.'
  )
}
