// @ts-expect-error: why you don't have types?
import Visualizer from 'next-route-visualizer';
import { PUBLIC_URL } from '~/utils/constants';

export default function Page() {
  return <Visualizer baseURL={PUBLIC_URL || undefined} />;
}
