import NextImage from 'next/image';
import { Suspense } from 'react';
import { BASE_URL } from '~/utils/constants';
import { ImageDetails } from '~/utils/type';

async function getMetadata(url: string) {
  const response = await fetch(
    `${BASE_URL}/api/internal/image?url=` + encodeURIComponent(url)
  );
  if (!response.ok || response.status !== 200) {
    throw new Error('Failed to fetch');
  }

  return (await response.json()) as ImageDetails;
}

function SuspenseComponent() {
  return <div />;
}

type Props = {
  url: string;
} & Omit<React.ComponentProps<typeof NextImage>, 'src' | 'width' | 'height'>;

async function RealComponent({ url, ...props }: Props) {
  const metadata = await getMetadata(url);

  return (
    <NextImage
      src={url}
      width={metadata.width}
      height={metadata.height}
      blurDataURL={metadata.base64}
      placeholder="blur"
      {...props}
    />
  );
}

export function Image(props: Props) {
  // todo: https://beta.nextjs.org/docs/configuring/typescript#async-server-component-typescript-error
  return (
    <Suspense fallback={<SuspenseComponent />}>
      {/* @ts-expect-error Async Server Component */}
      <RealComponent {...props} />
    </Suspense>
  );
}
