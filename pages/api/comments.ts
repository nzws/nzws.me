import path from 'path';
import os from 'os';
import { promises } from 'fs';
import got from 'got';
import { NextApiRequest, NextApiResponse } from 'next';
import sanitize from 'sanitize-filename';
import { StatusesContext } from '../../types/mastodon';
import indexes from '../../blog-data/.index.json';

const DOMAIN = process.env.NEXT_PUBLIC_COMMENT_SERVER;
const CACHE_MS = 1000 * 60 * 1;
const ignoreTags = ['nocomment'];

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse> => {
  const { method, query } = req;
  const { id } = query as { id?: string };
  if (method !== 'GET') {
    res.status(405).send('Method Not Allowed');
    return;
  }
  if (!id || typeof id !== 'string') {
    res.status(400).send('Bad Request');
    return;
  }
  const postId = sanitize(id);
  const cacheFile = path.resolve(os.tmpdir(), `comment_${postId}`);

  try {
    if (process.env.NODE_ENV !== 'development') {
      const { mtime } = await promises.stat(cacheFile);
      const updatedAt = new Date(mtime);

      if (Date.now() - updatedAt.getTime() < CACHE_MS) {
        console.log('cached');
        const body = JSON.parse(await promises.readFile(cacheFile, 'utf8'));

        return res.status(200).json(body);
      }
    }
  } catch (_) {
    //
  }

  const post = indexes.find(index => index.slug === postId && index.commentId);
  if (!post) {
    return res.status(404).send('Not Found');
  }

  const { body } = await got<StatusesContext>(
    `https://${DOMAIN}/api/v1/statuses/${post.commentId}/context`,
    {
      responseType: 'json'
    }
  );
  const data = body.descendants
    .map(status => ({
      id: status.id,
      in_reply_to_id: status.in_reply_to_id,
      created_at: status.created_at,
      sensitive: status.sensitive,
      spoiler_text: status.spoiler_text,
      visibility: status.visibility,
      url: status.url,
      content: status.content,
      reblog: status.reblog,
      tags: status.tags,
      account: {
        id: status.account.id,
        username: status.account.username,
        acct: status.account.acct,
        display_name: status.account.display_name,
        bot: status.account.bot,
        url: status.account.url,
        avatar_static: status.account.avatar_static
      }
    }))
    .filter(
      status =>
        ['public', 'unlisted'].includes(status.visibility) &&
        !status.sensitive &&
        !status.spoiler_text &&
        !status.account.bot &&
        !status.reblog &&
        !status.tags.some(tag => ignoreTags.includes(tag.name.toLowerCase()))
    );

  await promises.writeFile(cacheFile, JSON.stringify(data));
  res.status(200).json(data);
};

export default handler;
