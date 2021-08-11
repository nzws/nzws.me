import React, { FC, ReactNode } from 'react';
import media from 'styled-media-query';
import { Mail } from 'react-feather';
import { Discord, Github, Mastodon } from '@icons-pack/react-simple-icons';
import styled from 'styled-components';

type Item = {
  title: string;
  icon: ReactNode;
  displayName: string;
  url?: string;
};

const items: Item[] = [
  {
    title: 'Mastodon',
    icon: <Mastodon />,
    displayName: 'nzws@don.nzws.me',
    url: 'https://don.nzws.me/@nzws'
  },
  {
    title: 'Discord',
    icon: <Discord />,
    displayName: 'nzws#0001'
  },
  {
    title: 'GitHub',
    icon: <Github />,
    displayName: '@nzws',
    url: 'https://github.com/nzws'
  },
  {
    title: 'Mail',
    icon: <Mail />,
    displayName: 'hi@nzws.me',
    url: 'mailto:hi@nzws.me'
  }
];

export const Accounts: FC = () => (
  <Container>
    {items.map((item, index) => (
      <Item
        {...(item.url ? { href: item.url, target: '_blank', as: 'a' } : {})}
        key={index}
      >
        <Icon title={item.title}>{item.icon}</Icon>
        <Body>
          <Title>{item.title}</Title>
          <SubTitle>{item.displayName}</SubTitle>
        </Body>
      </Item>
    ))}
  </Container>
);

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  font-size: 14px;

  ${media.lessThan('medium')`
      grid-template-columns: auto;
      margin: 0 auto;
  `};
`;

const Item = styled.div`
  padding: 0 15px;
  display: flex;
  column-gap: 15px;
  align-items: center;
  color: ${({ theme: { text } }) => text};

  &,
  &:link {
    text-decoration: none;
  }
`;

const Icon = styled.div`
  svg {
    display: block;
    margin: auto 0;
    width: 32px;
    height: 32px;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: bold;
`;

const SubTitle = styled.div`
  color: ${({ theme: { text, darken } }) => darken(0.2, text)};
`;
