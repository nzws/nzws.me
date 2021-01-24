import React from 'react';
import { GetStaticProps } from 'next';
import matter from 'gray-matter';
import { ChevronUp, Share } from 'react-feather';
import { processor } from '../lib/processor';
import generateSummary from '../lib/summary';
import ExternalLink from '../components/external-link';
import Nav from '../components/blog/nav';
import { Main, Container } from '../components/blog/layouts';
import post from '../types/post';
import { Footer } from '../components/blog/footer';

type Props = {
  data: post & {
    scripts?: Array<string>;
    title: string;
    summary: string;
    id: string;
    body: string;
  };
};

const Index: React.FC<Props> = ({ data }) => (
  <Container>
    <Nav links={[{ title: 'nzws.me', href: '/' }]} />

    <Main
      dangerouslySetInnerHTML={{
        __html: data.body
      }}
    />

    <Footer>
      <div className="right">
        <ExternalLink
          href={`https://easy-share.now.sh/?t=${encodeURIComponent(
            'nzws.me (ねじわさみ)'
          )}&link=${encodeURIComponent('https://nzws.me/')}`}
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

export const getStaticProps: GetStaticProps = async () => {
  const { default: md } = require(`../blog-data/posts/home.md`);
  const m = matter(md);
  const summary = generateSummary(m.content);

  return {
    props: {
      data: {
        ...m.data,
        date: new Date(m.data.date).getTime(),
        body: processor.processSync(m.content).contents,
        id: 'index',
        summary
      }
    }
  };
};

export default Index;
