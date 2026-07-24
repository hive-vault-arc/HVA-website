export function isSanityCdnImage(src: string | null | undefined): boolean {
  return typeof src === 'string' && src.startsWith('https://cdn.sanity.io/');
}
