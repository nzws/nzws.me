import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '~/utils/constants';

export const runtime = 'experimental-edge';

export async function GET(request: NextRequest) {
  const params = new URLSearchParams(request.nextUrl.search.substring(1));
  const q = params.get('q');
  if (!q) {
    return NextResponse.json([]);
  }

  const response = await fetch(`${BASE_URL}/api/internal/search-raw`);
  const data = (await response.json()) as {
    title: string;
    url: string;
    keywords: string;
  }[];

  const result = data
    .filter(item => item.keywords.includes(q))
    .map(item => ({
      title: item.title,
      url: item.url
    }));

  return NextResponse.json(result);
}
