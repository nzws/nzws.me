import { NextResponse } from 'next/server';
import { ArticleService } from '~/lib/article-service';
import { CacheService } from '~/lib/cache-service';
import { ArticleDetails } from '~/utils/type';

type Params = {
  type: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const { type } = params;

  if (!ArticleService.isValidType(type)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  const data = await new CacheService<ArticleDetails[]>(
    'article-list',
    type
  ).sync(() => new ArticleService(type).getSummaryList());

  const header = new Headers();
  header.set('Cache-Control', 's-maxage=86400, stale-while-revalidate');

  return NextResponse.json(data, { headers: header });
}
