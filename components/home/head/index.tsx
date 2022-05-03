import { FC } from 'react';
import styled from 'styled-components';
import { Profile } from './profile';

export const Head: FC = () => (
  <Container>
    <div>
      <Avatar src="https://github.com/nzws.png" />
    </div>
    <RightFlex>
      <NameContainer>
        <Name>ねじわさ</Name>
        <SubName>/ nzws</SubName>
      </NameContainer>
      <div>
        <Profile />
      </div>
    </RightFlex>
  </Container>
);

const Container = styled.div`
  display: flex;
  column-gap: 20px;
  justify-content: center;
  align-items: center;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  display: block;
  border-radius: 100%;
`;

const RightFlex = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const NameContainer = styled.div`
  display: flex;
  column-gap: 10px;
  align-items: flex-end;
`;

const Name = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const SubName = styled.div`
  font-size: 20px;
  color: ${({ theme: { text, darken } }) => darken(0.2, text)};
`;
