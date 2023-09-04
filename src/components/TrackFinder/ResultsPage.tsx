import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { BsFillRewindCircleFill } from 'react-icons/bs';
import { useEffect } from 'react';
import InfoBanner from './ResultsPage/InfoBanner';
import BackButton from './ResultsPage/BackButton';
import ResultsTable from './ResultsPage/ResultsTable';

// interface ResultsTableProps {
//   priceData: priceDataType[] | null;
// }

function loadAmazonData() {
  throw new Error('Not yet implemented');
}

function loadBandcampData() {
  throw new Error('Not yet implemented');
}

function loadBeatportData() {
  throw new Error('Not yet implemented');
}

function loadItunesData() {
  throw new Error('Not yet implemented');
}

function loadData(searchParams: URLSearchParams) {
  const type = searchParams.get('type');

  if (type == 'song') {
    const artist = searchParams.get('artist');
    const song = searchParams.get('song');
  } else if (type == 'playlist') {
    const url = searchParams.get('url');
  }
}

const ResultsPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const data = loadData(searchParams);

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
