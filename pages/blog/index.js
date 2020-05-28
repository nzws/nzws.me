import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import MovedComponent from '../../components/blog/moved-component';
import Nav from '../../components/blog/nav';
import BlogSummary from '../../components/blog/blog-summary';
import { Container } from '../../components/blog/list-layout';
import Footer from '../../components/blog/list-footer';

const Blog = ({ data, nextPageId, prevPageId }) => {
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
        <BlogSummary post={post} key={post.id} />
      ))}

      <Footer prevPageId={prevPageId} nextPageId={nextPageId} />
    </Container>
  );
};

Blog.propTypes = {
  data: PropTypes.array,
  nextPageId: PropTypes.number,
  prevPageId: PropTypes.number
};

export const getServerSideProps = ({ query: { page } }) => {
  const posts = require('../../blog-data/.index.json');
  if (!page) {
    page = 0;
  }
  page = parseInt(page);
  const num = page * 10;

  return {
    props: {
      data: posts.filter(v => !v.isHidden).slice(num, num + 10),
      nextPageId: posts[num + 10] ? page + 1 : null,
      prevPageId: page - 1
    }
  };
};

export default Blog;
