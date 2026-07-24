import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/((?!api|ai/company|indexnow-key\\.txt|llms(?:-full)?\\.txt|_next|_vercel|.*\\..*).*)',
  ],
};
