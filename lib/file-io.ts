import 'server-only';
import { cache } from 'react';
import { ArticleType } from '~/utils/constants';
import { ArticleServiceV2 } from './article-service-v2';
import { ArticleFinder } from './article-finder';

export const getArticle = cache(async (type: ArticleType, id: string) =>
  new ArticleServiceV2(type, id).getArticle()
);

export const getArticleSlugs = cache(async (type: ArticleType) =>
  new ArticleFinder(type).getList()
);

export const getAllArticles = cache(async (type: ArticleType) =>
  new ArticleFinder(type).getAll()
);
