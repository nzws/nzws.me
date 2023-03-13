import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from './components';

export function MDXLoader({ content }: { content: string }) {
  // @ts-expect-error Async Server Component
  return <MDXRemote source={content} components={mdxComponents} />;
}
