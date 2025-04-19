import acceptLanguage from 'accept-language';
import { NextRequest, NextResponse } from 'next/server';

import { ALL_LOCALES, cookieName, fallbackLng } from './app/i18n/settings';

acceptLanguage.languages([...ALL_LOCALES]);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Determine preferred language
  const prefLang = getPreferredLanguage(request);

  // Check if the path contains a supported locale
  const pathContainsSupportedLocale = ALL_LOCALES.some((locale) => isLocalePath(pathname, locale));

  // Redirect if the path explicitly includes the fallback language
  if (isLocalePath(pathname, fallbackLng)) {
    return NextResponse.redirect(
      new URL(
        pathname.replace(`/${fallbackLng}`, pathname === `/${fallbackLng}` ? '/' : ''),
        request.url
      )
    );
  }

  // Rewrite or redirect if no supported locale is found in the path
  if (!pathContainsSupportedLocale) {
    return prefLang === fallbackLng
      ? NextResponse.rewrite(new URL(`/${prefLang}${pathname}`, request.url))
      : NextResponse.redirect(new URL(`/${prefLang}${pathname}`, request.url));
  }

  return NextResponse.next();
}

function getPreferredLanguage(request: NextRequest): string {
  const cookieLang = request.cookies.get(cookieName)?.value;
  return (
    acceptLanguage.get(cookieLang) ||
    acceptLanguage.get(request.headers.get('Accept-Language')) ||
    fallbackLng
  );
}

function isLocalePath(path: string, locale: string): boolean {
  return path.startsWith(`/${locale}/`) || path === `/${locale}`;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|manifest.json|assets|favicon*|images|logos).*)',
};
