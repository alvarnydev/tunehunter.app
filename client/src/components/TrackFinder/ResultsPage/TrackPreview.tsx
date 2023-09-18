import { TrackInfoType } from '../../../../../types';

const TrackPreview = (props: { songData: TrackInfoType }) => {
  return (
    <>
      <div className='card w-96'>
        <figure className='px-10 pt-10'>
          <img src={props.songData.vendor.artLink} alt='Shoes' className='rounded-xl' />
        </figure>
        <div className='card-body items-center text-center'>
          <h2 className='card-title'>{props.songData.song.artist}</h2>
          <p>{props.songData.song.title}</p>
          <div className='card-actions justify-end'>
            <button className='btn btn-accent'>Not the song you're looking for?</button>
          </div>
        </div>
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
