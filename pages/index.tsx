import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import Nav from '../components/blog/nav';
import { Container } from '../components/blog/layouts';
import post from '../types/post';
import BlogSummary from '../components/blog/blog-summary';
import Footer from '../components/blog/list-footer';
import { Profile } from '../components/home/layouts';
import { Head } from '../components/home/head';
import { Accounts } from '../components/home/accounts';
import { Sponsor } from '../components/home/sponsor';

type Props = {
  data: post[];
  nextPageId?: number;
};

const Index: FC<Props> = ({ data, nextPageId }) => (
  <Container>
    <Nav links={[{ title: 'nzws.me', href: '/' }]} noBorder />

    <Profile>
      <Head />
      <Accounts />
      <Sponsor />
    </Profile>

    {data.map(post => (
      <BlogSummary post={post} key={post.slug} />
    ))}

    <Footer nextPageId={nextPageId} />
  </Container>
);

export const getStaticProps: GetStaticProps = async () => {
  const posts = require('../blog-data/.index.json');
  const data = posts.filter(v => !v.isHidden);

  return {
    props: {
      data: data.slice(0, 10),
      nextPageId: data[10] ? 1 : null
    }
  };
};

export default Index;
