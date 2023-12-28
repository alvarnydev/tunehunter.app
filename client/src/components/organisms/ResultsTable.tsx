import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchMusicData } from '@/utils/functions/fetchMusicData';
import { LoadingIndicator } from '@/components/atoms/IndicatorComponents';
import AppAlert, { WarningAlert } from '@/components/atoms/ErrorComponents';
import { logError } from '@/utils/logUtils';
import TrackPreview from '../molecules/TrackPreview';
import { validateData } from '@/utils/validateDataUtils';
import { ResponseData, VendorData } from '../../../../globalTypes.ts';
import { sortByMatchingDuration } from '../../../../globalUtils.ts';
import InfoAnnotation from '../atoms/InfoComponents';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';
import { useState } from 'react';

enum ArtistsShareEnum {
  amazonmusic = 0.5,
  bandcamp = 0.8,
  beatport = 0.5,
  itunesstore = 0.6,
}

const ResultsRow = ({ vendorData }: { vendorData: VendorData }) => {
  const { t } = useTranslation();

  const vendorNameLower = vendorData.vendor.name.toLowerCase().replace(' ', '');
  const vendorCountryLower = vendorData.vendor.country.toLowerCase().slice(0, 2);

  const artistsShare = ArtistsShareEnum[vendorNameLower as keyof typeof ArtistsShareEnum];
  const logoPath = vendorData.vendor.name == 'iTunes Store' ? `logo_${vendorNameLower}.jpg` : `logo_${vendorNameLower}.svg`;

  return (
    <tr>
      <td>
        <div className='flex items-center space-x-5'>
          <div className='avatar '>
            <div className='mask mask-squircle w-12 h-12'>
              <img src={logoPath} alt='Avatar Tailwind CSS Component' />
            </div>
          </div>
          <div className='md:block hidden'>
            <div className='font-bold'>{vendorData.vendor.name}</div>
            <div className='text-sm font-normal opacity-50'>{t(`countries.${vendorCountryLower}`)}</div>
          </div>
        </div>
      </td>
      <td>
        <div>{vendorData.songs[0].qualityFormat}</div>
        <div className='text-sm opacity-50'>{vendorData.songs[0].qualityKbps}kbps</div>
      </td>
      <td className=''>
        {vendorData.songs[0].price && (Math.round(vendorData.songs[0].price! * artistsShare * 100) / 100).toFixed(2)}€
        <InfoAnnotation infoText={`Artist's share is ${artistsShare * 100}% on ${vendorData.vendor.name}.`} />
      </td>
      <td>
        <div className='flex items-center gap-4'>
          <div className='inline-block'>{vendorData.songs[0].price}€</div>
          <div className='flex justify-center flex-1'>
            <a href={vendorData.songs[0].songLink} target='_blank'>
              <button className='btn btn-ghost text-base normal-case'>
                <FaExternalLinkSquareAlt size={32} className='text-primary' />
              </button>
            </a>
          </div>
        </div>
      </td>
    </tr>
  );
};

const ResultsTable = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [previewIndex, setPreviewIndex] = useState(0);
  const { isLoading, error, data } = useQuery({
    queryKey: [searchParams.toString(), { searchParams }],
    queryFn: fetchMusicData,
    retry: false,
  });

  const handleIndexChange = (newIndex: number) => {
    // Rerender changes site title and trackpreview chosen
    setPreviewIndex(newIndex);

    // Resort array to match duration
    if (data) {
      const newDuration = data.itunesData.songs[newIndex].duration;
      let key: keyof ResponseData;
      for (key in data) {
        data[key].songs.sort(sortByMatchingDuration(newDuration));
      }
    }
  };

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

    document.title = `${data.itunesData.songs[0].artist} - ${data.itunesData.songs[0].title}`;

    return (
      <div className='overflow-x-auto w-11/12 flex flex-row gap-8 h-96'>
        <TrackPreview songData={data.itunesData.songs} index={previewIndex} handleIndexChange={handleIndexChange} />
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
            {data.amazonData && <ResultsRow vendorData={data.amazonData} />}
            {data.bandcampData && <ResultsRow vendorData={data.bandcampData} />}
            {data.beatportData && <ResultsRow vendorData={data.beatportData} />}
            {data.itunesData && <ResultsRow vendorData={data.itunesData} />}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ResultsTable;
