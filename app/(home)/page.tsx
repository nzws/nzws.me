import { Navigation } from '../../components/navigation';
import { PageNumber } from '../../utils/constants';

export default function Page() {
  return (
    <div>
      <Navigation currentPage={PageNumber.About} />
    </div>
  );
}

// export const runtime = 'experimental-edge';

export const metadata = {
  title: 'nzws.me'
};
