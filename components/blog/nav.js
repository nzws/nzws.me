import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten, darken } from 'polished';
import Link from 'next/link';

const About = styled.div`
  float: right;
  font-size: 14px;
  padding-top: 5px;
`;

const StyledNav = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid
    ${({ theme: { background } }) => lighten(0.2, background)};

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
  color: ${({ theme: { text } }) => darken(0.25, text)};
`;

const Nav = ({ links }) => (
  <StyledNav>
    <About>
      <Link href="/blog/[id]" as="/blog/about">
        <a>About</a>
      </Link>
    </About>

    {links.map((link, index) => (
      <>
        <Link href={link.href} as={link.as}>
          <a>{index === links.length - 1 ? <b>{link.title}</b> : link.title}</a>
        </Link>
        {index !== links.length - 1 && <Pan>/</Pan>}
      </>
    ))}
  </StyledNav>
);

Nav.propTypes = {
  links: PropTypes.array.isRequired
};

export default Nav;
