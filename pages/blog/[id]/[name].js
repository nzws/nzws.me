import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import MovedComponent from '../../../components/blog/moved-component';
import Nav from '../../../components/blog/nav';
import BlogSummary from '../../../components/blog/blog-summary';
import Footer from '../../../components/blog/list-footer';
import { Container } from '../../../components/blog/layouts';

const Blog = ({ data, nextPageId, prevPageId, id, name }) => {
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

Blog.propTypes = {
  data: PropTypes.array,
  nextPageId: PropTypes.number,
  prevPageId: PropTypes.number,
  id: PropTypes.string,
  name: PropTypes.string
};

export const getServerSideProps = ({
  query: { page },
  params: { id, name }
}) => {
  const posts = require('../../../blog-data/.index.json');
  if (!page) {
    page = 0;
  }
  page = parseInt(page);
  const num = page * 10;

  if (['tags', 'category'].indexOf(id) === -1) {
    throw new Error('not found');
  }

  const data = posts.filter(v => v?.[id]?.indexOf(name) !== -1 && !v.isHidden);

  return {
    props: {
      name,
      id,
      data: data.slice(num, num + 10),
      nextPageId: data[num + 10] ? page + 1 : null,
      prevPageId: page - 1
    }
  };
};

export default Blog;
