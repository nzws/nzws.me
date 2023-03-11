import { ImageResponse } from '@vercel/og';
import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '~/utils/constants';
import { ArticleSummary } from '~/utils/type';

export const runtime = 'experimental-edge';

const font = fetch(
  new URL('../../../assets/GenEiLateMinP_v2.ttf', import.meta.url)
).then(res => res.arrayBuffer());

async function getData(type: string, id: string) {
  const response = await fetch(`${BASE_URL}/api/internal/articles/${type}`);
  const data = (await response.json()) as ArticleSummary[];

  return data.find(d => d.slug === id);
}

type Params = {
  type: string;
  id: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { type, id } = params;
  if (type !== 'blog' && type !== 'product') {
    return NextResponse.json(null, { status: 404 });
  }

  const data = await getData(type, id);
  if (!data) {
    return NextResponse.json(null, { status: 404 });
  }

  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          backgroundColor: '#674138',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #9d7474 4%, transparent 0%), radial-gradient(circle at 75px 75px, #9d7474 4%, transparent 0%)',
          backgroundSize: '100px 100px'
        }}
        lang="ja-JP"
      >
        <div
          style={{
            fontSize: 42,
            fontStyle: 'normal',
            fontWeight: '600',
            color: '#e1e1e1',
            backgroundColor: '#674138',
            lineHeight: 1.5,
            whiteSpace: 'pre-wrap',
            padding: 22,
            fontFamily: 'GenEiLateMinP_v2'
          }}
          lang="ja-JP"
        >
          {data.title}
        </div>

        <div
          style={{
            left: 42,
            top: 42,
            position: 'absolute',
            fontSize: 32,
            fontWeight: 600,
            color: '#be9e9e',
            backgroundColor: '#674138',
            padding: 8,
            fontFamily: 'Inter'
          }}
        >
          nzws.me
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'GenEiLateMinP_v2',
          data: fontData,
          style: 'normal'
        }
      ]
    }
  );
}