import acceptLanguage from 'accept-language';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { type NextRequest, NextResponse } from 'next/server';
import { ALL_LOCALES, cookieName, fallbackLng } from './app/i18n/settings';
import { PATHS } from './config/constants';

acceptLanguage.languages([...ALL_LOCALES]);

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

    // TODO: once we have protected API, this needs to change
    // Skip locale handling only for api routes
    if (pathname.startsWith('/api/')) {
      return NextResponse.next();
    }

    // Check for / and both /auth/ and /{lang}/auth/ patterns
    const isPublicPath =
      pathname === '/' || pathname.startsWith('/auth/') || /^\/[a-z]{2}\/auth\//.test(pathname);

    // Handle language detection
    const prefLang = getPreferredLanguage(request);

    // Handle auth check before locale handling
    if (!isPublicPath) {
      const token = await getToken({ req: request });
      if (!token) {
        // Need to redirect to localized login path
        return NextResponse.redirect(new URL(`/${prefLang}${PATHS.login}`, request.url));
      }
    }

    // If the path doesn't start with a locale, add one
    if (!ALL_LOCALES.some((locale) => pathname.startsWith(`/${locale}`))) {
      return NextResponse.rewrite(new URL(`/${prefLang}${pathname}`, request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized() {
        return true; // Skip Next-Auth's built-in auth check
      },
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
