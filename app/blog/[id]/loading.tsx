import { Footer } from '~/components/footer';
import { Navigation } from '~/components/navigation';
import { VStack } from '~/components/stack';
import { PageNumber } from '~/utils/constants';

export default function Page() {
  return (
    <VStack gap="8px" justifyContent="space-between" alignItems="center">
      <Navigation currentPage={PageNumber.Blog} />

      <div />

      <Footer />
    </VStack>
  );
}
