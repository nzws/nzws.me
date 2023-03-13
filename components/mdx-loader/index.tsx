import type { SerializeOptions } from 'next-mdx-remote/dist/types';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from './components';

const mdxOptions: SerializeOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm]
  }
};

export function MDXLoader({ content }: { content: string }) {
  return (
    // @ts-expect-error Async Server Component
    <MDXRemote
      source={content}
      components={mdxComponents}
      options={mdxOptions}
    />
  );
}
