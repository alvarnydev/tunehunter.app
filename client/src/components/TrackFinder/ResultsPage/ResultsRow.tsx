import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';
import { TrackInfoType } from '../../../../../types';

enum ArtistsShareEnum {
  amazon = 0.5,
  bandcamp = 0.8,
  beatport = 0.5,
  itunes = 0.6,
}

const ResultsRow = ({ rowData }: { rowData: TrackInfoType }) => {
  const artistsShare = ArtistsShareEnum.amazon; // todo: look up
  const logoPath = `logo_${rowData.vendor.name}.svg`;

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
            <div className='font-bold'>{rowData.vendor.name}</div>
            <div className='text-sm font-normal opacity-50'>{rowData.vendor.country}</div>
          </div>
        </div>
      </td>
      <td>
        <div>{rowData.song.qualityFormat}</div>
        <div className='text-sm opacity-50'>{rowData.song.qualityFormat}</div>
      </td>
      <td className=''>
        {rowData.song.price / artistsShare}€
        <span
          className='tooltip ml-1 inline-block text-sm opacity-50'
          data-tip={`Artist's share is ${artistsShare}% on ${rowData.vendor.name}.`}
        >
          <AiOutlineInfoCircle size={16} />
        </span>
      </td>
      <td>
        <div className='flex items-center gap-4'>
          <div className='inline-block'>{rowData.song.price}€</div>
          <div className='flex justify-center flex-1'>
            <button className='btn btn-ghost text-base normal-case'>
              <FaExternalLinkSquareAlt size={32} className='text-primary' />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ResultsRow;

/*

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
          */
