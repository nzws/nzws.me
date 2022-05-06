import path from 'path';

export const getIndexPath = (): string =>
  path.resolve(process.cwd(), './blog-data/.index.json');

export const getPostPath = (id: string): string =>
  path.resolve(process.cwd(), './blog-data/posts/', `${id}.md`);
