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
    code?: string;
    isNetworkError?: boolean;
    message?: string;
    cause?: unknown;
    errors?: unknown[];
  };
  const code = candidate?.code ?? '';

  return Boolean(
    candidate?.isNetworkError ||
      candidate?.message?.toLowerCase().includes('fetch failed') ||
      candidate?.message?.toLowerCase().includes('socket timed out') ||
      code.startsWith('UND_') ||
      [
        'ECONNRESET',
        'ECONNREFUSED',
        'ENETUNREACH',
        'ENOTFOUND',
        'ESOCKETTIMEDOUT',
        'ETIMEDOUT',
      ].includes(code) ||
      (candidate?.cause !== undefined &&
        isRecoverableSanityFetchError(candidate.cause)) ||
      candidate?.errors?.some(isRecoverableSanityFetchError)
  );
}

export function getSanityFetchErrorSummary(error: unknown): string {
  const candidate = error as {
    code?: string;
    message?: string;
    cause?: { code?: string };
  };
  const message = candidate?.message?.trim();
  const code = candidate?.code?.trim() ?? candidate?.cause?.code?.trim();

  return [message, code].filter(Boolean).join(', ') || 'network error';
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
    : sanityClient;

  // Public content should use the same short-lived Next data cache in local
  // development as it does in production. Forcing `no-store` here made every
  // navigation repeat the Sanity round trip and amplified transient network
  // failures. Draft Mode remains uncached so editorial previews stay live.
  const bypassCache = preview;
  const effectiveRevalidate = development ? Math.min(revalidate, 30) : revalidate;
  const requestOptions = bypassCache
    ? ({cache: 'no-store'} as const)
    : {
        next: {
          revalidate: effectiveRevalidate,
          ...(tags.length > 0 ? {tags} : {}),
        },
      };

  try {
    return await client.fetch<QueryResponse>(query, {...params, preview}, requestOptions);
  } catch (error) {
    if (
      preview ||
      development ||
      !isRecoverableSanityFetchError(error)
    ) {
      throw error;
    }

    return directClient.fetch<QueryResponse>(
      query,
      {...params, preview},
      requestOptions,
    );
  }
}
