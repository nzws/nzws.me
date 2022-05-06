import { FC } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import MovedComponent from '../../components/blog/moved-component';
import Nav from '../../components/blog/nav';
import BlogSummary from '../../components/blog/blog-summary';
import { Container } from '../../components/blog/layouts';
import Footer from '../../components/blog/list-footer';
import post from '../../types/post';

type Props = {
  data: Array<post>;
  nextPageId?: number;
  prevPageId?: number;
};

const Blog: FC<Props> = ({ data, nextPageId, prevPageId }) => {
  return (
    <Container>
      <Head>
        <title>Blog - nzws.me (ねじわさみ)</title>
      </Head>

      <Nav
        links={[
          { title: 'nzws.me', href: '/' },
          { title: 'blog', href: '/blog' }
        ]}
      />

      <MovedComponent />

      {data.map(post => (
        <BlogSummary post={post} key={post.slug} />
      ))}

      <Footer prevPageId={prevPageId} nextPageId={nextPageId} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = ({ query: { page } }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const posts = require('../../blog-data/.index.json') as post[];

  const Page = typeof page === 'string' ? parseInt(page) : 0;
  const num = Page * 10;
  const data = posts.filter(v => !v.isHidden);

  return Promise.resolve({
    props: {
      data: data.slice(num, num + 10),
      nextPageId: data[num + 10] ? Page + 1 : null,
      prevPageId: Page - 1
    }
  });
};

export default Blog;
