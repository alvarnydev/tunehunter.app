import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchMusicData } from '@/utils/functions/fetchMusicData';
import { LoadingIndicator } from '@/components/atoms/IndicatorComponents';
import AppAlert, { WarningAlert } from '@/components/atoms/ErrorComponents';
import { logError } from '@/utils/logUtils';
import TrackPreview from '../molecules/TrackPreview';
import { validateData } from '@/utils/validateDataUtils';
import InfoAnnotation from '../atoms/InfoComponents';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';
import { VendorData } from '../../../../globalTypes';
import { useRef } from 'react';

enum ArtistsShareEnum {
  amazonmusic = 0.5,
  bandcamp = 0.8,
  beatport = 0.5,
  itunesstore = 0.6,
}

const ResultsTable = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const resultsRef = useRef(null);
  const { isLoading, error, data } = useQuery({
    queryKey: [searchParams.toString(), { searchParams }],
    queryFn: fetchMusicData,
    retry: false,
  });

  if (isLoading)
    return (
      <div className='flex items-center justify-center h-96'>
        <LoadingIndicator size={40} />
      </div>
    );
  if (error && error instanceof Error) {
    logError({
      error,
      info: {
        customMessage: `ResultsTable query failed!`,
        componentStack: error.stack,
      },
    });
    return (
      <div className='flex items-center justify-center h-96'>
        <AppAlert type={'error'} message={error.message} />
      </div>
    );
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
          <div>{vendorData.song.qualityFormat}</div>
          <div className='text-sm opacity-50'>{vendorData.song.qualityKbps}kbps</div>
        </td>
        <td className=''>
          {vendorData.song.price && (Math.round(vendorData.song.price * artistsShare * 100) / 100).toFixed(2)}€
          <InfoAnnotation infoText={`Artist's share is ${artistsShare * 100}% on ${vendorData.vendor.name}.`} />
        </td>
        <td>
          <div className='flex items-center gap-4'>
            <div className='inline-block'>{vendorData.song.price}€</div>
            <div className='flex justify-center flex-1'>
              <a href={vendorData.song.songLink} target='_blank'>
                <button className='btn btn-secondary btn-ghost text-base normal-case'>
                  <FaExternalLinkSquareAlt size={32} className='text-secondary' />
                </button>
              </a>
            </div>
          </div>
        </td>
      </tr>
    );
  };

  if (data) {
    if (!validateData(data)) return <WarningAlert message={t('errors.noSong')} />;
    document.title = `${data.itunes.song.artist} - ${data.itunes.song.title}`;

    return (
      <div ref={resultsRef} className='overflow-x-auto w-11/12 flex flex-row gap-8 h-96'>
        <TrackPreview songData={data.preview} resultsRef={resultsRef} />
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
            {data.amazon && <ResultsRow vendorData={data.amazon} />}
            {data.bandcamp && <ResultsRow vendorData={data.bandcamp} />}
            {data.beatport && <ResultsRow vendorData={data.beatport} />}
            {data.itunes && <ResultsRow vendorData={data.itunes} />}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ResultsTable;
