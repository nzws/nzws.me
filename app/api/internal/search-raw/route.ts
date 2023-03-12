import { NextResponse } from 'next/server';
import RemoveMarkdown from 'remove-markdown';
import { ArticleFinder } from '~/lib/article-finder';
import { CacheService } from '~/lib/cache-service';
import { ArticleType } from '~/utils/constants';
import { ArticleDetails, ArticleSearchExport } from '~/utils/type';

const items = Object.values(ArticleType).map(type =>
  new CacheService<ArticleDetails[]>('article-list', type).sync(() =>
    new ArticleFinder(type).getAll()
  )
);

export async function GET() {
  const data = (await Promise.all(items))
    .flatMap(item => item)
    .filter(item => !item.isHidden);

  const flatted: ArticleSearchExport[] = data.map(item => ({
    title: item.title,
    url: `/${item.type}/${item.slug}`,
    keywords: [
      item.slug,
      item.title,
      item.description,
      ...item.tags,
      RemoveMarkdown(item.markdown)
    ]
      .join(',')
      .toLowerCase()
  }));

  return NextResponse.json(flatted);
}
