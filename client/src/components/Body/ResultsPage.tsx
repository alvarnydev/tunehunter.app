import { ErrorBoundary } from 'react-error-boundary';
import AppAlert from '@/components/Body/Shared/ErrorComponents';
import ResultsTable from './ResultsPage/ResultsTable';
import SongPicker from './Shared/SongPicker';

const ResultsPage = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full gap-14'>
      <SongPicker />
      <div className='flex justify-center items-center h-96'>
        <ErrorBoundary fallback={<AppAlert type={'error'} />}>
          {/* onError={logError} */}
          <ResultsTable />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default ResultsPage;
