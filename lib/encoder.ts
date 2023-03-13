import {
  encode as encodeMsgpack,
  decode as decodeMsgpack
} from '@msgpack/msgpack';
import {
  encode as encodeBase64,
  decode as decodeBase64
} from 'universal-base64url';

export const binaryToString = (data: Uint8Array) => {
  const arr = new Uint8Array(data);
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i].toString(16).padStart(2, '0'));
  }

  return result.join('');
};

export const stringToBinary = (data: string) => {
  const arr = new Uint8Array(data.length / 2);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = parseInt(data.slice(i * 2, i * 2 + 2), 16);
  }

  return arr;
};

export const encode = (data: unknown) => {
  const serialized = encodeMsgpack(data);

  return encodeBase64(binaryToString(serialized));
};

export const decode = (data: string) => {
  const decoded = decodeBase64(data);

  return decodeMsgpack(stringToBinary(decoded));
};
