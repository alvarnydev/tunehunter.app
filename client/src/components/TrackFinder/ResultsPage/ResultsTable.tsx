import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../../../utils/fetchData';
import { LoadingSpinner } from '../../utils/LoadingComponents';
import ResultsRow from './ResultsRow';
import { ApiResponseDataType, ResultsDataType } from '../../../../../types';
import ErrorAlert, { WarningAlert } from '../../utils/ErrorComponents';
import { useTranslation } from 'react-i18next';
import TrackPreview from './TrackPreview';
import { logError } from '../../utils/ErrorFunctions';

function validateData(apiData: ApiResponseDataType): number {
  // todo: itunes length 0 or undefined?
  if (apiData.itunesData.length == 0 || apiData.itunesData == undefined) return 0;
  return 1;
}

function filterData(apiData: ApiResponseDataType): ResultsDataType {
  // If we find multiple songs to the input, have the user pick the one he/she means.
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

const ResultsTable = (props: { searchParams: URLSearchParams }) => {
  const { t } = useTranslation();
  const { isLoading, error, data } = useQuery({
    queryKey: [props.searchParams.toString(), { searchParams: props.searchParams }],
    queryFn: fetchData,
  });

  if (isLoading) return <LoadingSpinner size={40} />;
  if (error && error instanceof Error) {
    logError(error, {
      customMessage: `ResultsTable query failed!`,
      componentStack: error.stack,
    });
    return <ErrorAlert />;
  }

  if (data) {
    if (!validateData(data))
      return <WarningAlert message='Could not find a song for your input :(' />;

    const filteredData = filterData(data);

    return (
      <div className='overflow-x-auto w-11/12 flex flex-col xl:flex-row gap-8'>
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
