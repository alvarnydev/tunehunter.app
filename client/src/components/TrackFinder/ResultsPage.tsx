import { useSearchParams } from 'react-router-dom';

import ResultsTable from './ResultsPage/ResultsTable';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorAlert from '../utils/ErrorComponents';
import { logError } from '../utils/ErrorFunctions';
import SearchBar from './SearchPage/SearchBar';

const ResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className='flex flex-col justify-center items-center w-full gap-16'>
      <SearchBar searchParams={searchParams} setSearchParams={setSearchParams} />
      <div className='flex justify-center items-center xl:h-96'>
        <ErrorBoundary fallback={<ErrorAlert />} onError={logError}>
          <ResultsTable searchParams={searchParams} />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default ResultsPage;
