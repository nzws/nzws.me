import Visualizer from 'next-route-visualizer';

import { PUBLIC_URL } from '~/utils/constants';

export default function Page() {
  return <Visualizer baseURL={PUBLIC_URL || undefined} />;
}
