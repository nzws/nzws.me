import { readdir } from 'fs/promises';
import path from 'path';
import { ArticleType } from '~/utils/constants';
import { ArticleDetails } from '~/utils/type';
import { ArticleServiceV2 } from './article-service-v2';

export class ArticleFinderService {
  private directory: string;

  constructor(private type: ArticleType) {
    this.directory = path.resolve(process.cwd(), `contents/${type}`);
  }

  async getAll() {
    const slugs = await this.getList();
    const items = await Promise.all(
      slugs.map(slug => new ArticleServiceV2(this.type, slug).getArticle())
    );
    const sorted = (items.filter(item => item) as ArticleDetails[]).sort(
      (a, b) => b.date - a.date
    );

    return sorted;
  }

  async getList() {
    const files = await readdir(this.directory);

    return files.map(file => file.split('.')[0]);
  }
}
