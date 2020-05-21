import React from 'react';
import PropTypes from 'prop-types';

import * as matter from 'gray-matter';
import unified from 'unified';
import parse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';
import getFiles from '../../lib/get-files';

import styled from 'styled-components';
import media from 'styled-media-query';
import { lighten, darken } from 'polished';
import Head from 'next/head';

import { ChevronUp } from 'react-feather';
import { Twitter, Github } from '@icons-pack/react-simple-icons';

import generateSummary from '../../lib/summary';
import ExternalLink from '../../components/external-link';
import useScript from '../../components/use-script';
import MovedComponent from '../../components/blog/moved-component';
import Nav from '../../components/blog/nav';

const processor = unified()
  .use(parse)
  .use(remark2rehype, {
    allowDangerousHtml: true
  })
  .use(html, {
    allowDangerousHtml: true
  });

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

  p {
    padding-top: 4px;
    padding-bottom: 10px;
  }

  ul,
  img {
    padding: 10px 0;
  }

  img,
  iframe {
    margin: 0 auto;
  }

  img,
  iframe,
  .twitter-tweet {
    display: block;
    max-width: 100%;
  }

  iframe,
  .twitter-tweet,
  pre {
    margin: 10px auto;
  }

  main {
    font-weight: 300;
    font-size: 1.2rem;
  }

  blockquote {
    margin: 10px 0;
    padding: 4px 10px;
    border-left: 5px solid
      ${({ theme: { background } }) => lighten(0.5, background)};
    color: ${({ theme: { text } }) => darken(0.1, text)};
  }

  pre,
  code,
  blockquote {
    background: ${({ theme: { background } }) => lighten(0.1, background)};
  }

  code {
    padding: 2px 4px;
  }

  pre > code {
    background: none;
  }

  pre {
    padding: 10px;
    overflow-x: auto;
  }

  hr {
    border-color: ${({ theme: { background } }) => lighten(0.2, background)};
    margin: 10px 0;
  }
`;

const Header = styled.div`
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid
    ${({ theme: { background } }) => lighten(0.2, background)};
`;

const Muted = styled.div`
  color: ${({ theme: { text } }) => darken(0.5, text)};
`;

const Tags = styled.div`
  margin-top: 5px;

  > span {
    margin-right: 5px;

    > span {
      margin-left: 2px;
      font-size: 16px;
    }
  }
`;

const Footer = styled.footer`
  border-top: 1px solid
    ${({ theme: { background } }) => lighten(0.2, background)};
  margin-top: 10px;
  padding-top: 10px;

  a {
    margin-right: 20px;
  }
`;

const scriptUrls = {
  twitter: 'https://platform.twitter.com/widgets.js',
  'don-nzws-me': 'https://assets-don.nzws.me/embed.js'
};

const BlogPost = ({ data }) => {
  if (data.scripts) {
    data.scripts.forEach(script => {
      if (scriptUrls[script]) {
        script = scriptUrls[script];
      }

      useScript(script);
    });
  }

  return (
    <Container>
      <Head>
        <title>{data.title} - Blog - nzws.me (ねじわさみ)</title>
        <meta name="description" content={data.summary} />
        {data.tags && (
          <meta
            name="keywords"
            content={[...data.tags, 'ねじわさ', 'nzws'].join(', ')}
          />
        )}
      </Head>

      <Nav
        links={[
          { title: 'nzws.me', href: '/' },
          { title: 'blog', href: '/blog' },
          { title: data.id, href: '/blog/[id]', as: `/blog/${data.id}` }
        ]}
      />

      <MovedComponent />

      <Header>
        <h1>{data.title}</h1>
        <Muted>
          {new Date(data.date).toLocaleDateString(undefined, dateOptions)}
        </Muted>
        {data.tags && (
          <Tags>
            {data.tags.map(tag => (
              <span key={tag}>
                #<span>{tag}</span>
              </span>
            ))}
          </Tags>
        )}
      </Header>

      <main
        dangerouslySetInnerHTML={{
          __html: data.body
        }}
      />

      <Footer>
        <a href="#">
          <ChevronUp className="icon" />
        </a>
        <ExternalLink
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            data.title + ' - Blog - nzws.me (ねじわさみ)'
          )}&url=${encodeURIComponent(
            'https://nzws.me/blog/' + data.id
          )}&via=nzws_me&related=nzws_me`}
        >
          <Twitter className="icon" size={18} /> ツイート
        </ExternalLink>
        <ExternalLink
          href={`https://github.com/nzws/nzws.me/blob/master/blog-data/posts/${data.id}.md`}
        >
          <Github className="icon" size={18} /> GitHub で見る
        </ExternalLink>
      </Footer>
    </Container>
  );
};

BlogPost.propTypes = {
  data: PropTypes.object
};

export const getStaticPaths = async () => {
  const files = await getFiles('./blog-data/posts');
  const paths = files.map(file => `/blog/${file.split('.')[0]}`);

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = ({ params: { id } }) => {
  const { default: md } = require(`../../blog-data/posts/${id}.md`);
  const m = matter(md);
  const summary = generateSummary(m.content);

  return {
    props: {
      data: {
        ...m.data,
        date: new Date(m.data.date).getTime(),
        body: processor.processSync(m.content).contents,
        id,
        summary
      }
    }
  };
};

export default BlogPost;
