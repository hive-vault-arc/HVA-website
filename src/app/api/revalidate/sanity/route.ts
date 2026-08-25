import { revalidateTag } from 'next/cache';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import {APP_LOCALES} from '@/i18n/config';

type SanityWebhookBody = {
  _type?: string;
  language?: string;
  slug?: { current?: string } | string;
  tags?: string[];
};

const listTagByType: Record<string, string> = {
  post: 'posts',
  newsArticle: 'newsArticles',
  perspective: 'perspectives',
  researchReport: 'researchReports',
  caseStudy: 'caseStudies',
  employeeProfile: 'employeeProfiles',
  capability: 'capabilityProfiles',
};

const groupTagByType: Record<string, string> = {
  post: 'insights',
  newsArticle: 'insights',
  perspective: 'insights',
  researchReport: 'insights',
  caseStudy: 'insights',
  employeeProfile: 'people',
  capability: 'capabilities',
};

function slugValue(slug: SanityWebhookBody['slug']): string | undefined {
  if (!slug) return undefined;
  return typeof slug === 'string' ? slug : slug.current;
}

function tagsForPayload(body: SanityWebhookBody): string[] {
  if (Array.isArray(body.tags) && body.tags.length > 0) {
    return Array.from(new Set(body.tags.filter(Boolean)));
  }

  if (body._type === 'translation.metadata') {
    return Array.from(
      new Set([
        'translationMetadata',
        'insights',
        'people',
        'capabilities',
        ...APP_LOCALES.flatMap((locale) =>
          Object.values(listTagByType).map((tag) => `${tag}:${locale}`)
        ),
      ])
    );
  }

  const tags = [body._type ? groupTagByType[body._type] ?? 'insights' : 'insights'];
  const locales = APP_LOCALES.includes(body.language as (typeof APP_LOCALES)[number])
    ? [body.language as (typeof APP_LOCALES)[number]]
    : [...APP_LOCALES];

  if (body._type && listTagByType[body._type]) {
    const listTag = listTagByType[body._type];
    tags.push(listTag, ...locales.map((locale) => `${listTag}:${locale}`));
  }

  const currentSlug = slugValue(body.slug);
  if (body._type && currentSlug) {
    tags.push(
      `${body._type}:${currentSlug}`,
      ...locales.map((locale) => `${body._type}:${locale}:${currentSlug}`)
    );
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

    const payload = body ?? {};
    const tags = tagsForPayload(payload);
    const profile = payload._type === 'caseStudy' ? { expire: 0 } : 'max';
    tags.forEach((tag) => revalidateTag(tag, profile));

    return NextResponse.json({ revalidated: tags });
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
}
