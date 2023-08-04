import 'server-only';

import NextImage from 'next/image';
import { Suspense } from 'react';

import { getImageMetadata } from '~/lib/file-io';

function SuspenseComponent() {
  return <div />;
}

type Props = {
  src?: string;
} & Omit<React.ComponentProps<typeof NextImage>, 'src' | 'width' | 'height'>;

async function RealComponent({ src, ...props }: Props) {
  if (!src) return null;

  const metadata = await getImageMetadata(src);

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
  // todo: https://beta.nextjs.org/docs/configuring/typescript#async-server-component-typescript-error
  return (
    <Suspense fallback={<SuspenseComponent />}>
      <RealComponent {...props} />
    </Suspense>
  );
}

export type { Props as ImageProps };
