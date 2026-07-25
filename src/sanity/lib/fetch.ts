import 'server-only';

import type { QueryParams } from 'next-sanity';
import {draftMode} from 'next/headers';

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

export function getSanityFetchErrorSummary(error: unknown): string {
  const candidate = error as {
    message?: string;
    cause?: { code?: string };
  };
  const message = candidate?.message?.trim();
  const causeCode = candidate?.cause?.code?.trim();

  return [message, causeCode].filter(Boolean).join(', ') || 'network error';
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

    console.warn(
      `Sanity ${contentLabel} fetch failed (${getSanityFetchErrorSummary(error)}); using local fallback content.`
    );
    return fallback();
  }
}

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 300,
  tags = [],
}: SanityFetchOptions): Promise<QueryResponse> {
  const preview = (await draftMode()).isEnabled;
  const previewToken = process.env.SANITY_PREVIEW_TOKEN;

  if (preview && !previewToken) {
    throw new Error('Draft Mode requires SANITY_PREVIEW_TOKEN.');
  }

  const development = process.env.NODE_ENV !== 'production';
  const directClient = sanityClient.withConfig({useCdn: false});
  const client = preview
    ? sanityClient.withConfig({
        token: previewToken,
        useCdn: false,
        perspective: 'drafts',
      })
    : development
      ? directClient
      : sanityClient;

  const bypassCache = preview || development;
  const requestOptions = bypassCache
    ? ({cache: 'no-store'} as const)
    : {
        next: {
          revalidate,
          ...(tags.length > 0 ? {tags} : {}),
        },
      };

  try {
    return await client.fetch<QueryResponse>(query, {...params, preview}, requestOptions);
  } catch (error) {
    if (preview || !isRecoverableSanityFetchError(error)) throw error;

    const alternateClient = development ? sanityClient : directClient;
    return alternateClient.fetch<QueryResponse>(
      query,
      {...params, preview},
      requestOptions,
    );
  }
}
