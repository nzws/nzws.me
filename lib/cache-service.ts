import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const cacheDir = path.resolve(process.cwd(), '.nzws-cache');

export class CacheService<T> {
  private readonly cacheFile: string;
  private cacheData?: T;

  constructor(type: string) {
    this.cacheFile = path.resolve(cacheDir, `${type}.json`);
  }

  async get(): Promise<T | undefined> {
    if (this.cacheData) {
      return this.cacheData;
    }

    try {
      const data = await readFile(this.cacheFile, 'utf-8');
      const parsed = JSON.parse(data) as T;

      this.cacheData = parsed;
      return parsed;
    } catch (error) {
      console.warn(error);

      return undefined;
    }
  }

  async set(data: T): Promise<void> {
    try {
      await writeFile(this.cacheFile, JSON.stringify(data));
      this.cacheData = data;
    } catch (error) {
      console.error(error);
    }
  }
}
