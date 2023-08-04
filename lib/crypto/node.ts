import crypto from 'crypto';

import { binaryToString } from '../encoder';
import { secret } from './secret';

const key = crypto.webcrypto.subtle.importKey(
  'raw',
  new TextEncoder().encode(secret),
  { name: 'HMAC', hash: { name: 'SHA-256' } },
  false,
  ['sign', 'verify']
);

export const signature = async (data: string): Promise<string> =>
  (
    crypto.webcrypto.subtle.sign(
      'HMAC',
      await key,
      new TextEncoder().encode(data)
    ) as Promise<Uint8Array>
  ).then(binaryToString);
