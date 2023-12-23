import { useTranslation } from 'react-i18next';
import { TrackDataType } from '../../../../globalTypes';

function openModal() {
  const modal = document.getElementById('song_choice_modal') as HTMLDialogElement;
  if (!modal) return;
  modal.showModal();
}

const TrackPreview = ({ songData }: { songData: TrackDataType }) => {
  const { t } = useTranslation();

  return (
    <div className='bg-primary flex flex-col items-center justify-around rounded-2xl gap-4 p-8 w-96 m-0 lg'>
      <figure className='content-center'>
        <img src={songData.artLink} alt='Album cover art' className='rounded-xl w-40 h-40' />
      </figure>
      <div className='flex flex-col justify-start text-primary-content items-center text-center max-h-20 overflow-scroll p-0 gap-1'>
        <h2 className='text-xl font-bold'>{songData.artist}</h2>
        <p>{songData.title}</p>
      </div>
      <button className='btn btn-outline text-primary-content rounded-full text-xs w-auto' onClick={openModal}>
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
