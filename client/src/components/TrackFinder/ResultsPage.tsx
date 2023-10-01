import { useNavigate, useSearchParams } from 'react-router-dom';

import ResultsTable from './ResultsPage/ResultsTable';
import { useEffect } from 'react';
import SearchPage from './SearchPage';

const ResultsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Backspace gets us back, escape brings us home
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key == 'Backspace' && e.target == document.body) {
        navigate(-1);
      }
      if (e.key == 'Escape') {
        navigate('/');
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return (
    <div className='flex flex-col justify-center items-center gap-16'>
      <SearchPage searchParams={searchParams} setSearchParams={setSearchParams} />
      <div className='flex justify-center items-center xl:h-96'>
        <ResultsTable searchParams={searchParams} />
      </div>
    </div>
  );
};

export default ResultsPage;
