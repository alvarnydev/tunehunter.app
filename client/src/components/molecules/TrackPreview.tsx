import { useTranslation } from 'react-i18next';
import { TrackData } from '../../../../globalTypes';
import { useNavigate } from 'react-router';

const TrackPreview = ({ songData }: { songData: TrackData[] }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function formatDuration(duration: number) {
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
  }

  const handleSelectSong = (index: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    const country = searchParams.get('country');

    const selectedSong = songData[index];
    const newParams = `?country=${country}&artist=${selectedSong.artist}&title=${selectedSong.title}&duration=${selectedSong.duration}`;
    navigate(`/results${newParams}`);
  };

  const Modal = () => {
    return (
      <>
        <input type='checkbox' id='my-modal-3' className='modal-toggle' />
        <div className='modal modal-bottom sm:modal-middle'>
          <div className='modal-box p-0 overflow-x-auto !w-auto !max-w-[400px] flex relative'>
            <label htmlFor='my-modal-3' className='btn btn-sm btn-circle absolute right-2 top-2'>
              ✕
            </label>
            <div className='carousel rounded-box'>
              {songData.map(
                (song, i) =>
                  i !== 0 && (
                    <div className='carousel-item card w-[400px] bg-base-100 shadow-xl image-full'>
                      <figure>
                        <img src={song.artLink} alt='Album cover art' className='' />
                      </figure>

                      <div className='card-body justify-end'>
                        <h2 className='card-title'>{song.artist}</h2>
                        <p className='grow-0'>
                          {song.title} ({formatDuration(song.duration)})
                        </p>
                        <div className='card-actions mt-4 justify-between'>
                          <button className='btn btn-sm btn-outline rounded-full text-xs w-auto' onClick={() => handleSelectSong(i)}>
                            {t('trackpreview.selectsong')}
                          </button>
                          <p className='grow-0'>{`${i} / ${songData.length - 1}`}</p>
                        </div>
                      </div>
                    </div>

                    // <div key={i} className='w-48 flex flex-col items-center gap-4'>
                    //   <div className='flex flex-1 flex-col items-center justify-start gap-4 m-0 lg'>
                    //     <figure className='content-center'>
                    //       <img src={song.artLink} alt='Album cover art' className='rounded-xl w-40 h-40' />
                    //     </figure>
                    //     <div className='flex flex-col justify-start c items-center text-center p-0 gap-1'>
                    //       <h2 className='text-xl font-bold'>{song.artist}</h2>
                    //       <p>
                    //         {song.title} ({formatDuration(song.duration * 1000)})
                    //       </p>
                    //     </div>
                    //   </div>
                    // <button className='btn btn-sm btn-outline rounded-full text-xs w-auto m-auto' onClick={() => handleSelectSong(i)}>
                    //   {t('trackpreview.selectsong')}
                    // </button>
                    // </div>
                  )
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className='bg-primary flex flex-col items-center justify-around rounded-2xl gap-4 p-8 w-96 m-0 lg'>
      <figure className='content-center'>
        <img src={songData[0].artLink} alt='Album cover art' className='rounded-xl w-40 h-40' />
      </figure>
      <div className='flex flex-col justify-start text-primary-content items-center text-center max-h-48 overflow-scroll p-0 gap-1'>
        <h2 className='text-xl font-bold'>{songData[0].artist}</h2>
        <p>
          {songData[0].title} ({formatDuration(songData[0].duration)})
        </p>
      </div>
      <label htmlFor='my-modal-3' className={`btn btn-outline text-primary-content rounded-full text-xs w-auto ${songData.length === 1 ? 'invisible' : ''}`}>
        {t('trackpreview.wrongsong')}
      </label>
      <Modal />
    </div>
  );
};

export default TrackPreview;
