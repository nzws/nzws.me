import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

import { Image } from "~/components/image";
import { MDXLoader } from "~/components/mdx-loader";
import { HStack, VStack } from "~/components/stack";
import { getArticle } from "~/lib/file-io";
import { ArticleType, dateOptions, PUBLIC_URL } from "~/utils/constants";

import styles from "./styles.module.scss";

type Params = {
  id: string;
};

export default async function Page({ params: { id } }: { params: Params }) {
  const article = await getArticle(ArticleType.Blog, id);
  if (!article) {
    return notFound();
  }

  return (
    <VStack gap="28px" className={styles.container}>
      <div className={styles.header}>
        {article.coverImage && (
          <Image
            src={article.coverImage}
            alt={article.title}
            className={styles.cover_image}
          />
        )}

        <div
          className={[
            styles.title_container,
            article.coverImage && styles.title_container_floating,
          ].join(" ")}
        >
          <div className={styles.title}>{article.title}</div>
        </div>

        {!article.coverImage && <div className={styles.cover_image_mock} />}
      </div>

      <HStack
        gap="16px"
        justifyContent="space-between"
        className={styles.meta_container}
      >
        <HStack gap="12px" alignItems="center" className={styles.tags} wrap>
          {article.tags.map((tag) => (
            <div key={tag} className={styles.tag}>
              #{tag}
            </div>
          ))}
        </HStack>

        <div className={styles.createdAt}>
          {new Date(article.date).toLocaleDateString(undefined, dateOptions)}
        </div>
      </HStack>

      <div className={styles.body}>
        <MDXLoader content={article.markdown} />
      </div>

      {article.scripts?.map((script, key) => (
        <Script
          key={key}
          src={scriptUrls[script] || script}
          strategy="lazyOnload"
        />
      ))}
    </VStack>
  );
}

const scriptUrls: Record<string, string> = {
  twitter: "https://platform.twitter.com/widgets.js",
  "don-nzws-me": "https://don.nzws.me/embed.js",
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const article = await getArticle(ArticleType.Blog, params.id);
  if (!article) {
    return {
      title: "Blog - nzws.me",
    };
  }

  const description = article.description || article.fallbackDescription;
  const imageUrl = article.coverImage || article.fallbackCoverImage;
  return {
    title: article.title,
    description,
    openGraph: {
      title: `${article.title} - Blog - nzws.me`,
      url: PUBLIC_URL ? PUBLIC_URL + "/blog/" + article.slug : undefined,
      description,
      images: [
        {
          url: PUBLIC_URL + imageUrl,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@nzws_me",
      images: [PUBLIC_URL + imageUrl],
    },
  };
}
