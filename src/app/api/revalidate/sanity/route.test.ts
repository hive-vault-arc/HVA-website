import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

const mocks = vi.hoisted(() => ({
  parseBody: vi.fn(),
  revalidateTag: vi.fn(),
}));

vi.mock('next-sanity/webhook', () => ({
  parseBody: mocks.parseBody,
}));

vi.mock('next/cache', () => ({
  revalidateTag: mocks.revalidateTag,
}));

import {POST} from './route';

const originalSecret = process.env.SANITY_REVALIDATE_SECRET;

function request() {
  return new Request('https://hivevaultarc.com/api/revalidate/sanity', {
    method: 'POST',
    body: JSON.stringify({}),
    headers: {'content-type': 'application/json'},
  });
}

describe('Sanity revalidation webhook', () => {
  beforeEach(() => {
    mocks.parseBody.mockReset();
    mocks.revalidateTag.mockReset();
    process.env.SANITY_REVALIDATE_SECRET = 'test-secret';
  });

  afterEach(() => {
    if (originalSecret === undefined) delete process.env.SANITY_REVALIDATE_SECRET;
    else process.env.SANITY_REVALIDATE_SECRET = originalSecret;
  });

  it('rejects requests when the server secret is missing', async () => {
    delete process.env.SANITY_REVALIDATE_SECRET;
    const response = await POST(request() as never);
    expect(response.status).toBe(500);
    expect(await response.text()).toContain('Missing SANITY_REVALIDATE_SECRET');
  });

  it('rejects an invalid signature without revalidating tags', async () => {
    mocks.parseBody.mockResolvedValue({body: {}, isValidSignature: false});
    const response = await POST(request() as never);
    expect(response.status).toBe(401);
    expect(mocks.revalidateTag).not.toHaveBeenCalled();
  });

  it('revalidates locale and document tags for a valid signature', async () => {
    mocks.parseBody.mockResolvedValue({
      body: {
        _type: 'caseStudy',
        language: 'fr',
        slug: {current: 'transformation-crm'},
      },
      isValidSignature: true,
    });

    const response = await POST(request() as never);
    expect(response.status).toBe(200);
    expect(mocks.revalidateTag).toHaveBeenCalledWith('caseStudies:fr', {expire: 0});
    expect(mocks.revalidateTag).toHaveBeenCalledWith(
      'caseStudy:fr:transformation-crm',
      {expire: 0},
    );
  });

  it('invalidates both locales when translation metadata changes', async () => {
    mocks.parseBody.mockResolvedValue({
      body: {_type: 'translation.metadata'},
      isValidSignature: true,
    });

    const response = await POST(request() as never);
    expect(response.status).toBe(200);
    expect(mocks.revalidateTag).toHaveBeenCalledWith('caseStudies:en', 'max');
    expect(mocks.revalidateTag).toHaveBeenCalledWith('caseStudies:fr', 'max');
    expect(mocks.revalidateTag).toHaveBeenCalledWith('translationMetadata', 'max');
  });

  it('invalidates route-bound optimization tags for one locale', async () => {
    mocks.parseBody.mockResolvedValue({
      body: {_type: 'pageOptimization', language: 'ar'},
      isValidSignature: true,
    });

    const response = await POST(request() as never);
    expect(response.status).toBe(200);
    expect(mocks.revalidateTag).toHaveBeenCalledWith('pageOptimizations:ar', 'max');
  });

  it('invalidates company entity consumers when approved facts change', async () => {
    mocks.parseBody.mockResolvedValue({
      body: {_type: 'organizationProfile'},
      isValidSignature: true,
    });

    const response = await POST(request() as never);
    expect(response.status).toBe(200);
    expect(mocks.revalidateTag).toHaveBeenCalledWith('companyEntity', 'max');
  });
});
