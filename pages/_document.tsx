import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript
} from 'next/document';

const CF_ANALYTICS_TOKEN = 'a389d4c824b1412294ef01ede7fc3fee';

export default class MyDocument extends Document {
  render(): React.ReactElement {
    return (
      <Html lang="ja">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={`{"token": "${CF_ANALYTICS_TOKEN}"}`}
          />
        </body>
      </Html>
    );
  }
}
