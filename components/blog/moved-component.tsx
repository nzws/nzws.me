import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: ${({ theme: { background, lighten } }) =>
    lighten(0.1, background)};
  margin: 15px 0;
  padding: 10px;
`;

const MovedComponent: React.FC = () => {
  const [hasHash, setHasHash] = useState(false);
  useEffect(() => {
    if (location && location.hash === '#from-blog-nzws-me') {
      setHasHash(true);
      location.hash = '';
    }
  }, []);

  if (hasHash) {
    return (
      <Container>
        <b>blog.nzws.me</b> は <b>nzws.me/blog</b>{' '}
        に移転しました。今後ともよろしくお願いいたします。
        <br />※ RSS 等は廃止しました。
      </Container>
    );
  } else {
    return <></>;
  }
};

export default MovedComponent;
