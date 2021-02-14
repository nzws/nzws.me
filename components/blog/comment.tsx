import React, { FC } from 'react';
import styled from 'styled-components';
import { Status } from '../../types/mastodon';

type Props = {
  comment: Status;
};

export const Comment: FC<Props> = ({ comment }) => (
  <_Comment
    href={comment.url}
    target="_blank"
    rel="noopener noreferrer nofollow"
  >
    <Avatar>
      <img src={comment.account.avatar_static} />
    </Avatar>
    <Main>
      <Account>
        <b>{comment.account.display_name}</b>
        <span>@{comment.account.acct}</span>
      </Account>
      <Content
        dangerouslySetInnerHTML={{
          __html: comment.content
        }}
      />
    </Main>
  </_Comment>
);

const _Comment = styled.a`
  display: flex;
  column-gap: 10px;
  padding: 12px;
  color: ${({ theme: { text } }) => text};
  background: ${({ theme: { background, lighten } }) =>
    lighten(0.12, background)};
  border-radius: 4px;

  &,
  &:link {
    text-decoration: none;
  }
`;

const Avatar = styled.div`
  img {
    width: 48px;
    height: 48px;
    border-radius: 4px;
  }
`;

const Main = styled.div`
  width: 90%; // todo
`;

const Account = styled.div`
  b {
    font-size: 1rem;
  }

  span {
    font-size: 0.95rem;
    margin-left: 5px;
    color: ${({ theme: { text, darken } }) => darken(0.3, text)};
  }
`;

const Content = styled.div`
  height: 1.2rem;

  &,
  p {
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  a {
    display: none;
  }
`;
