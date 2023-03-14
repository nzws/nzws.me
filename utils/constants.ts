export enum PageNumber {
  About,
  Blog,
  Products
}

export enum ArticleType {
  Blog = 'blog',
  Product = 'product'
}

export const isValidArticleType = (type: string): type is ArticleType => {
  return Object.values(ArticleType).includes(type as ArticleType);
};

const DEPLOYMENT_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost:3000';
export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? `https://${DEPLOYMENT_DOMAIN}`
    : `http://${DEPLOYMENT_DOMAIN}`;

export const PUBLIC_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 'https://nzws.me' : '';

export const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
} as const;
