import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import { mediaDesktop, mediaMobile } from '../components/blog/layouts';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: url('/static/bg.png');

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);

    ${mediaDesktop`
      max-width: 100%;

      &.mobile {
        display: none;
      }
    `};

    ${mediaMobile`
      max-height: 100%;

      &.desktop {
        display: none;
      }
    `};
  }
`;

const Osage: React.FC = () => (
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
