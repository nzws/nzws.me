import React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';

import Meta from '../components/meta';

const bgBase = '#332624';
const textBase = '#fff';
const linkBase = '#036eec';
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
    fontFamily:
      '-apple-system, BlinkMacSystemFont, 游ゴシック体, "Yu Gothic", YuGothic, "ヒラギノ角ゴシック Pro", "Hiragino Kaku Gothic Pro", メイリオ, Meiryo, Osaka, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif',
    fontSize: '1.2rem',
    lineHeight: '1.5',
    fontWeight: 200,
    color: props => props.theme.text,
    background: ({ theme: { background } }) =>
      `${background} url('/static/bg.png')`
  },
  b: {
    fontWeight: 600
  },
  a: {
    color: props => props.theme.linkBase,
    textDecoration: 'none',
    fontWeight: 400
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
  return (
    <ThemeProvider theme={theme}>
      <Meta />
      <Normalize />
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
