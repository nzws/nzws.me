export interface ArticleDetails {
  type: string;
  slug: string;
  title: string;
  date: number;
  coverImage?: string;
  tags: string[];
  description?: string;
  scripts: string[];
  markdown: string;
  fallbackDescription: string;
  fallbackCoverImage: string;
  isHidden: boolean;
}

export type ArticleList = Omit<ArticleDetails, 'markdown'>[];

export interface ImageDetails {
  src: string;
  width: number;
  height: number;
  type?: string;
  base64: string;
}

export interface ArticleSearchExport {
  title: string;
  url: string;
  keywords: string;
}

export interface ArticleSearch {
  title: string;
  url: string;
}
