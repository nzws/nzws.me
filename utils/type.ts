export interface ArticleSummary {
  slug: string;
  title: string;
  date: number;
  description: string;
  coverImage?: string;
  tags: string[];
  type: string;
}

export interface ArticleDetails extends Omit<ArticleSummary, 'description'> {
  description?: string;
  scripts: string[];
  markdown: string;
}

export interface ImageDetails {
  src: string;
  width: number;
  height: number;
  type?: string;
  base64: string;
}

export interface ArticleSearch {
  title: string;
  url: string;
}
