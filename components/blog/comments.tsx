import React, { FC, Fragment, useEffect, useState } from 'react';
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
  const disabled = statusId === 'wip';

  useEffect(() => {
    (async () => {
      if (disabled) {
        return;
      }

      const body = await fetch(`/api/comments?id=${id}`).then(response =>
        response.json()
      );
      setComments(body);
    })();
  }, [disabled, id]);

  return (
    <_Comments>
      <Title>コメント</Title>
      {disabled ? (
        <Disabled>コメント欄は準備中です。数分お待ち下さい。</Disabled>
      ) : (
        <Fragment>
          {comments
            .filter(comment => comment.in_reply_to_id === statusId)
            .map(comment => (
              <CommentContainer key={comment.id}>
                <Comment comment={comment} comments={comments} />
              </CommentContainer>
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
        </Fragment>
      )}
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

const Disabled = styled.div`
  margin: 40px auto;
  color: ${({ theme: { text, darken } }) => darken(0.15, text)};
  font-style: italic;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 12px;
  background: ${({ theme: { background, lighten } }) =>
    lighten(0.12, background)};
  border-radius: 4px;
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
