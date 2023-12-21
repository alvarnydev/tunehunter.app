import { ErrorBoundary } from 'react-error-boundary';
import AppAlert from '@/components/Body/Shared/ErrorComponents';
import ResultsTable from './ResultsPage/ResultsTable';
import SongPicker from './Shared/SongPicker';
import ResultsPageLayout from './ResultsPage/ResultsPageLayout';

const ResultsPage = () => {
  return (
    <ResultsPageLayout>
      <SongPicker />
      <ErrorBoundary fallback={<AppAlert type={'error'} />}>
        {/* onError={logError} */}
        <ResultsTable />
      </ErrorBoundary>
    </ResultsPageLayout>
  );
};

export default ResultsPage;
