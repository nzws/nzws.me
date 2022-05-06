import { AppProps } from 'next/app';
import { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import NextNprogress from 'nextjs-progressbar';
import Head from 'next/head';
import { darkTheme } from '../styles/theme';
import { GlobalStyle } from '../styles/global';

import 'ress/dist/ress.min.css';
import 'highlight.js/styles/monokai.css';

const App: FC<AppProps> = ({ Component, pageProps, router }) => {
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
