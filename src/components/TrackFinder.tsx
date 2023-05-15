import { useState } from 'react';
import ResultsTable from './TrackFinder/ResultsTable';
import SearchBar from './TrackFinder/SearchBar';

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
