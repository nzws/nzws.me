import { NextRequest, NextResponse } from 'next/server';
import { getPlaiceholder } from 'plaiceholder';
import { CacheService } from '~/lib/cache-service';
import { BASE_URL } from '~/utils/constants';
import { ImageDetails } from '~/utils/type';

// also edit me: next.config.js
const allowOrigins = [
  BASE_URL,
  'https://user-images.githubusercontent.com',
  'https://i.imgur.com'
];

export async function GET(request: NextRequest) {
  const params = new URLSearchParams(request.nextUrl.search.substring(1));
  const url = params.get('url');
  if (!url) {
    return NextResponse.json(
      {
        error: 'url is required'
      },
      { status: 400 }
    );
  }

  const allowed =
    url.startsWith('/static/') ||
    allowOrigins.some(origin => new URL(url).origin === origin);
  if (!allowed) {
    return NextResponse.json(
      {
        error: 'this url is not allowed'
      },
      { status: 403 }
    );
  }

  try {
    const data = await new CacheService<ImageDetails>('image-meta', url).sync(
      async () => {
        const response = await getPlaiceholder(url, {
          removeAlpha: false
        });

        const data: ImageDetails = {
          src: url,
          width: response.img.width,
          height: response.img.height,
          type: response.img.type,
          base64: response.base64
        };

        return data;
      }
    );

    const header = new Headers();
    header.set('Cache-Control', 's-maxage=86400, stale-while-revalidate');

    return NextResponse.json(data, { headers: header });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: 'failed to get image size'
      },
      { status: 404 }
    );
  }
}
