import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const StyledAbout = styled.div`
  float: right;
  font-size: 14px;
  padding-top: 5px;
`;

const About = () => (
  <StyledAbout>
    <Link href="/blog/[id]" as="/blog/about">
      <a>About</a>
    </Link>
  </StyledAbout>
);

export default About;
