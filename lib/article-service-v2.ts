import { readFile } from 'fs/promises';
import matter from 'gray-matter';
import path from 'path';
import RemoveMarkdown from 'remove-markdown';

import { ArticleType } from '~/utils/constants';
import { ArticleDetails, OGImageDataArticle } from '~/utils/type';

import { signature } from './crypto/node';
import { encode } from './encoder';

const newLineRegex = /\n/gi;

export class ArticleServiceV2 {
  constructor(
    private type: ArticleType,
    private slug: string
  ) {}

  async getArticle(): Promise<ArticleDetails | undefined> {
    const data = await this.getRawData();
    if (!data) {
      return undefined;
    }

    const fallbackCoverImage = await this.getFallbackCoverImageUrl({
      type: 'article',
      title: data.title
    });

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

  async getRawData() {
    try {
      const filepath = path.resolve(process.cwd(), `contents/${this.type}`);
      const raw = await readFile(`${filepath}/${this.slug}.mdx`, 'utf8');

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
        slug: this.slug,
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

  private async getFallbackCoverImageUrl(data: OGImageDataArticle) {
    const base64 = encode(data);
    const hash = await signature(base64);

    return `/api/web/og/${hash}/${base64}`;
  }
}
