import { useTranslation } from 'react-i18next';
import { TrackInfoType } from '../../../../../types';

const TrackPreview = (props: { songData: TrackInfoType }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className='bg-primary m-auto flex flex-col items-center justify-around rounded-2xl gap-4 p-8 xl:w-96 xl:m-0'>
        <figure className='content-center'>
          <img src={props.songData.vendor.artLink} alt='Shoes' className='rounded-xl' />
        </figure>
        <div className='flex flex-col justify-center items-center text-center p-0 gap-4'>
          <h2 className='text-xl font-bold'>{props.songData.song.artist}</h2>
          <p>{props.songData.song.title}</p>
        </div>
        <button className='btn btn-outline text-xs w-auto'>{t('resultstable.wrongsong')}</button>
      </div>
    </>
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
