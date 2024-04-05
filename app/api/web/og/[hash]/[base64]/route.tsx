import { ImageResponse } from "@vercel/og";
import { NextRequest, NextResponse } from "next/server";

import { signature } from "~/lib/crypto/browser";
import { decode } from "~/lib/encoder";
import type { OGImageData } from "~/utils/type";

import { ArticleTemplate } from "./components/article-template";

export const runtime = "experimental-edge";

// IBM Plex Sans JP: Open Font License
// https://fonts.google.com/specimen/IBM+Plex+Sans+JP
const ibm_plex_sans_jp_url =
  "https://static-cdn.nzws.me/nzws.me-IBMPlexSansJP-Bold.ttf";

// GenEi Late Min P: SIL Open Font License 1.1
// https://okoneya.jp/font/genei-latin.html
const genei_latemin_p_url =
  "https://static-cdn.nzws.me/nzws.me-GenEiLateMinP_v2.ttf";

type Params = {
  hash: string;
  base64: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Params },
) {
  const query = new URLSearchParams(request.nextUrl.search.substring(1));
  const { hash, base64 } = params;
  const correctHash = await signature(base64);
  if (hash !== correctHash) {
    return NextResponse.json(
      {
        error: "Invalid hash",
      },
      { status: 400 },
    );
  }
  const data = decode(base64) as OGImageData;

  const width = Number(query.get("width")) || 1200;
  const height = Number(query.get("height")) || 630;
  if (width > 3840 || height > 2160 || width < 1 || height < 1) {
    return NextResponse.json(
      {
        error: "Invalid width or height",
      },
      { status: 400 },
    );
  }

  console.time("font fetch");
  const [IBMPlexSans, GenEiLatemin] = await Promise.all([
    fetch(ibm_plex_sans_jp_url, { cache: "force-cache" }).then((res) =>
      res.arrayBuffer(),
    ),
    fetch(genei_latemin_p_url, { cache: "force-cache" }).then((res) =>
      res.arrayBuffer(),
    ),
  ]);
  console.timeEnd("font fetch");

  if (data.type === "article") {
    return new ImageResponse(<ArticleTemplate title={data.title} />, {
      width,
      height,
      fonts: [
        {
          name: "GenEiLateMinP_v2",
          data: GenEiLatemin,
          style: "normal",
        },
        {
          name: "IBM_Plex_Sans_JP",
          data: IBMPlexSans,
          style: "normal",
        },
      ],
    });
  } else {
    return NextResponse.json(
      {
        error: "Invalid type",
      },
      { status: 400 },
    );
  }
}
