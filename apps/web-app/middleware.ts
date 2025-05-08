import acceptLanguage from 'accept-language';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { type NextRequest, NextResponse } from 'next/server';
import { ALL_LOCALES, cookieName, fallbackLng } from './app/i18n/settings';
import { PATHS } from './config/constants';

acceptLanguage.languages([...ALL_LOCALES]);

const publicPathsRegex = new RegExp(
  // Match root, auth paths, and localized versions of both
  `^(?:/(${ALL_LOCALES.join('|')})?/?(?:$|auth/.*))`
);

function getPreferredLanguage(request: NextRequest): string {
  const cookieLang = request.cookies.get(cookieName)?.value;
  return (
    acceptLanguage.get(cookieLang) ||
    acceptLanguage.get(request.headers.get('Accept-Language')) ||
    fallbackLng
  );
}

/**
 * IMPORTANT: Even though we're wrapping the middleware with `withAuth`, we're not using it
 * to check if the user is authenticated, because it breaks the I18N treatment.
 * That's because NextAuth redirects directly to the configured `signIn` page
 * upon auth failure, skipping the middleware I18N URL rewrites, resulting in a 404
 * for the login page.
 */
export default withAuth(
  async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const prefLang = getPreferredLanguage(request);

    // 1. Check if path is public
    const isPublicPath = publicPathsRegex.test(pathname);
    if (!isPublicPath) {
      const token = await getToken({ req: request });
      if (!token) {
        const loginPath = prefLang === fallbackLng ? PATHS.login : `/${prefLang}${PATHS.login}`;
        return NextResponse.redirect(new URL(loginPath, request.url));
      }
    }

    const pathnameHasLocale = ALL_LOCALES.some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
    // 2. Handle path rewrite to default language for no-locale paths
    if (!pathnameHasLocale) {
      console.log('no valid locale prefix, redirecting to', `/${prefLang}${pathname}`);
      return NextResponse.rewrite(new URL(`/${prefLang}${pathname}`, request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // Skip Next-Auth's built-in auth check, see below comments
      // CAUTION: If you want to use the built-in signIn page, you need to prefix it with a locale
      // to avoid a 404 error.
      // pages: {
      //   signIn: `/en${PATHS.login}`,
      // },
    },
  }
);

export const config = {
  // Match all paths except static assets
  matcher: '/((?!_next/static|_next/image|manifest.json|assets|favicon*|images|logos).*)',
};
