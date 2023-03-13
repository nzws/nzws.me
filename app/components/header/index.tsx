import Image from 'next/image';
import { Globe, MapPin, User } from 'react-feather';
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandMastodon
} from '@tabler/icons-react';
import { HeaderItem, ItemProps } from './components/item';
import { HStack, VStack } from '~/components/stack';
import styles from './styles.module.scss';

const profile: ItemProps[] = [
  {
    icon: User,
    label: 'Pronouns',
    value: 'he/him'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Japan'
  },
  {
    icon: Globe,
    label: 'Accept-Language',
    value: 'ja-JP, typescript'
  }
];

const links: ItemProps[] = [
  {
    icon: IconBrandMastodon,
    label: 'Mastodon',
    value: 'nzws@don.nzws.me',
    href: 'https://don.nzws.me/@nzws'
  },
  {
    icon: IconBrandGithub,
    label: 'GitHub',
    value: '@nzws',
    href: 'https://github.com/nzws'
  },
  {
    icon: IconBrandDiscord,
    label: 'Discord',
    value: 'nzws#0001'
  }
];

export function Header() {
  return (
    <HStack className={styles.container} gap="32px">
      <Image
        src="https://avatars.githubusercontent.com/u/14953122"
        alt="nzws's icon"
        width={98}
        height={98}
        className={styles.icon}
      />

      <VStack justifyContent="space-between" gap="12px">
        <HStack
          gap="6px"
          alignItems="center"
          className={styles.title_container}
        >
          <h1 className={styles.title}>@nzws</h1>

          <h4 className={styles.hiragana}>(ねじわさ)</h4>
        </HStack>

        <HStack gap="12px" alignItems="center" wrap className={styles.items}>
          {profile.map((props, index) => (
            <HeaderItem key={index} {...props} />
          ))}
        </HStack>

        <HStack gap="12px" alignItems="center" wrap className={styles.items}>
          {links.map((props, index) => (
            <HeaderItem key={index} {...props} />
          ))}
        </HStack>
      </VStack>
    </HStack>
  );
}
