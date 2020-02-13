import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import 'ress/dist/ress.min.css';

import Meta from '../components/meta';
import typeKit from '../components/typekit';

const bgBase = '#332624';
const textBase = '#fff';
const linkBase = '#0372ff';
const theme = {
  bgBase,
  textBase,
  linkBase,
  background: bgBase,
  text: textBase
};

const GlobalStyle = createGlobalStyle({
  'html, body': {
    width: '100%',
    height: '100%'
  },
  body: {
    fontFamily: 'kan415typos-std, sans-serif',
    fontSize: '1rem',
    lineHeight: '1.5',
    fontWeight: 400,
    fontStyle: 'normal',
    color: ({ theme: { text } }) => text,
    background: ({ theme: { background } }) =>
      `${background} url('/static/bg.png')`
  },
  b: {
    textDecoration: 'underline',
    fontWeight: 400,
    fontSize: '1.1rem',
    marginRight: '2px'
  },
  a: {
    color: ({ theme: { linkBase } }) => linkBase,
    textDecoration: 'none',
    fontWeight: 400,
    ':hover': {
      textDecoration: 'underline'
    }
  },
  'h1, h2, h3': {
    fontWeight: 300,
    margin: '10px 0'
  },
  '*, *:after, *:before': {
    boxSizing: 'border-box',
    transition: '200ms ease'
  }
});

const App = ({ Component, pageProps }) => {
  useEffect(typeKit, []);

  return (
    <ThemeProvider theme={theme}>
      <Meta />
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object
};

export default App;
