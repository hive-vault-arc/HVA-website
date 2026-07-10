import type { QueryParams } from 'next-sanity';

import { sanityClient } from './client';

type SanityFetchOptions = {
  query: string;
  params?: QueryParams;
  revalidate?: number;
  tags?: string[];
};

export function isRecoverableSanityFetchError(error: unknown): boolean {
  const candidate = error as {
    isNetworkError?: boolean;
    message?: string;
    cause?: { code?: string };
  };
  const causeCode = candidate?.cause?.code ?? '';

  return Boolean(
    candidate?.isNetworkError ||
      candidate?.message?.toLowerCase().includes('fetch failed') ||
      causeCode.startsWith('UND_') ||
      ['ECONNRESET', 'ECONNREFUSED', 'ENOTFOUND', 'ETIMEDOUT'].includes(causeCode)
  );
}

export async function withSanityFallback<T>(
  operation: () => Promise<T>,
  fallback: () => T | Promise<T>,
  contentLabel: string
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (!isRecoverableSanityFetchError(error)) throw error;

    console.warn(`Sanity ${contentLabel} fetch failed; using local fallback content.`, error);
    return fallback();
  }
}

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 300,
  tags = [],
}: SanityFetchOptions): Promise<QueryResponse> {
  return sanityClient.fetch<QueryResponse>(query, params, {
    next: {
      revalidate,
      ...(tags.length > 0 ? { tags } : {}),
    },
  });
}
