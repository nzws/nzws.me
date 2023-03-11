import { notFound } from 'next/navigation';
import { VStack } from '~/components/stack';
import { BASE_URL } from '~/utils/constants';
import { ArticleDetails, ArticleSummary } from '~/utils/type';
import styles from './styles.module.scss';

async function getData(id: string) {
  const response = await fetch(`${BASE_URL}/api/internal/articles/blog/${id}`);
  if (!response.ok || response.status !== 200) {
    return undefined;
  }

  return (await response.json()) as ArticleDetails;
}

type Params = {
  id: string;
};

export default async function Page({ params: { id } }: { params: Params }) {
  const article = await getData(id);
  if (!article) {
    return notFound();
  }

  return (
    <VStack gap="50px" className={styles.container}>
      {JSON.stringify(article, null, 2)}
    </VStack>
  );
}

export async function generateStaticParams() {
  const response = await fetch(`${BASE_URL}/api/internal/articles/blog`);
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }

  const data = (await response.json()) as ArticleSummary[];

  return data.map(article => ({
    id: article.slug
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const article = await getData(params.id);
  if (!article) {
    return {
      title: 'Blog - nzws.me'
    };
  }

  return {
    title: `${article.title} - Blog - nzws.me`,
    description: article.description
  };
}

export const runtime = 'experimental-edge';
