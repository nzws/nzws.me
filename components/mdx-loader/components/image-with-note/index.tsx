import { PropsWithChildren } from "react";

import { Image, ImageProps } from "~/components/image";
import { VStack } from "~/components/stack";

import styles from "./styles.module.scss";

type Props = ImageProps;

export function ImageWithNote({
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <VStack>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image {...props} />

      <div className={styles.note}>{children}</div>
    </VStack>
  );
}
