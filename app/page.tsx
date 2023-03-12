import { Navigation } from '~/components/navigation';
import { VStack } from '~/components/stack';
import { markdownProcessor } from '~/lib/markdown-processor';
import { PageNumber } from '~/utils/constants';
import { Header } from './components/header';
import styles from './styles.module.scss';

const README_URL =
  'https://raw.githubusercontent.com/nzws/nzws/master/README.md';

async function getReadme() {
  const response = await fetch(README_URL);
  const text = await response.text();
  return text;
}

function getHtml(markdown: string) {
  return markdownProcessor.processSync(markdown).toString();
}

export default async function Page() {
  const readme = await getReadme();

  return (
    <div>
      <Navigation currentPage={PageNumber.About} />

      <VStack gap="24px" className={styles.container}>
        <Header />

        <div
          dangerouslySetInnerHTML={{
            __html: getHtml(readme)
          }}
          className={styles.body}
        />

        <div className={styles.footer}>
          Fetched <Link /> at {new Date().toLocaleString()}
        </div>
      </VStack>
    </div>
  );
}

function Link() {
  return (
    <a href="https://github.com/nzws/nzws" target="_blank" rel="noreferrer">
      nzws/nzws
    </a>
  );
}

export const runtime = 'experimental-edge';
export const revalidate = 60 * 60 * 12;

export const metadata = {
  title: 'nzws.me'
};
