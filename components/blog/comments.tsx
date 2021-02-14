import React, { FC, useEffect, useState } from 'react';
import { HelpCircle } from 'react-feather';
import styled from 'styled-components';
import { Status } from '../../types/mastodon';
import ExternalLink from '../external-link';
import { Comment } from './comment';

const DOMAIN = process.env.NEXT_PUBLIC_COMMENT_SERVER;

type Props = {
  id: string;
  statusId: string;
};

export const Comments: FC<Props> = ({ id, statusId }) => {
  const [comments, setComments] = useState<Status[]>([]);

  useEffect(() => {
    (async () => {
      const body = await fetch(`/api/comments?id=${id}`).then(response =>
        response.json()
      );
      setComments(body);
    })();
  }, []);

  return (
    <_Comments>
      <Title>コメント</Title>
      {comments.map(comment => (
        <Comment comment={comment} key={comment.id} />
      ))}
      <NewComment
        href={`https://${DOMAIN}/interact/${statusId}?type=reply`}
        target="_blank"
      >
        <div>コメントを投稿</div>
        <ExternalLink href="/blog/ex-comments">
          <HelpCircle />
        </ExternalLink>
      </NewComment>
    </_Comments>
  );
};

const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
  padding-top: 10px;
`;

const _Comments = styled.div`
  border-top: 1px solid
    ${({ theme: { background, lighten } }) => lighten(0.2, background)};
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

const NewComment = styled.a`
  display: flex;
  justify-content: space-between;
  padding: 8px 15px;
  border-radius: 4px;
  border: 1px solid
    ${({ theme: { background, lighten } }) => lighten(0.1, background)};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;

  div,
  svg {
    margin: auto 0;
  }

  a {
    height: 24px;
  }

  &,
  &:link,
  a {
    text-decoration: none;
    color: ${({ theme: { text, darken } }) => darken(0.15, text)};
  }
`;
