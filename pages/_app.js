import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import Router from 'next/router';
import * as gtag from '../lib/gtag';

import 'ress/dist/ress.min.css';
import { lighten } from 'polished';

const bgBase = '#191110';
const textBase = '#e3e3e3';
const linkBase = '#2986ff';
const theme = {
  bgBase,
  textBase,
  linkBase,
  background: bgBase,
  text: textBase
};

const GlobalStyle = createGlobalStyle({
  body: {
    fontFamily: "'M PLUS Rounded 1c', sans-serif",
    fontSize: '1rem',
    lineHeight: '1.5',
    fontWeight: 400,
    fontStyle: 'normal',
    color: ({ theme: { text } }) => text,
    background: ({ theme: { background } }) => background
  },
  'b, strong': {
    fontWeight: 600,
    fontSize: '1.1rem',
    marginRight: '2px'
  },
  a: {
    color: ({ theme: { linkBase } }) => linkBase,
    textDecoration: 'none',
    fontWeight: 400,
    wordBreak: 'break-all',
    ':hover': {
      textDecoration: 'underline'
    }
  },
  'h1, h2, h3': {
    fontWeight: 600,
    margin: '5px 0'
  },
  '*, *:after, *:before': {
    boxSizing: 'border-box',
    transition: '200ms ease',
    outline: 0,
    scrollbarColor: ({ theme: { background } }) =>
      `${lighten(0.2, background)} ${background}`,
    scrollbarWidth: 'thin'
  },
  '.icon': {
    position: 'relative',
    top: '3px'
  },
  '::-webkit-scrollbar': {
    width: '6px'
  },
  '::-webkit-scrollbar-thumb': {
    background: ({ theme: { background } }) => lighten(0.2, background),
    border: 'none'
  }
});

const App = ({ Component, pageProps, router }) => {
  useEffect(() => {
    const handleRouteChange = url => gtag.pageview(url);
    Router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>nzws.me (ねじわさみ)</title>
        <link rel="shortcut icon" href="/static/avatar.png" />
        <meta
          name="description"
          content="nextで作られたねじわさ味を感じたかったウェブサイト"
        />

        <meta property="og:title" content="nzws.me - ねじわさみ" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://nzws.me${router.asPath}`} />
        <meta
          property="og:description"
          content="nextで作られたねじわさ味を感じたかったウェブサイト"
        />
        <meta property="og:image" content="https://nzws.me/static/avatar.png" />
        <meta name="Hatena::Bookmark" content="nocomment" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  router: PropTypes.object
};

export default App;
