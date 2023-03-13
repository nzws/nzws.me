import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return children;
}

export const metadata = {
  title: {
    default: 'Products - nzws.me',
    template: '%s - Products - nzws.me'
  }
};
