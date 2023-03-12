import 'server-only';
import { cache } from 'react';
import { ArticleType } from '~/utils/constants';
import { ArticleServiceV2 } from './article-service-v2';
import { ArticleFinder } from './article-finder';
import { getPlaiceholder } from 'plaiceholder';
import { ImageDetails } from '~/utils/type';

export const getArticle = cache(async (type: ArticleType, id: string) =>
  new ArticleServiceV2(type, id).getArticle()
);

export const getArticleSlugs = cache(async (type: ArticleType) =>
  new ArticleFinder(type).getList()
);

export const getAllArticles = cache(async (type: ArticleType) =>
  new ArticleFinder(type).getAll()
);

export const getImageMetadata = cache(async (url: string) => {
  const response = await getPlaiceholder(url, {
    removeAlpha: false
  });

  const data: ImageDetails = {
    src: url,
    width: response.img.width,
    height: response.img.height,
    type: response.img.type,
    base64: response.base64
  };

  return data;
});
