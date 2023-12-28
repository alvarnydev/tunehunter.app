import { useTranslation } from 'react-i18next';
import { TrackData } from '../../../../globalTypes';

const TrackPreview = ({ songData, index, handleIndexChange }: { songData: TrackData[]; index: number; handleIndexChange: (newIndex: number) => void }) => {
  const { t } = useTranslation();

  return (
    <div className='bg-primary flex flex-col items-center justify-around rounded-2xl gap-4 p-8 w-96 m-0 lg'>
      <figure className='content-center'>
        <img src={songData[index].artLink} alt='Album cover art' className='rounded-xl w-40 h-40' />
      </figure>
      <div className='flex flex-col justify-start text-primary-content items-center text-center max-h-20 overflow-scroll p-0 gap-1'>
        <h2 className='text-xl font-bold'>{songData[index].artist}</h2>
        <p>{songData[index].title}</p>
      </div>
      <label htmlFor='my-modal-3' className='btn btn-outline text-primary-content rounded-full text-xs w-auto'>
        {t('resultstable.wrongsong')}
      </label>
      <input type='checkbox' id='my-modal-3' className='modal-toggle' />
      {/* Make bg blurry, add close on click outside */}
      <div className='modal'>
        <div className='modal-box relative'>
          <label htmlFor='my-modal-3' className='btn btn-sm btn-circle absolute right-2 top-2'>
            ✕
          </label>
          <h3 className='text-lg font-bold'>Congratulations random Internet user!</h3>
          <p className='py-4'>You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
        </div>
      </div>
    </div>
  );
};

export default TrackPreview;
