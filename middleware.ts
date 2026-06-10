import { NextRequest, NextResponse } from 'next/server';

const CANONICAL_HOST = 'forge-future.com';

export function middleware(request: NextRequest) {
  const proto = request.headers.get('x-forwarded-proto');
  const host = request.headers.get('host') ?? '';

  if (host.startsWith('localhost') || host.startsWith('127.0.0.1')) {
    return NextResponse.next();
  }

  if (proto === 'http') {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    url.host = host.startsWith('www.') ? CANONICAL_HOST : host;
    return NextResponse.redirect(url, 308);
  }

  if (host === `www.${CANONICAL_HOST}`) {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
