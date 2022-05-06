import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { darken } from 'polished';
import post from '../../types/post';
import { dateOptions } from '../../lib/const';

type Props = {
  post: post;
};

const BlogSummary: FC<Props> = ({ post }) => (
  <Block>
    <h2>
      <Link
        as={`/blog/${post.slug}`}
        href="/blog/[id]"
        key={post.slug}
        passHref
      >
        <BlogLink>{post.title}</BlogLink>
      </Link>
    </h2>
    <div>
      <span className="muted">
        {new Date(post.date).toLocaleDateString(undefined, dateOptions)}
      </span>

      {post.category && (
        <Tags category>
          {post.category.map(tag => (
            <Link
              href="/blog/[id]/[name]"
              as={`/blog/category/${tag}`}
              key={tag}
            >
              <a>
                #<span>{tag}</span>
              </a>
            </Link>
          ))}
        </Tags>
      )}

      {post.tags && (
        <Tags>
          {post.tags.map(tag => (
            <Link href="/blog/[id]/[name]" as={`/blog/tags/${tag}`} key={tag}>
              <a>
                #<span>{tag}</span>
              </a>
            </Link>
          ))}
        </Tags>
      )}
    </div>

    <Summary>{post.summary}</Summary>
  </Block>
);

const Block = styled.div`
  padding: 10px 0;
  color: ${({ theme: { text } }) => text};

  .muted {
    color: ${({ theme: { text } }) => darken(0.5, text)};
  }
`;

const Tags = styled.span<{ category?: boolean }>`
  ${({ category }) =>
    category &&
    `
    margin-left: 5px;

    > a {
      font-weight: bold;
    }
  `};

  > a {
    margin-right: 5px;
    color: ${({ theme: { text } }) => text};

    > span {
      margin-left: 2px;
      font-size: 16px;
    }
  }
`;

const BlogLink = styled.a`
  color: ${({ theme: { text } }) => text};
`;

const Summary = styled.div`
  margin-top: 5px;
  font-size: 0.95em;
  color: ${({ theme: { text } }) => darken(0.2, text)};
`;

export default BlogSummary;
