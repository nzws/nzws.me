import { IconBrandMastodon } from "@tabler/icons-react";
import Link from "next/link";
import { GitHub, Star } from "react-feather";
import { HStack, VStack } from "../stack";
import styles from "./styles.module.scss";

export function Footer() {
  return (
    <VStack gap="24px" className={styles.container}>
      <div className={styles.line} />

      <HStack gap="32px" wrap className={styles.links}>
        <a
          href="https://github.com/nzws/nzws.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub size={18} />
          nzws/nzws.me
        </a>

        <a
          href="https://don.nzws.me/@nzws"
          target="_blank"
          rel="noopener noreferrer me"
        >
          <IconBrandMastodon size={18} />
          @nzws@don.nzws.me
        </a>

        <Link href="/blog/supporters">
          <Star size={18} />
          Supporters
        </Link>

        <div className={styles.spacer} />
      </HStack>
    </VStack>
  );
}
