import { FaExternalLinkSquareAlt } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { t } from 'i18next';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../../../utils/fetchData';
import { LoadingSpinner } from '../LoadingPage';
import ErrorAlert from './ErrorAlert';
import { useSearchParams } from 'react-router-dom';
import ResultsRow from './ResultsRow';

const ResultsTable = () => {
  const [searchParams] = useSearchParams();
  const { isLoading, error, data } = useQuery({
    queryKey: ['songData', { searchParams }],
    queryFn: fetchData,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error && error instanceof Error) return <ErrorAlert errorMessage={error.message} />;

  console.log(data?.amazon);

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
          {data?.amazon.map((song: any) => {
            return <ResultsRow vendor='Amazon Music' price={song.price} link={song.link} />;
          })}
          <tr>
            <td className='border-0'>
              <div className='flex items-center space-x-5'>
                <div className='avatar'>
                  <div className='mask mask-squircle w-12 h-12'>
                    <img src='/logo_bandcamp.svg' alt='Avatar Tailwind CSS Component' />
                  </div>
                </div>
                <div className='md:block hidden'>
                  <div className='font-bold'>Bandcamp</div>
                </div>
              </div>
            </td>
            <td className='border-0'>
              <div>MP3</div>
              <div className='text-sm opacity-50'>320kbps</div>
            </td>

            <td className='border-0'>
              0.79€
              <span
                className='tooltip ml-1 inline-block text-sm opacity-50'
                data-tip={"Artist's share is 80% on Bandcamp."}
              >
                <AiOutlineInfoCircle size={16} />
              </span>
            </td>
            <td className='border-0'>
              <div className='flex items-center gap-4'>
                <div className='inline-block'>0.99€</div>
                <div className='flex justify-center flex-1'>
                  <button className='btn btn-ghost text-base normal-case'>
                    <FaExternalLinkSquareAlt size={32} className='text-primary' />
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div>FLAC</div>
            </td>
            <td>
              0.79€
              <span
                className='tooltip ml-1 inline-block text-sm opacity-50'
                data-tip={"Artist's share is 80% on Bandcamp."}
              >
                <AiOutlineInfoCircle size={16} />
              </span>
            </td>
            <td>
              <div className='flex items-center gap-4'>
                <div className='inline-block'>0.99€</div>
                <div className='flex justify-center flex-1'>
                  <button className='btn btn-ghost text-base normal-case'>
                    <FaExternalLinkSquareAlt size={32} className='text-primary' />
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className='flex items-center space-x-5'>
                <div className='avatar'>
                  <div className='mask mask-squircle w-12 h-12'>
                    <img src='/logo_beatport.svg' alt='Avatar Tailwind CSS Component' />
                  </div>
                </div>
                <div className='md:block hidden'>
                  <div className='font-bold'>Beatport</div>
                </div>
              </div>
            </td>
            <td>
              <div>MP3</div>
              <div className='text-sm opacity-50'>320kbps</div>
            </td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>
              <div className='flex items-center space-x-5'>
                <div className='avatar'>
                  <div className='mask mask-squircle w-12 h-12'>
                    <img src='/logo_itunesstore.jpg' alt='Avatar Tailwind CSS Component' />
                  </div>
                </div>
                <div className='md:block hidden'>
                  <div className='font-bold'>iTunes Store</div>
                </div>
              </div>
            </td>
            <td>
              <div>MP3</div>
              <div className='text-sm opacity-50'>320kbps</div>
            </td>
            <td>
              0.59€
              <span
                className='tooltip ml-1 inline-block text-sm opacity-50'
                data-tip={"Artist's share is 60% on the iTunes Store."}
              >
                <AiOutlineInfoCircle size={16} />
              </span>
            </td>
            <td>
              <div className='flex items-center gap-4'>
                <div className='inline-block'>0.99€</div>
                <div className='flex justify-center flex-1'>
                  <button className='btn btn-ghost text-base normal-case'>
                    <FaExternalLinkSquareAlt size={32} className='text-primary' />
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
