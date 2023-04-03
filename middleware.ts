import { NextRequest, NextResponse } from 'next/server';

const blocklist: string[] = ['got (https://github.com/sindresorhus/got)'];

const redirect = new URL('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';

  if (blocklist.includes(userAgent)) {
    return NextResponse.redirect(redirect);
  }

  return NextResponse.next();
}
