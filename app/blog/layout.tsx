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

export const metadata = {
  title: {
    default: 'Blog - nzws.me',
    template: '%s - Blog - nzws.me'
  }
};
