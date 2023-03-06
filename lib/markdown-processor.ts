import { unified } from 'unified';
import parse from 'remark-parse';
import highlight from 'remark-highlight.js';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';

export const markdownProcessor = unified()
  .use(parse)
  .use(highlight)
  .use(remark2rehype, {
    allowDangerousHtml: true
  })
  .use(html, {
    allowDangerousHtml: true
  });
