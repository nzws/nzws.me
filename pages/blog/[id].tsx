import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import matter from 'gray-matter';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import post from '../../types/post';
import { processor } from '../../lib/processor';
import { ChevronUp, Share } from 'react-feather';
import generateSummary from '../../lib/summary';
import ExternalLink from '../../components/external-link';
import MovedComponent from '../../components/blog/moved-component';
import Nav from '../../components/blog/nav';
import { Main, Container } from '../../components/blog/layouts';
import { Footer } from '../../components/blog/footer';
import { Comments } from '../../components/blog/comments';
import { dateOptions } from '../../lib/const';

const scriptUrls = {
  twitter: 'https://platform.twitter.com/widgets.js',
  'don-nzws-me': 'https://assets-don.nzws.me/embed.js'
};

type Props = {
  data: post & {
    scripts?: Array<string>;
    title: string;
    summary: string;
    id: string;
    body: string;
  };
};

const BlogPost: React.FC<Props> = ({ data }) => (
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

      {data.scripts?.map((script, key) => (
        <Script key={key} src={scriptUrls[script] || script} strategy="afterInteractive" />
      ))}
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
              <Link href="/blog/[id]/[name]" as={`/blog/tags/${tag}`} key={tag}>
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

    {data.commentId && <Comments id={data.id} statusId={data.commentId} />}

    <Footer>
      <div className="left">
        誤字脱字は
        <ExternalLink
          href={`https://github.com/nzws/nzws.me/blob/master/blog-data/posts/${data.id}.md`}
        >
          GitHub
        </ExternalLink>
        まで
      </div>

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
    </Footer>
  </Container>
);

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

export const getStaticPaths: GetStaticPaths = async () => {
  const files: Array<post> = require('../../blog-data/.index.json');
  const paths = files.map(({ slug }) => `/blog/${slug}`);

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
  const { default: md } = require(`../../blog-data/posts/${id}.md`);
  const m = matter(md);
  const summary = generateSummary(m.content);

  return {
    props: {
      data: {
        ...m.data,
        date: new Date(m.data.date).getTime(),
        body: processor.processSync(m.content).toString(),
        id,
        summary
      }
    }
  };
};

export default BlogPost;
