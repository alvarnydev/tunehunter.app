import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ApiResponseDataType, ResultsDataType } from '../../../../../globalTypes';
import { fetchMusicData } from '@/utils/fetchMusicData';
import { LoadingIndicator } from '@/components/Body/Shared/IndicatorComponents';
import AppAlert, { WarningAlert } from '@/components/Body/Shared/ErrorComponents';
import { logError } from '@/components/Body/Shared/ErrorFunctions';
import TrackPreview from './TrackPreview';
import ResultsRow from './ResultsRow';

function validateData(apiData: ApiResponseDataType): number {
  // todo: itunes length 0 or undefined?
  if (apiData.itunesData.length == 0 || apiData.itunesData == undefined) return 0;
  return 1;
}

function filterData(apiData: ApiResponseDataType): ResultsDataType {
  // todo: If we find multiple songs to the input, have the user pick the one he/she means.
  // If the search params contain a duration, the user already narrowed down the search to a single song.
  // implement logic to pick the song the fits the picked duration the best

  const filteredData: ResultsDataType = {
    amazonData: apiData.amazonData[0],
    beatportData: apiData.beatportData[0],
    itunesData: apiData.itunesData[0],
    bandcampData: apiData.bandcampData[0],
  };

  return filteredData;
}

const ResultsTable = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { isLoading, error, data } = useQuery({
    queryKey: [searchParams.toString(), { searchParams }],
    queryFn: fetchMusicData,
    retry: false,
  });

  if (isLoading)
    return (
      <div className='flex h-[426px]'>
        <LoadingIndicator size={40} />
      </div>
    );
  if (error && error instanceof Error) {
    logError(error, {
      customMessage: `ResultsTable query failed!`,
      componentStack: error.stack,
    });
    return <AppAlert type={'error'} message={error.message} />;
  }

  if (data) {
    if (!validateData(data)) return <WarningAlert message={t('errors.noSong')} />;

    const filteredData = filterData(data);
    document.title = `${filteredData.itunesData.song.artist} - ${filteredData.itunesData.song.title}`;

    return (
      <div className='overflow-x-auto w-11/12 flex flex-row gap-8 h-96'>
        <TrackPreview songData={filteredData.itunesData} />
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
  }
};

export default ResultsTable;