import { FaExternalLinkSquareAlt } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { PriceDataType } from '@/types';
import Image from 'next/image';

// interface IResultsTableProps {
//   priceData: PriceDataType[] | null;
// }

const ResultsTable = () => {
  // { priceData }: IResultsTableProps
  //const priceDataArray = priceData ? priceData : [];

  return (
    <div className='overflow-x-auto w-11/12'>
      <table className='table w-full'>
        {/* head */}
        <thead>
          <tr>
            <td className='text-base normal-case'>{'resultstable.header.store'}</td>
            <td className='text-base normal-case'>{'resultstable.header.quality'}</td>
            <td className='text-base normal-case'>{'resultstable.header.artistsshare'}</td>
            <td className='text-base normal-case'>{'resultstable.header.price'}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className='flex items-center space-x-5'>
                <div className='avatar '>
                  <div className='mask mask-squircle w-12 h-12'>
                    <Image
                      width={48}
                      height={48}
                      src='/assets/logo_amazonmusic.png'
                      alt='Amazon Music logo'
                    />
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
              0.69€
              <span
                className='tooltip ml-1 inline-block text-sm opacity-50'
                data-tip={"Artist's share is ~70% on Amazon Music."}
              >
                <AiOutlineInfoCircle size={16} />
              </span>
            </td>
            <td>
              <div className='flex items-center gap-4'>
                <div className='inline-block'>0.99€</div>
                <div className='flex justify-center flex-1'>
                  <button className='btn btn-ghost text-base normal-case'>
                    <FaExternalLinkSquareAlt size={32} className='text-secondary' />
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
                    <Image
                      width={48}
                      height={48}
                      src='/assets/logo_bandcamp.png'
                      alt='Bandcamp logo'
                    />
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
              0.85€
              <span
                className='tooltip ml-1 inline-block text-sm opacity-50'
                data-tip={"Artist's share is 85-90% on Bandcamp."}
              >
                <AiOutlineInfoCircle size={16} />
              </span>
            </td>
            <td className='border-0'>
              <div className='flex items-center gap-4'>
                <div className='inline-block'>0.99€</div>
                <div className='flex justify-center flex-1'>
                  <button className='btn btn-ghost text-base normal-case'>
                    <FaExternalLinkSquareAlt size={32} className='text-secondary' />
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
              0.85€
              <span
                className='tooltip ml-1 inline-block text-sm opacity-50'
                data-tip={"Artist's share is 85-90% on Bandcamp."}
              >
                <AiOutlineInfoCircle size={16} />
              </span>
            </td>
            <td>
              <div className='flex items-center gap-4'>
                <div className='inline-block'>0.99€</div>
                <div className='flex justify-center flex-1'>
                  <button className='btn btn-ghost text-base normal-case'>
                    <FaExternalLinkSquareAlt size={32} className='text-secondary' />
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
                    <Image
                      width={48}
                      height={48}
                      src='/assets/logo_beatport.jpg'
                      alt='Beatport logo'
                    />
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
                    <Image
                      width={48}
                      height={48}
                      src='/assets/logo_itunesstore.jpg'
                      alt='iTunes Store logo'
                    />
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
              0.69€
              <span
                className='tooltip ml-1 inline-block text-sm opacity-50'
                data-tip={"Artist's share is ~70% on the iTunes Store."}
              >
                <AiOutlineInfoCircle size={16} />
              </span>
            </td>
            <td>
              <div className='flex items-center gap-4'>
                <div className='inline-block'>0.99€</div>
                <div className='flex justify-center flex-1'>
                  <button className='btn btn-ghost text-base normal-case'>
                    <FaExternalLinkSquareAlt size={32} className='text-secondary' />
                  </button>
                </div>
              </div>
            </td>
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
