import { t } from 'i18next';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../../../utils/fetchData';
import { LoadingSpinner } from '../LoadingPage';
import ErrorAlert from './ErrorAlert';
import { useSearchParams } from 'react-router-dom';
import ResultsRow from './ResultsRow';
import { ResultsDataType } from '../../../utils/types';

function filterData(data: any): ResultsDataType {
  // If we find multiple songs to the input, have the user pick the one he/she means.
  // If the search params contain a duration, the user already narrowed down the search to a single song.
  // implement logic to pick the song the fits the picked duration the best

  const filteredData: ResultsDataType = {
    amazonData: data.amazon[0],
    beatportData: data.beatport[0],
    itunesData: data.itunes[0],
    bandcampData: data.bandcamp[0],
  };

  // const companyData: CompanyDataType = {
  //   name: song.company.name,
  //   country: song.company.country,
  //   logo: song.company.logo,
  //   artistsShare: song.company.artistsShare,
  // };
  // const songData: SongDataType = {
  //   title: song.title,
  //   artist: song.artist,
  //   album: song.album,
  //   duration: song.duration,
  //   qualityFormat: song.qualityFormat,
  //   qualityKbps: song.qualityKbps,
  //   price: song.price,
  //   link: song.link,
  // };

  return filteredData;
}

const ResultsTable = () => {
  const [searchParams] = useSearchParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ['songData', { searchParams }],
    queryFn: fetchData,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error && error instanceof Error) return <ErrorAlert errorMessage={error.message} />;

  const filteredData = filterData(data);

  return (
    <div className='overflow-x-auto w-11/12'>
      <table className='table w-full'>
        <thead>
          <tr>
            <td className='text-base normal-case'>{t('resultstable.header.store')}</td>
            <td className='text-base normal-case'>{t('resultstable.header.quality')}</td>
            <td className='text-base normal-case'>{t('resultstable.header.artistsshare')}</td>
            <td className='text-base normal-case'>{t('resultstable.header.price')}</td>
          </tr>
        </thead>
        <tbody>
          {filteredData.amazonData && <ResultsRow rowData={filteredData.amazonData} />}
          {filteredData.bandcampData && <ResultsRow rowData={filteredData.bandcampData} />}
          {filteredData.beatportData && <ResultsRow rowData={filteredData.beatportData} />}
          {filteredData.itunesData && <ResultsRow rowData={filteredData.itunesData} />}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
