import {draftMode} from 'next/headers';
import {NextResponse} from 'next/server';

export async function GET(request: Request) {
  const mode = await draftMode();
  mode.disable();

  const requestUrl = new URL(request.url);
  const redirect = requestUrl.searchParams.get('redirect');
  const safeRedirect = redirect?.startsWith('/') && !redirect.startsWith('//') ? redirect : '/';

  return NextResponse.redirect(new URL(safeRedirect, requestUrl.origin));
}
