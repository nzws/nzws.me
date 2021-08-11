import {
  Discord,
  Github,
  Icon,
  Mastodon
} from '@icons-pack/react-simple-icons';
import { Mail } from 'react-feather';

type Link = {
  name: string;
  id: string;
  link?: string;
  icon: Icon;
};

export const links: Link[] = [
  {
    name: 'Mastodon',
    id: 'nzws@don.nzws.me',
    link: 'https://don.nzws.me/@nzws',
    icon: Mastodon
  },
  {
    name: 'GitHub',
    id: '@nzws',
    link: 'https://github.com/nzws',
    icon: Github
  },
  {
    name: 'Discord',
    id: 'nzws#0001',
    icon: Discord
  },
  {
    name: 'Mail',
    id: 'hi@nzws.me',
    link: 'mailto:hi@nzws.me',
    icon: Mail
  }
];
