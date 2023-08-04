import Link from 'next/link';
import { cache } from 'react';
import { Star } from 'react-feather';

import { Footer } from '~/components/footer';
import { MDXLoader } from '~/components/mdx-loader';
import { Navigation } from '~/components/navigation';
import { HStack, VStack } from '~/components/stack';
import { PageNumber } from '~/utils/constants';

import { Background } from './components/background';
import { Header } from './components/header';
import { Time } from './components/time';
import styles from './styles.module.scss';

const README_URL =
  'https://raw.githubusercontent.com/nzws/nzws/master/README.md';

const getReadme = cache(async () => {
  const response = await fetch(README_URL);
  const text = await response.text();

  return {
    text,
    fetchedAt: response.headers.get('date')
  };
});

export default async function Page() {
  const { text, fetchedAt } = await getReadme();

  return (
    <VStack
      gap="8px"
      className={styles.container}
      justifyContent="space-between"
      alignItems="center"
    >
      <Background />
      <Navigation currentPage={PageNumber.About} />

      <VStack gap="24px" className={styles.main}>
        <Header />

        <div className={styles.body}>
          <MDXLoader content={text} />
        </div>

        <HStack
          gap="8px"
          justifyContent="space-between"
          className={styles.footer}
        >
          <div>
            <SupportersLink />
          </div>

          <div>
            Fetched <ReadmeLink /> at{' '}
            {fetchedAt ? <Time time={fetchedAt} /> : '?'}
          </div>
        </HStack>
      </VStack>

      <Footer />
    </VStack>
  );
}

function SupportersLink() {
  return (
    <Link href="/blog/supporters" className={styles.supporters_link}>
      <Star size={16} />
      Supporters
    </Link>
  );
}

function ReadmeLink() {
  return (
    <a href="https://github.com/nzws/nzws" target="_blank" rel="noreferrer">
      nzws/nzws
    </a>
  );
}

export const revalidate = 43200; // 12 hours

export const metadata = {
  title: 'nzws.me'
};
