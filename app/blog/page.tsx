import { VStack } from '~/components/stack';
import { BASE_URL } from '~/utils/constants';
import { ArticleSummary } from '~/utils/type';
import { Item } from './components/item';
import styles from './styles.module.scss';

async function getData() {
  try {
    console.log(`${BASE_URL}/api/web/articles/blog`);
    const response = await fetch(`${BASE_URL}/api/web/articles/blog`);
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    return (await response.json()) as ArticleSummary[];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function Page() {
  const articles = await getData();

  return (
    <VStack gap="50px" className={styles.container}>
      {articles.map((article, index) => (
        <Item
          key={article.slug}
          slug={article.slug}
          title={article.title}
          description={article.description}
          tags={article.tags}
          date={article.date}
          coverImage={article.coverImage}
          isFirst={index === 0}
        />
      ))}
    </VStack>
  );
}

export const runtime = 'experimental-edge';

export const metadata = {
  title: 'Blog - nzws.me'
};
