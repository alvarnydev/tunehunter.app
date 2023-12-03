import ResultsTable from './ResultsPage/ResultsTable';
import { ErrorBoundary } from 'react-error-boundary';
import AppAlert from '../utils/ErrorComponents';
import { logError } from '../utils/ErrorFunctions';
import SearchPage from './SearchPage';

const ResultsPage = () => {
  return (
    <div className='flex flex-col justify-center items-center w-full gap-14'>
      <SearchPage />
      <div className='flex justify-center items-center h-96'>
        <ErrorBoundary fallback={<AppAlert type={'error'} />} onError={logError}>
          <ResultsTable />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default ResultsPage;
