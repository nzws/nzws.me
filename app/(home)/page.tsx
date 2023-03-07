import { Navigation } from '../../components/navigation';
import { PageNumber } from '../../utils/constants';

export default function Page() {
  return (
    <div>
      <Navigation currentPage={PageNumber.About} />
    </div>
  );
}

export const metadata = {
  title: 'nzws.me'
};
