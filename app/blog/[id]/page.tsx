import { notFound } from 'next/navigation';
import { VStack } from '~/components/stack';
import { markdownProcessor } from '~/lib/markdown-processor';
import { BASE_URL } from '~/utils/constants';
import { ArticleDetails } from '~/utils/type';
import styles from './styles.module.scss';

async function getData(id: string) {
  const response = await fetch(`${BASE_URL}/api/internal/articles/blog/${id}`);
  if (!response.ok || response.status !== 200) {
    return undefined;
  }

  return (await response.json()) as ArticleDetails;
}

function getHtml(markdown: string) {
  return markdownProcessor.processSync(markdown).toString();
}

type Params = {
  id: string;
};

export default async function Page({ params: { id } }: { params: Params }) {
  const article = await getData(id);
  if (!article) {
    return notFound();
  }

  const __html = getHtml(article.markdown);

  return (
    <VStack gap="50px" className={styles.container}>
      <div
        dangerouslySetInnerHTML={{
          __html
        }}
        className={styles.body}
      />
    </VStack>
  );
}
/*
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
*/

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
