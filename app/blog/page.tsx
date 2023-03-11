import { VStack } from '~/components/stack';
import { BASE_URL } from '~/utils/constants';
import { ArticleList } from '~/utils/type';
import { Item } from './components/item';
import styles from './styles.module.scss';

async function getData() {
  const response = await fetch(`${BASE_URL}/api/internal/articles/blog`);
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  return (await response.json()) as ArticleList;
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
