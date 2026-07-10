import { describe, expect, it, vi } from 'vitest';
import {
  getSanityFetchErrorSummary,
  isRecoverableSanityFetchError,
  withSanityFallback,
} from './fetch';

describe('Sanity fetch resilience', () => {
  it('recognizes common network failures', () => {
    expect(isRecoverableSanityFetchError(new TypeError('fetch failed'))).toBe(true);
    expect(isRecoverableSanityFetchError({ cause: { code: 'ENOTFOUND' } })).toBe(true);
  });

  it('summarizes network failures without serializing request details', () => {
    expect(
      getSanityFetchErrorSummary({
        message: 'fetch failed',
        cause: { code: 'UND_ERR_CONNECT_TIMEOUT' },
        request: { url: 'https://example.invalid/private-query' },
      })
    ).toBe('fetch failed, UND_ERR_CONNECT_TIMEOUT');
  });

  it('uses fallback content for a network failure', async () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    await expect(
      withSanityFallback(
        async () => {
          throw new TypeError('fetch failed');
        },
        () => ['local'],
        'test content'
      )
    ).resolves.toEqual(['local']);

    expect(warning).toHaveBeenCalledWith(
      'Sanity test content fetch failed (fetch failed); using local fallback content.'
    );
    warning.mockRestore();
  });

  it('does not hide unexpected data or programming errors', async () => {
    const error = new Error('Invalid content shape');

    await expect(
      withSanityFallback(
        async () => {
          throw error;
        },
        () => ['local'],
        'test content'
      )
    ).rejects.toBe(error);
  });
});
