import React from 'react';
import Head from 'next/head';

const Meta = () => {
  return (
    <Head>
      <title>nzws.me - ねじわさみ</title>
      <link rel="shortcut icon" href="/static/avatar.png" />
      <meta
        name="description"
        content="nextで作られたねじわさ味を感じたかったウェブサイト"
      />

      <meta property="og:title" content="nzws.me - ねじわさみ" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://nzws.me/" />
      <meta
        property="og:description"
        content="nextで作られたねじわさ味を感じたかったウェブサイト"
      />
      <meta property="og:image" content="https://nzws.me/static/avatar.png" />
    </Head>
  );
};

export default Meta;
