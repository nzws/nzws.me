import { FC, Fragment, ReactNode } from 'react';
import { MapPin, User } from 'react-feather';
import styled from 'styled-components';

type Item = {
  title: string;
  icon: ReactNode;
  body: string;
};

const items: Item[] = [
  {
    title: 'Pronounce',
    icon: <User />,
    body: 'he/him'
  },
  {
    title: 'Location',
    icon: <MapPin />,
    body: 'Nagoya, Japan'
  }
];

export const Profile: FC = () => (
  <Container>
    {items.map((item, index) => (
      <Fragment key={index}>
        <Body>
          <Icon title={item.title}>{item.icon}</Icon>
          <div>{item.body}</div>
        </Body>
        {items.length - 1 !== index && <div>/</div>}
      </Fragment>
    ))}
  </Container>
);

const Container = styled.div`
  display: flex;
  column-gap: 10px;
  font-size: 14px;
`;

const Body = styled.div`
  display: flex;
  column-gap: 5px;
  align-items: center;
`;

const Icon = styled.div`
  svg {
    display: block;
    margin: auto 0;
    width: 16px;
    height: 16px;
  }
`;
