import { FC, PropsWithChildren } from 'react';
import NextLink from 'next/link';
import styles from './styles.module.scss';

type Props = {
  href: string;
  onHover: () => void;
  onUnHover: () => void;
  active: boolean;
};

export const Link: FC<PropsWithChildren<Props>> = ({
  href,
  onHover,
  onUnHover,
  active,
  children
}) => (
  <NextLink
    href={href}
    className={styles.link}
    onMouseOver={onHover}
    onMouseLeave={onUnHover}
    data-active={active || undefined}
  >
    {children}
  </NextLink>
);
