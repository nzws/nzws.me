export enum PageNumber {
  About,
  Blog,
  Products
}

export enum ArticleType {
  Blog = 'blog',
  Product = 'product'
}

const DEPLOYMENT_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost:3000';
export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? `https://${DEPLOYMENT_DOMAIN}`
    : `http://${DEPLOYMENT_DOMAIN}`;
