import 'ress/dist/ress.min.css';
import '~/styles/global.scss';
import { PropsWithChildren } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Sans, Mincho } from '~/styles/font';

const coreStyleClass = [Sans.variable, Mincho.variable].join(' ');

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja" className={coreStyleClass}>
      <body>
        {/* Workaround for CSS Module's FOUC (needs 1 space) */}
        {/* ref: https://zenn.dev/catnose99/articles/3c106c81cbfdec */}
        <script> </script>

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
