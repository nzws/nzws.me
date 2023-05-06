import { Shippori_Mincho, IBM_Plex_Sans_JP } from 'next/font/google';
import localFont from 'next/font/local';

export const Sans = IBM_Plex_Sans_JP({
  weight: ['400', '600'],
  display: 'swap',
  subsets: ['latin-ext'],
  variable: '--font-sans'
});

export const Mincho = Shippori_Mincho({
  weight: ['400', '600'],
  display: 'swap',
  subsets: ['latin-ext'],
  variable: '--font-mincho'
});

export const GenEiLateMin = localFont({
  src: [
    {
      path: '../assets/GenEiLateMinP_v2.ttf',
      weight: '400',
      style: 'normal'
    }
  ],
  variable: '--font-gen-ei-late-min'
});
