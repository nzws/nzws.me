import Link from 'next/link';
import { FC } from 'react';
import { Star } from 'react-feather';
import styled from 'styled-components';

export const Sponsor: FC = () => (
  <Container>
    <Link href="/blog/[id]" as="/blog/supporters" passHref>
      <A>
        <Icon>
          <Star />
        </Icon>
        <div>Supporters List 🙇</div>
      </A>
    </Link>
  </Container>
);

const Container = styled.div``;

const A = styled.a`
  display: flex;
  align-items: center;
  column-gap: 5px;
  color: ${({ theme }) => theme.text};
  :link {
    text-decoration: none;
  }
`;

const Icon = styled.div`
  svg {
    display: block;
    margin: auto 0;
    width: 16px;
    height: 16px;
  }
`;
