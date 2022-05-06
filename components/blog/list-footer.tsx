import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'react-feather';

const StyledFooter = styled.footer`
  border-top: 1px solid
    ${({ theme: { background, lighten } }) => lighten(0.2, background)};
  margin: 10px 0;
  padding-top: 10px;

  a {
    margin-right: 15px;
  }

  .prev-hidden {
    visibility: hidden;
  }

  .next-page {
    float: right;
  }

  .icon {
    top: 6px;
  }
`;

type Props = {
  prevPageId?: number;
  nextPageId?: number;
};

const Footer: FC<Props> = ({ prevPageId, nextPageId }) => (
  <StyledFooter>
    <Link href={`/blog?page=${prevPageId}`}>
      <a className={prevPageId >= 0 ? '' : 'prev-hidden'}>
        <ChevronLeft className="icon" /> 前のページ
      </a>
    </Link>

    {nextPageId && (
      <Link href={`/blog?page=${nextPageId}`}>
        <a className="next-page">
          次のページ <ChevronRight className="icon" />
        </a>
      </Link>
    )}
  </StyledFooter>
);

export default Footer;
