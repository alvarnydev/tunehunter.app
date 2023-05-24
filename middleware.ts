import { NextRequest, NextResponse } from 'next/server';
import { i18n } from './i18n-config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathLang = pathname.split('/')[1];

  // For default language: use a rewrite so that Next will still match the code
  const pathnameIsMissingLanguage = i18n.languages.every((language) => pathLang !== `${language}`);
  if (pathnameIsMissingLanguage) {
    return NextResponse.rewrite(new URL(`/${i18n.defaultLanguage}${pathname}`, request.url));
  }
}

export const config = {
  matcher: [
    // Skip these paths:
    '/((?!api|_next/static|_next/image|assets|favicon.ico).*)',
  ],
};
