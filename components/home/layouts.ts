import styled from 'styled-components';

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 15px;
  background: ${({ theme: { background, lighten } }) =>
    lighten(0.05, background)};
  border-radius: 5px;
  margin: 15px auto;
  max-width: 550px;
`;
