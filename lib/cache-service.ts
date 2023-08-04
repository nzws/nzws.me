import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import sanitize from 'sanitize-filename';

const cacheDir = path.resolve(process.cwd(), '.nzws-cache');

export class CacheService<T> {
  private readonly fileDir: string;
  private readonly filePath: string;
  private cacheData?: T;

  constructor(key: string, id: string) {
    this.fileDir = path.resolve(cacheDir, sanitize(key));
    this.filePath = path.resolve(this.fileDir, `${sanitize(id)}.json`);
  }

  async sync(resolver: () => Promise<T>): Promise<T> {
    const cached = await this.get();
    if (cached) {
      return cached;
    }

    const data = await resolver();
    await this.set(data);

    return data;
  }

  async get(): Promise<T | undefined> {
    if (this.cacheData) {
      return this.cacheData;
    }

    try {
      const data = await readFile(this.filePath, 'utf-8');
      const parsed = JSON.parse(data) as T;

      this.cacheData = parsed;
      return parsed;
    } catch (error) {
      console.warn('cache miss', this.filePath);
      return undefined;
    }
  }

  async set(data: T): Promise<void> {
    try {
      await mkdir(this.fileDir, { recursive: true });
      await writeFile(this.filePath, JSON.stringify(data));
      this.cacheData = data;
    } catch (error) {
      console.error(error);
    }
  }
}
