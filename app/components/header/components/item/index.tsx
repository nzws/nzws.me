import { Icon as FeatherIcon } from 'react-feather';
import { Icon as TablerIcon } from '@tabler/icons-react';
import { HStack } from '~/components/stack';
import styles from './styles.module.scss';

export type ItemProps = {
  icon: FeatherIcon | TablerIcon;
  label: string;
  value: string;
  href?: string;
};

export function HeaderItem({ icon: Icon, label, value, href }: ItemProps) {
  return (
    <HStack gap="4px" alignItems="center" wrap className={styles.item}>
      <Icon size={16} />
      <div className={styles.label}>{label}:</div>

      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={styles.value}
        >
          {value}
        </a>
      ) : (
        <div className={styles.value}>{value}</div>
      )}
    </HStack>
  );
}
