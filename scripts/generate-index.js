import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import generateSummary from '../lib/summary';
import posts from '../blog-data/posts.json';

const run = () => {
  const data = posts.map(slug => {
    const md = fs.readFileSync(
      path.resolve(__dirname, `../blog-data/posts/${slug}.md`)
    );
    const m = matter(md);
    const summary = generateSummary(m.content);

    return {
      slug,
      title: m.data.title,
      date: new Date(m.data.date).getTime(),
      summary,
      tags: m.data.tags
    };
  });

  fs.writeFileSync(
    path.resolve(__dirname, `../blog-data/.index.json`),
    JSON.stringify(data)
  );
};

run();
