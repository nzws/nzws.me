import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import styled from 'styled-components';
import { darken } from 'polished';

const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

const BlogLink = styled.a`
  display: block;
  padding: 10px 0;
  color: ${({ theme: { text } }) => text};

  :hover {
    text-decoration: none;
  }

  .muted {
    color: ${({ theme: { text } }) => darken(0.5, text)};
  }
`;

const Tags = styled.span`
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

const Summary = styled.div`
  margin-top: 5px;
  font-size: 0.95em;
  color: ${({ theme: { text } }) => darken(0.2, text)};
`;

const BlogSummary = ({ post }) => (
  <Link as={`/blog/${post.slug}`} href="/blog/[id]" key={post.slug} passHref>
    <BlogLink>
      <h2>{post.title}</h2>
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
    </BlogLink>
  </Link>
);

BlogSummary.propTypes = {
  post: PropTypes.object.isRequired
};

export default BlogSummary;
