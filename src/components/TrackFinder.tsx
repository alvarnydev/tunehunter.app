import { useState } from 'react';
import ResultsTable from './ResultsTable';
import SearchBar from './SearchBar';

const TrackFinder = () => {
  const [priceData, setPriceData] = useState(null);

  return (
    <>
      <SearchBar setPriceData={setPriceData} />
      <ResultsTable priceData={priceData} />
    </>
  );
};

export default TrackFinder;
