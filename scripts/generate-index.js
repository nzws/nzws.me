import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import generateSummary from '../lib/summary';
import getFiles from '../lib/get-files';

const dataCache = {};

const loadMd = slug => {
  if (dataCache[slug]) {
    return dataCache[slug];
  }

  const data = fs.readFileSync(
    path.resolve(__dirname, `../blog-data/posts/${slug}.md`)
  );
  const m = matter(data);

  return {
    slug,
    title: m.data.title,
    date: new Date(m.data.date).getTime(),
    summary: generateSummary(m.content),
    tags: m.data.tags || [],
    isHidden: m.data.isHidden,
    category: m.data.category || []
  };
};

const run = async () => {
  try {
    const diff = require('../blog-data/.index.json');
    if (diff) {
      console.log('✅ 差分をロードしています...');
      diff.forEach(v => {
        dataCache[v.slug] = v;
      });
    }
  } catch (_) {
    console.log('🆕 差分生成しません！');
  }

  const files = await getFiles(path.resolve(__dirname, '../blog-data/posts'));
  const posts = files
    .map(file => file.split('.')[0])
    .sort((a, b) => {
      dataCache[a] = loadMd(a);
      dataCache[b] = loadMd(b);

      return new Date(dataCache[a].date) < new Date(dataCache[b].date) ? 1 : -1;
    });

  const data = posts.map(slug => posts[slug] || loadMd(slug));

  fs.writeFileSync(
    path.resolve(__dirname, `../blog-data/.index.json`),
    JSON.stringify(data)
  );
};

run();
