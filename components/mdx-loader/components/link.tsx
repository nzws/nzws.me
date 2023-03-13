import { HTMLAttributes } from 'react';
import NextLink from 'next/link';

type Props = HTMLAttributes<HTMLAnchorElement> & {
  href?: string;
};

export function Link({ href, children, ...props }: Props) {
  const isInternalLink = href?.startsWith('/');

  if (!href) {
    return <>{children}</>;
  }

  if (isInternalLink) {
    return (
      <NextLink href={href} {...props}>
        {children}
      </NextLink>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
