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
    <>
      <SearchPage searchParams={searchParams} setSearchParams={setSearchParams} />
      <ResultsTable searchParams={searchParams} />
    </>
  );
};

export default ResultsPage;
