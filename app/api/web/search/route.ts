import { NextRequest, NextResponse } from "next/server";

import { BASE_URL } from "~/utils/constants";
import { ArticleSearchExport } from "~/utils/type";

export const runtime = "edge";

const rawData = fetch(`${BASE_URL}/api/internal/search-raw`).then((response) =>
  response.json(),
) as Promise<ArticleSearchExport[]>;

export async function GET(request: NextRequest) {
  const params = new URLSearchParams(request.nextUrl.search.substring(1));
  const q = params.get("q");
  if (!q) {
    return NextResponse.json([]);
  }

  const data = await rawData;

  const result = data
    .filter((item) => item.keywords.includes(q))
    .map((item) => ({
      title: item.title,
      url: item.url,
    }));

  return NextResponse.json(result);
}
