import { NextResponse } from 'next/server';
import { ArticleFinder } from '~/lib/article-finder';
import { CacheService } from '~/lib/cache-service';
import { isValidArticleType } from '~/utils/constants';
import { ArticleDetails, ArticleList } from '~/utils/type';

type Params = {
  type: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const { type } = params;

  if (!isValidArticleType(type)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  const data: ArticleList = (
    await new CacheService<ArticleDetails[]>('article-list', type).sync(() =>
      new ArticleFinder(type).getAll()
    )
  )
    .map(item => ({
      ...item,
      markdown: undefined
    }))
    .filter(item => !item.isHidden);

  const header = new Headers();
  header.set('Cache-Control', 's-maxage=86400, stale-while-revalidate');

  return NextResponse.json(data, { headers: header });
}
