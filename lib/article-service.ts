import { readdir, readFile } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { ArticleType } from '~/utils/constants';
import { ArticleDetails } from '~/utils/type';
import RemoveMarkdown from 'remove-markdown';

const newLineRegex = /\n/gi;

export class ArticleService {
  private directory: string;

  constructor(private type: ArticleType) {
    this.directory = path.resolve(process.cwd(), `contents/${type}`);
  }

  async getAll() {
    const slugs = await this.getList();
    const items = await Promise.all(slugs.map(slug => this.getArticle(slug)));
    const sorted = (items.filter(item => item) as ArticleDetails[]).sort(
      (a, b) => b.date - a.date
    );

    return sorted;
  }

  async getList() {
    const files = await readdir(this.directory);

    return files.map(file => file.split('.')[0]);
  }

  async getArticle(slug: string): Promise<ArticleDetails | undefined> {
    const data = await this.getRawData(slug);
    if (!data) {
      return undefined;
    }

    const fallbackCoverImage = `/api/web/og/articles/${this.type}/${data.slug}`;

    return {
      slug: data.slug,
      title: data.title,
      date: data.date,
      description: data.description,
      fallbackDescription: this.generateDescription(data.markdown, 120),
      tags: data.tags,
      scripts: data.scripts,
      coverImage: data.coverImage,
      fallbackCoverImage: fallbackCoverImage,
      markdown: data.markdown,
      type: data.type,
      isHidden: data.isHidden
    };
  }

  async getRawData(slug: string) {
    try {
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
        coverImage?: string;
      };

      // category is deprecated
      const tags = (metaData.category || []).concat(metaData.tags || []);

      return {
        slug,
        title: metaData.title,
        date: new Date(metaData.date).getTime(),
        description: metaData.description,
        tags,
        scripts: metaData.scripts || [],
        isHidden: metaData.isHidden || false,
        markdown: frontMatter.content,
        coverImage: metaData.coverImage,
        type: this.type
      };
    } catch (e) {
      // maybe not found
      console.log(e);
      return undefined;
    }
  }

  private generateDescription(content: string, length?: number) {
    const text = RemoveMarkdown(content).replace(newLineRegex, ' ');

    const trimmed = text.trim();
    if (!length || trimmed.length < length) {
      return trimmed;
    } else {
      return trimmed.slice(0, length).trim() + '...';
    }
  }

  static isValidType(type: string): type is ArticleType {
    return Object.values(ArticleType).includes(type as ArticleType);
  }
}
