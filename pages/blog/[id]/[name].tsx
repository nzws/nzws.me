import React from 'react';
import Head from 'next/head';

import MovedComponent from '../../../components/blog/moved-component';
import Nav from '../../../components/blog/nav';
import BlogSummary from '../../../components/blog/blog-summary';
import Footer from '../../../components/blog/list-footer';
import { Container } from '../../../components/blog/layouts';

import post from '../../../types/post';
type Props = {
  data: Array<post>;
  nextPageId?: number;
  prevPageId?: number;
  id: string;
  name: string;
};

const Blog: React.FC<Props> = ({ data, nextPageId, prevPageId, id, name }) => {
  return (
    <Container>
      <Head>
        <title>
          {id}:{name} - Blog - nzws.me (ねじわさみ)
        </title>
      </Head>

      <Nav
        links={[
          { title: 'nzws.me', href: '/' },
          { title: 'blog', href: '/blog' },
          { title: id, noHref: true },
          { title: name, href: '/blog/[id]/[name]', as: `/blog/${id}/${name}` }
        ]}
      />

      <MovedComponent />

      {data.map((post, key) => (
        <BlogSummary post={post} key={key} />
      ))}

      <Footer prevPageId={prevPageId} nextPageId={nextPageId} />
    </Container>
  );
};

export const getServerSideProps = async ({
  query: { page },
  params: { id, name }
}: {
  query: {
    page?: string;
  };
  params: {
    id: string;
    name: string;
  };
}): Promise<{
  props: Props;
}> => {
  const posts = require('../../../blog-data/.index.json');
  const Page = typeof page === 'string' ? parseInt(page) : 0;
  const num = Page * 10;

  if (['tags', 'category'].indexOf(id) === -1) {
    throw new Error('not found');
  }

  const data = posts.filter(v => v?.[id]?.indexOf(name) !== -1 && !v.isHidden);

  return {
    props: {
      name,
      id,
      data: data.slice(num, num + 10),
      nextPageId: data[num + 10] ? Page + 1 : null,
      prevPageId: Page - 1
    }
  };
};

export default Blog;
