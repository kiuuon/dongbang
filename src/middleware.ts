import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const referer = req.headers.get('referer');
  const userAgent = req.headers.get('user-agent') || '';
  const isRNWebView = userAgent.includes('rn-webview');

  if (isRNWebView) {
    return NextResponse.next();
  }

  if (pathname === '/sign-up/info') {
    if (!referer || !referer.includes(`${req.nextUrl.origin}/sign-up/terms`)) {
      return NextResponse.redirect(new URL('/sign-up/terms', req.url));
    }
  }

  if (pathname === '/sign-up/complete') {
    if (!referer || !referer.includes(`${req.nextUrl.origin}/sign-up/info`)) {
      return NextResponse.redirect(new URL('/sign-up/terms', req.url));
    }
  }

  if (pathname === '/club/create/campus/detail') {
    if (!referer || !referer.includes(`${req.nextUrl.origin}/club/create/campus/info`)) {
      return NextResponse.redirect(new URL('/club/create/campus/info', req.url));
    }
  }

  if (pathname === '/club/create/union/detail') {
    if (!referer || !referer.includes(`${req.nextUrl.origin}/club/create/union/info`)) {
      return NextResponse.redirect(new URL('/club/create/union/info', req.url));
    }
  }

  return NextResponse.next();
}
