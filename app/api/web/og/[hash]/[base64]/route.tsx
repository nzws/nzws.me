import { ImageResponse } from '@vercel/og';
import type { ImageResponseOptions } from '@vercel/og/dist/types';
import { NextRequest, NextResponse } from 'next/server';
import { signature } from '~/lib/crypto/node';
import { decode } from '~/lib/encoder';
import type { OGImageData } from '~/utils/type';
import { ArticleTemplate } from './components/article-template';
import { readFile } from 'fs/promises';
import path from 'path';

const ibmPlexSansJP = readFile(
  path.resolve(process.cwd(), `assets/IBMPlexSansJP-Bold.ttf`)
);

const genEiLatemin = readFile(
  path.resolve(process.cwd(), `assets/GenEiLateMinP_v2.ttf`)
);

type Params = {
  hash: string;
  base64: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const query = new URLSearchParams(request.nextUrl.search.substring(1));
  const { hash, base64 } = params;
  const correctHash = await signature(base64);
  if (hash !== correctHash) {
    return NextResponse.json(
      {
        error: 'Invalid hash'
      },
      { status: 400 }
    );
  }
  const data = decode(base64) as OGImageData;

  const width = Number(query.get('width')) || 1200;
  const height = Number(query.get('height')) || 630;
  if (width > 3840 || height > 2160 || width < 1 || height < 1) {
    return NextResponse.json(
      {
        error: 'Invalid width or height'
      },
      { status: 400 }
    );
  }

  const IBMPlexSans = await ibmPlexSansJP;
  const GenEiLatemin = await genEiLatemin;

  const options: ImageResponseOptions = {
    width,
    height,
    fonts: [
      {
        name: 'GenEiLateMinP_v2',
        data: GenEiLatemin,
        style: 'normal'
      },
      {
        name: 'IBM_Plex_Sans_JP',
        data: IBMPlexSans,
        style: 'normal'
      }
    ]
  };

  if (data.type === 'article') {
    return new ImageResponse(<ArticleTemplate title={data.title} />, options);
  } else {
    return NextResponse.json(
      {
        error: 'Invalid type'
      },
      { status: 400 }
    );
  }
}
