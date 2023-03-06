'use client';

import { FC } from 'react';
import NextLink from 'next/link';
import styled from 'styled-components';
import { Command } from 'react-feather';

export enum Page {
  About,
  Blog,
  Products
}

type Props = {
  currentPage?: Page;
};

export const Navigation: FC<Props> = ({ currentPage }) => (
  <Container>
    <div>
      <Brand>nzws.me</Brand>
    </div>

    <Links>
      <Link href="/about">About</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/product">Products</Link>
    </Links>

    <Right>
      <CommandButton>
        <Command size={22} />
      </CommandButton>
    </Right>
  </Container>
);

const Container = styled.nav`
  width: 1024px;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 12px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  column-gap: 12px;
`;

const Brand = styled.div`
  font-size: 28px;
  font-weight: bold;
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Link = styled(NextLink)`
  display: block;
  width: 120px;
  height: 64px;
  line-height: 64px;
  text-align: center;
  text-decoration: none;
  font-size: 22px;
`;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CommandButton = styled.button`
  display: block;
  color: ${({ theme }) => theme.colors.primaryText};
  //padding: 8px;
`;
