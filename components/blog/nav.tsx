import React, { Fragment } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const About = styled.div`
  float: right;
  font-size: 14px;
  padding-top: 5px;
`;

const StyledNav = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid
    ${({ theme: { background, lighten } }) => lighten(0.2, background)};

  a {
    color: ${({ theme: { text } }) => text};
  }

  &,
  b {
    font-size: 1.3rem;
  }
`;

const Pan = styled.span`
  padding: 0 4px;
  font-size: 1.5rem;
  color: ${({ theme: { text, darken } }) => darken(0.25, text)};
`;

type Props = {
  links: Array<{
    href?: string;
    title: string;
    noHref?: boolean;
    as?: string;
  }>;
};

const Nav: React.FC<Props> = ({ links }) => (
  <StyledNav>
    <About>
      <Link href="/blog/[id]" as="/blog/about">
        <a>About</a>
      </Link>
    </About>

    {links.map((link, index) => {
      const isLast = index === links.length - 1;
      const text = isLast ? <b>{link.title}</b> : link.title;

      return (
        <Fragment key={index}>
          {link.noHref ? (
            text
          ) : (
            <Link href={link.href} as={link.as}>
              <a>{text}</a>
            </Link>
          )}
          {!isLast && <Pan>/</Pan>}
        </Fragment>
      );
    })}
  </StyledNav>
);

export default Nav;
