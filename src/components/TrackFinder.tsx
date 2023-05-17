import { useState } from 'react';
import ResultsTable from './TrackFinder/ResultsTable';
import SearchBar from './TrackFinder/SearchBar';
import { priceDataType } from '../types';

const samplePriceData: Array<priceDataType> = [
  {
    artist: 'A',
    song: 'B',
    prices: { amazon: 0.99, itunes: 0.99, beatport: 1.49, bandcamp: 0.99 },
  },
];

const TrackFinder = () => {
  const [priceData, setPriceData] = useState(samplePriceData);

  return (
    <>
      <SearchBar setPriceData={setPriceData} />
      <ResultsTable priceData={priceData} />
    </>
  );
};

export default TrackFinder;
