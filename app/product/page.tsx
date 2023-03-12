import { Navigation } from '~/components/navigation';
import { HStack } from '~/components/stack';
import { PageNumber } from '~/utils/constants';
import styles from './styles.module.scss';

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Navigation currentPage={PageNumber.Products} />
      </div>

      <HStack
        justifyContent="center"
        alignItems="center"
        className={styles.container}
      >
        <div className={styles.text}>🚧 Work in Progress 🚧</div>
      </HStack>
    </div>
  );
}
