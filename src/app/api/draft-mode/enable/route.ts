import {defineEnableDraftMode} from 'next-sanity/draft-mode';
import {NextResponse} from 'next/server';
import {sanityClient} from '@/sanity/lib/client';

export async function GET(request: Request) {
  const token = process.env.SANITY_PREVIEW_TOKEN;
  if (!token) {
    return NextResponse.json(
      {error: 'Draft Mode is not configured.'},
      {status: 503},
    );
  }

  const handler = defineEnableDraftMode({
    client: sanityClient.withConfig({token, useCdn: false}),
  });

  return handler.GET(request);
}
