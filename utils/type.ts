export interface Article {
  slug: string;
  title: string;
  date: number;
  description: string;
  tags: string[];
  scripts: string[];
  isHidden: boolean;
}
