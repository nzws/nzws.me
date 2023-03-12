import { PropsWithChildren } from 'react';
import { Footer } from '~/components/footer';
import { Navigation } from '~/components/navigation';
import { PageNumber } from '~/utils/constants';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navigation currentPage={PageNumber.Blog} />
      {children}
      <Footer />
    </div>
  );
}

export const metadata = {
  title: {
    default: 'Blog - nzws.me',
    template: '%s - Blog - nzws.me'
  }
};
