import { ErrorBoundary } from 'react-error-boundary';
import AppAlert from '@/components/UtilComponents/ErrorComponents';
import ResultsTable from './ResultsPage/ResultsTable';
import SearchPage from './SearchPage';

const ResultsPage = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full gap-14'>
      <SearchPage />
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
