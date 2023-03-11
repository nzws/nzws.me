import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { VStack } from '~/components/stack';
import { markdownProcessor } from '~/lib/markdown-processor';
import { ArticleType } from '~/utils/constants';
import styles from './styles.module.scss';
import { getArticle, getArticleSlugs } from '~/lib/file-io';

function getHtml(markdown: string) {
  return markdownProcessor.processSync(markdown).toString();
}

type Params = {
  id: string;
};

export default async function Page({ params: { id } }: { params: Params }) {
  const article = await getArticle(ArticleType.Blog, id);
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

export async function generateStaticParams() {
  const data = await getArticleSlugs(ArticleType.Blog);

  return data.map(article => ({
    id: article
  }));
}

export async function generateMetadata({
  params
}: {
  params: Params;
}): Promise<Metadata> {
  const article = await getArticle(ArticleType.Blog, params.id);
  if (!article) {
    return {
      title: 'Blog - nzws.me'
    };
  }

  const description = article.description || article.fallbackDescription;
  const imageUrl = article.coverImage || article.fallbackCoverImage;
  return {
    title: article.title,
    description,
    openGraph: {
      title: `${article.title} - Blog - nzws.me`,
      description,
      images: [
        {
          url: imageUrl
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@nzws_me',
      images: [imageUrl]
    }
  };
}
