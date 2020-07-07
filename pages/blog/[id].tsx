import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';

import matter from 'gray-matter';
import unified from 'unified';
import parse from 'remark-parse';
import highlight from 'remark-highlight.js';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';

import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';

import { ChevronUp, Share } from 'react-feather';

import generateSummary from '../../lib/summary';
import ExternalLink from '../../components/external-link';
import useScript from '../../components/use-script';
import MovedComponent from '../../components/blog/moved-component';
import Nav from '../../components/blog/nav';
import { Main, Container } from '../../components/blog/layouts';

const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

const Header = styled.div`
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid
    ${({ theme: { background, lighten } }) => lighten(0.2, background)};
`;

const Muted = styled.div`
  color: ${({ theme: { text, darken } }) => darken(0.5, text)};
`;

const Tags = styled.span`
  display: inline-block;
  margin-top: 5px;

  > a {
    margin-right: 5px;
    color: ${({ theme: { text } }) => text};
    ${({ category }) => category && `font-weight: bold;`};

    > span {
      margin-left: 2px;
      font-size: 16px;
    }
  }
`;

const Footer = styled.footer`
  border-top: 1px solid
    ${({ theme: { background, lighten } }) => lighten(0.2, background)};
  margin-top: 10px;
  padding-top: 10px;

  .right {
    float: right;

    a {
      margin-left: 20px;
    }
  }

  .left {
    margin-top: 8px;
    font-size: 0.85rem;

    a {
      margin: 0 5px;
    }
  }
`;

const scriptUrls = {
  twitter: 'https://platform.twitter.com/widgets.js',
  'don-nzws-me': 'https://assets-don.nzws.me/embed.js'
};

import post from '../../types/post';
type Props = {
  data: {
    scripts?: Array<string>;
    title: string;
    summary: string;
    category?: Array<string>;
    tags?: Array<string>;
    id: string;
    body: string;
    date: number;
  };
};

const BlogPost: React.FC<Props> = ({ data }) => {
  if (data.scripts) {
    data.scripts.forEach(script => {
      useScript(scriptUrls[script] || script);
    });
  }

  return (
    <Container>
      <Head>
        <title>{data.title} - Blog - nzws.me (ねじわさみ)</title>
        <meta
          property="og:title"
          content={`${data.title} - Blog - nzws.me (ねじわさみ)`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={data.summary} />
        <meta name="description" content={data.summary} />
        <meta
          name="keywords"
          content={[
            ...(data.category || []),
            ...(data.tags || []),
            "nzws's blog",
            'ねじわさ',
            'nzws'
          ].join(', ')}
        />
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
        <div>
          {data.category && (
            <Tags category>
              {data.category.map(tag => (
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

          {data.tags && (
            <Tags>
              {data.tags.map(tag => (
                <Link
                  href="/blog/[id]/[name]"
                  as={`/blog/tags/${tag}`}
                  key={tag}
                >
                  <a>
                    #<span>{tag}</span>
                  </a>
                </Link>
              ))}
            </Tags>
          )}
        </div>
      </Header>

      <Main
        dangerouslySetInnerHTML={{
          __html: data.body
        }}
      />

      <Footer>
        <div className="right">
          <ExternalLink
            href={`https://easy-share.now.sh/?t=${encodeURIComponent(
              data.title + ' - Blog - nzws.me (ねじわさみ)'
            )}&link=${encodeURIComponent('https://nzws.me/blog/' + data.id)}`}
          >
            <Share className="icon" size={18} /> 共有
          </ExternalLink>
          <a href="#">
            <ChevronUp className="icon" />
          </a>
        </div>

        <div className="left">
          誤字脱字は
          <ExternalLink
            href={`https://github.com/nzws/nzws.me/blob/master/blog-data/posts/${data.id}.md`}
          >
            GitHub
          </ExternalLink>
          に、コメントは
          <ExternalLink href="https://don.nzws.me/@nzws">@nzws</ExternalLink>
          まで
        </div>
      </Footer>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files: Array<post> = require('../../blog-data/.index.json');
  const paths = files.map(({ slug }) => `/blog/${slug}`);

  return {
    paths,
    fallback: false
  };
};

const processor = unified()
  .use(parse)
  .use(highlight)
  .use(remark2rehype, {
    allowDangerousHtml: true
  })
  .use(html, {
    allowDangerousHtml: true
  });

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
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
