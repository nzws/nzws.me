import { FC, Fragment } from 'react';
import styled from 'styled-components';
import { Status } from '../../types/mastodon';

type Props = {
  comment: Status;
  comments: Status[];
  reply?: boolean;
};

// todo
const authors = ['nzws'];

export const Comment: FC<Props> = ({ comment, comments, reply }) => (
  <Fragment>
    <_Comment
      href={comment.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      $isReply={reply}
    >
      <Avatar>
        <img
          src={comment.account.avatar_static}
          alt={`${comment.account.acct}'s avatar`}
        />
      </Avatar>
      <Account>
        <b>{comment.account.display_name || comment.account.username}</b>
        <div>@{comment.account.acct}</div>
        {authors.includes(comment.account.acct) && <Author>Author</Author>}
      </Account>
      <Content
        dangerouslySetInnerHTML={{
          __html: comment.content
        }}
      />
    </_Comment>

    {comments
      .filter(com => com.in_reply_to_id === comment.id)
      .map(comment => (
        <Comment comment={comment} comments={comments} reply key={comment.id} />
      ))}
  </Fragment>
);

const _Comment = styled.a<{ $isReply: boolean }>`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 48px 1fr;
  column-gap: 10px;
  margin-left: ${({ $isReply }) => $isReply && '20px'};

  &,
  &:link {
    text-decoration: none;
    color: ${({ theme: { text } }) => text};
  }
`;

const Avatar = styled.div`
  grid-row: 1 / 3;
  grid-column: 1;

  img {
    width: 48px;
    height: 48px;
    border-radius: 4px;
  }
`;

const Account = styled.div`
  grid-row: 1 / 2;
  grid-column: 2;
  display: flex;
  column-gap: 8px;

  b {
    display: block;
    font-size: 1rem;
    margin: auto 0;
  }

  div {
    font-size: 0.95rem;
    margin-left: 5px;
    color: ${({ theme: { text, darken } }) => darken(0.3, text)};
    margin: auto 0;
  }
`;

const Author = styled.div`
  border-radius: 20px;
  padding: 2px 6px;
  font-size: 0.85rem !important;
  border: 1px solid
    ${({ theme: { background, lighten } }) => lighten(0.2, background)};
`;

const Content = styled.div`
  grid-row: 2 / 3;
  grid-column: 2;

  &,
  p {
    word-break: break-all;
    overflow: hidden;
    margin: 0;
  }

  a {
    display: none;
  }
`;
