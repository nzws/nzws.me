import React, { Fragment } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const About = styled.div`
  font-size: 14px;
  margin: auto 0;
  margin-left: auto;
  width: 60px;
  text-align: right;
`;

const StyledNav = styled.div`
  display: flex;
  column-gap: 20px;
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

const Links = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
    <Links>
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
    </Links>

    <About>
      <Link href="/blog/[id]" as="/blog/about">
        <a>About</a>
      </Link>
    </About>
  </StyledNav>
);

export default Nav;
