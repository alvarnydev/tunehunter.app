import { useNavigate, useSearchParams } from 'react-router-dom';

import ResultsTable from './ResultsPage/ResultsTable';
import { useEffect } from 'react';
import SearchPage from './SearchPage';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorAlert from '../utils/ErrorComponents';
import { logError } from '../utils/ErrorFunctions';

const ResultsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Backspace gets us back, ctrl + escape brings us home
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key == 'Backspace' && e.target == document.body) {
        navigate(-1);
      }
      if (e.key == 'Escape' && e.ctrlKey == true && e.target == document.body) {
        navigate('/');
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return (
    <div className='flex flex-col justify-center items-center w-full gap-16'>
      <SearchPage searchParams={searchParams} setSearchParams={setSearchParams} />
      <div className='flex justify-center items-center xl:h-96'>
        <ErrorBoundary
          fallback={
            <ErrorAlert message="Something bad happened, sorry! We're investigating... 🕵️‍♀️" />
          }
          onError={logError}
        >
          <ResultsTable searchParams={searchParams} />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default ResultsPage;
