import { useTranslation } from 'react-i18next';
import { TrackInfoType } from '../../../../../types';

function openModal() {
  const modal = document.getElementById('song_choice_modal') as HTMLDialogElement;
  if (!modal) return;
  modal.showModal();
}

const TrackPreview = (props: { songData: TrackInfoType }) => {
  const { t } = useTranslation();

  return (
    <div className='bg-primary m-auto flex flex-col items-center justify-around rounded-2xl gap-4 p-8 xl:w-96 xl:m-0'>
      <figure className='content-center'>
        <img src={props.songData.vendor.artLink} alt='Shoes' className='rounded-xl w-40 h-40' />
      </figure>
      <div className='flex flex-col justify-center items-center text-center p-0 gap-1'>
        <h2 className='text-xl font-bold'>{props.songData.song.artist}</h2>
        <p>{props.songData.song.title}</p>
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

{
  /* <div className='flex flex-col gap-4'>
  <img src={props.songData.vendor.artLink} alt='album cover' />
  <span className='text-sm'>{props.songData.song.artist}</span>
  <span className='text-sm'>{props.songData.song.title}</span>
</div>; */
}
