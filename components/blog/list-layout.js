import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
  ${media.greaterThan('medium')`
  width: 700px;
  margin: 20px auto;
`};

  ${media.lessThan('medium')`
  margin: 10px;
`};
`;
