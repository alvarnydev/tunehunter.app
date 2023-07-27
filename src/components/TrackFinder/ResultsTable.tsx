import { useTranslation } from 'react-i18next';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { BsFillRewindCircleFill } from 'react-icons/bs';
import { useEffect } from 'react';

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

const ResultsTable = () => {
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
      <Link className='flex' to='/'>
        <button
          type='submit'
          className='btn font-normal rounded-full w-auto gap-2 flex normal-case px-4 text-base tracking-wide'
        >
          <BsFillRewindCircleFill size={24} />
          {t('resultstable.backtostart')}
        </button>
      </Link>
      <div className='overflow-x-auto w-11/12'>
        <table className='table w-full'>
          {/* head */}
          <thead>
            <tr>
              <td className='text-base normal-case'>{t('resultstable.header.store')}</td>
              <td className='text-base normal-case'>{t('resultstable.header.quality')}</td>
              <td className='text-base normal-case'>{t('resultstable.header.artistsshare')}</td>
              <td className='text-base normal-case'>{t('resultstable.header.price')}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className='flex items-center space-x-5'>
                  <div className='avatar '>
                    <div className='mask mask-squircle w-12 h-12'>
                      <img src='/logo_amazonmusic.png' alt='Avatar Tailwind CSS Component' />
                    </div>
                  </div>
                  <div className='md:block hidden'>
                    <div className='font-bold'>Amazon Music</div>
                    <div className='text-sm font-normal opacity-50'>United States</div>
                  </div>
                </div>
              </td>
              <td>
                <div>MP3</div>
                <div className='text-sm opacity-50'>320kbps</div>
              </td>
              <td className=''>
                0.49€
                <span
                  className='tooltip ml-1 inline-block text-sm opacity-50'
                  data-tip={"Artist's share is 50% on Amazon Music."}
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
    </>
  );
};

export default ResultsTable;
