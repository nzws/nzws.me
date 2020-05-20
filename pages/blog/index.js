import React from 'react';
import PropTypes from 'prop-types';
import * as matter from 'gray-matter';
import Link from 'next/link';
import posts from '../../blog-data/posts';
import generateSummary from '../../lib/summary';
import { ChevronLeft, ChevronRight } from 'react-feather';

import styled from 'styled-components';
import media from 'styled-media-query';
import { lighten, darken } from 'polished';
import MovedComponent from '../../components/moved-component';

const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

const Container = styled.div`
  ${media.greaterThan('medium')`
    width: 700px;
    margin: 20px auto;
  `};

  ${media.lessThan('medium')`
    margin: 10px;
  `};
`;

const Nav = styled.div`
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid
    ${({ theme: { background } }) => lighten(0.2, background)};

  a {
    color: ${({ theme: { text } }) => text};
  }

  &,
  b {
    font-size: 1.3rem;
  }
`;

const Pan = styled.span`
  padding: 0 4px;
  font-size: 1.5rem;
  color: ${({ theme: { text } }) => darken(0.25, text)};
`;

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
  margin-left: 10px;

  > span {
    margin-right: 5px;

    > span {
      margin-left: 2px;
      font-size: 16px;
    }
  }
`;

const Summary = styled.div`
  margin-top: 5px;
`;

const Footer = styled.footer`
  border-top: 1px solid
    ${({ theme: { background } }) => lighten(0.2, background)};
  margin: 10px 0;
  padding-top: 10px;

  a {
    margin-right: 15px;
  }

  .prev-hidden {
    visibility: hidden;
  }

  .next-page {
    float: right;
  }

  .icon {
    top: 6px;
  }
`;

const Blog = ({ data, nextPageId, prevPageId }) => {
  return (
    <Container>
      <Nav>
        <Link href="/">
          <a>nzws.me</a>
        </Link>
        <Pan>/</Pan>
        <Link href="/blog">
          <a>
            <b>blog</b>
          </a>
        </Link>
      </Nav>

      <MovedComponent />

      {data.map(post => (
        <Link
          as={`/blog/${post.slug}`}
          href="/blog/[id]"
          key={post.slug}
          passHref
        >
          <BlogLink>
            <h2>{post.title}</h2>
            <div>
              <span className="muted">
                {new Date(post.date).toLocaleDateString(undefined, dateOptions)}
              </span>

              {post.tags && (
                <Tags>
                  {post.tags.map(tag => (
                    <span key={tag}>
                      #<span>{tag}</span>
                    </span>
                  ))}
                </Tags>
              )}
            </div>

            <Summary>{post.summary}</Summary>
          </BlogLink>
        </Link>
      ))}

      <Footer>
        <Link href={`/blog?page=${prevPageId}`}>
          <a className={prevPageId >= 0 ? '' : 'prev-hidden'}>
            <ChevronLeft className="icon" /> 前のページ
          </a>
        </Link>

        {nextPageId && (
          <Link href={`/blog?page=${nextPageId}`}>
            <a className="next-page">
              次のページ <ChevronRight className="icon" />
            </a>
          </Link>
        )}
      </Footer>
    </Container>
  );
};

Blog.propTypes = {
  data: PropTypes.object,
  nextPageId: PropTypes.number,
  prevPageId: PropTypes.number
};

Blog.getInitialProps = ({ res, query: { page } }) => {
  try {
    if (!page) {
      page = 0;
    }
    page = parseInt(page);
    const num = page * 10;

    const data = posts.slice(num, num + 10).map(slug => {
      const { default: md } = require(`../../blog-data/posts/${slug}.md`);
      const m = matter(md);
      const summary = generateSummary(m.content);

      return {
        slug,
        title: m.data.title,
        date: m.data.date,
        summary,
        tags: m.data.tags
      };
    });

    return {
      title: 'Blog',
      data,
      nextPageId: posts[num + 10] ? page + 1 : null,
      prevPageId: page - 1
    };
  } catch (e) {
    res.statusCode = 404;
    res.end('Not found');
  }
};

export default Blog;
