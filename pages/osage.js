import React from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';
import Head from 'next/head';
import Link from 'next/link';

const mobile = media.lessThan('medium');
const desktop = media.greaterThan('medium');

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);

    ${desktop`
      max-width: 100%;

      &.mobile {
        display: none;
      }
    `};

    ${mobile`
      max-height: 100%;

      &.desktop {
        display: none;
      }
    `};
  }
`;

const Osage = () => (
  <Container>
    <Head>
      <title>おさげ？？</title>
    </Head>

    <Link href="/">
      <a>
        <img src="/static/wasabi.png" alt="wasabi" className="mobile" />
        <img src="/static/wasabi-s.png" alt="wasabi" className="desktop" />
      </a>
    </Link>
  </Container>
);

export default Osage;
