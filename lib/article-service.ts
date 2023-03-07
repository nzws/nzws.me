import { readdir, readFile } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import removeMD from 'remove-markdown';
import { ArticleType } from '~/utils/constants';

const newLineRegex = /\n/gi;

export class ArticleService {
  private directory: string;

  constructor(type: ArticleType) {
    this.directory = path.resolve(process.cwd(), `contents/${type}`);
  }

  async getSummaryList() {
    const slugs = await this.getList();
    const items = await Promise.all(slugs.map(slug => this.getSummary(slug)));
    const sorted = items.sort((a, b) => b.date - a.date);

    return sorted;
  }

  async getList() {
    const files = await readdir(this.directory);

    return files.map(file => file.split('.')[0]);
  }

  async getSummary(slug: string) {
    const raw = await readFile(
      path.resolve(this.directory, `${slug}.md`),
      'utf-8'
    );
    const frontMatter = matter(raw);
    const metaData = frontMatter.data as {
      title: string;
      date: string;
      description?: string;
      category?: string[];
      tags?: string[];
      scripts?: string[];
      isHidden?: boolean;
    };

    // category is deprecated
    const tags = (metaData.category || []).concat(metaData.tags || []);

    return {
      slug,
      title: metaData.title,
      date: new Date(metaData.date).getTime(),
      description:
        metaData.description || this.generateDescription(frontMatter.content),
      tags,
      scripts: metaData.scripts || [],
      isHidden: metaData.isHidden || false
    };
  }

  private generateDescription(content: string) {
    const text = removeMD(content).replace(newLineRegex, ' ');

    const firstParagraph = text.slice(0, 120);
    if (firstParagraph.length < 120) {
      return firstParagraph;
    } else {
      return firstParagraph + '...';
    }
  }
}
