import {NextResponse} from 'next/server';

/**
 * Some browsers request this legacy filename directly. Keep it outside the
 * locale segment so it cannot be interpreted as a locale route.
 */
export function GET(request: Request) {
  const target = ['/', 'favicon', '.', 'ico'].join('');
  return NextResponse.redirect(new URL(target, request.url), 308);
}
