import { useTranslation } from 'react-i18next';
import { TrackInfoType } from '../../../../../types';

function openModal() {
  const modal = document.getElementById('song_choice_modal') as HTMLDialogElement;
  if (!modal) return;
  modal.showModal();
}

const TrackPreview = ({ songData }: { songData: TrackInfoType }) => {
  const { t } = useTranslation();

  return (
    <div className='bg-primary m-auto flex flex-col items-center justify-around rounded-2xl gap-4 p-8 xl:w-96 xl:m-0'>
      <figure className='content-center'>
        <img src={songData.vendor.artLink} alt='Album cover art' className='rounded-xl w-40 h-40' />
      </figure>
      <div className='flex flex-col justify-center items-center text-center p-0 gap-1'>
        <h2 className='text-xl font-bold'>{songData.song.artist}</h2>
        <p>{songData.song.title}</p>
      </div>
      <button className='btn btn-outline rounded-full text-xs w-auto' onClick={openModal}>
        {t('resultstable.wrongsong')}
      </button>
      <dialog id='song_choice_modal' className='modal'>
        <div className='modal-box'>
          <form method='dialog'>
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>✕</button>
          </form>
          <h3 className='font-bold text-lg'>Hello!</h3>
          <p className='py-4'>Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </div>
  );
};

export default TrackPreview;
