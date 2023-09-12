import { useNavigate } from 'react-router-dom';

import InfoBanner from './ResultsPage/InfoBanner';
import BackButton from './ResultsPage/BackButton';
import ResultsTable from './ResultsPage/ResultsTable';
import { useEffect } from 'react';

const ResultsPage = () => {
  const navigate = useNavigate();

  // Backspace gets us back
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key == 'Backspace') {
        navigate(-1);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return (
    <>
      <BackButton />
      <InfoBanner />
      <ResultsTable />
    </>
  );
};

export default ResultsPage;
