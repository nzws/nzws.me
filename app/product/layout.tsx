import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return children;
}

export const metadata = {
  title: {
    default: 'Products',
    template: '%s - Products - nzws.me'
  }
};
