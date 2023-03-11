import { NextResponse } from 'next/server';
import { ArticleService } from '~/lib/article-service';
import { CacheService } from '~/lib/cache-service';
import { ArticleDetails } from '~/utils/type';

type Params = {
  type: string;
  id: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const { type, id } = params;

  if (!ArticleService.isValidType(type)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  const data = await new CacheService<ArticleDetails | undefined>(
    'article-details-' + type,
    id
  ).sync(() => new ArticleService(type).getDetails(id));

  if (!data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const header = new Headers();
  header.set('Cache-Control', 's-maxage=86400, stale-while-revalidate');

  return NextResponse.json(data, { headers: header });
}
