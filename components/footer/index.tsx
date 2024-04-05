import { GitHub } from "react-feather";

import { HStack, VStack } from "../stack";
import styles from "./styles.module.scss";

export function Footer() {
  return (
    <VStack gap="24px" className={styles.container}>
      <div className={styles.line} />

      <HStack gap="6px" className={styles.links}>
        <a
          href="https://github.com/nzws/nzws.me"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub size={18} />
          nzws/nzws.me
        </a>
      </HStack>
    </VStack>
  );
}
