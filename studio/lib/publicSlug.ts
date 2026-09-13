export type PublicSlug = {current?: string}

/** Accepts Unicode letters/numbers separated by finder-safe single hyphens. */
export function validatePublicSlug(slug?: PublicSlug): true | string {
  const value = slug?.current
  if (!value) return 'Required'
  if (value !== value.normalize('NFC')) return 'Slug must use normalized Unicode characters.'
  if (!/^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u.test(value)) {
    return 'Use letters or numbers separated by single hyphens; spaces, slashes, query markers, fragments, and repeated hyphens are not allowed.'
  }
  return true
}
