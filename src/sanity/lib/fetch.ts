import type { QueryParams } from 'next-sanity';

import { sanityClient } from './client';

type SanityFetchOptions = {
  query: string;
  params?: QueryParams;
  revalidate?: number;
  tags?: string[];
};

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

