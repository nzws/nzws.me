import Image from 'next/image';
import { HStack, VStack } from '~/components/stack';
import styles from './styles.module.scss';

export function Header() {
  return (
    <HStack className={styles.container} gap="32px">
      <Image
        src="https://avatars.githubusercontent.com/u/14953122"
        alt="nzws's icon"
        width={98}
        height={98}
        className={styles.icon}
      />

      <VStack gap="6px">
        <h1 className={styles.title}>nzws (ねじわさ)</h1>
      </VStack>
    </HStack>
  );
}
