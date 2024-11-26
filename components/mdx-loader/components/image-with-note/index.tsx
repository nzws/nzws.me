import type { PropsWithChildren } from "react";
import { Image, type ImageProps } from "~/components/image";
import { VStack } from "~/components/stack";

import styles from "./styles.module.scss";

type Props = ImageProps;

export function ImageWithNote({
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <VStack>
      <Image {...props} />

      <div className={styles.note}>{children}</div>
    </VStack>
  );
}
