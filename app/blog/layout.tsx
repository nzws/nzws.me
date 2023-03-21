import { PropsWithChildren } from 'react';
import { Footer } from '~/components/footer';
import { Navigation } from '~/components/navigation';
import { VStack } from '~/components/stack';
import { PageNumber } from '~/utils/constants';
import styles from './styles.module.scss';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <VStack
      justifyContent="space-between"
      alignItems="center"
      className={styles.layout_container}
    >
      <Navigation currentPage={PageNumber.Blog} />

      {children}

      <Footer />
    </VStack>
  );
}

export const metadata = {
  title: {
    default: 'Blog',
    template: '%s - Blog - nzws.me'
  }
};
