import { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import NextNprogress from 'nextjs-progressbar';
import Head from 'next/head';

import 'ress/dist/ress.min.css';
import 'highlight.js/styles/monokai.css';
import { lighten, darken } from 'polished';

export const darkTheme = {
  linkBase: '#2986ff',
  background: '#191110',
  text: '#e3e3e3',
  lighten,
  darken
};

/*
const lightTheme = {
  linkBase: '#005bd1',
  background: '#f6f4f4',
  text: '#0b0909',
  lighten: darken,
  darken: lighten
};
*/

const GlobalStyle = createGlobalStyle({
  body: {
    fontFamily: "'Noto Serif JP', serif",
    fontSize: '1rem',
    lineHeight: '1.6',
    fontWeight: 300,
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
    width: '6px',
    height: '6px'
  },
  '::-webkit-scrollbar-thumb': {
    background: ({ theme: { background } }) => lighten(0.2, background),
    border: 'none'
  },
  '#nprogress .peg': {
    boxShadow: 'none'
  }
});

const App: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  const theme = darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>nzws.me (ねじわさみ)</title>
        <link rel="shortcut icon" href="/static/nzws_cry.png" />
        <meta
          name="description"
          content="nextで作られたねじわさ味を感じたかったウェブサイト"
        />

        <meta property="og:site_name" content="nzws.me - ねじわさみ" />
        <meta property="og:title" content="nzws.me - ねじわさみ" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://nzws.me${router.asPath}`} />
        <meta
          property="og:description"
          content="nextで作られたねじわさ味を感じたかったウェブサイト"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@nzws_me" />
        <meta name="twitter:creator" content="@nzws_me" />
        <meta
          property="og:image"
          content="https://nzws.me/static/nzws_cry.png"
        />
        <meta name="Hatena::Bookmark" content="nocomment" />
      </Head>
      <GlobalStyle />
      <NextNprogress
        color={theme.text}
        height={4}
        options={{
          showSpinner: false
        }}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
