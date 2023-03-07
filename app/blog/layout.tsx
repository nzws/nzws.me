import { PropsWithChildren } from 'react';
import { Navigation } from '~/components/navigation';
import { PageNumber } from '~/utils/constants';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navigation currentPage={PageNumber.Blog} />
      {children}
    </div>
  );
}
