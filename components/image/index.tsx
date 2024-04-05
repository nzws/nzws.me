import "server-only";

import NextImage from "next/image";
import { Suspense } from "react";

import { getImageMetadata } from "~/lib/file-io";

function SuspenseComponent() {
  return (
    <div
      style={{
        height: "500px",
        width: "100%",
      }}
    />
  );
}

type Props = {
  src?: string;
} & Omit<React.ComponentProps<typeof NextImage>, "src" | "width" | "height">;

async function RealComponent({ src, ...props }: Props) {
  if (!src) return null;

  const metadata = await getImageMetadata(src).catch((error) => {
    console.error(error);
    return null;
  });
  if (!metadata) {
    // @ts-expect-error: fallback
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img src={src} {...props} />;
  }

  return (
    <NextImage
      src={src}
      width={metadata?.width}
      height={metadata?.height}
      blurDataURL={metadata?.base64}
      placeholder="blur"
      {...props}
    />
  );
}

export function Image(props: Props) {
  return (
    <Suspense fallback={<SuspenseComponent />}>
      <RealComponent {...props} />
    </Suspense>
  );
}

export type { Props as ImageProps };
