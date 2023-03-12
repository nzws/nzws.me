import Link from 'next/link';
import { FC } from 'react';
import { Image } from '~/components/image';
import { HStack, VStack } from '~/components/stack';
import { dateOptions } from '~/utils/constants';
import styles from './styles.module.scss';

type Props = {
  slug: string;
  title: string;
  tags: string[];
  date: number;
  coverImage?: string;
  fallbackCoverImage: string;
  isFirst: boolean;
};

export const Item: FC<Props> = ({
  slug,
  title,
  tags,
  date,
  coverImage,
  fallbackCoverImage,
  isFirst
}) => (
  <Link href={`/blog/${slug}`} className={styles.container_link}>
    <div className={styles.container} data-is-first={isFirst || undefined}>
      <div className={styles.cover}>
        {coverImage ? (
          <Image src={coverImage} alt={title} className={styles.cover_image} />
        ) : (
          // next/image がバグる
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${fallbackCoverImage}?width=960&height=540`}
            width={960}
            height={540}
            alt={title}
            className={styles.cover_image}
          />
        )}
      </div>

      <VStack gap="8px">
        <h1 className={styles.title}>{title}</h1>

        <HStack gap="8px" justifyContent="space-between" alignItems="center">
          <HStack gap="12px" alignItems="center" className={styles.tags}>
            {tags.map(tag => (
              <div key={tag} className={styles.tag}>
                #{tag}
              </div>
            ))}
          </HStack>

          <div className={styles.createdAt}>
            {new Date(date).toLocaleDateString(undefined, dateOptions)}
          </div>
        </HStack>
      </VStack>
    </div>
  </Link>
);
