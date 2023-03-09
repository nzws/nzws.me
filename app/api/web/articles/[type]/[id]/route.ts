import { NextResponse } from 'next/server';
import { ArticleService } from '~/lib/article-service';

type Params = {
  type: string;
  id: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  const { type, id } = params;

  if (!ArticleService.isValidType(type)) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  const service = new ArticleService(type);
  const data = await service.getDetails(id);

  if (!data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const header = new Headers();
  header.set('Cache-Control', 's-maxage=86400, stale-while-revalidate');

  return NextResponse.json(data, { headers: header });
}
