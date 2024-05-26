import { VStack } from "~/components/stack";
import { getAllArticles } from "~/lib/file-io";
import { ArticleType } from "~/utils/constants";

import { Item } from "./components/item";
import styles from "./styles.module.scss";

export default async function Page() {
  const articles = (await getAllArticles(ArticleType.Blog)).filter(
    (x) => !x.isHidden,
  );

  return (
    <VStack gap="50px" className={styles.container}>
      {articles
        .filter((_, index) => index <= 5)
        .map((article, index) => (
          <Item
            key={article.slug}
            slug={article.slug}
            title={article.title}
            tags={article.tags}
            date={article.date}
            coverImage={article.coverImage}
            fallbackCoverImage={article.fallbackCoverImage}
            isFirst={index === 0}
          />
        ))}
    </VStack>
  );
}
