import {NextResponse, type NextRequest} from 'next/server';
import createMiddleware from 'next-intl/middleware';
import {isAppLocale, isPublicLocale} from './i18n/config';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const localeSegment = request.nextUrl.pathname.split('/')[1];

  // Keep paused locales addressable in the route contract without ever letting
  // them execute page code before their reviewed message and CMS releases.
  if (isAppLocale(localeSegment) && !isPublicLocale(localeSegment)) {
    return new NextResponse(null, {status: 404});
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|ai/company|indexnow-key\\.txt|llms(?:-full)?\\.txt|_next|_vercel|.*\\..*).*)',
  ],
};
