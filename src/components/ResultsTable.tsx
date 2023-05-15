import { useTranslation } from 'react-i18next';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';

interface ResultsTableProps {
  priceData:
    | [
        {
          artist: string;
          song: string;
          prices: { amazon: number; itunes: number; beatport: number; bandcamp: number };
        }
      ]
    | null;
}

const ResultsTable = ({ priceData }: ResultsTableProps) => {
  const { t } = useTranslation();

  return (
    <div className='overflow-x-auto w-full'>
      <table className='table w-full'>
        {/* head */}
        <thead>
          <tr>
            <th className='text-base normal-case'>{t('resultstable.header.store')}</th>
            <th className='text-base normal-case'>{t('resultstable.header.quality')}</th>
            <th className='text-base normal-case'>{t('resultstable.header.price')}</th>
            <th className='text-base normal-case'>{t('resultstable.header.artistsshare')}</th>
            <th className='text-base normal-case'></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className='flex items-center space-x-5'>
                <div className='avatar'>
                  <div className='mask mask-squircle w-12 h-12'>
                    <img src='/logo_amazonmusic.png' alt='Avatar Tailwind CSS Component' />
                  </div>
                </div>
                <div className='md:block hidden'>
                  <div className='font-bold'>Amazon Music</div>
                  <div className='text-sm opacity-50'>United States</div>
                </div>
              </div>
            </td>
            <td>
              <div>MP3</div>
              <div className='text-sm opacity-50'>320kbps</div>
            </td>
            <td>
              <div>0.99€</div>
            </td>
            <td>
              <div>0.59€</div>
              <div className='text-sm opacity-50'>60%</div>
            </td>
            <th>
              <button className='btn btn-ghost text-base normal-case'>
                {<FaExternalLinkSquareAlt size={32} className='text-secondary' />}
              </button>
            </th>
          </tr>
          <tr>
            <td>
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
            <td>
              <div>MP3</div>
              <div className='text-sm opacity-50'>320kbps</div>
            </td>
            <td>
              <div>0.99€</div>
            </td>
            <td>
              <div>0.59€</div>
              <div className='text-sm opacity-50'>60%</div>
            </td>
            <th>
              <button className='btn btn-ghost text-base normal-case'>
                {<FaExternalLinkSquareAlt size={32} className='text-secondary' />}
              </button>
            </th>
          </tr>
          <tr>
            <td></td>
            <td>
              <div>FLAC</div>
              <div className='text-sm opacity-50'>-</div>
            </td>
            <td>
              <div>0.99€</div>
            </td>
            <td>
              <div>0.59€</div>
              <div className='text-sm opacity-50'>60%</div>
            </td>
            <th>
              <button className='btn btn-ghost text-base normal-case'>
                {<FaExternalLinkSquareAlt size={32} className='text-secondary' />}
              </button>
              {/* <button className='btn btn-secondary text-base normal-case'>
                {t('resultstable.buy')}
              </button> */}
            </th>
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
            <th></th>
          </tr>
          <tr>
            <td>
              <div className='flex items-center space-x-5'>
                <div className='avatar'>
                  <div className='mask mask-squircle w-12 h-12'>
                    <img src='/logo_applemusic.svg' alt='Avatar Tailwind CSS Component' />
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
              <div>0.99€</div>
            </td>
            <td>
              <div>0.59€</div>
              <div className='text-sm opacity-50'>60%</div>
            </td>
            <th>
              <button className='btn btn-ghost text-base normal-case'>
                {<FaExternalLinkSquareAlt size={32} className='text-secondary' />}
              </button>
            </th>
          </tr>
        </tbody>

        {/* foot */}
        {/* <tfoot>
          <tr>
            <th />
            <th />
            <th />
            <th />
          </tr>
        </tfoot> */}
      </table>
    </div>
  );
};

export default ResultsTable;
