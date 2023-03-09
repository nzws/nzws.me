export interface ArticleSummary {
  slug: string;
  title: string;
  date: number;
  description: string;
  tags: string[];
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
