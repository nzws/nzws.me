import { NextResponse } from 'next/server';
import { ArticleService } from '~/lib/article-service';
import { CacheService } from '~/lib/cache-service';
import { ArticleType } from '~/utils/constants';
import { ArticleDetails, ArticleSearchExport } from '~/utils/type';

export async function GET() {
  const data = (
    await Promise.all(
      Object.values(ArticleType).map(type =>
        new CacheService<ArticleDetails[]>('article-list', type).sync(() =>
          new ArticleService(type).getAll()
        )
      )
    )
  ).flatMap(item => item);

  const flatted: ArticleSearchExport[] = data.map(item => ({
    title: item.title,
    url: `/${item.type}/${item.slug}`,
    keywords: [item.slug, item.title, item.description, ...item.tags]
      .join(',')
      .toLowerCase()
  }));

  const header = new Headers();
  header.set('Cache-Control', 's-maxage=86400, stale-while-revalidate');

  return NextResponse.json(flatted, { headers: header });
}
