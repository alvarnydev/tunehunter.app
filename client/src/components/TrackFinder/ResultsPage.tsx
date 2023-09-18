import { useNavigate } from 'react-router-dom';

import ResultsTable from './ResultsPage/ResultsTable';
import { useEffect } from 'react';
import BackButton from './ResultsPage/BackButton';
import InfoBanner from './ResultsPage/InfoBanner';

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
      <ResultsTable />
      {/* <InfoBanner /> */}
    </>
  );
};

export default ResultsPage;
