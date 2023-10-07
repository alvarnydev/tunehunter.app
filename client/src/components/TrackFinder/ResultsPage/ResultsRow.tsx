import { FaExternalLinkSquareAlt } from 'react-icons/fa';
import { TrackInfoType } from '../../../../../types';
import { useTranslation } from 'react-i18next';
import InfoAnnotation from '../../utils/InfoComponents';

enum ArtistsShareEnum {
  amazonmusic = 0.5,
  bandcamp = 0.8,
  beatport = 0.5,
  itunesstore = 0.6,
}

const ResultsRow = ({ rowData }: { rowData: TrackInfoType }) => {
  const { t } = useTranslation();

  const vendorNameLower = rowData.vendor.name.toLowerCase().replace(' ', '');
  const vendorCountryLower = rowData.vendor.country.toLowerCase().slice(0, 2);

  const artistsShare = ArtistsShareEnum[vendorNameLower as keyof typeof ArtistsShareEnum];
  const logoPath =
    rowData.vendor.name == 'iTunes Store'
      ? `logo_${vendorNameLower}.jpg`
      : `logo_${vendorNameLower}.svg`;

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
            <div className='text-sm font-normal opacity-50'>
              {t(`countries.${vendorCountryLower}`)}
            </div>
          </div>
        </div>
      </td>
      <td>
        <div>{rowData.song.qualityFormat}</div>
        <div className='text-sm opacity-50'>{rowData.song.qualityKbps}kbps</div>
      </td>
      <td className=''>
        {(Math.round(rowData.song.price * artistsShare * 100) / 100).toFixed(2)}€
        <InfoAnnotation
          infoText={`Artist's share is ${artistsShare * 100}% on ${rowData.vendor.name}.`}
        />
      </td>
      <td>
        <div className='flex items-center gap-4'>
          <div className='inline-block'>{rowData.song.price}€</div>
          <div className='flex justify-center flex-1'>
            <button className='btn btn-ghost text-base normal-case'>
              <a href={rowData.vendor.songLink} target='_blank'>
                <FaExternalLinkSquareAlt size={32} className='text-primary' />
              </a>
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ResultsRow;
