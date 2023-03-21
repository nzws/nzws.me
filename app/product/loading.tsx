import { Footer } from '~/components/footer';
import { Navigation } from '~/components/navigation';
import { VStack } from '~/components/stack';
import { PageNumber } from '~/utils/constants';
import styles from './styles.module.scss';

export default function Page() {
  return (
    <VStack
      gap="8px"
      className={styles.container}
      justifyContent="space-between"
      alignItems="center"
    >
      <Navigation currentPage={PageNumber.Products} />

      <div />

      <Footer />
    </VStack>
  );
}
