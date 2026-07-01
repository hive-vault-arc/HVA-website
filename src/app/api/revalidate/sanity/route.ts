import { revalidateTag } from 'next/cache';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

type SanityWebhookBody = {
  _type?: string;
  slug?: { current?: string } | string;
  tags?: string[];
};

const listTagByType: Record<string, string> = {
  post: 'posts',
  newsArticle: 'newsArticles',
  perspective: 'perspectives',
  researchReport: 'researchReports',
  caseStudy: 'caseStudies',
};

function slugValue(slug: SanityWebhookBody['slug']): string | undefined {
  if (!slug) return undefined;
  return typeof slug === 'string' ? slug : slug.current;
}

function tagsForPayload(body: SanityWebhookBody): string[] {
  if (Array.isArray(body.tags) && body.tags.length > 0) {
    return Array.from(new Set(body.tags.filter(Boolean)));
  }

  const tags = ['insights'];

  if (body._type && listTagByType[body._type]) {
    tags.push(listTagByType[body._type]);
  }

  const currentSlug = slugValue(body.slug);
  if (body._type && currentSlug) {
    tags.push(`${body._type}:${currentSlug}`);
  }

  return Array.from(new Set(tags));
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return new Response('Missing SANITY_REVALIDATE_SECRET', { status: 500 });
  }

  try {
    const { body, isValidSignature } = await parseBody<SanityWebhookBody>(
      request,
      secret,
      true
    );

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 });
    }

    const tags = tagsForPayload(body ?? {});
    tags.forEach((tag) => revalidateTag(tag, 'max'));

    return NextResponse.json({ revalidated: tags });
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
}
