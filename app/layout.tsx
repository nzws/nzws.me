import 'ress/dist/ress.min.css';
import '~/styles/global.scss';

import { Analytics } from '@vercel/analytics/react';
import { PropsWithChildren } from 'react';

import { Mincho, Sans } from '~/styles/font';

const coreStyleClass = [Sans.variable, Mincho.variable].join(' ');

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja" className={coreStyleClass}>
      <body>
        {children}

        <Analytics />
      </body>
    </html>
  );
}

export const metadata = {
  title: {
    default: 'nzws.me',
    template: '%s - nzws.me'
  },
  other: {
    'Hatena::Bookmark': 'nocomment'
  },
  icons: {
    icon: 'https://github.com/nzwsme.png'
  }
};
