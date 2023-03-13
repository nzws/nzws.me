import dynamic from 'next/dynamic';
import { cache } from 'react';
import { Footer } from '~/components/footer';
import { Navigation } from '~/components/navigation';
import { VStack } from '~/components/stack';
import { PageNumber } from '~/utils/constants';
import { Header } from './components/header';
import styles from './styles.module.scss';
import { MDXLoader } from '~/components/mdx-loader';

const Time = dynamic(() => import('./components/time'), {
  ssr: false
});

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
      <Navigation currentPage={PageNumber.About} />

      <VStack gap="24px" className={styles.main}>
        <Header />

        <div className={styles.body}>
          <MDXLoader content={text} />
        </div>

        <div className={styles.footer}>
          Fetched <Link /> at {fetchedAt ? <Time time={fetchedAt} /> : '?'}
        </div>
      </VStack>

      <Footer />
    </VStack>
  );
}

function Link() {
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
