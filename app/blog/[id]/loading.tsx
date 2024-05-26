"use client";

import Skeleton from "react-loading-skeleton";

import { HStack, VStack } from "~/components/stack";

import styles from "./styles.module.scss";

export default function Page() {
  return (
    <VStack gap="28px" className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title_container}>
          <div
            className={styles.title}
            style={{
              width: "600px",
              maxWidth: "100%",
              height: "70px",
            }}
          />
        </div>

        <div className={styles.cover_image_mock} />
      </div>

      <HStack
        gap="16px"
        justifyContent="space-between"
        className={styles.meta_container}
      >
        <HStack gap="12px" alignItems="center" className={styles.tags} wrap>
          <div className={styles.tag}>
            <Skeleton width="60px" height="27px" />
          </div>

          <div className={styles.tag}>
            <Skeleton width="60px" height="27px" />
          </div>

          <div className={styles.tag}>
            <Skeleton width="60px" height="27px" />
          </div>
        </HStack>

        <div className={styles.createdAt}>
          <Skeleton width="200px" height="27px" />
        </div>
      </HStack>

      <div className={styles.body}>
        <Skeleton count={8} />
      </div>
    </VStack>
  );
}
